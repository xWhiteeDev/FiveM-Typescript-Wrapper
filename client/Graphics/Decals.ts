import type { Vehicle } from '../Entities/Vehicle';
import type { IVector3 } from '../typings/Vector3';

export class Decal {
  constructor(private _handle: number) {}

  static addDecal(
    decalType: number,
    pos: IVector3,
    dir: IVector3,
    side: IVector3,
    width: number,
    height: number,
    rCoef: number,
    gCoef: number,
    bCoef: number,
    opacity: number,
    timeout: number,
    isLongRange: boolean,
    isDynamic: boolean,
    useComplexColn: boolean,
  ): Decal {
    const handle = AddDecal(
      decalType,
      pos.x,
      pos.y,
      pos.z,
      dir.x,
      dir.y,
      dir.z,
      side.x,
      side.y,
      side.z,
      width,
      height,
      rCoef,
      gCoef,
      bCoef,
      opacity,
      timeout,
      isLongRange,
      isDynamic,
      useComplexColn,
    );
    return new Decal(handle);
  }

  static addOilDecal(coords: IVector3, groundLvl: number, width: number, transparency: number): Decal {
    const handle = AddOilDecal(coords.x, coords.y, coords.z, groundLvl, width, transparency);
    return new Decal(handle);
  }

  static addPetrolDecal(coords: IVector3, groundLvl: number, width: number, transparency: number): Decal {
    const handle = AddPetrolDecal(coords.x, coords.y, coords.z, groundLvl, width, transparency);
    return new Decal(handle);
  }

  static addPetrolTrailDecalInfo(coords: IVector3, p3: number): void {
    AddPetrolTrailDecalInfo(coords.x, coords.y, coords.z, p3);
  }

  static endPetrolTrailDecals(): void {
    EndPetrolTrailDecals();
  }

  static fadeDecalsInRange(coords: IVector3, radius: number, duration: number): void {
    FadeDecalsInRange(coords.x, coords.y, coords.z, radius, duration);
  }

  get decalWashLevel(): number {
    return GetDecalWashLevel(this._handle);
  }

  static getIsPetrolDecalInRange(coords: IVector3, radius: number): boolean {
    return GetIsPetrolDecalInRange(coords.x, coords.y, coords.z, radius);
  }

  get isDecalAlive(): boolean {
    return IsDecalAlive(this._handle);
  }

  static moveVehicleDecals(p0: any, p1: any): void {
    MoveVehicleDecals(p0, p1);
  }

  static patchDecalDiffuseMap(decalType: number, textureDict: string, textureName: string): void {
    PatchDecalDiffuseMap(decalType, textureDict, textureName);
  }

  removeDecal(): void {
    RemoveDecal(this._handle);
  }

  static removeDecalsFromObject(objectHandle: number): void {
    RemoveDecalsFromObject(objectHandle);
  }

  static removeDecalsFromObjectFacing(objectHandle: number, coords: IVector3): void {
    RemoveDecalsFromObjectFacing(objectHandle, coords.x, coords.y, coords.z);
  }

  static removeDecalsFromVehicle(vehicle: Vehicle): void {
    RemoveDecalsFromVehicle(vehicle.handle);
  }

  static removeDecalsInRange(coords: IVector3, range: number): void {
    RemoveDecalsInRange(coords.x, coords.y, coords.z, range);
  }

  static setDisableDecalRenderingThisFrame(): void {
    SetDisableDecalRenderingThisFrame();
  }

  static setDisablePetrolDecalsIgnitingThisFrame(): void {
    SetDisablePetrolDecalsIgnitingThisFrame();
  }

  static startPetrolTrailDecals(p0: number): void {
    StartPetrolTrailDecals(p0);
  }

  static unpatchDecalDiffuseMap(decalType: number): void {
    UnpatchDecalDiffuseMap(decalType);
  }

  static washDecalsFromVehicle(vehicle: Vehicle, intensity: number): void {
    WashDecalsFromVehicle(vehicle.handle, intensity);
  }

  static washDecalsInRange(coords:IVector3, range: number, p4: number): void {
    WashDecalsInRange(coords.x, coords.y, coords.z, range, p4);
  }
}
