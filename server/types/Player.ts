import { IVector3 } from './Vector3';


export interface PlayerBufferElement {
  source: string;
  name: string;
}

export interface IWeaponOptions {
  isHidden: boolean;
  bForceInHand: boolean;
}

export interface IPedProperties {
  clothes: IPedClothes[];
  headBlendData: Partial<IPedHeadBlendData>;
  faceFeatures: IPedFaceFeature[];
}
export interface IPedFaceFeature {
  index: ePedFaceFeature;
  scale: number;
}
export interface IWeapon {
  hashNumber: number;
  ammo: number;
  options?: IWeaponOptions;
}
export interface IClothes {
  componentId: number;
  drawableId: number;
  textureId: number;
  paletteId: number;
}
export interface IProps extends Omit<IClothes,'paletteId'> {
  attach:boolean
}
export interface IPlayerCurrentState {
  model?: string;
  coords?: IVector3;
  weapons: Map<number, { hashNumber: number; ammo: number; options?: IWeaponOptions }>;
  clothes: Map<number, IPedClothes>;
  headBlendData: Partial<IPedHeadBlendData>;
  faceFeatures: Map<number, IPedFaceFeature>;
  props:Map<number,IProps>
}
export interface IPlayerPendingState {
  model?: string;
  coords?: IVector3;
  removableWeapons: Set<number>;
  removableAllWeapons: boolean;
  removedClothesComponentId: number;
  weapons: Map<number, IWeapon>;
  clothes: Map<number, IClothes>;
  headBlendData: IPedHeadBlendData;
  faceFeatures: Map<number, IPedFaceFeature>;
}

export enum ePedVarComp {
  HEAD = 0, // "HEAD"
  BEAR = 1, // "BEARD"
  HAIR = 2, // "HAIR"
  UPPER = 3, // "UPPER"
  LOWER = 4, // "LOWER"
  HAND = 5, // "HAND"
  FEET = 6, // "FEET"
  TEETH = 7, // "TEETH"
  ACCESSIRIES = 8, // "ACCESSORIES"
  TASK = 9, // "TASK"
  DECL = 10, // "DECL"
  JBIB = 11, // "JBIB"
}
export enum ePedFaceFeature {
  NoseWidth = 0,
  NosePeak = 1,
  NoseLength = 2,
  NoseBoneCurveness = 3,
  NoseTip = 4,
  NoseBoneTwist = 5,
  EyebrowUp = 6,
  EyebrowIn = 7,
  CheekBonesUp = 8,
  CheekSidewaysBoneSize = 9,
  CheekBonesWidth = 10,
  EyeOpening = 11,
  LipThickness = 12,
  JawBoneWidth = 13,
  JawBoneShape = 14,
  ChinBone = 15,
  ChinBoneLength = 16,
  ChinBoneShape = 17,
  ChinHole = 18,
  NeckThickness = 19,
}
export interface IPedClothes {
  componentId: number;
  drawableId: number;
  textureId: number;
  paletteId: number;
}

export interface IPedHeadBlendData {
  shapeFirstID: number;
  shapeSecondID: number;
  skinFirstID: number;
  skinSecondID: number;
  shapeMix: number;
  skinMix: number;
}

export interface WeaponSync {
  hashNumber: number;
  ammo: number;
  options?: IWeaponOptions;
}
