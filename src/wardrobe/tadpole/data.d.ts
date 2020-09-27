import Tadpole from './tadpole';

export interface ModelType {
  tadpoles: {[key: string]: Tadpole};
  userTadpole: Tadpole;
  camera: Camera;
  waterParticles: any;
  arrows: {[key: string]: any}
};

export interface MouseType {
  x: number;
  y: number;
  worldx: number;
  worldy: number;
  tadpole: Tadpole | null;
  clicking: boolean;
}

export interface BoundType {
  x: number;
  y: number;
}

export type BoundsType = [BoundType, BoundType];

export interface JointType {
  x: number;
  y: number;
  angle: number;
}