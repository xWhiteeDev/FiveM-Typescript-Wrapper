export interface IWeaponOptions {
  isHidden: boolean;
  bForceInHand: boolean;
}

export enum ePedVarComp
{
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
    MAX = 12,
};