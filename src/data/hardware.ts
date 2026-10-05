// The "Hardware" section on the home page: what I have worked with, and pictures of it in use.
// Each platform can have a `photo` (put the file in public/media/hardware/); it is only shown when set.

import type { Link } from './projects';

export type Platform = {
  name: string;
  kind: string;
  photo?: { src: string; width: number; height: number; alt: string };
  specs: { label: string; text: string }[];
  links?: Link[];
};

export type Visual = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Show it across the full width instead of side by side with the next one. */
  wide?: boolean;
};

export const hardwareIntro =
  'I build on real hardware: choosing and mounting sensors, calibrating them against each other, setting up onboard compute and state estimation, and keeping the whole stack running on a legged robot and on quadrotors.';

export const platforms: Platform[] = [
  {
    name: 'Boston Dynamics Spot',
    kind: 'Legged robot',
    photo: {
      src: '/media/hardware/spot.jpg',
      width: 259,
      height: 305,
      alt: 'A yellow Boston Dynamics Spot standing in a hallway with a LiDAR, a camera, and a computer stacked on its back.',
    },
    specs: [
      {
        label: 'Sensing',
        text: 'Ouster OS-1-128 LiDAR (360° × 45° field of view, 128 channels) and two Insta360 fisheye cameras for 360° imagery, held on a two-layer mount at a fixed LiDAR-camera transform.',
      },
      { label: 'Compute', text: 'NUC-class mini PC with an NVIDIA RTX 4070, carried on the robot.' },
      { label: 'Software', text: 'Spot SDK, FAST-LIO2 LiDAR-inertial odometry, ROS.' },
      { label: 'Body control', text: 'Body pitch and roll commands, used to aim the LiDAR and cameras at tall objects.' },
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
    photo: {
      src: '/media/hardware/uav.jpg',
      width: 259,
      height: 190,
      alt: 'A custom quadrotor with red propellers and protective guards, with a depth camera under the frame and a compass module on top.',
    },
    specs: [
      { label: 'Sensing', text: 'Intel RealSense depth camera and a Livox LiDAR.' },
      { label: 'Compute', text: 'NVIDIA Jetson Xavier or Orin, or an Intel NUC, running perception, mapping, and planning onboard.' },
      { label: 'Flight', text: 'PX4 flight controller with MAVROS, and VINS visual-inertial odometry for state estimation.' },
      { label: 'Used in', text: 'Dynamic-obstacle tracking and mapping, and the air-ground exploration work.' },
    ],
    links: [{ label: 'Dynamic obstacle perception', href: '/projects/dodt/' }],
  },
];

export const sensorKit: { label: string; text: string }[] = [
  { label: 'LiDAR', text: 'Ouster OS-1-128 and Livox.' },
  { label: 'Depth and RGB', text: 'Intel RealSense depth cameras.' },
  { label: 'Panoramic', text: 'Insta360 dual-fisheye cameras.' },
  { label: 'Compute', text: 'NVIDIA Jetson Xavier and Orin, Intel NUC, and an RTX 4070 mini PC.' },
  { label: 'State estimation', text: 'FAST-LIO2 (LiDAR-inertial) and VINS (visual-inertial).' },
  {
    label: 'Fusion',
    text: 'LiDAR-camera extrinsics from the CAD model of the mount, synchronized timestamps, and LiDAR points projected into the fisheye images to color the point cloud.',
  },
];

export const visuals: Visual[] = [
  {
    src: '/media/hardware/fusion-pipeline.jpg',
    width: 2000,
    height: 773,
    wide: true,
    alt: 'Left: a LiDAR and an Insta360 camera stacked on a two-layer platform. Middle: two fisheye images with the LiDAR points projected onto them, colored by distance. Right: the resulting colored 3D point cloud of a room with a person standing in it.',
    caption:
      'LiDAR-camera fusion. A two-layer platform holds the LiDAR and the Insta360 camera at a fixed transform. LiDAR points are projected into the fisheye images, and the image colors are put back onto the points to give a colored point cloud.',
  },
  {
    src: '/media/hardware/spot-pitch.jpg',
    width: 478,
    height: 411,
    alt: 'A Spot in a machine shop with its body pitched up by 30 degrees toward a tall band saw. Yellow lines mark the pitch angle and the LiDAR field of view of 45 degrees.',
    caption:
      'Body pitch as a sensing tool. A 45° LiDAR field of view misses the top of tall machines from level ground, so POSE pitches the Spot (here +30°) to look up at them.',
  },
  {
    src: '/media/sedem/fig-lobby-experiment.jpg',
    width: 1600,
    height: 973,
    alt: 'Panorama of a lobby with a Spot, a top-down map showing the robot path and green boxes around mapped chairs, and three dense point-cloud reconstructions of single chairs.',
    caption:
      'Fused sensing in use (SEDEM, lobby): the panorama, the map with the exploration path and the mapped chairs, and dense point clouds of single chairs.',
  },
];

export const hardwareLinks: Link[] = [
  { label: 'POSE', href: '/projects/pose/' },
  { label: 'SEDEM', href: '/projects/sedem/' },
  { label: 'Dynamic obstacle perception', href: '/projects/dodt/' },
];
