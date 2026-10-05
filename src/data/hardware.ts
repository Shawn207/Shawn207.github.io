// The "Hardware" section on the home page. Specs come from the papers and CV.
// Each platform can have a `photo` (put the file in public/media/hardware/); it is only shown when set.

import type { Link } from './projects';

export type Platform = {
  name: string;
  kind: string;
  photo?: { src: string; width: number; height: number; alt: string };
  specs: { label: string; text: string }[];
  links?: Link[];
};

export const platforms: Platform[] = [
  {
    name: 'Boston Dynamics Spot',
    kind: 'Legged robot',
    photo: {
      src: '/media/hardware/spot-rig.jpg',
      width: 248,
      height: 304,
      alt: 'A Boston Dynamics Spot with labels pointing to its onboard computer, 360-degree LiDAR, and panoramic camera.',
    },
    specs: [
      {
        label: 'Sensing',
        text: 'Ouster OS-1-128 LiDAR (360° × 45° field of view, 128 channels, 10 Hz) and the Boston Dynamics CAM payload, five Sony IMX290 cameras giving a 360° × 165° panorama.',
      },
      { label: 'Compute', text: 'ROG NUC mini PC with an NVIDIA RTX 4070, carried on the robot.' },
      { label: 'Software', text: 'Spot SDK, FAST-LIO2 odometry, ROS.' },
      { label: 'Used in', text: 'SEDEM, POSE, and the air-ground exploration work.' },
    ],
    links: [
      { label: 'SEDEM', href: '/projects/sedem/' },
      { label: 'POSE', href: '/projects/pose/' },
    ],
  },
  {
    name: 'Custom UAVs',
    kind: 'Aerial robots',
    specs: [
      { label: 'Sensing', text: 'Intel RealSense D435i depth camera (640 × 480, 87° × 58° field of view).' },
      { label: 'Compute', text: 'NVIDIA Jetson Xavier NX or Intel NUC, running perception, mapping, and planning onboard.' },
      { label: 'Flight', text: 'PX4 flight controller with MAVROS, and visual-inertial odometry for state estimation.' },
      { label: 'Used in', text: 'Dynamic-obstacle tracking and mapping, and the air-ground exploration work.' },
    ],
    links: [{ label: 'Dynamic obstacle perception', href: '/projects/dodt/' }],
  },
];

export const sensorKit: { label: string; text: string }[] = [
  { label: 'LiDAR', text: 'Ouster OS-1-128 and Livox sensors.' },
  { label: 'Depth and RGB', text: 'Intel RealSense depth cameras.' },
  { label: 'Panoramic', text: 'Boston Dynamics 360° camera payload and fisheye cameras.' },
  { label: 'Compute', text: 'NVIDIA Jetson (Xavier NX), Intel NUC, and an RTX 4070 mini PC.' },
  {
    label: 'Fusion',
    text: 'LiDAR-camera extrinsics taken from the CAD model of the Spot camera and LiDAR mount, hardware timestamps synchronized with ROS approximate-time matching, and panoramic pixels projected onto LiDAR points.',
  },
];

export const fusionResult = {
  figure: {
    src: '/media/sedem/fig-lobby-experiment.jpg',
    width: 1600,
    height: 973,
    alt: 'Panorama of a lobby with a Spot, a top-down map showing the robot path and green boxes around eleven mapped chairs, and three dense point-cloud reconstructions of single chairs.',
  },
  caption:
    'Sensor fusion in use (SEDEM, lobby experiment): (a) the lobby with the robot, (b) background map, dense object maps, and the exploration path, with green boxes around the mapped chairs, (c–e) dense maps of single chairs built by projecting panoramic images onto LiDAR points.',
  stats: [
    { value: '1.75 cm', label: 'mean object-map error' },
    { value: '11', label: 'chairs mapped' },
    { value: '97.3%', label: 'object-map completeness' },
  ],
  link: { label: 'More on the SEDEM page', href: '/projects/sedem/' },
};
