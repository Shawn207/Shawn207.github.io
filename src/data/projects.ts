// The tiles under "Project Highlights" on the home page. The first one is shown large.
//
// Every project links to its own page on this site (see projectPages.ts); the long videos live there.
// `tile` is the short silent loop shown on the home page:
//   tile: { video: '/media/<project>/preview.mp4', poster: '/media/<project>/preview.jpg', alt: '...' }
// Put the file in public/media/. A GIF also works (tile: { gif: '/media/x/preview.gif', alt }), but an MP4 is
// roughly ten times smaller for the same picture, so convert big GIFs first.
// Without `tile`, the tile shows the YouTube thumbnail of `youtube` instead.

export type Link = { label: string; href?: string };

export type Tile = { video?: string; gif?: string; poster?: string; alt: string };

export type Project = {
  id: string;
  title: string;
  status: string;
  blurb: string;
  page: string;
  youtube?: string;
  tile?: Tile;
  links: Link[];
};

export const projects: Project[] = [
  {
    id: 'pose',
    title: 'POSE: pose-aware semantic exploration',
    status: 'Submitted to ICRA 2027',
    blurb:
      'Tall objects in confined spaces are hard to see completely from the ground plane. POSE lets a legged robot pitch and roll its body to see more of each object, and uses a vision-language model to skip redundant inspection visits. In simulation it raised final target-surface coverage by 8–10 percentage points and cut exploration time by 17–32% against a planar baseline. It also ran on a Spot in a machine shop.',
    youtube: '1NR4InKZl2I',
    tile: {
      video: '/media/pose/pose-demo.mp4',
      poster: '/media/pose/pose-demo-poster.jpg',
      alt: 'Real-world machine-shop run of POSE: a top-down map with detected machines and the robot path, a third-person view of the Spot tilting its body toward a machine, and the first-person panoramic view.',
    },
    page: '/projects/pose/',
    links: [{ label: 'arXiv', href: 'https://arxiv.org/abs/2609.19460' }],
  },
  {
    id: 'sedem',
    title: 'SEDEM: semantic exploration and dense mapping',
    status: 'IEEE RA-L, 2025. Presented at IROS 2026',
    blurb:
      'A Spot with a panoramic LiDAR-camera rig explores unknown spaces by itself, finds target objects, and views each one from several angles to build a dense semantic map. One planner schedules geometric coverage and multi-view observations together.',
    youtube: '9tsnBLaSSmU',
    tile: {
      video: '/media/sedem/construction-loop.mp4',
      poster: '/media/sedem/construction-loop-poster.jpg',
      alt: 'Mock construction site run: a top view and a front view of the Spot on the left, and the map on the right growing as the robot explores and boxes the window frames, work platform, and cones.',
    },
    page: '/projects/sedem/',
    links: [
      { label: 'Paper', href: 'https://ieeexplore.ieee.org/document/11159179/' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2505.22880' },
      { label: 'Code', href: 'https://github.com/Shawn207/SEDEM' },
      { label: 'Slides', href: '/docs/SEDEM_IROS2026_slides.pdf' },
    ],
  },
  {
    id: 'dodt',
    title: 'Dynamic obstacle perception and mapping for UAVs',
    status: 'IEEE RA-L, 2024, and ICRA 2023',
    blurb:
      'Lightweight RGB-D detection and tracking of moving obstacles on a small quadcopter (0.11 m position error, 0.23 m/s velocity error), and a mapping system that predicts how obstacles move for collision-free flight at 25 Hz on a Jetson Xavier. Both are open source.',
    youtube: '9dKX3BRnxyw',
    // tile: { video: '/media/dodt/preview.mp4', poster: '/media/dodt/preview.jpg', alt: '...' },
    page: '/projects/dodt/',
    links: [
      { label: 'Detector code', href: 'https://github.com/Shawn207/onboard_detector' },
      { label: 'Mapping code', href: 'https://github.com/Shawn207/map_manager_pub' },
    ],
  },
  {
    id: 'air-ground',
    title: 'Heterogeneous air-ground exploration',
    status: 'Manuscript in preparation',
    blurb:
      'A UAV and a legged robot exploring together, each planning in a way that fits its own sensing and mobility.',
    tile: {
      video: '/media/air-ground/exploration.mp4',
      poster: '/media/air-ground/poster.jpg',
      alt: 'Visualization of an exploration run: the map of a multi-room floor plan fills in over time.',
    },
    page: '/projects/air-ground/',
    links: [],
  },
];
