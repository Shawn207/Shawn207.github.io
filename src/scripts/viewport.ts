// Draws the frontier-exploration simulation into the hero canvas.
// The simulation itself lives in ./frontier.ts; this file only handles drawing and timing.

import {
  H,
  W,
  K_FREE,
  K_TARGET,
  K_WALL,
  UNKNOWN,
  createSim,
  frontierMarkers,
  runToCompletion,
  settle,
  stepSim,
  type Sim,
} from './frontier';

// Maps the viewport cycles through. The first one is what a visitor sees first.
const SEEDS = [9, 22, 5, 13, 27, 14, 2, 21, 4];

const FADE_MS = 2400; // how long a freshly observed cell keeps glowing
const HOLD_MS = 3400; // the finished map stays on screen this long
const OUT_MS = 800; // then fades out before the next map

// The panel stays dark in both light and dark themes.
const BG = '#0D141B';
const FRESH = [48, 232, 186];
const SETTLED = [17, 70, 80];
const WALL_FRESH = [232, 245, 252];
const WALL_SETTLED = [138, 166, 188];
const TARGET_FRESH = [255, 230, 120];
const TARGET_SETTLED = [242, 194, 0];
const LEVELS = 32;

const ramp = (from: number[], to: number[], curve: number): string[] =>
  Array.from({ length: LEVELS }, (_, l) => {
    const t = Math.pow(l / (LEVELS - 1), curve);
    const c = from.map((v, i) => Math.round(v + (to[i] - v) * t));
    return `rgb(${c[0]},${c[1]},${c[2]})`;
  });

const FREE_RAMP = ramp(FRESH, SETTLED, 0.55);
const WALL_RAMP = ramp(WALL_FRESH, WALL_SETTLED, 0.7);
const TARGET_RAMP = ramp(TARGET_FRESH, TARGET_SETTLED, 0.7);

type Phase = 'explore' | 'hold' | 'fade';

export function mountViewport(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>('canvas');
  const button = root.querySelector<HTMLButtonElement>('[data-new-map]');
  const ctx = canvas?.getContext('2d', { alpha: false });
  if (!canvas || !ctx) return;

  if (button) button.hidden = false;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let seedIndex = 0;
  let sim: Sim = createSim(SEEDS[0]);
  let phase: Phase = 'explore';
  let phaseT = 0;
  let markers: number[] = [];
  let markerAge = 0;
  let background: HTMLCanvasElement | null = null;
  let dpr = 1;
  let cw = 1;
  let ch = 1;
  let raf = 0;
  let last = 0;
  let visible = true;

  const px = (n: number) => n * dpr;

  function makeBackground(): HTMLCanvasElement {
    const layer = document.createElement('canvas');
    layer.width = canvas!.width;
    layer.height = canvas!.height;
    const g = layer.getContext('2d')!;
    g.fillStyle = BG;
    g.fillRect(0, 0, layer.width, layer.height);
    g.fillStyle = 'rgba(150,176,196,0.16)';
    const dot = Math.max(1, Math.round(dpr * 1.2));
    for (let j = 0; j < H; j++)
      for (let i = 0; i < W; i++) g.fillRect(Math.round((i + 0.5) * cw - dot / 2), Math.round((j + 0.5) * ch - dot / 2), dot, dot);
    return layer;
  }

  function draw() {
    if (!background) return;
    const c = ctx!;
    c.drawImage(background, 0, 0);

    let knownFree = 0;
    const t = sim.time;
    for (let j = 0; j < H; j++) {
      const y0 = Math.floor(j * ch);
      const y1 = Math.floor((j + 1) * ch);
      for (let i = 0; i < W; i++) {
        const idx = j * W + i;
        const k = sim.known[idx];
        if (k === UNKNOWN) continue;
        const age = t - sim.seenAt[idx];
        const level = age <= 0 ? 0 : age >= FADE_MS ? LEVELS - 1 : Math.floor((age / FADE_MS) * (LEVELS - 1));
        if (k === K_FREE) {
          knownFree++;
          c.fillStyle = FREE_RAMP[level];
        } else if (k === K_WALL) {
          c.fillStyle = WALL_RAMP[level];
        } else {
          c.fillStyle = TARGET_RAMP[level];
        }
        const x0 = Math.floor(i * cw);
        c.fillRect(x0, y0, Math.floor((i + 1) * cw) - x0, y1 - y0);
      }
    }

    // Path travelled so far.
    c.lineJoin = 'round';
    c.lineCap = 'round';
    c.strokeStyle = 'rgba(255,255,255,0.30)';
    c.lineWidth = Math.max(1, px(1));
    c.beginPath();
    sim.trail.forEach(([x, y], n) => (n ? c.lineTo(x * cw, y * ch) : c.moveTo(x * cw, y * ch)));
    c.lineTo(sim.x * cw, sim.y * ch);
    c.stroke();

    // Candidate frontiers (one diamond per cluster) and the one being driven to.
    if (phase === 'explore') {
      c.strokeStyle = 'rgba(255,255,255,0.75)';
      c.lineWidth = Math.max(1, px(1.1));
      for (const m of markers) {
        const x = ((m % W) + 0.5) * cw;
        const y = (((m / W) | 0) + 0.5) * ch;
        const r = 0.6 * cw;
        c.beginPath();
        c.moveTo(x, y - r);
        c.lineTo(x + r, y);
        c.lineTo(x, y + r);
        c.lineTo(x - r, y);
        c.closePath();
        c.stroke();
      }
      if (sim.goal >= 0) {
        c.strokeStyle = 'rgba(255,255,255,0.95)';
        c.lineWidth = Math.max(1.5, px(1.6));
        c.beginPath();
        c.arc(((sim.goal % W) + 0.5) * cw, (((sim.goal / W) | 0) + 0.5) * ch, 0.95 * cw, 0, Math.PI * 2);
        c.stroke();
      }
    }

    // The robot.
    c.fillStyle = '#ffffff';
    c.strokeStyle = BG;
    c.lineWidth = Math.max(1, px(1.5));
    c.beginPath();
    c.arc(sim.x * cw, sim.y * ch, 0.62 * cw, 0, Math.PI * 2);
    c.fill();
    c.stroke();

    // Readout: how much of the map is known and how many targets have been seen.
    // It needs room, so small canvases leave it out.
    if (canvas!.clientWidth >= 520) drawReadout(c, knownFree);

    if (phase === 'fade') {
      c.globalAlpha = Math.min(1, phaseT / OUT_MS);
      c.fillStyle = BG;
      c.fillRect(0, 0, canvas!.width, canvas!.height);
      c.globalAlpha = 1;
    }
  }

  function drawReadout(c: CanvasRenderingContext2D, knownFree: number) {
    let seen = 0;
    for (const block of sim.world.targetBlocks) if (block.some((i) => sim.known[i] !== UNKNOWN)) seen++;
    const coverage = Math.min(100, Math.round((knownFree / sim.world.freeCount) * 100));
    const size = Math.max(10, Math.min(13, canvas!.clientWidth / 52));
    c.font = `600 ${px(size)}px "Archivo Variable", system-ui, sans-serif`;
    c.textBaseline = 'alphabetic';
    c.textAlign = 'left';
    c.fillStyle = 'rgba(205,222,234,0.9)';
    const pad = px(size * 1.1);
    c.fillText(`Mapped ${coverage}%`, pad, canvas!.height - pad);
    c.textAlign = 'right';
    c.fillText(`Targets seen ${seen} of ${sim.world.targetCount}`, canvas!.width - pad, canvas!.height - pad);
  }

  function resize() {
    const rect = canvas!.getBoundingClientRect();
    if (!rect.width) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas!.width = Math.round(rect.width * dpr);
    canvas!.height = Math.round((rect.width * dpr * H) / W);
    cw = canvas!.width / W;
    ch = canvas!.height / H;
    background = makeBackground();
    draw();
  }

  function loadLive() {
    sim = createSim(SEEDS[seedIndex % SEEDS.length]);
    phase = 'explore';
    phaseT = 0;
    markers = [];
    markerAge = 0;
  }

  function loadStill() {
    sim = createSim(SEEDS[seedIndex % SEEDS.length]);
    runToCompletion(sim);
    settle(sim);
    phase = 'hold';
    phaseT = 0;
    markers = [];
  }

  function update(dt: number) {
    stepSim(sim, dt);
    if (phase === 'explore') {
      markerAge += dt;
      if (markerAge > 120) {
        markers = frontierMarkers(sim);
        markerAge = 0;
      }
      if (sim.done) {
        phase = 'hold';
        phaseT = 0;
        markers = [];
      }
    } else if (phase === 'hold') {
      phaseT += dt;
      if (phaseT >= HOLD_MS) {
        phase = 'fade';
        phaseT = 0;
      }
    } else {
      phaseT += dt;
      if (phaseT >= OUT_MS) {
        seedIndex++;
        loadLive();
      }
    }
  }

  function frame(ts: number) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(50, ts - last);
    last = ts;
    update(dt);
    draw();
  }

  function start() {
    if (raf) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  function sync() {
    if (!motion.matches && visible && !document.hidden) start();
    else stop();
  }

  function applyMotionPreference() {
    root.toggleAttribute('data-still', motion.matches);
    if (motion.matches) {
      stop();
      loadStill();
      draw();
    } else {
      loadLive();
      sync();
    }
  }

  button?.addEventListener('click', () => {
    if (motion.matches) {
      seedIndex++;
      loadStill();
      draw();
    } else if (phase !== 'fade') {
      phase = 'fade';
      phaseT = 0;
    }
  });

  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver((entries) => {
    visible = entries.some((e) => e.isIntersecting);
    sync();
  }).observe(root);
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', applyMotionPreference);
  document.fonts?.ready.then(() => {
    if (!raf) draw();
  });

  resize();
  applyMotionPreference();
}
