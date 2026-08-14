import type { IVector3 } from '../typings/Vector3';
import { Utils } from '../Utils/Utils';

export class WorldObject {
  private static world_objects = new Map<number,WorldObject>()
  private constructor(private _handle: number) {
    WorldObject.world_objects.set(_handle,this)
  }
  static async create(model: string, coords: IVector3, isNetwork: boolean, netMissionEntity: boolean, doorFlag: boolean) {
    const hashKey = GetHashKey(model);
    if (!hashKey) {
      console.error('[Object]: Model not exist!');
      return;
    }
    RequestModel(hashKey);
    await Utils.waitUntil(() => HasModelLoaded(hashKey), {
      waitInterval: 100,
      maxAttempts: 100,
      onTick: () => RequestModel(hashKey),
    });
    if (!HasModelLoaded(hashKey)) {
      console.error('[Object]: Model not loaded!');
      return;
    }
    const handle = CreateObject(hashKey, coords.x, coords.y, coords.z, isNetwork, netMissionEntity, doorFlag);
    return new this(handle);
  }
  static async createWithNoOffset(
    model: string,
    coords: IVector3,
    isNetwork: boolean,
    netMissionEntity: boolean,
    doorFlag: boolean,
  ) {
    const hashKey = GetHashKey(model);
    if (!hashKey) {
      console.error('[Object]: Model not exist!');
      return;
    }
    RequestModel(hashKey);
    await Utils.waitUntil(() => HasModelLoaded(hashKey), {
      waitInterval: 100,
      maxAttempts: 100,
      onTick: () => RequestModel(hashKey),
    });
    if (!HasModelLoaded(hashKey)) {
      console.error('[Object]: Model not loaded!');
      return;
    }
    RequestCollisionAtCoord(coords.x, coords.y, coords.z);
    const handle = CreateObject(hashKey, coords.x, coords.y, coords.z, isNetwork, netMissionEntity, doorFlag);
    FreezeEntityPosition(handle, true);
    await Utils.waitUntil(() => HasCollisionLoadedAroundEntity(handle), {
      waitInterval: 100,
      maxAttempts: 100,
      onTick: () => RequestCollisionAtCoord(coords.x, coords.y, coords.z),
    });
    return new this(handle);
  }
  delete() {
    DeleteObject(this._handle);
    const isObjectDeleted = IsEntityAMissionEntity(this._handle)
    if (isObjectDeleted) {
      WorldObject.world_objects.delete(this.handle)
    }
    return isObjectDeleted
  }
  static get (handle:number) {
    WorldObject.world_objects.get(handle)
  }

  static doesObjectExistAtCoord(coords: IVector3, inRange: number, hashOrName: number | string, p5:boolean) {
    const hashKey = typeof hashOrName === 'string' ? GetHashKey(hashOrName) : hashOrName;
    return DoesObjectOfTypeExistAtCoords(coords.x,coords.y,coords.z,inRange,hashKey,false);
  }
  static doesPickupObjectExist(objectHandle:number) {
    return DoesPickupObjectExist(objectHandle);
  }
  static doesPickupExist(objectHandle:number) {
    return DoesPickupExist(objectHandle)
  }
  static fromHandle(handle: number): WorldObject | null {
    if (!DoesEntityExist(handle)) return null;
    return new this(handle);
  }

  static doorControl(
    modelHash: number,
    coords: IVector3,
    locked: boolean,
    xRotMult: number,
    yRotMult: number,
    zRotMult: number,
  ): void {
    DoorControl(modelHash, coords.x, coords.y, coords.z, locked, xRotMult, yRotMult, zRotMult);
  }

  static getClosestOfType(
    coords: IVector3,
    radius: number,
    modelHash: number,
    isMission: boolean,
    p6: boolean = false,
    p7: boolean = false,
  ): WorldObject | null {
    const handle = GetClosestObjectOfType(
      coords.x,
      coords.y,
      coords.z,
      radius,
      modelHash,
      isMission,
      p6,
      p7,
    );
    if (!DoesEntityExist(handle)) return null;
    return new this(handle);
  }

  static getCoordsAndRotationOfClosestOfType(
    coords: IVector3,
    radius: number,
    modelHash: number,
    rotationOrder: number,
  ): [IVector3, IVector3] {
    const [retval, outPosition, outRotation] = GetCoordsAndRotationOfClosestObjectOfType(
      coords.x,
      coords.y,
      coords.z,
      radius,
      modelHash,
      rotationOrder,
    );
    return [
      { x: outPosition[0], y: outPosition[1], z: outPosition[2] },
      { x: outRotation[0], y: outRotation[1], z: outRotation[2] },
    ];
  }

  static getOffsetFromCoordAndHeadingInWorldCoords(
    pos: IVector3,
    heading: number,
    offset: IVector3,
  ): IVector3 {
    const [x, y, z] = GetOffsetFromCoordAndHeadingInWorldCoords(
      pos.x,
      pos.y,
      pos.z,
      heading,
      offset.x,
      offset.y,
      offset.z,
    );
    return { x, y, z };
  }

  static getPickup(pickupHandle: number): WorldObject | null {
    const handle = GetPickupObject(pickupHandle);
    if (!DoesEntityExist(handle)) return null;
    return new this(handle);
  }

  static getRayfireMap(coords: IVector3, radius: number, name: string): number {
    return GetRayfireMapObject(coords.x, coords.y, coords.z, radius, name);
  }

  static hasClosestOfTypeBeenBroken(
    p0: number,
    p1: number,
    p2: number,
    p3: number,
    modelHash: number,
    p5: any,
  ): boolean {
    return HasClosestObjectOfTypeBeenBroken(p0, p1, p2, p3, modelHash, p5);
  }

  static hasClosestOfTypeBeenCompletelyDestroyed(
    coords: IVector3,
    radius: number,
    modelHash: number,
    p5: boolean,
  ): boolean {
    return HasClosestObjectOfTypeBeenCompletelyDestroyed(
      coords.x,
      coords.y,
      coords.z,
      radius,
      modelHash,
      p5,
    );
  }

  static isAnyNearPoint(coords: IVector3, range: number, p4: boolean): boolean {
    return IsAnyObjectNearPoint(coords.x, coords.y, coords.z, range, p4);
  }

  static isDoorRegisteredWithSystem(doorHash: number): boolean {
    return IsDoorRegisteredWithSystem(doorHash);
  }

  static isEntirelyInsideGarage(
    garageHash: number,
    entityHandle: number,
    p2: number,
    p3: number,
  ): boolean {
    return IsObjectEntirelyInsideGarage(garageHash, entityHandle, p2, p3);
  }

  static isNearPoint(objectHash: number, coords: IVector3, range: number): boolean {
    return IsObjectNearPoint(objectHash, coords.x, coords.y, coords.z, range);
  }

  static isPartiallyInsideGarage(garageHash: number, entityHandle: number, p2: number): boolean {
    return IsObjectPartiallyInsideGarage(garageHash, entityHandle, p2);
  }

  static setForceThisFrame(coords: IVector3, p3: number): void {
    SetForceObjectThisFrame(coords.x, coords.y, coords.z, p3);
  }

  static setTextureVariationOfClosestOfType(
    coords: IVector3,
    radius: number,
    modelHash: number,
    textureVariation: number,
  ): boolean {
    return SetTextureVariationOfClosestObjectOfType(
      coords.x,
      coords.y,
      coords.z,
      radius,
      modelHash,
      textureVariation,
    );
  }

  static toggleUsePickupsForPlayer(player: number, pickupHash: number, toggle: boolean): void {
    ToggleUsePickupsForPlayer(player, pickupHash, toggle);
  }


  get handle(): number {
    return this._handle;
  }


  doesRayfireMapExist(): boolean {
    return DoesRayfireMapObjectExist(this._handle);
  }

  fixFragment(): void {
    FixObjectFragment(this._handle);
  }

  getFragmentDamageHealth(p1: boolean): number {
    return GetObjectFragmentDamageHealth(this._handle, p1);
  }

  getTextureVariation(): number {
    return GetObjectTextureVariation(this._handle);
  }

  getRayfireMapAnimPhase(): number {
    return GetRayfireMapObjectAnimPhase(this._handle);
  }

  getStateOfRayfireMap(): number {
    return GetStateOfRayfireMapObject(this._handle);
  }

  hasBeenBroken(): boolean {
    return HasObjectBeenBroken(this._handle);
  }

  isAPickup(): boolean {
    return IsObjectAPickup(this._handle);
  }

  isAPortablePickup(): boolean {
    return IsObjectAPortablePickup(this._handle);
  }

  isVisible(): boolean {
    return IsObjectVisible(this._handle);
  }

  isPickupWeaponValid(): boolean {
    return IsPickupWeaponObjectValid(this._handle);
  }

  markForDeletion(): void {
    MarkObjectForDeletion(this._handle);
  }

  placeOnGroundOrProperly(): boolean {
    return PlaceObjectOnGroundOrObjectProperly(this._handle);
  }

  placeOnGroundProperly(): boolean {
    return PlaceObjectOnGroundProperly(this._handle);
  }

  removeHighDetailModel(): void {
    RemoveObjectHighDetailModel(this._handle);
  }

  setActivatePhysicsAsSoonAsItIsUnfrozen(toggle: boolean): void {
    SetActivateObjectPhysicsAsSoonAsItIsUnfrozen(this._handle, toggle);
  }

  setAllowLowLodBuoyancy(toggle: boolean): void {
    SetObjectAllowLowLodBuoyancy(this._handle, toggle);
  }

  setCreateWeaponLightSource(toggle: boolean): void {
    SetCreateWeaponObjectLightSource(this._handle, toggle);
  }

  setForceVehiclesToAvoid(toggle: boolean): void {
    SetObjectForceVehiclesToAvoid(this._handle, toggle);
  }

  setLightColor(p1: boolean, r: number, g: number, b: number): void {
    SetObjectLightColor(this._handle, p1, r, g, b);
  }

  setPhysicsParams(
    mass: number,
    gravityFactor: number,
    linearC: number,
    linearV: number,
    linearV2: number,
    angularC: number,
    angularV: number,
    angularV2: number,
    p9: number,
    maxAngSpeed: number,
    buoyancyFactor: number,
  ): void {
    SetObjectPhysicsParams(
      this._handle,
      mass,
      gravityFactor,
      linearC,
      linearV,
      linearV2,
      angularC,
      angularV,
      angularV2,
      p9,
      maxAngSpeed,
      buoyancyFactor,
    );
  }

  setStuntPropDuration(duration: number): void {
    SetObjectStuntPropDuration(this._handle, duration);
  }

  setStuntPropSpeedup(intensity: number): void {
    SetObjectStuntPropSpeedup(this._handle, intensity);
  }

  setTargettable(targettable: boolean): void {
    SetObjectTargettable(this._handle, targettable);
  }

  setTargettableByPlayer(setFlag34: boolean, setFlag35: boolean): void {
    SetObjectTargettableByPlayer(this._handle, setFlag34, setFlag35);
  }

  setTextureVariation(textureVariation: number): void {
    SetObjectTextureVariation(this._handle, textureVariation);
  }

  setStateOfRayfireMap(state: number): void {
    SetStateOfRayfireMapObject(this._handle, state);
  }

  setTeamPickup(p1: any, p2: boolean): void {
    SetTeamPickupObject(this._handle, p1, p2);
  }

  slide(
    to: IVector3,
    speed: IVector3,
    collision: boolean,
  ): boolean {
    return SlideObject(
      this._handle,
      to.x,
      to.y,
      to.z,
      speed.x,
      speed.y,
      speed.z,
      collision,
    );
  }

  trackVisibility(): void {
    TrackObjectVisibility(this._handle);
  }
}

