// Newest first. Only this year's items are kept. `href` turns the sentence into a link;
// `links` adds small extra links after it.

import type { Link } from './projects';

export type NewsItem = { date: string; text: string; href?: string; links?: Link[] };

export const news: NewsItem[] = [
  {
    date: 'Oct 2026',
    text: 'Presented SEDEM, our RA-L paper on semantic exploration and dense mapping, at IROS 2026 in Pittsburgh.',
    href: '/projects/sedem/',
    links: [{ label: 'Slides (PDF)', href: '/docs/SEDEM_IROS2026_slides.pdf' }],
  },
  {
    date: 'Sep 2026',
    text: 'POSE, our work on pose-aware semantic exploration with a legged robot, is on arXiv and submitted to ICRA 2027.',
    href: '/projects/pose/',
  },
];
