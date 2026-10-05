// Everything you are likely to edit on the home page lives in the files under src/data/.
// Text fields can contain links written as [label](https://example.com).

export const site = {
  name: 'Xiaoyang Zhan',
  title: 'Xiaoyang Zhan | Robotics, Carnegie Mellon University',
  description:
    'Ph.D. student at Carnegie Mellon University (CERLAB) working on decision-making, active perception, and semantic mapping for single robots and multi-robot teams, with hands-on experience across the robot autonomy stack.',
  url: 'https://shawn207.github.io',

  role: 'Ph.D. student in Mechanical Engineering',
  affiliation: 'Carnegie Mellon University',
  focus: 'Robotics research (CERLAB)',

  portrait: {
    src: '/media/portrait.jpg',
    small: '/media/portrait-640.jpg',
    width: 1200,
    height: 1117,
    alt: 'Portrait of Xiaoyang Zhan, smiling, wearing glasses and a tan jacket over a white hoodie.',
  },

  // Paragraphs under the name: who I am and where I come from.
  background: [
    'I am pursuing my Ph.D. degree in [Mechanical Engineering](https://www.meche.engineering.cmu.edu/) at [Carnegie Mellon University](https://www.cmu.edu/), in the Computational Engineering & Robotics Lab (CERLAB) under the supervision of Professor [Kenji Shimada](https://www.meche.engineering.cmu.edu/directory/bios/shimada-kenji.html).',
    'Before my Ph.D., I received my M.S. in Mechanical Engineering from Carnegie Mellon University in 2023. Prior to that, I earned my B.E. in Mechanical Engineering with a minor in Computer Science from the [University of Pittsburgh](https://www.pitt.edu/) in 2021, through its dual-degree program with [Sichuan University](https://en.scu.edu.cn/).',
  ],
  // Delete this line (set to '') once you are no longer looking.
  seeking: 'Looking for 2027 internships in robotics, embodied AI, and autonomous driving.',

  email: { user: 'xzhan2', domain: 'andrew.cmu.edu' },
  links: {
    github: 'https://github.com/Shawn207',
    scholar: 'https://scholar.google.com/citations?user=TfJP6ZMAAAAJ&hl=en',
    linkedin: 'https://www.linkedin.com/in/zhan-xiaoyang-5569341b9/en',
  },
  cv: '/Xiaoyang_Zhan_CV.pdf',

  researchInterest:
    'How robots decide where to look and where to go: decision-making and planning for single robots and multi-robot teams, active perception, and semantic mapping, validated on a Boston Dynamics Spot and custom UAVs. Lately I am connecting these with vision-language models for embodied AI.',

  topics: [
    'Decision-making for robots and robot teams',
    'Active perception and semantic mapping',
    'Vision-language models in the loop',
  ],

  strengths: {
    lede: 'The whole robot-autonomy stack, plus the field experience to make it work on real machines: a legged robot and custom quadrotors, in machine shops, lobbies, construction-site mock-ups, and flight arenas. I also mentor a research team of up to eight.',
    layers: [
      {
        label: 'Sensing and calibration',
        text: 'LiDAR-camera fusion and calibration, panoramic and RGB-D perception, dynamic-object tracking.',
      },
      {
        label: 'Mapping and estimation',
        text: 'FAST-LIO2 and VINS, occupancy and dense semantic object mapping, Segment Anything, PyTorch, OpenCV.',
      },
      {
        label: 'Planning and decision-making',
        text: 'Viewpoint sampling, hierarchical exploration, TSP (LKH), A*, roadmaps, recovery state machines, VLM-assisted decisions.',
      },
      {
        label: 'Systems and deployment',
        text: 'ROS and multi-robot networking, PX4, Spot SDK, Jetson and NUC, Docker, Isaac Sim, Gazebo, Habitat.',
      },
    ],
  },

  education: [
    {
      when: 'In progress',
      what: 'Ph.D., Mechanical Engineering, Carnegie Mellon University',
      note: 'Robotics research in CERLAB, advised by Prof. Kenji Shimada',
    },
    { when: '2023', what: 'M.S., Mechanical Engineering, Carnegie Mellon University' },
    {
      when: '2021',
      what: 'B.E., Mechanical Engineering, minor in Computer Science, University of Pittsburgh',
      note: 'Dual-degree program with Sichuan University',
    },
  ],
};
