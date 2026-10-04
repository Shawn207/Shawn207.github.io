// Everything you are likely to edit on the home page lives in the files under src/data/.

export const site = {
  name: 'Xiaoyang Zhan',
  title: 'Xiaoyang Zhan | Robotics, Carnegie Mellon University',
  description:
    'Ph.D. student at Carnegie Mellon University (CERLAB) working on decision-making, active perception, and semantic mapping for single robots and multi-robot teams.',
  url: 'https://shawn207.github.io',

  role: 'Ph.D. student, Mechanical Engineering (Robotics)',
  affiliation: 'Carnegie Mellon University',
  headline: 'Robots that decide where to look and where to go.',
  bio: [
    "I'm a Ph.D. student in CMU's CERLAB, advised by Prof. Kenji Shimada.",
    'My research covers decision-making for single robots and multi-robot teams, active perception, and semantic mapping, validated on Boston Dynamics Spot and custom UAVs.',
    "Lately I've been connecting these with vision-language models for embodied AI.",
  ].join(' '),
  // Delete this line (set to '') once you are no longer looking.
  seeking: 'Looking for 2027 internships in robotics, embodied AI, and autonomous driving.',

  email: { user: 'xzhan2', domain: 'andrew.cmu.edu' },
  links: {
    github: 'https://github.com/Shawn207',
    scholar: 'https://scholar.google.com/citations?user=TfJP6ZMAAAAJ&hl=en',
    linkedin: 'https://www.linkedin.com/in/zhan-xiaoyang-5569341b9/en',
  },
  cv: '/Xiaoyang_Zhan_CV.pdf',

  // To replace the generated hero animation with a real clip: put a short, silent, looping MP4
  // in public/media/ (about 5 MB or less) and set heroVideo to '/media/your-file.mp4'.
  heroVideo: null as string | null,
  heroPoster: null as string | null,
  heroCaption: '',

  themes: [
    {
      title: 'Decision-making for robots and robot teams',
      text: 'How a robot picks its next viewpoint or goal, and how a team divides the work when its members sense and move differently.',
    },
    {
      title: 'Active perception and semantic mapping',
      text: 'Planning where to look so a robot gathers the observations a task needs, and turning those observations into maps it can plan on.',
    },
    {
      title: 'Vision-language models in the loop',
      text: 'Using VLM judgments, grounded in spatial memory, to make planning decisions that a robot can execute.',
    },
  ],

  education: [
    {
      when: 'In progress',
      what: 'Ph.D., Mechanical Engineering (Robotics), Carnegie Mellon University',
      note: 'CERLAB, advised by Prof. Kenji Shimada',
    },
    { when: '2023', what: 'M.S., Mechanical Engineering, Carnegie Mellon University' },
    {
      when: '2021',
      what: 'B.E., Mechanical Engineering, minor in Computer Science, University of Pittsburgh',
      note: 'Dual-degree program with Sichuan University',
    },
  ],
};
