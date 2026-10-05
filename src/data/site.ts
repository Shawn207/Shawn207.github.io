// Everything you are likely to edit on the home page lives in the files under src/data/.
// Text fields can contain links written as [label](https://example.com).

export const site = {
  name: 'Xiaoyang Zhan',
  title: 'Xiaoyang Zhan | Robotics, Carnegie Mellon University',
  description:
    'Ph.D. student at Carnegie Mellon University (CERLAB) working on decision-making, active perception, and semantic mapping for single robots and multi-robot teams, with hands-on experience across the robot autonomy stack.',
  url: 'https://shawn207.github.io',

  role: 'Ph.D. student, Mechanical Engineering (Robotics)',
  affiliation: 'Carnegie Mellon University',

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
    'My research is about how robots decide where to look and where to go: decision-making and planning for single robots and multi-robot teams, active perception, and semantic mapping, validated on a Boston Dynamics Spot and custom UAVs. Lately I have been connecting these with vision-language models for embodied AI.',

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

  strengths: {
    lede: 'My strength is the whole robot-autonomy stack, and the field experience to make it work on real machines. I build the pieces and connect them: sensing and calibration, mapping, planning, and the execution layer that keeps a robot safe when the plan meets reality. These systems have run on a legged robot and on custom quadrotors, in machine shops, lobbies, construction-site mock-ups, and indoor flight arenas. I also mentor a research team of up to eight.',
    layers: [
      {
        label: 'Sensing and calibration',
        text: 'LiDAR-camera fusion and calibration, panoramic and RGB-D perception, real-time dynamic-object detection and tracking.',
      },
      {
        label: 'Mapping and estimation',
        text: 'FAST-LIO2 odometry, occupancy mapping, dense semantic object mapping, Kalman-filter tracking, Segment Anything, PyTorch and OpenCV.',
      },
      {
        label: 'Planning and decision-making',
        text: 'Viewpoint sampling, hierarchical exploration planning, TSP solvers (LKH), A*/Dijkstra, probabilistic roadmaps, safe execution and recovery state machines, and VLM-assisted decisions.',
      },
      {
        label: 'Systems and deployment',
        text: 'ROS, including multi-robot networking, MAVROS and PX4, Spot SDK, Jetson and NUC onboard computers, Docker, Linux, with Isaac Sim, Isaac Lab, Gazebo, and Habitat for simulation.',
      },
    ],
  },

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
