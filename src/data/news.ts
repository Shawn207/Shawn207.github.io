// Newest first. `href` is optional and turns the sentence into a link.

export type NewsItem = { date: string; text: string; href?: string };

export const news: NewsItem[] = [
  {
    date: 'Sep 2026',
    text: 'POSE, our work on pose-aware semantic exploration with a legged robot, is on arXiv and submitted to ICRA 2027.',
    href: '/projects/pose/',
  },
  {
    date: '2025',
    text: 'Our RA-L paper on semantic exploration and dense mapping with a Spot is published, and the code is open source.',
    href: 'https://github.com/Shawn207/SEDEM',
  },
  {
    date: 'Jan 2024',
    text: 'Our RA-L paper on onboard dynamic-object detection and tracking appears in volume 9, issue 1. It has since passed 100 citations.',
    href: 'https://ieeexplore.ieee.org/document/10323166',
  },
];
