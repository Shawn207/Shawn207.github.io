// The first project is shown large. `youtube` is a video ID (the part after v=).
// Projects without a video show a diagram instead. Set `page` to link the title to an internal page.
// Optional `poster`: a local image (for example '/media/pose.jpg') shown instead of YouTube's thumbnail,
// which keeps the page from contacting YouTube until someone presses play.

export type Link = { label: string; href?: string };

export type Project = {
  id: string;
  title: string;
  status: string;
  blurb: string;
  youtube?: string;
  poster?: string;
  diagram?: 'air-ground';
  page?: string;
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
    page: '/projects/pose/',
    links: [
      { label: 'Project page', href: '/projects/pose/' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2609.19460' },
      { label: 'Video', href: 'https://www.youtube.com/watch?v=1NR4InKZl2I' },
    ],
  },
  {
    id: 'sedem',
    title: 'SEDEM: semantic exploration and dense mapping',
    status: 'IEEE RA-L, 2025',
    blurb:
      'A Spot with a panoramic LiDAR-camera rig explores unknown spaces by itself, finds target objects, and views each one from several angles to build a dense semantic map. One planner schedules geometric coverage and multi-view observations together.',
    youtube: '9tsnBLaSSmU',
    links: [
      { label: 'Paper', href: 'https://ieeexplore.ieee.org/document/11159179/' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2505.22880' },
      { label: 'Code', href: 'https://github.com/Shawn207/SEDEM' },
      { label: 'Video', href: 'https://youtu.be/9tsnBLaSSmU' },
    ],
  },
  {
    id: 'dodt',
    title: 'Dynamic obstacle perception and mapping for UAVs',
    status: 'IEEE RA-L, 2024, and ICRA 2023',
    blurb:
      'Lightweight RGB-D detection and tracking of moving obstacles on a small quadcopter (0.11 m position error, 0.23 m/s velocity error), and a mapping system that predicts how obstacles move for collision-free flight at 25 Hz on a Jetson Xavier. Both are open source.',
    youtube: '9dKX3BRnxyw',
    links: [
      { label: 'Detector code', href: 'https://github.com/Shawn207/onboard_detector' },
      { label: 'Mapping code', href: 'https://github.com/Shawn207/map_manager_pub' },
      { label: 'Video 1', href: 'https://youtu.be/9dKX3BRnxyw' },
      { label: 'Video 2', href: 'https://www.youtube.com/watch?v=u5zblVx8KRc' },
    ],
  },
  {
    id: 'air-ground',
    title: 'Heterogeneous air-ground exploration',
    status: 'Manuscript in preparation',
    blurb:
      'A UAV and a legged robot exploring together, each planning in a way that fits its own sensing and mobility.',
    diagram: 'air-ground',
    links: [],
  },
];
