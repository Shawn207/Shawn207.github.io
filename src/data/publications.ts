// Newest first. `href` makes the title a link. Co-first authors get coFirst: true (shown as *).

import type { Link } from './projects';

export type Author = { name: string; self?: boolean; coFirst?: boolean };

export type Publication = {
  year: string;
  title: string;
  authors: Author[];
  venue: string;
  note?: string;
  href?: string;
  links: Link[];
};

const me = (coFirst = false): Author => ({ name: 'Xiaoyang Zhan', self: true, coFirst });

export const publications: Publication[] = [
  {
    year: '2026',
    title:
      'Pose-aware Legged Robot Semantic Exploration with Omnidirectional Perception in Confined Unknown Environments',
    authors: [me(true), { name: 'Shiyu Chen', coFirst: true }, { name: 'Kenji Shimada' }],
    venue: 'arXiv preprint arXiv:2609.19460',
    note: 'Submitted to ICRA 2027.',
    href: '/projects/pose/',
    links: [
      { label: 'Project page', href: '/projects/pose/' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2609.19460' },
      { label: 'Video', href: 'https://www.youtube.com/watch?v=1NR4InKZl2I' },
    ],
  },
  {
    year: '2025',
    title:
      'Semantic Exploration and Dense Mapping of Complex Environments Using Ground Robot with Panoramic LiDAR-Camera Fusion',
    authors: [
      me(),
      { name: 'Shixin Zhou' },
      { name: 'Qianqian Yang' },
      { name: 'Yixuan Zhao' },
      { name: 'Hao Liu' },
      { name: 'Srinivas Chowdary Ramineni' },
      { name: 'Kenji Shimada' },
    ],
    venue: 'IEEE Robotics and Automation Letters (RA-L), vol. 10, no. 11, pp. 11196–11203, 2025',
    href: 'https://ieeexplore.ieee.org/document/11159179/',
    links: [
      { label: 'Paper', href: 'https://ieeexplore.ieee.org/document/11159179/' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2505.22880' },
      { label: 'Code', href: 'https://github.com/Shawn207/SEDEM' },
      { label: 'Video', href: 'https://youtu.be/9tsnBLaSSmU' },
    ],
  },
  {
    year: '2024',
    title:
      'Onboard Dynamic-Object Detection and Tracking for Autonomous Robot Navigation with RGB-D Camera',
    authors: [
      { name: 'Zhefan Xu', coFirst: true },
      me(true),
      { name: 'Yumeng Xiu' },
      { name: 'Christopher Suzuki' },
      { name: 'Kenji Shimada' },
    ],
    venue: 'IEEE Robotics and Automation Letters (RA-L), vol. 9, no. 1, pp. 651–658, Jan. 2024',
    note: 'Over 100 citations.',
    href: 'https://ieeexplore.ieee.org/document/10323166',
    links: [
      { label: 'Paper', href: 'https://ieeexplore.ieee.org/document/10323166' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2303.00132' },
      { label: 'Code', href: 'https://github.com/Shawn207/onboard_detector' },
      { label: 'Video', href: 'https://youtu.be/9dKX3BRnxyw' },
    ],
  },
  {
    year: '2023',
    title:
      'A Real-Time Dynamic Obstacle Tracking and Mapping System for UAV Navigation and Collision Avoidance with an RGB-D Camera',
    authors: [
      { name: 'Zhefan Xu', coFirst: true },
      me(true),
      { name: 'Baihan Chen' },
      { name: 'Yumeng Xiu' },
      { name: 'Chenhao Yang' },
      { name: 'Kenji Shimada' },
    ],
    venue: 'IEEE International Conference on Robotics and Automation (ICRA), 2023, pp. 10645–10651',
    href: 'https://arxiv.org/abs/2209.08258',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2209.08258' },
      { label: 'Code', href: 'https://github.com/Shawn207/map_manager_pub' },
      { label: 'Video', href: 'https://www.youtube.com/watch?v=u5zblVx8KRc' },
    ],
  },
];
