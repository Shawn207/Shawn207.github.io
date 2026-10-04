// A small frontier-exploration simulation for the home-page viewport.
// Pure logic, no DOM access, so it can be tested in Node.
//
// World: rooms joined by corridors on a W x H grid, with a few free-standing target blocks.
// Robot: senses with a 360-degree ray fan, then repeatedly drives to the nearest frontier
// (a known-free cell that touches unknown space), the classic greedy frontier strategy.

export const W = 64;
export const H = 40;

// World cell values.
export const FREE = 0;
export const WALL = 1;
export const TARGET = 2;

// Knowledge values (what the robot has observed so far).
export const UNKNOWN = 0;
export const K_FREE = 1;
export const K_WALL = 2;
export const K_TARGET = 3;

export const RAYS = 240;
export const RANGE = 4.5; // default sensing range in cells
export const SPEED = 10; // default cells per second
const CLEARANCE = 0.34; // how far from walls a shortcut line must stay, in cells

export type Point = [number, number];

export type World = {
  cells: Uint8Array;
  start: Point; // cell centre
  roomCount: number;
  targetCount: number;
  targetBlocks: number[][]; // cell indices of each target block
  freeCount: number;
};

export type Sim = {
  world: World;
  range: number;
  known: Uint8Array;
  seenAt: Float64Array; // sim time (ms) a cell was last observed, for the recency glow
  x: number;
  y: number;
  path: Point[];
  goal: number; // cell index, or -1
  trail: Point[];
  done: boolean;
  time: number; // ms
  travelled: number; // cells
};

export function mulberry32(seed: number): () => number {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Room = { x: number; y: number; w: number; h: number };

export function makeWorld(seed: number): World {
  const rnd = mulberry32(seed);
  const ri = (a: number, b: number) => a + Math.floor(rnd() * (b - a + 1));
  const cells = new Uint8Array(W * H).fill(WALL);
  const at = (x: number, y: number) => y * W + x;

  // Rooms, with at least three cells of rock between any two.
  const rooms: Room[] = [];
  for (let tries = 0; tries < 600 && rooms.length < 7; tries++) {
    const w = ri(8, 16);
    const h = ri(6, 11);
    const x = ri(2, W - w - 3);
    const y = ri(2, H - h - 3);
    const clash = rooms.some(
      (r) => x < r.x + r.w + 3 && x + w + 3 > r.x && y < r.y + r.h + 3 && y + h + 3 > r.y,
    );
    if (!clash) rooms.push({ x, y, w, h });
  }
  for (const r of rooms) {
    for (let j = r.y; j < r.y + r.h; j++) for (let i = r.x; i < r.x + r.w; i++) cells[at(i, j)] = FREE;
  }

  // Corridors, two cells wide: a minimum spanning tree over room centres, plus a couple of loops.
  const centre = (r: Room): Point => [Math.floor(r.x + r.w / 2), Math.floor(r.y + r.h / 2)];
  const carve2 = (x: number, y: number) => {
    for (let j = 0; j < 2; j++)
      for (let i = 0; i < 2; i++) {
        const cx = x + i;
        const cy = y + j;
        if (cx > 0 && cy > 0 && cx < W - 1 && cy < H - 1) cells[at(cx, cy)] = FREE;
      }
  };
  const connect = (a: Room, b: Room) => {
    const [ax, ay] = centre(a);
    const [bx, by] = centre(b);
    const horizontalFirst = rnd() < 0.5;
    const hLine = (y: number, x0: number, x1: number) => {
      for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) carve2(x, y);
    };
    const vLine = (x: number, y0: number, y1: number) => {
      for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) carve2(x, y);
    };
    if (horizontalFirst) {
      hLine(ay, ax, bx);
      vLine(bx, ay, by);
    } else {
      vLine(ax, ay, by);
      hLine(by, ax, bx);
    }
  };
  const dist = (a: Room, b: Room) => {
    const [ax, ay] = centre(a);
    const [bx, by] = centre(b);
    return Math.abs(ax - bx) + Math.abs(ay - by);
  };
  const joined = new Set<number>([0]);
  const edges = new Set<string>();
  while (joined.size < rooms.length) {
    let best: [number, number] | null = null;
    let bestD = Infinity;
    for (const i of joined)
      for (let j = 0; j < rooms.length; j++) {
        if (joined.has(j)) continue;
        const d = dist(rooms[i], rooms[j]);
        if (d < bestD) {
          bestD = d;
          best = [i, j];
        }
      }
    if (!best) break;
    connect(rooms[best[0]], rooms[best[1]]);
    edges.add(`${Math.min(...best)}-${Math.max(...best)}`);
    joined.add(best[1]);
  }
  for (let extra = 0; extra < 2; extra++) {
    const i = ri(0, rooms.length - 1);
    let j = -1;
    let bestD = Infinity;
    for (let k = 0; k < rooms.length; k++) {
      if (k === i || edges.has(`${Math.min(i, k)}-${Math.max(i, k)}`)) continue;
      const d = dist(rooms[i], rooms[k]);
      if (d < bestD) {
        bestD = d;
        j = k;
      }
    }
    if (j >= 0) {
      connect(rooms[i], rooms[j]);
      edges.add(`${Math.min(i, j)}-${Math.max(i, j)}`);
    }
  }

  // Free-standing target blocks, at least two cells away from every wall.
  let targetCount = 0;
  const targetBlocks: number[][] = [];
  const order = rooms.map((_, i) => i).sort((a, b) => rooms[b].w * rooms[b].h - rooms[a].w * rooms[a].h);
  for (const idx of order) {
    const r = rooms[idx];
    if (r.w < 9 || r.h < 7) continue;
    if (targetCount >= 5 || rnd() < 0.15) continue;
    for (let attempt = 0; attempt < 16; attempt++) {
      const wide = rnd() < 0.5;
      const bw = wide ? 3 : 2;
      const bh = wide ? 2 : 3;
      const bx = ri(r.x + 2, r.x + r.w - 2 - bw);
      const by = ri(r.y + 2, r.y + r.h - 2 - bh);
      let ok = true;
      for (let j = by - 1; j < by + bh + 1 && ok; j++)
        for (let i = bx - 1; i < bx + bw + 1; i++) if (cells[at(i, j)] !== FREE) ok = false;
      if (!ok) continue;
      const block: number[] = [];
      for (let j = by; j < by + bh; j++)
        for (let i = bx; i < bx + bw; i++) {
          cells[at(i, j)] = TARGET;
          block.push(at(i, j));
        }
      targetBlocks.push(block);
      targetCount++;
      break;
    }
  }

  // Start in the middle of the first room, nudged off any block.
  const [sx0, sy0] = centre(rooms[0]);
  let start: Point = [sx0 + 0.5, sy0 + 0.5];
  search: for (let rad = 0; rad < 6; rad++)
    for (let j = -rad; j <= rad; j++)
      for (let i = -rad; i <= rad; i++)
        if (cells[at(sx0 + i, sy0 + j)] === FREE) {
          start = [sx0 + i + 0.5, sy0 + j + 0.5];
          break search;
        }

  let freeCount = 0;
  for (let i = 0; i < cells.length; i++) if (cells[i] === FREE) freeCount++;

  return { cells, start, roomCount: rooms.length, targetCount, targetBlocks, freeCount };
}

// ---------------------------------------------------------------------------------------------

const DIRS: Point[] = Array.from({ length: RAYS }, (_, i) => {
  const a = (i / RAYS) * Math.PI * 2;
  return [Math.cos(a), Math.sin(a)] as Point;
});

export function createSim(seed: number, range: number = RANGE): Sim {
  const world = makeWorld(seed);
  const sim: Sim = {
    world,
    range,
    known: new Uint8Array(W * H),
    seenAt: new Float64Array(W * H).fill(-1e9),
    x: world.start[0],
    y: world.start[1],
    path: [],
    goal: -1,
    trail: [[world.start[0], world.start[1]]],
    done: false,
    time: 0,
    travelled: 0,
  };
  sense(sim);
  return sim;
}

function reveal(sim: Sim, i: number) {
  const v = sim.world.cells[i];
  sim.known[i] = v === FREE ? K_FREE : v === WALL ? K_WALL : K_TARGET;
  sim.seenAt[i] = sim.time;
}

export function sense(sim: Sim) {
  const { cells } = sim.world;
  const ox = sim.x;
  const oy = sim.y;
  for (const [dx, dy] of DIRS) {
    let cx = Math.floor(ox);
    let cy = Math.floor(oy);
    const stepX = dx > 0 ? 1 : -1;
    const stepY = dy > 0 ? 1 : -1;
    const tDeltaX = dx === 0 ? Infinity : Math.abs(1 / dx);
    const tDeltaY = dy === 0 ? Infinity : Math.abs(1 / dy);
    let tMaxX = dx === 0 ? Infinity : (dx > 0 ? cx + 1 - ox : ox - cx) * tDeltaX;
    let tMaxY = dy === 0 ? Infinity : (dy > 0 ? cy + 1 - oy : oy - cy) * tDeltaY;
    reveal(sim, cy * W + cx);
    for (;;) {
      let t: number;
      if (tMaxX < tMaxY) {
        t = tMaxX;
        tMaxX += tDeltaX;
        cx += stepX;
      } else {
        t = tMaxY;
        tMaxY += tDeltaY;
        cy += stepY;
      }
      if (t > sim.range || cx < 0 || cy < 0 || cx >= W || cy >= H) break;
      const i = cy * W + cx;
      reveal(sim, i);
      if (cells[i] !== FREE) break;
    }
  }
  // A solid cell that touches observed free space counts as observed. This closes the small
  // gaps a ray fan leaves at long range, so they do not show up as false frontiers.
  const x0 = Math.max(1, Math.floor(ox - sim.range) - 1);
  const x1 = Math.min(W - 2, Math.ceil(ox + sim.range) + 1);
  const y0 = Math.max(1, Math.floor(oy - sim.range) - 1);
  const y1 = Math.min(H - 2, Math.ceil(oy + sim.range) + 1);
  for (let y = y0; y <= y1; y++)
    for (let x = x0; x <= x1; x++) {
      const i = y * W + x;
      if (sim.known[i] !== K_FREE) continue;
      for (const n of [i - 1, i + 1, i - W, i + W]) if (sim.known[n] === UNKNOWN && cells[n] !== FREE) reveal(sim, n);
    }
}

export function isFrontier(sim: Sim, i: number): boolean {
  const k = sim.known;
  if (k[i] !== K_FREE) return false;
  const x = i % W;
  const y = (i / W) | 0;
  return (
    (x > 0 && k[i - 1] === UNKNOWN) ||
    (x < W - 1 && k[i + 1] === UNKNOWN) ||
    (y > 0 && k[i - W] === UNKNOWN) ||
    (y < H - 1 && k[i + W] === UNKNOWN)
  );
}

function clearLine(sim: Sim, ax: number, ay: number, bx: number, by: number): boolean {
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy);
  if (len < 1e-6) return true;
  const nx = -dy / len;
  const ny = dx / len;
  const steps = Math.ceil(len / 0.2);
  const k = sim.known;
  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const px = ax + dx * t;
    const py = ay + dy * t;
    for (const o of [0, CLEARANCE, -CLEARANCE]) {
      const cx = Math.floor(px + nx * o);
      const cy = Math.floor(py + ny * o);
      if (cx < 0 || cy < 0 || cx >= W || cy >= H || k[cy * W + cx] !== K_FREE) return false;
    }
  }
  return true;
}

// Breadth-first search over observed free cells to the nearest frontier.
function nearestFrontier(sim: Sim, allowCornerCut: boolean): { goal: number; prev: Int32Array } | null {
  const k = sim.known;
  const prev = new Int32Array(W * H).fill(-1);
  const queue = new Int32Array(W * H);
  const start = Math.floor(sim.y) * W + Math.floor(sim.x);
  let head = 0;
  let tail = 0;
  queue[tail++] = start;
  prev[start] = start;
  const free = (i: number) => k[i] === K_FREE;
  while (head < tail) {
    const c = queue[head++];
    if (c !== start && isFrontier(sim, c)) return { goal: c, prev };
    const x = c % W;
    const y = (c / W) | 0;
    const push = (n: number) => {
      if (prev[n] === -1) {
        prev[n] = c;
        queue[tail++] = n;
      }
    };
    if (x > 0 && free(c - 1)) push(c - 1);
    if (x < W - 1 && free(c + 1)) push(c + 1);
    if (y > 0 && free(c - W)) push(c - W);
    if (y < H - 1 && free(c + W)) push(c + W);
    for (const sx of [-1, 1])
      for (const sy of [-1, 1]) {
        const nx = x + sx;
        const ny = y + sy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const n = ny * W + nx;
        if (!free(n)) continue;
        const a = free(y * W + nx);
        const b = free(ny * W + x);
        if (allowCornerCut ? a || b : a && b) push(n);
      }
  }
  return null;
}

function replan(sim: Sim): boolean {
  let hit = nearestFrontier(sim, false);
  if (!hit) hit = nearestFrontier(sim, true);
  if (!hit) return false;
  const cellsOnPath: Point[] = [];
  const start = Math.floor(sim.y) * W + Math.floor(sim.x);
  for (let c = hit.goal; c !== start; c = hit.prev[c]) cellsOnPath.push([(c % W) + 0.5, ((c / W) | 0) + 0.5]);
  cellsOnPath.reverse();
  // Shorten the grid path with line-of-sight shortcuts so the robot drives in straight runs.
  const anchors: Point[] = [[sim.x, sim.y], ...cellsOnPath];
  const path: Point[] = [];
  let i = 0;
  while (i < anchors.length - 1) {
    let j = anchors.length - 1;
    while (j > i + 1 && !clearLine(sim, anchors[i][0], anchors[i][1], anchors[j][0], anchors[j][1])) j--;
    path.push(anchors[j]);
    i = j;
  }
  sim.path = path;
  sim.goal = hit.goal;
  return path.length > 0;
}

// When only a few small pockets are left, call the map finished instead of sending the robot back
// across the whole floor plan for them.
function nearlyComplete(sim: Sim): boolean {
  const { cells, freeCount } = sim.world;
  const k = sim.known;
  let left = 0;
  for (let i = 0; i < W * H; i++) if (cells[i] === FREE && k[i] === UNKNOWN) left++;
  if (left > freeCount * 0.02) return false;
  for (let i = 0; i < W * H; i++) {
    if (cells[i] !== FREE || k[i] !== UNKNOWN) continue;
    const x = i % W;
    const y = (i / W) | 0;
    let near = false;
    for (let dy = -2; dy <= 2 && !near; dy++)
      for (let dx = -2; dx <= 2; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < W && ny < H && k[ny * W + nx] === K_FREE) {
          near = true;
          break;
        }
      }
    if (!near) return false;
  }
  return true;
}

function finish(sim: Sim) {
  const { cells } = sim.world;
  for (let i = 0; i < W * H; i++) if (cells[i] === FREE && sim.known[i] === UNKNOWN) reveal(sim, i);
  for (let i = 0; i < W * H; i++) {
    if (sim.known[i] !== K_FREE) continue;
    for (const n of [i - 1, i + 1, i - W, i + W]) if (n >= 0 && n < W * H && sim.known[n] === UNKNOWN && cells[n] !== FREE) reveal(sim, n);
  }
  sim.done = true;
}

export function stepSim(sim: Sim, dtMs: number, speed: number = SPEED) {
  sim.time += dtMs;
  if (sim.done) return;
  let remaining = (speed * dtMs) / 1000;
  for (let guard = 0; guard < 64 && remaining > 1e-6; guard++) {
    if (sim.goal < 0 || sim.path.length === 0 || !isFrontier(sim, sim.goal)) {
      sense(sim);
      if (nearlyComplete(sim)) {
        finish(sim);
        break;
      }
      if (!replan(sim)) {
        sim.done = true;
        break;
      }
    }
    const [tx, ty] = sim.path[0];
    const dx = tx - sim.x;
    const dy = ty - sim.y;
    const d = Math.hypot(dx, dy);
    if (d <= remaining) {
      sim.x = tx;
      sim.y = ty;
      remaining -= d;
      sim.travelled += d;
      sim.path.shift();
      sim.trail.push([tx, ty]);
    } else {
      sim.x += (dx / d) * remaining;
      sim.y += (dy / d) * remaining;
      sim.travelled += remaining;
      remaining = 0;
    }
  }
  sense(sim);
  if (sim.trail.length > 4000) sim.trail.splice(0, sim.trail.length - 4000);
}

// One marker per cluster of frontier cells, for drawing the candidates the robot is choosing between.
export function frontierMarkers(sim: Sim): number[] {
  const seen = new Uint8Array(W * H);
  const markers: number[] = [];
  for (let i = 0; i < W * H; i++) {
    if (seen[i] || !isFrontier(sim, i)) continue;
    const members: number[] = [];
    const stack = [i];
    seen[i] = 1;
    while (stack.length) {
      const c = stack.pop() as number;
      members.push(c);
      const x = c % W;
      const y = (c / W) | 0;
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          const n = ny * W + nx;
          if (!seen[n] && isFrontier(sim, n)) {
            seen[n] = 1;
            stack.push(n);
          }
        }
    }
    if (members.length < 2) continue;
    let mx = 0;
    let my = 0;
    for (const c of members) {
      mx += c % W;
      my += (c / W) | 0;
    }
    mx /= members.length;
    my /= members.length;
    let best = members[0];
    let bestD = Infinity;
    for (const c of members) {
      const d = Math.hypot((c % W) - mx, ((c / W) | 0) - my);
      if (d < bestD) {
        bestD = d;
        best = c;
      }
    }
    markers.push(best);
  }
  return markers;
}

// Used for the reduced-motion still frame and for tests: explore to completion instantly.
export function runToCompletion(sim: Sim, stepMs = 33, maxMs = 600_000) {
  while (!sim.done && sim.time < maxMs) stepSim(sim, stepMs);
}

export function settle(sim: Sim) {
  sim.seenAt.fill(-1e9);
}
