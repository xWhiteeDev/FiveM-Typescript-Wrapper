import type { eShader } from '../enums/eWorld';
import { IVector3 } from '../typings/Vector';
import { UTechnique } from '../typings/World';
import { RGBA } from '../Utils/RGBA';
import { Entity } from './Entity';

export class BaseEntity {
  protected _type: Entity = 'BaseEntity';
  constructor(protected _handle: number) {}
  static fromHandle(handle: number): BaseEntity | null {
    if (!DoesEntityExist(handle)) return null;
    return new this(handle);
  }

  delete(): void {
    DeleteEntity(this._handle);
  }

  static isEntity(handle: number): boolean {
    return IsAnEntity(handle);
  }

  static playSynchronizedMapAnim(
    coords: IVector3,
    radius: number,
    objectModelHash: number,
    sceneId: number,
    pAnimName: string,
    pAnimDictName: string,
    fBlendDelta: number,
    fBlendOutDelta: number,
    flags: number,
    fMoverBlendInDelta: number,
  ): boolean {
    return PlaySynchronizedMapEntityAnim(
      coords.x,
      coords.y,
      coords.z,
      radius,
      objectModelHash,
      sceneId,
      pAnimName,
      pAnimDictName,
      fBlendDelta,
      fBlendOutDelta,
      flags,
      fMoverBlendInDelta,
    );
  }

  static setGhostedAlpha(alpha: number): void {
    SetGhostedEntityAlpha(alpha);
  }

  static setNetworkIdCanMigrate(netId: number, toggle: boolean): void {
    SetNetworkIdCanMigrate(netId, toggle);
  }

  static netToEnt(netHandle: number): BaseEntity | null {
    const handle = NetToEnt(netHandle);
    if (!DoesEntityExist(handle)) return null;
    return new this(handle);
  }

  static networkAddAngledArea(p1: IVector3, p2: IVector3, width: number): number {
    return NetworkAddEntityAngledArea(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, width);
  }

  static networkAddArea(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number): number {
    return NetworkAddEntityArea(p0, p1, p2, p3, p4, p5);
  }

  static networkAddDisplayedBoundaries(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number): void {
    NetworkAddEntityDisplayedBoundaries(p0, p1, p2, p3, p4, p5);
  }

  static networkAddMapToSynchronisedScene(
    netScene: number,
    modelHash: number,
    coords: IVector3,
    animDict: string,
    animName: string,
    blendInSpeed: number,
    blendOutSpeed: number,
    flags: number,
  ): void {
    NetworkAddMapEntityToSynchronisedScene(
      netScene,
      modelHash,
      coords.x,
      coords.y,
      coords.z,
      animDict,
      animName,
      blendInSpeed,
      blendOutSpeed,
      flags,
    );
  }

  static networkAddPedToSynchronisedScene(
    pedHandle: number,
    netScene: number,
    animDict: string,
    animClip: string,
    blendInSpeed: number,
    blendOutSpeed: number,
    syncedSceneFlags: number,
    ragdollFlags: number,
    moverBlendInDelta: number,
    ikFlags: number,
  ): void {
    NetworkAddPedToSynchronisedScene(
      pedHandle,
      netScene,
      animDict,
      animClip,
      blendInSpeed,
      blendOutSpeed,
      syncedSceneFlags,
      ragdollFlags,
      moverBlendInDelta,
      ikFlags,
    );
  }

  static networkDoesExistWithNetworkId(netId: number): boolean {
    return NetworkDoesEntityExistWithNetworkId(netId);
  }

  static networkAreaDoesExist(areaHandle: number): boolean {
    return NetworkEntityAreaDoesExist(areaHandle);
  }

  static networkAreaIsOccupied(areaHandle: number): boolean {
    return NetworkEntityAreaIsOccupied(areaHandle);
  }

  static networkGetDestroyerOfEntity(p0: any, p1: any): BaseEntity | null {
    const [b, handle] = NetworkGetDestroyerOfEntity(p0, p1);
    if (!DoesEntityExist(handle)) return null;
    return new this(handle);
  }

  static networkGetFromNetworkId(netId: number): BaseEntity | null {
    const handle = NetworkGetEntityFromNetworkId(netId);
    if (!DoesEntityExist(handle)) return null;
    return new this(handle);
  }

  static networkGetKillerOfPlayer(player: number): BaseEntity | null {
    const [b, handle] = NetworkGetEntityKillerOfPlayer(player);
    if (!DoesEntityExist(handle)) return null;
    return new this(handle);
  }

  static networkRemoveArea(p0: any): void {
    NetworkRemoveEntityArea(p0);
  }

  networkGetLastVelocityReceived(): IVector3 {
    const [x, y, z] = NetworkGetLastVelocityReceived(this._handle);
    return { x, y, z };
  }

  networkOverrideCoordsAndHeading(pos: IVector3, heading: number): void {
    NetworkOverrideCoordsAndHeading(this._handle, pos.x, pos.y, pos.z, heading);
  }

  networkUseLogarithmicBlendingThisFrame(): void {
    NetworkUseLogarithmicBlendingThisFrame(this._handle);
  }

  get handle(): number {
    return this._handle;
  }

  get alpha(): number {
    return GetEntityAlpha(this._handle);
  }

  get attachedTo(): BaseEntity | null {
    const handle = GetEntityAttachedTo(this._handle);
    if (!DoesEntityExist(handle)) return null;
    return new BaseEntity(handle);
  }

  get boneCount(): number {
    return GetEntityBoneCount(this._handle);
  }

  get canBeDamaged(): boolean {
    return GetEntityCanBeDamaged(this._handle);
  }

  get forwardVector(): IVector3 {
    const [x, y, z] = GetEntityForwardVector(this._handle);
    return { x, y, z };
  }

  get forwardX(): number {
    return GetEntityForwardX(this._handle);
  }

  get forwardY(): number {
    return GetEntityForwardY(this._handle);
  }

  get heading(): number {
    return GetEntityHeading(this._handle);
  }

  get headingFromEulers(): number {
    return GetEntityHeadingFromEulers(this._handle);
  }

  get health(): number {
    return GetEntityHealth(this._handle);
  }

  get heightAboveGround(): number {
    return GetEntityHeightAboveGround(this._handle);
  }

  get lodDist(): number {
    return GetEntityLodDist(this._handle);
  }

  get matrix(): any {
    return GetEntityMatrix(this._handle);
  }

  get maxHealth(): number {
    return GetEntityMaxHealth(this._handle);
  }

  get model(): number {
    return GetEntityModel(this._handle);
  }

  get pitch(): number {
    return GetEntityPitch(this._handle);
  }

  get populationType(): number {
    return GetEntityPopulationType(this._handle);
  }

  get proofs(): any {
    return GetEntityProofs(this._handle);
  }

  get quaternion(): [number, number, number, number] {
    const [x, y, z, w] = GetEntityQuaternion(this._handle);
    return [x, y, z, w];
  }

  get roll(): number {
    return GetEntityRoll(this._handle);
  }

  get rotationVelocity(): IVector3 {
    const [x, y, z] = GetEntityRotationVelocity(this._handle);
    return { x, y, z };
  }

  get script(): [string, number] {
    return GetEntityScript(this._handle);
  }

  get speed(): number {
    return GetEntitySpeed(this._handle);
  }

  get submergedLevel(): number {
    return GetEntitySubmergedLevel(this._handle);
  }

  get type() {
    return this._type;
  }

  get uprightValue(): number {
    return GetEntityUprightValue(this._handle);
  }

  get velocity(): IVector3 {
    const [x, y, z] = GetEntityVelocity(this._handle);
    return { x, y, z };
  }

  applyForce(
    forceType: number,
    dir: IVector3,
    off: IVector3,
    nComponent: number,
    bLocalForce: boolean,
    bLocalOffset: boolean,
    bScaleByMass: boolean,
    bPlayAudio: boolean,
    bScaleByTimeWarp: boolean,
  ): void {
    ApplyForceToEntity(
      this._handle,
      forceType,
      dir.x,
      dir.y,
      dir.z,
      off.x,
      off.y,
      off.z,
      nComponent,
      bLocalForce,
      bLocalOffset,
      bScaleByMass,
      bPlayAudio,
      bScaleByTimeWarp,
    );
  }

  applyForceCenterOfMass(
    forceType: number,
    dir: IVector3,
    nComponent: number,
    bLocalForce: boolean,
    bScaleByMass: boolean,
    bApplyToChildren: boolean,
  ): void {
    ApplyForceToEntityCenterOfMass(
      this._handle,
      forceType,
      dir.x,
      dir.y,
      dir.z,
      nComponent,
      bLocalForce,
      bScaleByMass,
      bApplyToChildren,
    );
  }
  get address(): number {
    return GetEntityAddress(this._handle);
  }

  get archetypeName(): string {
    return GetEntityArchetypeName(this._handle);
  }
  get mapdataOwner() {
    return GetEntityMapdataOwner(this._handle);
  }
  attachBoneToBone(entity2Handle: number, entityBone: number, entityBone2: number, p4: boolean, p5: boolean): void {
    AttachEntityBoneToEntityBone(this._handle, entity2Handle, entityBone, entityBone2, p4, p5);
  }

  attachBoneToBonePhysically(entity2Handle: number, entityBone: number, entityBone2: number, p4: boolean, p5: boolean): void {
    AttachEntityBoneToEntityBonePhysically(this._handle, entity2Handle, entityBone, entityBone2, p4, p5);
  }

  attachTo(
    entity2Handle: number,
    boneIndex: number,
    pos: IVector3,
    rot: IVector3,
    p9: boolean,
    useSoftPinning: boolean,
    collision: boolean,
    isPed: boolean,
    rotationOrder: number,
    syncRot: boolean,
  ): void {
    AttachEntityToEntity(
      this._handle,
      entity2Handle,
      boneIndex,
      pos.x,
      pos.y,
      pos.z,
      rot.x,
      rot.y,
      rot.z,
      p9,
      useSoftPinning,
      collision,
      isPed,
      rotationOrder,
      syncRot,
    );
  }

  attachToPhysically(
    entity2Handle: number,
    boneIndex1: number,
    boneIndex2: number,
    pos1: IVector3,
    pos2: IVector3,
    rot: IVector3,
    breakForce: number,
    fixedRot: boolean,
    p15: boolean,
    collision: boolean,
    teleport: boolean,
    p18: number,
  ): void {
    AttachEntityToEntityPhysically(
      this._handle,
      entity2Handle,
      boneIndex1,
      boneIndex2,
      pos1.x,
      pos1.y,
      pos1.z,
      pos2.x,
      pos2.y,
      pos2.z,
      rot.x,
      rot.y,
      rot.z,
      breakForce,
      fixedRot,
      p15,
      collision,
      teleport,
      p18,
    );
  }

  clearLastDamage(): void {
    ClearEntityLastDamageEntity(this._handle);
  }

  detach(dynamic: boolean, collision: boolean): void {
    DetachEntity(this._handle, dynamic, collision);
  }

  doesBelongToThisScript(p2: boolean): boolean {
    return DoesEntityBelongToThisScript(this._handle, p2);
  }

  doesExist(): boolean {
    return DoesEntityExist(this._handle);
  }

  doesHaveAnimDirector(): boolean {
    return DoesEntityHaveAnimDirector(this._handle);
  }

  doesHaveDrawable(): boolean {
    return DoesEntityHaveDrawable(this._handle);
  }

  doesHavePhysics(): boolean {
    return DoesEntityHavePhysics(this._handle);
  }

  doesHaveSkeletonData(): boolean {
    return DoesEntityHaveSkeletonData(this._handle);
  }

  enableUnk(): void {
    EnableEntityUnk(this._handle);
  }

  forceAiAndAnimationUpdate(): void {
    ForceEntityAiAndAnimationUpdate(this._handle);
  }

  freezePosition(toggle: boolean): void {
    FreezeEntityPosition(this._handle, toggle);
  }

  getCollisionNormalOfLastHit(): IVector3 {
    const [x, y, z] = GetCollisionNormalOfLastHitForEntity(this._handle);
    return { x, y, z };
  }

  getAnimCurrentTime(animDict: string, animName: string): number {
    return GetEntityAnimCurrentTime(this._handle, animDict, animName);
  }

  getAnimTotalTime(animDict: string, animName: string): number {
    return GetEntityAnimTotalTime(this._handle, animDict, animName);
  }

  getBoneIndexByName(boneName: string): number {
    return GetEntityBoneIndexByName(this._handle, boneName);
  }

  getBonePosition2(boneIndex: number): IVector3 {
    const [x, y, z] = GetEntityBonePosition_2(this._handle, boneIndex);
    return { x, y, z };
  }

  getBoneRotation(boneIndex: number): IVector3 {
    const [x, y, z] = GetEntityBoneRotation(this._handle, boneIndex);
    return { x, y, z };
  }

  getBoneRotationLocal(boneIndex: number): IVector3 {
    const [x, y, z] = GetEntityBoneRotationLocal(this._handle, boneIndex);
    return { x, y, z };
  }

  getCollisionDisabled(): boolean {
    return GetEntityCollisionDisabled(this._handle);
  }

  getCoords(alive: boolean = false): IVector3 {
    const [x, y, z] = GetEntityCoords(this._handle, alive);
    return { x, y, z };
  }

  getHeight(pos: IVector3, atTop: boolean, inWorldCoords: boolean): number {
    return GetEntityHeight(this._handle, pos.x, pos.y, pos.z, atTop, inWorldCoords);
  }

  getPickup(modelHash: number): number {
    return GetEntityPickup(this._handle, modelHash);
  }

  getRotation(rotationOrder: number): IVector3 {
    const [x, y, z] = GetEntityRotation(this._handle, rotationOrder);
    return { x, y, z };
  }

  getSpeedVector(relative: boolean): IVector3 {
    const [x, y, z] = GetEntitySpeedVector(this._handle, relative);
    return { x, y, z };
  }

  getLastMaterialHitBy(): number {
    return GetLastMaterialHitByEntity(this._handle);
  }

  getNearestPlayer(): number {
    return GetNearestPlayerToEntity(this._handle);
  }

  getNearestPlayerOnTeam(team: number): number {
    return GetNearestPlayerToEntityOnTeam(this._handle, team);
  }

  getObjectIndexFromIndex(): number {
    return GetObjectIndexFromEntityIndex(this._handle);
  }

  getOffsetGivenWorldCoords(pos: IVector3): IVector3 {
    const [x, y, z] = GetOffsetFromEntityGivenWorldCoords(this._handle, pos.x, pos.y, pos.z);
    return { x, y, z };
  }

  getOffsetInWorldCoords(offset: IVector3): IVector3 {
    const [x, y, z] = GetOffsetFromEntityInWorldCoords(this._handle, offset.x, offset.y, offset.z);
    return { x, y, z };
  }

  getPedIndexFromIndex(): number {
    return GetPedIndexFromEntityIndex(this._handle);
  }

  getVehicleIndexFromIndex(): number {
    return GetVehicleIndexFromEntityIndex(this._handle);
  }

  getWorldPositionOfBone(boneIndex: number): IVector3 {
    const [x, y, z] = GetWorldPositionOfEntityBone(this._handle, boneIndex);
    return { x, y, z };
  }

  hasAnimEventFired(actionHash: number): boolean {
    return HasAnimEventFired(this._handle, actionHash);
  }

  hasCollisionLoadedAround(): boolean {
    return HasCollisionLoadedAroundEntity(this._handle);
  }

  hasAnimFinished(animDict: string, animName: string, p3: number): boolean {
    return HasEntityAnimFinished(this._handle, animDict, animName, p3);
  }

  hasBeenDamagedByAnyObject(): boolean {
    return HasEntityBeenDamagedByAnyObject(this._handle);
  }

  hasBeenDamagedByAnyPed(): boolean {
    return HasEntityBeenDamagedByAnyPed(this._handle);
  }

  hasBeenDamagedByAnyVehicle(): boolean {
    return HasEntityBeenDamagedByAnyVehicle(this._handle);
  }

  hasBeenDamagedBy(damagerHandle: number, bCheckDamageVehicle: boolean): boolean {
    return HasEntityBeenDamagedByEntity(this._handle, damagerHandle, bCheckDamageVehicle);
  }

  hasClearLosTo(entity2Handle: number, flags: number): boolean {
    return HasEntityClearLosToEntity(this._handle, entity2Handle, flags);
  }

  hasClearLosTo2(entity2Handle: number, traceType: number): number {
    return HasEntityClearLosToEntity_2(this._handle, entity2Handle, traceType);
  }

  hasClearLosToInFront(entity2Handle: number): boolean {
    return HasEntityClearLosToEntityInFront(this._handle, entity2Handle);
  }

  hasCollidedWithAnything(): boolean {
    return HasEntityCollidedWithAnything(this._handle);
  }

  isAMission(): boolean {
    return IsEntityAMissionEntity(this._handle);
  }

  isAPed(): boolean {
    return IsEntityAPed(this._handle);
  }

  isAVehicle(): boolean {
    return IsEntityAVehicle(this._handle);
  }

  isAnObject(): boolean {
    return IsEntityAnObject(this._handle);
  }

  isAtCoord(pos: IVector3, size: IVector3, highlightArea: boolean, do3dCheck: boolean, transportMode: number): boolean {
    return IsEntityAtCoord(this._handle, pos.x, pos.y, pos.z, size.x, size.y, size.z, highlightArea, do3dCheck, transportMode);
  }

  isAt(targetEntityHandle: number, size: IVector3, highlightArea: boolean, do3dCheck: boolean, transportMode: number): boolean {
    return IsEntityAtEntity(this._handle, targetEntityHandle, size.x, size.y, size.z, highlightArea, do3dCheck, transportMode);
  }

  isAttached(): boolean {
    return IsEntityAttached(this._handle);
  }

  isAttachedToAnyObject(): boolean {
    return IsEntityAttachedToAnyObject(this._handle);
  }

  isAttachedToAnyPed(): boolean {
    return IsEntityAttachedToAnyPed(this._handle);
  }

  isAttachedToAnyVehicle(): boolean {
    return IsEntityAttachedToAnyVehicle(this._handle);
  }

  isAttachedTo(toEntityHandle: number): boolean {
    return IsEntityAttachedToEntity(this._handle, toEntityHandle);
  }

  isDead(): boolean {
    return IsEntityDead(this._handle);
  }

  isInAir(): boolean {
    return IsEntityInAir(this._handle);
  }

  isInAngledArea(p1: IVector3, p2: IVector3, width: number, debug: boolean, include: boolean, p10: any): boolean {
    return IsEntityInAngledArea(this._handle, p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, width, debug, include, p10);
  }

  isInArea(p1: IVector3, p2: IVector3, p7: boolean, p8: boolean, p9: any): boolean {
    return IsEntityInArea(this._handle, p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p7, p8, p9);
  }

  isInWater(): boolean {
    return IsEntityInWater(this._handle);
  }

  isInZone(zone: string): boolean {
    return IsEntityInZone(this._handle, zone);
  }

  isOccluded(): boolean {
    return IsEntityOccluded(this._handle);
  }

  isOnScreen(): boolean {
    return IsEntityOnScreen(this._handle);
  }

  isPlayingAnim(animDict: string, animName: string, taskFlag: number): boolean {
    return IsEntityPlayingAnim(this._handle, animDict, animName, taskFlag);
  }

  isStatic(): boolean {
    return IsEntityStatic(this._handle);
  }

  isTouching(targetEntityHandle: number): boolean {
    return IsEntityTouchingEntity(this._handle, targetEntityHandle);
  }

  isTouchingModel(modelHash: number): boolean {
    return IsEntityTouchingModel(this._handle, modelHash);
  }

  isUpright(angle: number): boolean {
    return IsEntityUpright(this._handle, angle);
  }

  isUpsidedown(): boolean {
    return IsEntityUpsidedown(this._handle);
  }

  isVisible(): boolean {
    return IsEntityVisible(this._handle);
  }

  isVisibleToScript(): boolean {
    return IsEntityVisibleToScript(this._handle);
  }

  isWaitingForWorldCollision(): boolean {
    return IsEntityWaitingForWorldCollision(this._handle);
  }

  playAnim(
    animName: string,
    animDict: string,
    fBlendDelta: number,
    bLoop: boolean,
    bHoldLastFrame: boolean,
    bDriveToPose: boolean,
    fStartPhase: number,
    iFlags: number,
  ): boolean {
    return PlayEntityAnim(
      this._handle,
      animName,
      animDict,
      fBlendDelta,
      bLoop,
      bHoldLastFrame,
      bDriveToPose,
      fStartPhase,
      iFlags,
    );
  }

  playSynchronizedAnim(
    syncedScene: number,
    animName: string,
    animDictName: string,
    fBlendInDelta: number,
    fBlendOutDelta: number,
    iFlags: number,
    fMoverBlendInDelta: number,
  ): boolean {
    return PlaySynchronizedEntityAnim(
      this._handle,
      syncedScene,
      animName,
      animDictName,
      fBlendInDelta,
      fBlendOutDelta,
      iFlags,
      fMoverBlendInDelta,
    );
  }

  processAttachments(): void {
    ProcessEntityAttachments(this._handle);
  }

  resetAlpha(): void {
    ResetEntityAlpha(this._handle);
  }

  setCanAutoVaultOn(toggle: boolean): void {
    SetCanAutoVaultOnEntity(this._handle, toggle);
  }

  setCanClimbOn(toggle: boolean): void {
    SetCanClimbOnEntity(this._handle, toggle);
  }

  setAlpha(alphaLevel: number, skin: boolean): void {
    SetEntityAlpha(this._handle, alphaLevel, skin);
  }

  setAlwaysPrerender(toggle: boolean): void {
    SetEntityAlwaysPrerender(this._handle, toggle);
  }

  setAngularVelocity(vel: IVector3): void {
    SetEntityAngularVelocity(this._handle, vel.x, vel.y, vel.z);
  }

  setAnimCurrentTime(animDictionary: string, animName: string, time: number): void {
    SetEntityAnimCurrentTime(this._handle, animDictionary, animName, time);
  }

  setAnimSpeed(animDictionary: string, animName: string, speedMultiplier: number): void {
    SetEntityAnimSpeed(this._handle, animDictionary, animName, speedMultiplier);
  }

  setAsMission(scriptHostObject: boolean, bGrabFromOtherScript: boolean): void {
    SetEntityAsMissionEntity(this._handle, scriptHostObject, bGrabFromOtherScript);
  }

  setAsNoLongerNeeded(): void {
    SetEntityAsNoLongerNeeded(this._handle);
  }

  setCanBeDamaged(toggle: boolean): void {
    SetEntityCanBeDamaged(this._handle, toggle);
  }

  setCanBeDamagedByRelationshipGroup(bCanBeDamaged: boolean, relGroup: number): void {
    SetEntityCanBeDamagedByRelationshipGroup(this._handle, bCanBeDamaged, relGroup);
  }

  setCanBeTargetedWithoutLos(toggle: boolean): void {
    SetEntityCanBeTargetedWithoutLos(this._handle, toggle);
  }

  setCleanupByEngine(toggle: boolean): void {
    SetEntityCleanupByEngine(this._handle, toggle);
  }

  setCollision(toggle: boolean, keepPhysics: boolean): void {
    SetEntityCollision(this._handle, toggle, keepPhysics);
  }

  setCompletelyDisableCollision(toggle: boolean, keepPhysics: boolean): void {
    SetEntityCompletelyDisableCollision(this._handle, toggle, keepPhysics);
  }

  setCoords(pos: IVector3, alive: boolean, deadFlag: boolean, ragdollFlag: boolean, clearArea: boolean): void {
    SetEntityCoords(this._handle, pos.x, pos.y, pos.z, alive, deadFlag, ragdollFlag, clearArea);
  }

  setCoordsNoOffset(pos: IVector3, keepTasks: boolean, keepIk: boolean, doWarp: boolean): void {
    SetEntityCoordsNoOffset(this._handle, pos.x, pos.y, pos.z, keepTasks, keepIk, doWarp);
  }

  setCoordsWithoutPlantsReset(pos: IVector3, alive: boolean, deadFlag: boolean, ragdollFlag: boolean, clearArea: boolean): void {
    SetEntityCoordsWithoutPlantsReset(this._handle, pos.x, pos.y, pos.z, alive, deadFlag, ragdollFlag, clearArea);
  }

  setDecalsDisabled(p1: boolean): void {
    SetEntityDecalsDisabled(this._handle, p1);
  }

  setDynamic(toggle: boolean): void {
    SetEntityDynamic(this._handle, toggle);
  }

  setHasGravity(toggle: boolean): void {
    SetEntityHasGravity(this._handle, toggle);
  }

  setHeading(heading: number): void {
    SetEntityHeading(this._handle, heading);
  }

  setHealth(health: number): void {
    SetEntityHealth(this._handle, health);
  }

  setInvincible(toggle: boolean): void {
    SetEntityInvincible(this._handle, toggle);
  }

  setIsTargetPriority(p1: boolean, p2: number): void {
    SetEntityIsTargetPriority(this._handle, p1, p2);
  }

  setLights(toggle: boolean): void {
    SetEntityLights(this._handle, toggle);
  }

  setLoadCollisionFlag(toggle: boolean): void {
    SetEntityLoadCollisionFlag(this._handle, toggle);
  }

  setLodDist(value: number): void {
    SetEntityLodDist(this._handle, value);
  }

  setMaxHealth(value: number): void {
    SetEntityMaxHealth(this._handle, value);
  }

  setMaxSpeed(speed: number): void {
    SetEntityMaxSpeed(this._handle, speed);
  }

  setMotionBlur(toggle: boolean): void {
    SetEntityMotionBlur(this._handle, toggle);
  }

  setNoCollision(entity2Handle: number, thisFrameOnly: boolean): void {
    SetEntityNoCollisionEntity(this._handle, entity2Handle, thisFrameOnly);
  }

  setNoCollisionWithNetworked(entity2Handle: number): void {
    SetEntityNoCollisionWithNetworkedEntity(this._handle, entity2Handle);
  }

  isGhostedToLocalPlayer(): boolean {
    return IsEntityGhostedToLocalPlayer(this._handle);
  }

  networkAddToSynchronisedScene(
    netScene: number,
    animDict: string,
    animName: string,
    blendIn: number,
    blendOut: number,
    flag: number,
  ): void {
    NetworkAddEntityToSynchronisedScene(this._handle, netScene, animDict, animName, blendIn, blendOut, flag);
  }

  networkAllowRemoteAttachmentModification(toggle: boolean): void {
    NetworkAllowRemoteAttachmentModification(this._handle, toggle);
  }

  networkAttachSynchronisedScene(netScene: number, bone: number): void {
    NetworkAttachSynchronisedSceneToEntity(netScene, this._handle, bone);
  }

  networkConceal(toggle: boolean): void {
    NetworkConcealEntity(this._handle, toggle);
  }

  networkFadeIn(bNetwork: boolean): void {
    NetworkFadeInEntity(this._handle, bNetwork);
  }

  networkFadeOut(normal: boolean, slow: boolean): void {
    NetworkFadeOutEntity(this._handle, normal, slow);
  }

  networkIsLocal(): boolean {
    return NetworkGetEntityIsLocal(this._handle);
  }

  networkIsNetworked(): boolean {
    return NetworkGetEntityIsNetworked(this._handle);
  }

  networkGetNetScriptId(): number {
    return NetworkGetEntityNetScriptId(this._handle);
  }

  networkGetNetworkId(): number {
    return NetworkGetNetworkIdFromEntity(this._handle);
  }

  networkHasControl(): boolean {
    return NetworkHasControlOfEntity(this._handle);
  }

  networkHasBeenRegisteredWithThisThread(): boolean {
    return NetworkHasEntityBeenRegisteredWithThisThread(this._handle);
  }

  networkIsConcealed(): boolean {
    return NetworkIsEntityConcealed(this._handle);
  }

  networkIsFading(): boolean {
    return NetworkIsEntityFading(this._handle);
  }

  networkRegisterAsNetworked(): void {
    NetworkRegisterEntityAsNetworked(this._handle);
  }

  networkRequestControl(): boolean {
    return NetworkRequestControlOfEntity(this._handle);
  }

  networkSetCanBlend(toggle: boolean): void {
    NetworkSetEntityCanBlend(this._handle, toggle);
  }

  networkSetGhostedWithOwner(p1: boolean): void {
    NetworkSetEntityGhostedWithOwner(this._handle, p1);
  }

  networkSetInvisibleToNetwork(toggle: boolean): void {
    NetworkSetEntityInvisibleToNetwork(this._handle, toggle);
  }

  networkUnregisterNetworked(): void {
    NetworkUnregisterNetworkedEntity(this._handle);
  }

  removeAllStickyBombs(): void {
    RemoveAllStickyBombsFromEntity(this._handle);
  }

  resetGhostedAlpha(): void {
    ResetGhostedEntityAlpha();
  }

  setLocallyInvisible(): void {
    SetEntityLocallyInvisible(this._handle);
  }

  setLocallyVisible(): void {
    SetEntityLocallyVisible(this._handle);
  }

  setVisibleInCutscene(p1: boolean, p2: boolean): void {
    SetEntityVisibleInCutscene(this._handle, p1, p2);
  }

  getIndexFromMapdata(mapdata: number) {
    return GetEntityIndexFromMapdata(mapdata, this._handle);
  }
  getMapdataOwner() {
    return GetEntityMapdataOwner(this._handle);
  }
  getMapdataHandle(mapDataHash: number, entityInternalIdx: number) {
    return GetMapdataEntityHandle(mapDataHash, entityInternalIdx, this._handle);
  }
  getMapdataMatrix(mapDataHash: number, entityInternalIdx: number, matrixPtr: number) {
    return GetMapdataEntityMatrix(mapDataHash, entityInternalIdx, matrixPtr);
  }
  get networkOwner() {
    return NetworkGetEntityOwner(this._handle);
  }
  setDrawOutline(enabled: boolean) {
    SetEntityDrawOutline(this._handle, enabled);
  }
  setDrawOutlineColor(rgba: RGBA) {
    SetEntityDrawOutlineColor(rgba.r, rgba.g, rgba.b, rgba.a);
  }
  setDrawOutlineRenderTechnique(techniqueGroup: UTechnique) {
    SetEntityDrawOutlineRenderTechnique(techniqueGroup);
  }
  setDrawOutlineShader(shader: eShader) {
    SetEntityDrawOutlineShader(shader);
  }
  SetMatrix(
    forwardX: number,
    forwardY: number,
    forwardZ: number,
    rightX: number,
    rightY: number,
    rightZ: number,
    upX: number,
    upY: number,
    upZ: number,
    atX: number,
    atY: number,
    atZ: number,
  ) {
    SetEntityMatrix(this._handle, forwardX, forwardY, forwardZ, rightX, rightY, rightZ, upX, upY, upZ, atX, atY, atZ);
  }
  updateMapdata(mapdata: number, entityDef: {}) {
    UpdateMapdataEntity(mapdata, this._handle, entityDef);
  }
}
