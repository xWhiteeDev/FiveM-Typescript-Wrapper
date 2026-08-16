import type { IVector3 } from '../typings/Vector3';
import { Utils } from '../Utils/Utils';
import { Ped } from '../Entities/Ped';

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

  static addDoorToSystem(doorHash: number, modelHash: number, x: number, y: number, z: number, p5: boolean, scriptDoor: boolean, isLocal: boolean): void {
    AddDoorToSystem(doorHash, modelHash, x, y, z, p5, scriptDoor, isLocal);
  }

  static areEntitiesEntirelyInsideGarage(garageHash: number, p1: boolean, p2: boolean, p3: boolean, p4: any): boolean {
    return AreEntitiesEntirelyInsideGarage(garageHash, p1, p2, p3, p4);
  }

  attachPortablePickupToPed(ped: Ped): void {
    AttachPortablePickupToPed(this._handle, ped.handle);
  }

  breakObjectFragmentChild(p1: any, p2: boolean): void {
    BreakObjectFragmentChild(this._handle, p1, p2);
  }

  static clearGarageArea(garageHash: number, isNetwork: boolean): void {
    ClearGarageArea(garageHash, isNetwork);
  }

  static clearObjectsInsideGarage(garageHash: number, vehicles: boolean, peds: boolean, objects: boolean, isNetwork: boolean): void {
    ClearObjectsInsideGarage(garageHash, vehicles, peds, objects, isNetwork);
  }

  static createAmbientPickup(pickupHash: number, posX: number, posY: number, posZ: number, flags: number, value: number, modelHash: number, returnHandle: boolean, p8: boolean): number {
    return CreateAmbientPickup(pickupHash, posX, posY, posZ, flags, value, modelHash, returnHandle, p8);
  }

  static createMoneyPickups(x: number, y: number, z: number, value: number, amount: number, model: number): void {
    CreateMoneyPickups(x, y, z, value, amount, model);
  }

  static createNonNetworkedAmbientPickup(pickupHash: any, posX: number, posY: number, posZ: number, flags: number, value: number, modelHash: any, p7: boolean, p8: boolean): any {
    return CreateNonNetworkedAmbientPickup(pickupHash, posX, posY, posZ, flags, value, modelHash, p7, p8);
  }

  static createNonNetworkedPortablePickup(pickupHash: number, x: number, y: number, z: number, placeOnGround: boolean, modelHash: number): WorldObject | null {
    const handle = CreateNonNetworkedPortablePickup(pickupHash, x, y, z, placeOnGround, modelHash);
    return WorldObject.fromHandle(handle);
  }

  static createObjectNoOffset(modelHash: number, x: number, y: number, z: number, isNetwork: boolean, netMissionEntity: boolean, doorFlag: boolean): WorldObject | null {
    const handle = CreateObjectNoOffset(modelHash, x, y, z, isNetwork, netMissionEntity, doorFlag);
    return WorldObject.fromHandle(handle);
  }

  static createPickup(pickupHash: number, posX: number, posY: number, posZ: number, p4: number, value: number, p6: boolean, modelHash: number): number {
    return CreatePickup(pickupHash, posX, posY, posZ, p4, value, p6, modelHash);
  }

  static createPickupRotate(pickupHash: number, posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, flag: number, amount: number, p9: any, p10: boolean, modelHash: number): number {
    return CreatePickupRotate(pickupHash, posX, posY, posZ, rotX, rotY, rotZ, flag, amount, p9, p10, modelHash);
  }

  static createPortablePickup(pickupHash: number, x: number, y: number, z: number, placeOnGround: boolean, modelHash: number): WorldObject | null {
    const handle = CreatePortablePickup(pickupHash, x, y, z, placeOnGround, modelHash);
    return WorldObject.fromHandle(handle);
  }

  detachPortablePickupFromPed(): void {
    DetachPortablePickupFromPed(this._handle);
  }

  static doesPickupOfTypeExistInArea(pickupHash: number, x: number, y: number, z: number, radius: number): boolean {
    return DoesPickupOfTypeExistInArea(pickupHash, x, y, z, radius);
  }

  static doorSystemFindExistingDoor(x: number, y: number, z: number, modelHash: number): [boolean, any] {
    return DoorSystemFindExistingDoor(x, y, z, modelHash);
  }

  static doorSystemGetAutomaticDistance(doorHash: number): number {
    return DoorSystemGetAutomaticDistance(doorHash);
  }

  static doorSystemGetDoorPendingState(doorHash: number): number {
    return DoorSystemGetDoorPendingState(doorHash);
  }

  static doorSystemGetDoorState(doorHash: number): number {
    return DoorSystemGetDoorState(doorHash);
  }

  static doorSystemGetIsPhysicsLoaded(doorHash: number): boolean {
    return DoorSystemGetIsPhysicsLoaded(doorHash);
  }

  static doorSystemGetOpenRatio(doorHash: number): number {
    return DoorSystemGetOpenRatio(doorHash);
  }

  static doorSystemSetAutomaticDistance(doorHash: number, distance: number, requestDoor: boolean, forceUpdate: boolean): void {
    DoorSystemSetAutomaticDistance(doorHash, distance, requestDoor, forceUpdate);
  }

  static doorSystemSetAutomaticRate(doorHash: number, rate: number, requestDoor: boolean, forceUpdate: boolean): void {
    DoorSystemSetAutomaticRate(doorHash, rate, requestDoor, forceUpdate);
  }

  static doorSystemSetDoorState(doorHash: number, state: number, requestDoor: boolean, forceUpdate: boolean): void {
    DoorSystemSetDoorState(doorHash, state, requestDoor, forceUpdate);
  }

  static doorSystemSetHoldOpen(doorHash: number, toggle: boolean): void {
    DoorSystemSetHoldOpen(doorHash, toggle);
  }

  static doorSystemSetOpenRatio(doorHash: number, ajar: number, requestDoor: boolean, forceUpdate: boolean): void {
    DoorSystemSetOpenRatio(doorHash, ajar, requestDoor, forceUpdate);
  }

  static doorSystemSetSpringRemoved(doorHash: number, removed: boolean, requestDoor: boolean, forceUpdate: boolean): void {
    DoorSystemSetSpringRemoved(doorHash, removed, requestDoor, forceUpdate);
  }

  static enableSavingInGarage(garageHash: number, toggle: boolean): void {
    EnableSavingInGarage(garageHash, toggle);
  }

  static forcePickupRegenerate(p0: any): void {
    ForcePickupRegenerate(p0);
  }

  getIsArenaPropPhysicsDisabled(p1: any): boolean {
    return GetIsArenaPropPhysicsDisabled(this._handle, p1);
  }

  static getPickupCoords(pickup: number): IVector3 {
    const [x, y, z] = GetPickupCoords(pickup);
    return { x, y, z };
  }

  static get pickupGenerationRangeMultiplier(): number {
    return GetPickupGenerationRangeMultiplier();
  }

  static getPickupHash(pickupHash: number): number {
    return GetPickupHash(pickupHash);
  }

  static getPickupHashFromWeapon(weapon: number): number {
    return GetPickupHashFromWeapon(weapon);
  }

  static getSafePickupCoords(x: number, y: number, z: number, p3: number, p4: number): IVector3 {
    const [x1, y1, z1] = GetSafePickupCoords(x, y, z, p3, p4);
    return { x:x1, y:y1, z:z1 };
  }

  static getStateOfClosestDoorOfType(type: number, x: number, y: number, z: number): [any, any] {
    return GetStateOfClosestDoorOfType(type, x, y, z);
  }

  static getWeaponTypeFromPickupType(pickupHash: number): number {
    return GetWeaponTypeFromPickupType(pickupHash);
  }

  static hasPickupBeenCollected(pickup: number): boolean {
    return HasPickupBeenCollected(pickup);
  }

  static hidePortablePickupWhenDetached(pickup: number, toggle: boolean): void {
    HidePortablePickupWhenDetached(pickup, toggle);
  }

  static isAnyEntityEntirelyInsideGarage(garageHash: number, p1: boolean, p2: boolean, p3: boolean, p4: any): boolean {
    return IsAnyEntityEntirelyInsideGarage(garageHash, p1, p2, p3, p4);
  }

  static isDoorClosed(doorHash: number): boolean {
    return IsDoorClosed(doorHash);
  }

  static isGarageEmpty(garageHash: number, p1: boolean, p2: number): boolean {
    return IsGarageEmpty(garageHash, p1, p2);
  }

  static isPlayerEntirelyInsideGarage(garageHash: number, player: number, p2: number, p3: number): boolean {
    return IsPlayerEntirelyInsideGarage(garageHash, player, p2, p3);
  }

  static isPlayerPartiallyInsideGarage(garageHash: number, player: number, p2: number): boolean {
    return IsPlayerPartiallyInsideGarage(garageHash, player, p2);
  }

  static isPointInAngledArea(xPos: number, yPos: number, zPos: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, width: number, p10: boolean, includez: boolean): boolean {
    return IsPointInAngledArea(xPos, yPos, zPos, x1, y1, z1, x2, y2, z2, width, p10, includez);
  }

  preventCollectionOfPortablePickup(p1: boolean, p2: boolean): void {
    PreventCollectionOfPortablePickup(this._handle, p1, p2);
  }

  static removeAllPickupsOfType(pickupHash: number): void {
    RemoveAllPickupsOfType(pickupHash);
  }

  static removeDoorFromSystem(doorHash: number): void {
    RemoveDoorFromSystem(doorHash);
  }

  static removePickup(pickup: number): void {
    RemovePickup(pickup);
  }

  static renderFakePickupGlow(x: number, y: number, z: number, colorIndex: number): void {
    RenderFakePickupGlow(x, y, z, colorIndex);
  }

  setEnableArenaPropPhysics(toggle: boolean, p2: number): void {
    SetEnableArenaPropPhysics(this._handle, toggle, p2);
  }

  setEnableArenaPropPhysicsOnPed(toggle: boolean, p2: number, ped: Ped): void {
    SetEnableArenaPropPhysicsOnPed(this._handle, toggle, p2, ped.handle);
  }

  static setLocalPlayerCanCollectPortablePickups(p0: boolean): void {
    SetLocalPlayerCanCollectPortablePickups(p0);
  }

  static setLocalPlayerCanUsePickupsWithThisModel(modelHash: number, toggle: boolean): void {
    SetLocalPlayerCanUsePickupsWithThisModel(modelHash, toggle);
  }

  static setMaxNumPortablePickupsCarriedByPlayer(modelHash: number, p1: number): void {
    SetMaxNumPortablePickupsCarriedByPlayer(modelHash, p1);
  }

  static setPickupGenerationRangeMultiplier(multiplier: number): void {
    SetPickupGenerationRangeMultiplier(multiplier);
  }

  static setPickupHiddenWhenUncollectable(p0: any, p1: any): void {
    SetPickupHiddenWhenUncollectable(p0, p1);
  }

  static setPickupRegenerationTime(pickup: number, duration: number): void {
    SetPickupRegenerationTime(pickup, duration);
  }

  static setPickupUncollectable(p0: any, p1: any): void {
    SetPickupUncollectable(p0, p1);
  }

  static setStateOfClosestDoorOfType(type: number, x: number, y: number, z: number, locked: boolean, heading: number, p6: boolean): void {
    SetStateOfClosestDoorOfType(type, x, y, z, locked, heading, p6);
  }

  static setUnkGlobalBoolRelatedToDamage(value: boolean): void {
    SetUnkGlobalBoolRelatedToDamage(value);
  }
}