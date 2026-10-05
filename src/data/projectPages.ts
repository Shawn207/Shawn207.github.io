// Content of the project pages (/projects/<id>/), organised the way the papers are.
// Edit text here; the layout lives in src/pages/projects/[slug].astro.
//
// Section kinds: text, list, figure, table, videos, paper, bibtex.
// A figure with an empty `src` is not shown. To add a picture, copy it to public/media/<project>/ and set
// src (plus width, height, alt, caption). The empty figure slots below mark where pictures are still missing.
// Text can contain links written as [label](https://example.com).

import type { Link } from './projects';

export type Author = { name: string; self?: boolean; coFirst?: boolean };

export type Clip =
  | { kind: 'youtube'; id: string; title: string; caption?: string }
  | {
      kind: 'video';
      src: string;
      poster?: string;
      title: string;
      caption?: string;
      /** Show player controls. Default true. */
      controls?: boolean;
      /** Start silently on a loop, like a GIF. */
      loop?: boolean;
    };

export type Table = { caption: string; head: string[]; rows: string[][]; highlight?: number; foot?: string };

export type Figure = {
  heading?: string;
  src?: string;
  width?: number;
  height?: number;
  alt: string;
  caption: string;
};

export type Paper = {
  heading: string;
  title: string;
  authors: Author[];
  venue: string;
  links: Link[];
  abstract: string;
  contributions: string[];
  results: string[];
  table?: Table;
  figures?: Figure[];
};

export type Section =
  | { kind: 'text'; heading: string; paragraphs: string[]; note?: string }
  | { kind: 'list'; heading: string; items: string[] }
  | ({ kind: 'figure' } & Figure)
  | { kind: 'table'; heading: string; table: Table }
  | { kind: 'videos'; heading: string; clips: Clip[] }
  | ({ kind: 'paper' } & Paper)
  | { kind: 'bibtex'; entries: { id: string; label?: string; text: string }[] };

export type ProjectPage = {
  id: string;
  metaTitle: string;
  description: string;
  title: string;
  authors?: Author[];
  meta?: string[];
  links: Link[];
  hero: Clip;
  /** For structured data on single-paper pages. */
  article?: { datePublished: string; sameAs: string };
  sections: Section[];
};

const me = (coFirst = false): Author => ({ name: 'Xiaoyang Zhan', self: true, coFirst });
const CMU = 'Department of Mechanical Engineering, Carnegie Mellon University.';

/* ---------------------------------------------------------------------------------------------- */
/* POSE                                                                                            */
/* ---------------------------------------------------------------------------------------------- */

const poseTitle =
  'Pose-aware Legged Robot Semantic Exploration with Omnidirectional Perception in Confined Unknown Environments';

const poseAbstract =
  "Semantic exploration in confined environments requires both environment mapping and detailed observation of target objects. For ground robots, limited sensors vertical fields of view and restricted standoff distances can leave upper object surface unobserved from planar viewpoints. Body tilting can improve coverage, but additional observations and posture transitions increase mission time. To balance this trade-off, we present POSE, a pose-aware semantic exploration system that exploits a legged robot's intrinsic body pitch and roll with omnidirectional Camera-LiDAR perception. The proposed pose-aware viewpoint sampling module selects body postures from partial object maps according to expected coverage gain, while aim-aligned execution reduces unnecessary body reorientation. Further, we introduce an object-centric viewpoint pruning strategy assisted by a vision-language model (VLM), which uses persistent observation history and bird's-eye-view (BEV) maps to reduce redundant inspection visits. The resulting semantic viewpoints are combined with geometric exploration viewpoints in a global exploration planner. Simulations show that POSE improves final target-surface coverage by 8–10 percentage points over the planar planning baseline while reducing exploration time by 17–32%, and achieves the highest mean object coverage AUC among the evaluated baselines. Real-world experiments with a legged robot carrying an 360 degrees omnidirectional Camera-LiDAR suite in a machine shop further demonstrate the system's applicability. These results support adaptive body-posture planning for improving the coverage–efficiency trade-off in legged robot semantic exploration. We plan to release the code for community benefit in the future.";

const pose: ProjectPage = {
  id: 'pose',
  metaTitle: 'POSE: pose-aware legged robot semantic exploration',
  description:
    'POSE lets a legged robot pitch and roll its body to see the tops of tall objects in confined spaces, and uses a vision-language model to skip redundant inspection visits.',
  title: poseTitle,
  authors: [me(true), { name: 'Shiyu Chen', coFirst: true }, { name: 'Kenji Shimada' }],
  meta: [`${CMU} arXiv preprint, 2026. Submitted to ICRA 2027.`],
  links: [
    { label: 'arXiv', href: 'https://arxiv.org/abs/2609.19460' },
    { label: 'Video', href: 'https://www.youtube.com/watch?v=1NR4InKZl2I' },
    { label: 'BibTeX', href: '#bibtex' },
    { label: 'Code (planned)' },
  ],
  hero: { kind: 'youtube', id: '1NR4InKZl2I', title: 'POSE supplementary video' },
  article: { datePublished: '2026-09-16', sameAs: 'https://arxiv.org/abs/2609.19460' },
  sections: [
    {
      kind: 'text',
      heading: 'Abstract',
      paragraphs: [poseAbstract],
      note: 'Abstract reproduced from the [arXiv preprint](https://arxiv.org/abs/2609.19460).',
    },
    // Add the system-overview figure from the paper here:
    { kind: 'figure', heading: 'Overview', src: '', alt: '', caption: '' },
    {
      kind: 'list',
      heading: 'Results',
      items: [
        'Final target-surface coverage is 8–10 percentage points higher than the planar baseline, in three simulated industrial scenes: a warehouse and two factories.',
        'Exploration takes 17–32% less time than the planar baseline, and POSE has the highest mean object-coverage AUC of the methods compared.',
        'It executes 53–73% fewer body postures than the two posture-aware baselines, and uses 52–76% fewer VLM tokens than asking the VLM at every viewpoint.',
        'On a Spot in a university machine shop, one run took 209.7 s and 44.9 m, executed five tilted postures, and detected and reconstructed all five target machines.',
      ],
    },
    // Add a result figure (simulation trajectories or the machine-shop run) here:
    { kind: 'figure', heading: 'Qualitative results', src: '', alt: '', caption: '' },
    {
      kind: 'list',
      heading: 'Contributions',
      items: [
        'A pose-aware semantic viewpoint sampling module that extends planar semantic viewpoints with body pitch and roll to improve object-surface coverage and uses aim-aligned posture transitions to reduce reorientation.',
        'An object-centric VLM-assisted viewpoint pruning strategy that takes BEV maps and accumulated observations through persistent VLM sessions to reduce redundant visits.',
        'An integrated semantic exploration and mapping framework that jointly optimizes pose-aware semantic inspection and geometric exploration visits with omnidirectional Camera-LiDAR fusion and real-time semantic mapping. The system is validated in industrial simulations and real-world machine-shop experiments.',
      ],
    },
    {
      kind: 'bibtex',
      entries: [
        {
          id: 'pose',
          text: `@misc{zhan2026pose,
  title         = {${poseTitle}},
  author        = {Zhan, Xiaoyang and Chen, Shiyu and Shimada, Kenji},
  year          = {2026},
  eprint        = {2609.19460},
  archivePrefix = {arXiv},
  primaryClass  = {cs.RO}
}`,
        },
      ],
    },
  ],
};

/* ---------------------------------------------------------------------------------------------- */
/* SEDEM                                                                                           */
/* ---------------------------------------------------------------------------------------------- */

const sedemTitle =
  'Semantic Exploration and Dense Mapping of Complex Environments Using Ground Robot with Panoramic LiDAR-Camera Fusion';

const sedemAbstract =
  "This paper presents a system for autonomous semantic exploration and dense semantic target mapping of a complex unknown environment using a ground robot equipped with a panoramic LiDAR-camera system. Existing approaches often struggle to strike a balance between collecting enough high-quality observations from multiple view angles and avoiding unnecessary repetitive traversal. To fill this gap, we propose a complete system that combines mapping and planning. We first redefine the task as completing both geometric coverage and semantic viewpoint observation. Subsequently, we manage semantic and geometric viewpoints separately and propose a novel Priority-driven Decoupled Local Sampler to generate local viewpoint sets. This allows for explicit multi-view semantic inspection and voxel coverage without unnecessary repetition. Building on this, we develop a hierarchical planner that ensures efficient global coverage. In addition, we propose a Safe Aggressive Exploration State Machine, which allows the robot to extend its exploration path planning into unknown areas while ensuring the robot's safety with recovery behavior and adaptive sampling. Our system includes a modular semantic target mapping component designed to utilize odometry and point clouds from existing SLAM algorithms, enabling point-cloud-level dense semantic target mapping. We validate our approach through extensive experiments in both realistic simulations and complex real-world environments. Simulation results demonstrate that our planner achieves faster exploration and shorter travel distances while guaranteeing a specified number of multi-view inspections. Real-world experiments further confirm the effectiveness of the system in achieving accurate dense semantic object mapping of unstructured environments.";

const sedem: ProjectPage = {
  id: 'sedem',
  metaTitle: 'SEDEM: semantic exploration and dense mapping',
  description:
    'SEDEM lets a Spot with a panoramic LiDAR-camera rig explore an unknown space, view each target object from several angles, and build a dense semantic map, with one planner for geometric coverage and multi-view observation.',
  title: sedemTitle,
  authors: [
    me(),
    { name: 'Shixin Zhou' },
    { name: 'Qianqian Yang' },
    { name: 'Yixuan Zhao' },
    { name: 'Hao Liu' },
    { name: 'Srinivas Chowdary Ramineni' },
    { name: 'Kenji Shimada' },
  ],
  meta: [
    `${CMU} IEEE Robotics and Automation Letters (RA-L), vol. 10, no. 11, pp. 11196–11203, 2025. Presented at IROS 2026, Pittsburgh.`,
  ],
  links: [
    { label: 'Paper', href: 'https://ieeexplore.ieee.org/document/11159179/' },
    { label: 'arXiv', href: 'https://arxiv.org/abs/2505.22880' },
    { label: 'Code', href: 'https://github.com/Shawn207/SEDEM' },
    { label: 'Slides (PDF)', href: '/docs/SEDEM_IROS2026_slides.pdf' },
    { label: 'BibTeX', href: '#bibtex' },
  ],
  hero: { kind: 'youtube', id: '9tsnBLaSSmU', title: 'SEDEM supplementary video' },
  article: { datePublished: '2025-09-17', sameAs: 'https://arxiv.org/abs/2505.22880' },
  sections: [
    {
      kind: 'text',
      heading: 'Abstract',
      paragraphs: [sedemAbstract],
      note: 'Abstract reproduced from the [arXiv version](https://arxiv.org/abs/2505.22880) of the paper.',
    },
    {
      kind: 'figure',
      heading: 'System overview',
      src: '/media/sedem/fig-system-overview.jpg',
      width: 1800,
      height: 480,
      alt: 'System diagram. Odometry, point clouds, and panoramic images from a Spot with a LiDAR and a panoramic camera feed a semantic target mapping module. Its occupancy map, coarse object models, dense object map, and dense background map feed a priority-driven decoupled local sampler, then a global planner with a TSP solver and local A*, then a safe-aggressive exploration state machine that sends the final path back to the robot.',
      caption:
        'The system processes odometry, LiDAR, and panoramic image inputs. The mapping module builds object-centric models, occupancy, and dense maps. The planner samples viewpoints based on these maps, creates local viewpoint sets in active regions, and generates optimal paths. The Safe-Aggressive Exploration State Machine maintains aggressive graph construction while supporting recovery from pseudo-collision.',
    },
    {
      kind: 'list',
      heading: 'Contributions',
      items: [
        'A modular semantic target mapping component based on panoramic LiDAR-camera fusion, directly leveraging the outputs from existing SLAM systems without requiring integration into back-end optimization.',
        'A novel Priority-driven Decoupled Local Sampler that manages the semantic and geometric viewpoints in a decoupled manner and generates a viewpoint set for global path planning.',
        'A safe aggressive exploration state machine that supports the robot in proactively selecting viewpoints and executing local paths in unexplored areas, while maintaining safety by actively checking and recovering.',
        'Real-world tests in construction and industrial environments that reflect actual application deployment and validate the effectiveness of the complete system.',
      ],
    },
    {
      kind: 'table',
      heading: 'Simulation results',
      table: {
        caption:
          'Benchmark in three Isaac Sim environments (office with 13 chairs, warehouse with 9 forklifts, factory with 11 robot arms and forklifts), with a Husky UGV and ground-truth object detections. SE is Semantic Eight and HIRE a recent fast exploration planner, both adapted to this task; TARE is a geometric exploration planner. Means over five runs per scene.',
        head: ['Scene', 'Metric', 'SE', 'HIRE', 'TARE', 'Ours'],
        rows: [
          ['Office', 'Runtime (s)', '536.2', '613.7', '598.0', '326.1'],
          ['Office', 'Path length (m)', '370.7', '380.6', '340.6', '197.6'],
          ['Warehouse', 'Runtime (s)', '1092.0', '1287.0', '863.0', '690.5'],
          ['Warehouse', 'Path length (m)', '738.6', '1013.2', '485.1', '444.1'],
          ['Factory', 'Runtime (s)', '1110.9', '1247.1', '900.6', '840.2'],
          ['Factory', 'Path length (m)', '693.5', '858.4', '530.8', '519.5'],
        ],
        highlight: 5,
        foot: 'Ours also completed 100% of the expected semantic viewpoints in every scene, against 66.0–82.5% for TARE.',
      },
    },
    {
      kind: 'table',
      heading: 'Real-world results',
      table: {
        caption:
          'Experiments with a Boston Dynamics Spot carrying an Ouster OS-1-128 LiDAR and a Boston Dynamics CAM panoramic camera, computing on a ROG NUC with an NVIDIA RTX 4070. Average speed was 0.7 m/s in the construction site and 0.9 m/s in the lobby.',
        head: ['Scene', 'Targets', 'Time', 'Object map (completeness / mean error)', 'Background map (completeness / mean error)'],
        rows: [
          ['Mock construction site, 12 × 8 m', '5 (three window frames, a work platform, a cone)', '54 s', '87.19% / 3.11 cm', '99.19% / 2.27 cm'],
          ['Lobby, 12 × 23 m', '11 chairs of diverse types', '132 s', '97.28% / 1.75 cm', '99.33% / 2.31 cm'],
        ],
        foot: 'In the construction site, completeness counts points within 2.5 cm of the ground truth.',
      },
    },
    {
      kind: 'videos',
      heading: 'More videos',
      clips: [
        {
          kind: 'video',
          src: '/media/sedem/drone-cage-demo.mp4',
          poster: '/media/sedem/drone-cage-poster.jpg',
          title: 'Exploration demo in the drone cage',
          caption:
            'Exploration demo in our drone cage. The target is a chair; the robot passes through several narrow spaces and a corridor while the dense map grows.',
        },
        {
          kind: 'video',
          src: '/media/sedem/mock-construction-site.mp4',
          poster: '/media/sedem/mock-construction-site-poster.jpg',
          title: 'Mock construction site',
          caption: 'Mock construction site: five targets, 54 s of exploration. Shown at 3× speed.',
          loop: true,
        },
        {
          kind: 'video',
          src: '/media/sedem/lobby.mp4',
          poster: '/media/sedem/lobby-poster.jpg',
          title: 'Dense object mapping in a lobby',
          caption: 'Lobby: 11 chairs mapped with a 1.75 cm mean object-map error. Shown at 3× speed.',
          loop: true,
        },
      ],
    },
    {
      kind: 'bibtex',
      entries: [
        {
          id: 'sedem',
          text: `@article{zhan2025sedem,
  title   = {${sedemTitle}},
  author  = {Zhan, Xiaoyang and Zhou, Shixin and Yang, Qianqian and Zhao, Yixuan and Liu, Hao and Ramineni, Srinivas Chowdary and Shimada, Kenji},
  journal = {IEEE Robotics and Automation Letters},
  volume  = {10},
  number  = {11},
  pages   = {11196--11203},
  year    = {2025},
  doi     = {10.1109/LRA.2025.3609216}
}`,
        },
      ],
    },
  ],
};

/* ---------------------------------------------------------------------------------------------- */
/* Dynamic obstacle perception and mapping (RA-L 2024 and ICRA 2023)                               */
/* ---------------------------------------------------------------------------------------------- */

const dodtRalTitle =
  'Onboard Dynamic-Object Detection and Tracking for Autonomous Robot Navigation with RGB-D Camera';

const dodtRalAbstract =
  "Deploying autonomous robots in crowded indoor environments usually requires them to have accurate dynamic obstacle perception. Although plenty of previous works in the autonomous driving field have investigated the 3D object detection problem, the usage of dense point clouds from a heavy Light Detection and Ranging (LiDAR) sensor and their high computation cost for learning-based data processing make those methods not applicable to small robots, such as vision-based UAVs with small onboard computers. To address this issue, we propose a lightweight 3D dynamic obstacle detection and tracking (DODT) method based on an RGB-D camera, which is designed for low-power robots with limited computing power. Our method adopts a novel ensemble detection strategy, combining multiple computationally efficient but low-accuracy detectors to achieve real-time high-accuracy obstacle detection. Besides, we introduce a new feature-based data association and tracking method to prevent mismatches utilizing point clouds' statistical features. In addition, our system includes an optional and auxiliary learning-based module to enhance the obstacle detection range and dynamic obstacle identification. The proposed method is implemented in a small quadcopter, and the results show that our method can achieve the lowest position error (0.11m) and a comparable velocity error (0.23m/s) across the benchmarking algorithms running on the robot's onboard computer. The flight experiments prove that the tracking results from the proposed method can make the robot efficiently alter its trajectory for navigating dynamic environments. Our software is available on GitHub as an open-source ROS package.";

const dodtIcraTitle =
  'A Real-Time Dynamic Obstacle Tracking and Mapping System for UAV Navigation and Collision Avoidance with an RGB-D Camera';

const dodtIcraAbstract =
  "The real-time dynamic environment perception has become vital for autonomous robots in crowded spaces. Although the popular voxel-based mapping methods can efficiently represent 3D obstacles with arbitrarily complex shapes, they can hardly distinguish between static and dynamic obstacles, leading to the limited performance of obstacle avoidance. While plenty of sophisticated learning-based dynamic obstacle detection algorithms exist in autonomous driving, the quadcopter's limited computation resources cannot achieve real-time performance using those approaches. To address these issues, we propose a real-time dynamic obstacle tracking and mapping system for quadcopter obstacle avoidance using an RGB-D camera. The proposed system first utilizes a depth image with an occupancy voxel map to generate potential dynamic obstacle regions as proposals. With the obstacle region proposals, the Kalman filter and our continuity filter are applied to track each dynamic obstacle. Finally, the environment-aware trajectory prediction method is proposed based on the Markov chain using the states of tracked dynamic obstacles. We implemented the proposed system with our custom quadcopter and navigation planner. The simulation and physical experiments show that our methods can successfully track and represent obstacles in dynamic environments in real-time and safely avoid obstacles. Our software is available on GitHub as an open-source ROS package.";

const dodt: ProjectPage = {
  id: 'dodt',
  metaTitle: 'Dynamic obstacle perception and mapping for UAVs',
  description:
    'Lightweight RGB-D detection, tracking, mapping, and trajectory prediction of moving obstacles for small quadcopters with limited onboard compute. IEEE RA-L 2024 and ICRA 2023, both open source.',
  title: 'Dynamic obstacle perception and mapping for UAVs',
  meta: [
    `${CMU} Two papers: IEEE RA-L 2024 and ICRA 2023. Both run onboard a small quadcopter.`,
  ],
  links: [
    { label: 'Detector code', href: 'https://github.com/Shawn207/onboard_detector' },
    { label: 'Mapping code', href: 'https://github.com/Shawn207/map_manager_pub' },
    { label: 'BibTeX', href: '#bibtex' },
  ],
  hero: { kind: 'youtube', id: '9dKX3BRnxyw', title: 'Onboard dynamic-object detection and tracking video (RA-L 2024)' },
  sections: [
    {
      kind: 'text',
      heading: 'Overview',
      paragraphs: [
        'Small robots in crowded indoor spaces need to know which obstacles move, how fast, and where they are heading, but they cannot carry a heavy LiDAR or a GPU for learning-based 3D detection. This work perceives moving obstacles with a single RGB-D camera on a quadcopter with a small onboard computer.',
        'The RA-L 2024 paper covers detection and tracking. The ICRA 2023 paper covers a hybrid map that separates static and dynamic obstacles, plus trajectory prediction for collision avoidance. Both papers have co-first authors, and both are open source.',
      ],
    },
    {
      kind: 'paper',
      heading: 'RA-L 2024',
      title: dodtRalTitle,
      authors: [
        { name: 'Zhefan Xu', coFirst: true },
        me(true),
        { name: 'Yumeng Xiu' },
        { name: 'Christopher Suzuki' },
        { name: 'Kenji Shimada' },
      ],
      venue: 'IEEE Robotics and Automation Letters (RA-L), vol. 9, no. 1, pp. 651–658, Jan. 2024',
      links: [
        { label: 'Paper', href: 'https://ieeexplore.ieee.org/document/10323166' },
        { label: 'arXiv', href: 'https://arxiv.org/abs/2303.00132' },
        { label: 'Code', href: 'https://github.com/Shawn207/onboard_detector' },
        { label: 'Video', href: 'https://youtu.be/9dKX3BRnxyw' },
      ],
      abstract: dodtRalAbstract,
      contributions: [
        'Efficient ensemble detection: runs multiple computationally efficient, low-accuracy detectors and combines them with a novel ensemble strategy to get more accurate results at high speed.',
        'Feature-based association and tracking: statistical features of the point clouds reduce tracking mismatches compared with center-distance association.',
        'Auxiliary learning-based detection module: a learning-based detector is added as an optional module that extends the detection range and improves dynamic-obstacle identification when the robot has spare compute.',
      ],
      results: [
        'Lowest position error (0.11 m) and a comparable velocity error (0.23 m/s) among the benchmarked methods, all running on the robot’s onboard computer.',
        'The ensemble cuts the false-positive rate to 3.7%, against 16.4–19.6% for the other two published methods compared.',
        'The full pipeline takes 19.12 ms per frame on an Intel NUC and 40.08 ms on a Jetson Xavier NX. Without the learning-based module it runs at about 210 Hz and 60 Hz.',
        'In flight, the tracking results let the robot change its trajectory efficiently to avoid walking people.',
      ],
      table: {
        caption: 'Benchmark of detection and tracking on the UAV, with ground truth from an OptiTrack motion-capture system.',
        head: ['Method', 'Position error (m)', 'Velocity error (m/s)', 'False-positive rate'],
        rows: [
          ['Lin et al. (ICRA 2020)', '0.28', '0.47', 'n/a'],
          ['Wang et al. (IROS 2021)', '0.18', '0.29', '16.4%'],
          ['Our ICRA 2023 system', '0.19', '0.21', '19.6%'],
          ['DODT without ensemble detection', '0.17', '0.30', '18.6%'],
          ['DODT without feature-based tracking', '0.14', '0.29', '6.5%'],
          ['DODT (ours)', '0.11', '0.23', '3.7%'],
        ],
        highlight: 5,
      },
      figures: [
        // Add the framework figure and a detection-result figure from the RA-L paper here:
        { src: '', alt: '', caption: '' },
      ],
    },
    {
      kind: 'paper',
      heading: 'ICRA 2023',
      title: dodtIcraTitle,
      authors: [
        { name: 'Zhefan Xu', coFirst: true },
        me(true),
        { name: 'Baihan Chen' },
        { name: 'Yumeng Xiu' },
        { name: 'Chenhao Yang' },
        { name: 'Kenji Shimada' },
      ],
      venue: 'IEEE International Conference on Robotics and Automation (ICRA), 2023, pp. 10645–10651',
      links: [
        { label: 'arXiv', href: 'https://arxiv.org/abs/2209.08258' },
        { label: 'Code', href: 'https://github.com/Shawn207/map_manager_pub' },
        { label: 'Video', href: 'https://www.youtube.com/watch?v=u5zblVx8KRc' },
      ],
      abstract: dodtIcraAbstract,
      contributions: [
        'Region proposal detector with map refinement: a lightweight depth-image detector gives obstacle region proposals, and the static map refines the obstacles’ bounding boxes.',
        'Dynamic obstacle identification and tracking: a Kalman filter and a continuity filter identify and track dynamic obstacles, and a dynamic-region cleaning step removes their trails from the static map.',
        'Environment-aware trajectory prediction: a Markov-chain predictor takes into account the interaction between dynamic obstacles and the static environment.',
      ],
      results: [
        'The whole system takes under 40 ms per iteration (39.49 ms) and runs above 25 Hz on a Jetson Xavier NX. Running YOLO on the same computer takes 256.4 ms, too slow for real-time navigation.',
        'In physical tests the system reached 0.19 m position error and 0.21 m/s velocity error, and in simulation 0.11 m and 0.08 m/s.',
        'The environment-aware predictor fails far less often than linear prediction in all three simulated environments, and the gap widens as the environment gets more cluttered.',
        'In an indoor autonomous flight, the quadcopter detected a person walking toward it, mapped the static scene, and avoided the person.',
      ],
      table: {
        caption: 'Benchmark of detected dynamic obstacles, in simulation and in physical experiments, with ground truth from OptiTrack in the physical tests.',
        head: ['Scenario', 'Method', 'Position error (m)', 'Velocity error (m/s)'],
        rows: [
          ['Simulation', 'Lin et al. (ICRA 2020)', '0.14', '0.36'],
          ['Simulation', 'Wang et al. (IROS 2021)', '0.11', '0.19'],
          ['Simulation', 'Ours', '0.11', '0.08'],
          ['Physical', 'Lin et al. (ICRA 2020)', '0.28', '0.47'],
          ['Physical', 'Wang et al. (IROS 2021)', '0.18', '0.29'],
          ['Physical', 'Ours', '0.19', '0.21'],
        ],
        highlight: 5,
      },
      figures: [
        // Add the system-framework figure and a flight-experiment figure from the ICRA paper here:
        { src: '', alt: '', caption: '' },
      ],
    },
    {
      kind: 'videos',
      heading: 'More videos',
      clips: [
        {
          kind: 'youtube',
          id: 'u5zblVx8KRc',
          title: 'Dynamic obstacle tracking and mapping system video (ICRA 2023)',
          caption: 'ICRA 2023: tracking and mapping system, simulation and flight experiments.',
        },
      ],
    },
    {
      kind: 'text',
      heading: 'Platform',
      paragraphs: [
        'Physical experiments use custom quadcopters with a PX4-based flight controller, an Intel RealSense D435i depth camera (640 × 480, 87° × 58° field of view), and an Intel NUC or an NVIDIA Jetson Xavier NX for onboard computing. State estimation uses visual-inertial odometry.',
      ],
    },
    {
      kind: 'bibtex',
      entries: [
        {
          id: 'dodt-ral',
          label: 'RA-L 2024',
          text: `@article{xu2024onboard,
  title   = {${dodtRalTitle}},
  author  = {Xu, Zhefan and Zhan, Xiaoyang and Xiu, Yumeng and Suzuki, Christopher and Shimada, Kenji},
  journal = {IEEE Robotics and Automation Letters},
  volume  = {9},
  number  = {1},
  pages   = {651--658},
  year    = {2024},
  doi     = {10.1109/LRA.2023.3334683}
}`,
        },
        {
          id: 'dodt-icra',
          label: 'ICRA 2023',
          text: `@inproceedings{xu2023realtime,
  title     = {${dodtIcraTitle}},
  author    = {Xu, Zhefan and Zhan, Xiaoyang and Chen, Baihan and Xiu, Yumeng and Yang, Chenhao and Shimada, Kenji},
  booktitle = {2023 IEEE International Conference on Robotics and Automation (ICRA)},
  pages     = {10645--10651},
  year      = {2023}
}`,
        },
      ],
    },
  ],
};

/* ---------------------------------------------------------------------------------------------- */
/* Heterogeneous air-ground exploration                                                            */
/* ---------------------------------------------------------------------------------------------- */

const airGround: ProjectPage = {
  id: 'air-ground',
  metaTitle: 'Heterogeneous air-ground exploration',
  description:
    'A UAV and a legged robot exploring together, with spatial representation and planning matched to each robot’s sensing and mobility. Manuscript in preparation.',
  title: 'Heterogeneous air-ground exploration',
  meta: [`${CMU} Manuscript in preparation.`],
  links: [],
  hero: {
    kind: 'video',
    src: '/media/air-ground/exploration.mp4',
    poster: '/media/air-ground/poster.jpg',
    title: 'Visualization of a heterogeneous air-ground exploration run',
    caption: 'Visualization of an exploration run.',
    loop: true,
  },
  sections: [
    {
      kind: 'text',
      heading: 'Overview',
      paragraphs: [
        'This work builds a collaborative exploration framework for a UAV and a legged robot. Spatial representation and planning are matched to each robot’s own sensing and mobility profile, instead of treating the team as identical robots.',
        'A graph-based structure shares locally processed information between the robots. This reduces the bandwidth the robots need to talk to each other while keeping their maps consistent. The framework is evaluated in three real-world scenarios.',
      ],
    },
    {
      kind: 'text',
      heading: 'Status',
      paragraphs: ['The manuscript is in preparation. This page will get the full write-up, figures, and videos once the paper is public.'],
    },
  ],
};

export const projectPages: Record<string, ProjectPage> = {
  pose,
  sedem,
  dodt,
  'air-ground': airGround,
};
