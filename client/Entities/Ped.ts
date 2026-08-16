import {IVector3} from '../typings/Vector3';
import { BaseEntity } from './BaseEntity';

export class Ped extends BaseEntity {
  constructor(protected _handle: number) {
    super(_handle);
  }
  static fromHandle(handle: number): Ped | null {
    if (!DoesEntityExist(handle)) return null;
    return new this(handle);
  }

  static canCreateRandom(unk: boolean): boolean {
    return CanCreateRandomPed(unk);
  }

  static clearNonCreationArea(): void {
    ClearPedNonCreationArea();
  }

  static clearRelationshipBetweenGroups(relationship: number, group1: number, group2: number): void {
    ClearRelationshipBetweenGroups(relationship, group1, group2);
  }

  static createGroup(unused: number): number {
    return CreateGroup(unused);
  }

  static createNmMessage(startImmediately: boolean, messageId: number): void {
    CreateNmMessage(startImmediately, messageId);
  }

  static create(
    pedType: number,
    modelHash: number,
    pos: IVector3,
    heading: number,
    isNetwork: boolean,
    bScriptHostPed: boolean,
  ): Ped | null {
    const handle = CreatePed(pedType, modelHash, pos.x, pos.y, pos.z, heading, isNetwork, bScriptHostPed);
    return this.fromHandle(handle);
  }

  static createInsideVehicle(
    vehicleHandle: number,
    pedType: number,
    modelHash: number,
    seat: number,
    isNetwork: boolean,
    bScriptHostPed: boolean,
  ): Ped | null {
    const handle = CreatePedInsideVehicle(vehicleHandle, pedType, modelHash, seat, isNetwork, bScriptHostPed);
    return this.fromHandle(handle);
  }

  static createRandom(pos: IVector3): Ped | null {
    const handle = CreateRandomPed(pos.x, pos.y, pos.z);
    return this.fromHandle(handle);
  }

  static createRandomAsDriver(vehicleHandle: number, returnHandle: boolean): Ped | null {
    const handle = CreateRandomPedAsDriver(vehicleHandle, returnHandle);
    if (!returnHandle) return null;
    return this.fromHandle(handle);
  }

  static createSynchronizedScene(pos: IVector3, roll: number, pitch: number, yaw: number, p6: number): number {
    return CreateSynchronizedScene(pos.x, pos.y, pos.z, roll, pitch, yaw, p6);
  }

  delete(): void {
    DeletePed(this._handle);
  }

  static getClosest(
    pos: IVector3,
    radius: number,
    p4: boolean,
    p5: boolean,
    p7: boolean,
    p8: boolean,
    pedType: number,
  ): Ped | null {
    const handle = GetClosestPed(pos.x, pos.y, pos.z, radius, p4, p5, p7, p8, pedType);
    return this.fromHandle(handle[1]);
  }

  static getAsGroupLeader(groupID: number): Ped | null {
    const handle = GetPedAsGroupLeader(groupID);
    return this.fromHandle(handle);
  }

  static getAsGroupMember(groupID: number, memberNumber: number): Ped | null {
    const handle = GetPedAsGroupMember(groupID, memberNumber);
    return this.fromHandle(handle);
  }

  static getDecorationZoneFromHashes(collection: number, overlay: number): number {
    return GetPedDecorationZoneFromHashes(collection, overlay);
  }

  static getHairRgbColor(hairColorIndex: number): any {
    return GetPedHairRgbColor(hairColorIndex);
  }

  static getHeadBlendFirstIndex(type: number): number {
    return GetPedHeadBlendFirstIndex(type);
  }

  static getHeadBlendNumHeads(type: number): number {
    return GetPedHeadBlendNumHeads(type);
  }

  static getHeadOverlayNum(overlayID: number): number {
    return GetPedHeadOverlayNum(overlayID);
  }

  static getMakeupRgbColor(makeupColorIndex: number): any {
    return GetPedMakeupRgbColor(makeupColorIndex);
  }

  static getHeadshotTxdString(id: number): string {
    return GetPedheadshotTxdString(id);
  }

  static getRandomAtCoord(pos: IVector3, radius: IVector3, pedType: number): Ped | null {
    const handle = GetRandomPedAtCoord(pos.x, pos.y, pos.z, radius.x, radius.y, radius.z, pedType);
    return this.fromHandle(handle);
  }

  static getRelationshipBetweenGroups(group1: number, group2: number): number {
    return GetRelationshipBetweenGroups(group1, group2);
  }

  static getRelationshipBetweenPeds(ped1Handle: number, ped2Handle: number): number {
    return GetRelationshipBetweenPeds(ped1Handle, ped2Handle);
  }

  static hasHeadshotImgUploadFailed(): boolean {
    return HasPedheadshotImgUploadFailed();
  }

  static hasHeadshotImgUploadSucceeded(): boolean {
    return HasPedheadshotImgUploadSucceeded();
  }

  static instantlyFillPopulation(): void {
    InstantlyFillPedPopulation();
  }

  static isAnyNearPoint(pos: IVector3, radius: number): boolean {
    return IsAnyPedNearPoint(pos.x, pos.y, pos.z, radius);
  }

  static isAnyShootingInArea(min: IVector3, max: IVector3, bHighlightArea: boolean, bDo3DCheck: boolean): boolean {
    return IsAnyPedShootingInArea(min.x, min.y, min.z, max.x, max.y, max.z, bHighlightArea, bDo3DCheck);
  }

  static isCopInArea_3d(min: IVector3, max: IVector3): boolean {
    return IsCopPedInArea_3d(min.x, min.y, min.z, max.x, max.y, max.z);
  }

  static isBlushColorValid(colorID: number): boolean {
    return IsPedBlushColorValid(colorID);
  }

  static isBlushColorValid_2(colorID: number): boolean {
    return IsPedBlushColorValid_2(colorID);
  }

  static isBodyBlemishValid(colorID: number): boolean {
    return IsPedBodyBlemishValid(colorID);
  }

  static isHairColorValid(colorID: number): boolean {
    return IsPedHairColorValid(colorID);
  }

  static isHairColorValid_2(colorID: number): boolean {
    return IsPedHairColorValid_2(colorID);
  }

  static isLipstickColorValid(colorID: number): boolean {
    return IsPedLipstickColorValid(colorID);
  }

  static isLipstickColorValid_2(colorID: number): boolean {
    return IsPedLipstickColorValid_2(colorID);
  }

  static isHeadshotImgUploadAvailable(): boolean {
    return IsPedheadshotImgUploadAvailable();
  }

  static isHeadshotReady(id: number): boolean {
    return IsPedheadshotReady(id);
  }

  static isHeadshotValid(id: number): boolean {
    return IsPedheadshotValid(id);
  }

  static isSynchronizedSceneLooped(sceneID: number): boolean {
    return IsSynchronizedSceneLooped(sceneID);
  }

  static releaseHeadshotImgUpload(id: number): void {
    ReleasePedheadshotImgUpload(id);
  }

  static requestHeadshotImgUpload(id: number): void {
    RequestPedheadshotImgUpload(id);
  }

  static setAmbientDropMoney(p0: boolean): void {
    SetAmbientPedsDropMoney(p0);
  }

  static setBlockAmbientFromDroppingWeaponsThisFrame(): void {
    SetBlockAmbientPedsFromDroppingWeaponsThisFrame();
  }

  static setDensityMultiplierThisFrame(multiplier: number): void {
    SetPedDensityMultiplierThisFrame(multiplier);
  }

  static setModelIsSuppressed(model: number, toggle: boolean): void {
    SetPedModelIsSuppressed(model, toggle);
  }

  static setNonCreationArea(min: IVector3, max: IVector3): void {
    SetPedNonCreationArea(min.x, min.y, min.z, max.x, max.y, max.z);
  }

  static setRelationshipBetweenGroups(relationship: number, group1: number, group2: number): void {
    SetRelationshipBetweenGroups(relationship, group1, group2);
  }

  static setScenarioDensityMultiplierThisFrame(interiorMult: number, exteriorMult: number): void {
    SetScenarioPedDensityMultiplierThisFrame(interiorMult, exteriorMult);
  }

  static setScenarioPedsSpawnInSphereArea(pos: IVector3, range: number, p4: number): void {
    SetScenarioPedsSpawnInSphereArea(pos.x, pos.y, pos.z, range, p4);
  }

  static setScenarioPedsToBeReturnedByNextCommand(value: boolean): void {
    SetScenarioPedsToBeReturnedByNextCommand(value);
  }

  static setSynchronizedSceneLooped(sceneID: number, toggle: boolean): void {
    SetSynchronizedSceneLooped(sceneID, toggle);
  }

  static stopAnyModelBeingSuppressed(): void {
    StopAnyPedModelBeingSuppressed();
  }

  static unregisterHeadshot(id: number): void {
    UnregisterPedheadshot(id);
  }

  get handle(): number {
    return this._handle;
  }

  addArmour(amount: number): void {
    AddArmourToPed(this._handle, amount);
  }

  addDecorationFromHashes(collection: number, overlay: number): void {
    AddPedDecorationFromHashes(this._handle, collection, overlay);
  }

  addDecorationFromHashesInCorona(collection: number, overlay: number): void {
    AddPedDecorationFromHashesInCorona(this._handle, collection, overlay);
  }

  applyDamage(damageAmount: number, armorFirst: boolean): void {
    ApplyDamageToPed(this._handle, damageAmount, armorFirst);
  }

  applyBlood(boneIndex: number, rot: IVector3, woundType: string): void {
    ApplyPedBlood(this._handle, boneIndex, rot.x, rot.y, rot.z, woundType);
  }

  applyBloodByZone(p1: any, p2: number, p3: number): void {
    ApplyPedBloodByZone(this._handle, p1, p2, p3);
  }

  applyBloodDamageByZone(p1: any, p2: number, p3: number, p4: any): void {
    ApplyPedBloodDamageByZone(this._handle, p1, p2, p3, p4);
  }
  get killFallHeight():number {
    return GetKillFallHeight()
  }
  applyBloodSpecific(
    component: number,
    u: number,
    v: number,
    rotation: number,
    scale: number,
    forcedFrame: number,
    preAge: number,
    bloodName: string,
  ): void {
    ApplyPedBloodSpecific(this._handle, component, u, v, rotation, scale, forcedFrame, preAge, bloodName);
  }

  applyDamageDecal(
    damageZone: number,
    xOffset: number,
    yOffset: number,
    heading: number,
    scale: number,
    alpha: number,
    variation: number,
    fadeIn: boolean,
    decalName: string,
  ): void {
    ApplyPedDamageDecal(this._handle, damageZone, xOffset, yOffset, heading, scale, alpha, variation, fadeIn, decalName);
  }

  applyDamagePack(damagePack: string, damage: number, mult: number): void {
    ApplyPedDamagePack(this._handle, damagePack, damage, mult);
  }

  blockDeadBodyShockingEvents(toggle: boolean): void {
    BlockPedDeadBodyShockingEvents(this._handle, toggle);
  }

  canKnockOffVehicle(): boolean {
    return CanKnockPedOffVehicle(this._handle);
  }

  canInCombatSeeTarget(targetPedHandle: number): boolean {
    return CanPedInCombatSeeTarget(this._handle, targetPedHandle);
  }

  canRagdoll(): boolean {
    return CanPedRagdoll(this._handle);
  }

  canSeeHatedPed(ped2Handle: number): boolean {
    return CanPedSeeHatedPed(this._handle, ped2Handle);
  }

  clearAllProps(): void {
    ClearAllPedProps(this._handle);
  }

  clearAllVehicleForcedSeatUsage(): void {
    ClearAllPedVehicleForcedSeatUsage(this._handle);
  }

  clearAlternateMovementAnim(stance: number, p2: number): void {
    ClearPedAlternateMovementAnim(this._handle, stance, p2);
  }

  clearAlternateWalkAnim(p1: number): void {
    ClearPedAlternateWalkAnim(this._handle, p1);
  }

  clearBloodDamage(): void {
    ClearPedBloodDamage(this._handle);
  }

  clearBloodDamageByZone(p1: number): void {
    ClearPedBloodDamageByZone(this._handle, p1);
  }

  clearCoverClipsetOverride(): void {
    ClearPedCoverClipsetOverride(this._handle);
  }

  clearDamageDecalByZone(p1: number, p2: string): void {
    ClearPedDamageDecalByZone(this._handle, p1, p2);
  }

  clearDecorations(): void {
    ClearPedDecorations(this._handle);
  }

  clearDecorationsLeaveScars(): void {
    ClearPedDecorationsLeaveScars(this._handle);
  }

  clearDriveByClipsetOverride(): void {
    ClearPedDriveByClipsetOverride(this._handle);
  }

  clearEnvDirt(): void {
    ClearPedEnvDirt(this._handle);
  }

  clearLastDamageBone(): void {
    ClearPedLastDamageBone(this._handle);
  }

  clearParachutePackVariation(): void {
    ClearPedParachutePackVariation(this._handle);
  }

  clearProp(propId: number): void {
    ClearPedProp(this._handle, propId);
  }

  clearScubaGearVariation(): void {
    ClearPedScubaGearVariation(this._handle);
  }

  clearStoredHatProp(): void {
    ClearPedStoredHatProp(this._handle);
  }

  clearWetness(): void {
    ClearPedWetness(this._handle);
  }

  clearRagdollBlockingFlags(flags: number): void {
    ClearRagdollBlockingFlags(this._handle, flags);
  }

  clone(isNetwork: boolean, bScriptHostPed: boolean, copyHeadBlendFlag: boolean): Ped | null {
    const handle = ClonePed(this._handle, isNetwork, bScriptHostPed, copyHeadBlendFlag);
    return Ped.fromHandle(handle);
  }

  cloneEx(heading: number, isNetwork: boolean, bScriptHostPed: boolean, p4: any): Ped | null {
    const handle = ClonePedEx(this._handle, heading, isNetwork, bScriptHostPed, p4);
    return Ped.fromHandle(handle);
  }

  cloneToTarget(targetPedHandle: number): void {
    ClonePedToTarget(this._handle, targetPedHandle);
  }

  cloneToTargetEx(targetPedHandle: number, p2: any): void {
    ClonePedToTargetEx(this._handle, targetPedHandle, p2);
  }

  disableHeatscaleOverride(): void {
    DisablePedHeatscaleOverride(this._handle);
  }

  explodeHead(weaponHash: number): void {
    ExplodePedHead(this._handle, weaponHash);
  }

  forceMotionState(motionStateHash: number, shouldReset: boolean, updateState: number, forceAIPreCameraUpdate: boolean): void {
    ForcePedMotionState(this._handle, motionStateHash, shouldReset, updateState, forceAIPreCameraUpdate);
  }

  forceToOpenParachute(): void {
    ForcePedToOpenParachute(this._handle);
  }

  freezeCameraRotation(): void {
    FreezePedCameraRotation(this._handle);
  }

  getCombatFloat(p1: number): number {
    return GetCombatFloat(this._handle, p1);
  }

  getDeadPickupCoords(p1: number, p2: number): IVector3 {
    const [x, y, z] = GetDeadPedPickupCoords(this._handle, p1, p2);
    return { x, y, z };
  }

  getMeleeTarget(): number {
    return GetMeleeTargetForPed(this._handle);
  }

  getMount(): number {
    return GetMount(this._handle);
  }

  getNumberOfDrawableVariations(componentId: number): number {
    return GetNumberOfPedDrawableVariations(this._handle, componentId);
  }

  getNumberOfPropDrawableVariations(propId: number): number {
    return GetNumberOfPedPropDrawableVariations(this._handle, propId);
  }

  getNumberOfPropTextureVariations(propId: number, drawableId: number): number {
    return GetNumberOfPedPropTextureVariations(this._handle, propId, drawableId);
  }

  getNumberOfTextureVariations(componentId: number, drawableId: number): number {
    return GetNumberOfPedTextureVariations(this._handle, componentId, drawableId);
  }

  getAccuracy(): number {
    return GetPedAccuracy(this._handle);
  }

  getAlertness(): number {
    return GetPedAlertness(this._handle);
  }

  getArmour(): number {
    return GetPedArmour(this._handle);
  }

  getBoneCoords(boneId: number, offset: IVector3): IVector3 {
    const [x, y, z] = GetPedBoneCoords(this._handle, boneId, offset.x, offset.y, offset.z);
    return { x, y, z };
  }

  getBoneIndex(boneId: number): number {
    return GetPedBoneIndex(this._handle, boneId);
  }

  getCauseOfDeath(): number {
    return GetPedCauseOfDeath(this._handle);
  }

  getCombatMovement(): number {
    return GetPedCombatMovement(this._handle);
  }

  getCombatRange(): number {
    return GetPedCombatRange(this._handle);
  }

  getConfigFlag(flagId: number, p2: boolean): boolean {
    return GetPedConfigFlag(this._handle, flagId, p2);
  }

  getCurrentMovementSpeed(): [boolean, number, number] {
    return GetPedCurrentMovementSpeed(this._handle);
  }

  getDecorationsState(): number {
    return GetPedDecorationsState(this._handle);
  }

  getDefensiveAreaPosition(p1: boolean): IVector3 {
    const [x, y, z] = GetPedDefensiveAreaPosition(this._handle, p1);
    return { x, y, z };
  }

  getDiesInWater(): boolean {
    return GetPedDiesInWater(this._handle);
  }

  getDrawableVariation(componentId: number): number {
    return GetPedDrawableVariation(this._handle, componentId);
  }

  getEmissiveIntensity(): number {
    return GetPedEmissiveIntensity(this._handle);
  }

  getEnveffScale(): number {
    return GetPedEnveffScale(this._handle);
  }

  getEventData(eventType: number): any {
    return GetPedEventData(this._handle, eventType);
  }

  getExtractedDisplacement(worldSpace: boolean): IVector3 {
    const [x, y, z] = GetPedExtractedDisplacement(this._handle, worldSpace);
    return { x, y, z };
  }

  getGroupIndex(): number {
    return GetPedGroupIndex(this._handle);
  }

  getHeadBlendData(): any {
    return GetPedHeadBlendData(this._handle);
  }

  getHeadOverlayValue(overlayID: number): number {
    return GetPedHeadOverlayValue(this._handle, overlayID);
  }

  getHelmetStoredHatPropIndex(): number {
    return GetPedHelmetStoredHatPropIndex(this._handle);
  }

  getHelmetStoredHatTexIndex(): number {
    return GetPedHelmetStoredHatTexIndex(this._handle);
  }

  getLastDamageBone(): number {
    return GetPedLastDamageBone(this._handle)[1];
  }

  getMaxHealth(): number {
    return GetPedMaxHealth(this._handle);
  }

  getMoney(): number {
    return GetPedMoney(this._handle);
  }

  getNearbyPeds(ignore: number): number {
    return GetPedNearbyPeds(this._handle, ignore)[0];
  }

  getNearbyVehicles(): number {
    return GetPedNearbyVehicles(this._handle)[1];
  }

  getPaletteVariation(componentId: number): number {
    return GetPedPaletteVariation(this._handle, componentId);
  }

  getParachuteLandingType(): number {
    return GetPedParachuteLandingType(this._handle);
  }

  getParachuteState(): number {
    return GetPedParachuteState(this._handle);
  }

  getParachuteTintIndex(): number {
    return GetPedParachuteTintIndex(this._handle);
  }

  getPropIndex(componentId: number): number {
    return GetPedPropIndex(this._handle, componentId);
  }

  getPropTextureIndex(componentId: number): number {
    return GetPedPropTextureIndex(this._handle, componentId);
  }

  getRagdollBoneIndex(bone: number): number {
    return GetPedRagdollBoneIndex(this._handle, bone);
  }

  getRelationshipGroupDefaultHash(): number {
    return GetPedRelationshipGroupDefaultHash(this._handle);
  }

  getRelationshipGroupHash(): number {
    return GetPedRelationshipGroupHash(this._handle);
  }

  getResetFlag(flagId: number): boolean {
    return GetPedResetFlag(this._handle, flagId);
  }

  getSourceOfDeath(): number {
    return GetPedSourceOfDeath(this._handle);
  }

  getStealthMovement(): boolean {
    return GetPedStealthMovement(this._handle);
  }

  getTaskCombatTarget(p1: any): number {
    return GetPedTaskCombatTarget(this._handle, p1);
  }

  getTextureVariation(componentId: number): number {
    return GetPedTextureVariation(this._handle, componentId);
  }

  getTimeOfDeath(): number {
    return GetPedTimeOfDeath(this._handle);
  }

  getType(): number {
    return GetPedType(this._handle);
  }

  getVisualFieldCenterAngle(): number {
    return GetPedVisualFieldCenterAngle(this._handle);
  }

  getJacker(): number {
    return GetPedsJacker(this._handle);
  }

  getPlayerIsFollowing(): number {
    return GetPlayerPedIsFollowing(this._handle);
  }

  getSeatIsTryingToEnter(): number {
    return GetSeatPedIsTryingToEnter(this._handle);
  }

  getTimeOfLastWeaponDamage(weaponHash: number): number {
    return GetTimeOfLastPedWeaponDamage(this._handle, weaponHash);
  }

  getVehicleIsEntering(): number {
    return GetVehiclePedIsEntering(this._handle);
  }

  getVehicleIsIn(lastVehicle: boolean): number {
    return GetVehiclePedIsIn(this._handle, lastVehicle);
  }

  getVehicleIsTryingToEnter(): number {
    return GetVehiclePedIsTryingToEnter(this._handle);
  }

  getVehicleIsUsing(): number {
    return GetVehiclePedIsUsing(this._handle);
  }

  giveHelmet(cannotRemove: boolean, helmetFlag: number, textureIndex: number): void {
    GivePedHelmet(this._handle, cannotRemove, helmetFlag, textureIndex);
  }

  giveNmMessage(): void {
    GivePedNmMessage(this._handle);
  }

  hasHeadBlendFinished(): boolean {
    return HasPedHeadBlendFinished(this._handle);
  }

  hasPreloadPropDataFinished(): boolean {
    return HasPedPreloadPropDataFinished(this._handle);
  }

  hasPreloadVariationDataFinished(): boolean {
    return HasPedPreloadVariationDataFinished(this._handle);
  }

  hasReceivedEvent(eventId: number): boolean {
    return HasPedReceivedEvent(this._handle, eventId);
  }

  haveAllStreamingRequestsCompleted(): boolean {
    return HaveAllStreamingRequestsCompleted(this._handle);
  }

  hideBloodDamageByZone(p1: any, p2: boolean): void {
    HidePedBloodDamageByZone(this._handle, p1, p2);
  }

  isAnyHostileNearPoint(pos: IVector3, radius: number): boolean {
    return IsAnyHostilePedNearPoint(this._handle, pos.x, pos.y, pos.z, radius);
  }

  isConversationDead(): boolean {
    return IsConversationPedDead(this._handle);
  }

  isAPlayer(): boolean {
    return IsPedAPlayer(this._handle);
  }

  isAimingFromCover(): boolean {
    return IsPedAimingFromCover(this._handle);
  }

  isBeingJacked(): boolean {
    return IsPedBeingJacked(this._handle);
  }

  isBeingStealthKilled(): boolean {
    return IsPedBeingStealthKilled(this._handle);
  }

  isBeingStunned(p1: number): boolean {
    return IsPedBeingStunned(this._handle, p1);
  }

  isClimbing(): boolean {
    return IsPedClimbing(this._handle);
  }

  isComponentVariationValid(componentId: number, drawableId: number, textureId: number): boolean {
    return IsPedComponentVariationValid(this._handle, componentId, drawableId, textureId);
  }

  isDeadOrDying(checkMeleeDeathFlags: boolean): boolean {
    return IsPedDeadOrDying(this._handle, checkMeleeDeathFlags);
  }

  isDefensiveAreaActive(p1: boolean): boolean {
    return IsPedDefensiveAreaActive(this._handle, p1);
  }

  isDiving(): boolean {
    return IsPedDiving(this._handle);
  }

  isDoingBeastJump(): boolean {
    return IsPedDoingBeastJump(this._handle);
  }

  isDoingDriveby(): boolean {
    return IsPedDoingDriveby(this._handle);
  }

  isDucking(): boolean {
    return IsPedDucking(this._handle);
  }

  isEvasiveDiving(): boolean {
    return IsPedEvasiveDiving(this._handle)[0];
  }

  isFacingPed(otherPedHandle: number, angle: number): boolean {
    return IsPedFacingPed(this._handle, otherPedHandle, angle);
  }

  isFalling(): boolean {
    return IsPedFalling(this._handle);
  }

  isFatallyInjured(): boolean {
    return IsPedFatallyInjured(this._handle);
  }

  isFleeing(): boolean {
    return IsPedFleeing(this._handle);
  }

  isGettingIntoAVehicle(): boolean {
    return IsPedGettingIntoAVehicle(this._handle);
  }

  isGoingIntoCover(): boolean {
    return IsPedGoingIntoCover(this._handle);
  }

  isGroupMember(groupId: number): boolean {
    return IsPedGroupMember(this._handle, groupId);
  }

  isHangingOnToVehicle(): boolean {
    return IsPedHangingOnToVehicle(this._handle);
  }

  isHeadingTowardsPosition(pos: IVector3, p4: number): boolean {
    return IsPedHeadingTowardsPosition(this._handle, pos.x, pos.y, pos.z, p4);
  }

  isHeadtrackingEntity(entityHandle: number): boolean {
    return IsPedHeadtrackingEntity(this._handle, entityHandle);
  }

  isHeadtrackingPed(ped2Handle: number): boolean {
    return IsPedHeadtrackingPed(this._handle, ped2Handle);
  }

  isHelmetUnk(): boolean {
    return IsPedHelmetUnk(this._handle);
  }

  isHuman(): boolean {
    return IsPedHuman(this._handle);
  }

  isHurt(): boolean {
    return IsPedHurt(this._handle);
  }

  isInAnyBoat(): boolean {
    return IsPedInAnyBoat(this._handle);
  }

  isInAnyHeli(): boolean {
    return IsPedInAnyHeli(this._handle);
  }

  isInAnyPlane(): boolean {
    return IsPedInAnyPlane(this._handle);
  }

  isInAnyPoliceVehicle(): boolean {
    return IsPedInAnyPoliceVehicle(this._handle);
  }

  isInAnySub(): boolean {
    return IsPedInAnySub(this._handle);
  }

  isInAnyTaxi(): boolean {
    return IsPedInAnyTaxi(this._handle);
  }

  isInAnyTrain(): boolean {
    return IsPedInAnyTrain(this._handle);
  }

  isInAnyVehicle(atGetIn: boolean): boolean {
    return IsPedInAnyVehicle(this._handle, atGetIn);
  }

  isInCombat(targetPedHandle: number): boolean {
    return IsPedInCombat(this._handle, targetPedHandle);
  }

  isInCover(exceptUseWeapon: boolean): boolean {
    return IsPedInCover(this._handle, exceptUseWeapon);
  }

  isInCoverFacingLeft(): boolean {
    return IsPedInCoverFacingLeft(this._handle);
  }

  isInFlyingVehicle(): boolean {
    return IsPedInFlyingVehicle(this._handle);
  }

  isInGroup(): boolean {
    return IsPedInGroup(this._handle);
  }

  isInHighCover(): boolean {
    return IsPedInHighCover(this._handle);
  }

  isInMeleeCombat(): boolean {
    return IsPedInMeleeCombat(this._handle);
  }

  isInModel(modelHash: number): boolean {
    return IsPedInModel(this._handle, modelHash);
  }

  isInParachuteFreeFall(): boolean {
    return IsPedInParachuteFreeFall(this._handle);
  }

  isInSphereAreaOfAnyEnemyPeds(pos: IVector3, range: number): boolean {
    return IsPedInSphereAreaOfAnyEnemyPeds(this._handle, pos.x, pos.y, pos.z, range);
  }

  isInVehicle(vehicleHandle: number, atGetIn: boolean): boolean {
    return IsPedInVehicle(this._handle, vehicleHandle, atGetIn);
  }

  isInjured(): boolean {
    return IsPedInjured(this._handle);
  }

  isJacking(): boolean {
    return IsPedJacking(this._handle);
  }

  isJumping(): boolean {
    return IsPedJumping(this._handle);
  }

  isJumpingOutOfVehicle(): boolean {
    return IsPedJumpingOutOfVehicle(this._handle);
  }

  isMale(): boolean {
    return IsPedMale(this._handle);
  }

  isModel(modelHash: number): boolean {
    return IsPedModel(this._handle, modelHash);
  }

  isOnAnyBike(): boolean {
    return IsPedOnAnyBike(this._handle);
  }

  isOnFoot(): boolean {
    return IsPedOnFoot(this._handle);
  }

  isOnMount(): boolean {
    return IsPedOnMount(this._handle);
  }

  isOnSpecificVehicle(vehicleHandle: number): boolean {
    return IsPedOnSpecificVehicle(this._handle, vehicleHandle);
  }

  isOnVehicle(): boolean {
    return IsPedOnVehicle(this._handle);
  }

  isOpeningADoor(): boolean {
    return IsPedOpeningADoor(this._handle);
  }

  isPerformingDependentComboLimit(): boolean {
    return IsPedPerformingDependentComboLimit(this._handle);
  }

  isPerformingMeleeAction(): boolean {
    return IsPedPerformingMeleeAction(this._handle);
  }

  isPerformingStealthKill(): boolean {
    return IsPedPerformingStealthKill(this._handle);
  }

  isPlantingBomb(): boolean {
    return IsPedPlantingBomb(this._handle);
  }

  isProne(): boolean {
    return IsPedProne(this._handle);
  }

  isRagdoll(): boolean {
    return IsPedRagdoll(this._handle);
  }

  isReloading(): boolean {
    return IsPedReloading(this._handle);
  }

  isRespondingToEvent(event: any): boolean {
    return IsPedRespondingToEvent(this._handle, event);
  }

  isRunningMeleeTask(): boolean {
    return IsPedRunningMeleeTask(this._handle);
  }

  isRunningMobilePhoneTask(): boolean {
    return IsPedRunningMobilePhoneTask(this._handle);
  }

  isRunningRagdollTask(): boolean {
    return IsPedRunningRagdollTask(this._handle);
  }

  isShaderEffectValid(): boolean {
    return IsPedShaderEffectValid(this._handle);
  }

  isSheltered(): boolean {
    return IsPedSheltered(this._handle);
  }

  isShooting(): boolean {
    return IsPedShooting(this._handle);
  }

  isShootingInArea(min: IVector3, max: IVector3, p7: boolean, p8: boolean): boolean {
    return IsPedShootingInArea(this._handle, min.x, min.y, min.z, max.x, max.y, max.z, p7, p8);
  }

  isSittingInAnyVehicle(): boolean {
    return IsPedSittingInAnyVehicle(this._handle);
  }

  isSittingInVehicle(vehicleHandle: number): boolean {
    return IsPedSittingInVehicle(this._handle, vehicleHandle);
  }

  isStopped(): boolean {
    return IsPedStopped(this._handle);
  }

  isSwappingWeapon(): boolean {
    return IsPedSwappingWeapon(this._handle);
  }

  isSwimming(): boolean {
    return IsPedSwimming(this._handle);
  }

  isSwimmingUnderWater(): boolean {
    return IsPedSwimmingUnderWater(this._handle);
  }

  isTakingOffHelmet(): boolean {
    return IsPedTakingOffHelmet(this._handle);
  }

  isTracked(): boolean {
    return IsPedTracked(this._handle);
  }

  isTryingToEnterALockedVehicle(): boolean {
    return IsPedTryingToEnterALockedVehicle(this._handle);
  }

  isUsingActionMode(): boolean {
    return IsPedUsingActionMode(this._handle);
  }

  isUsingAnyScenario(): boolean {
    return IsPedUsingAnyScenario(this._handle);
  }

  isUsingScenario(scenario: string): boolean {
    return IsPedUsingScenario(this._handle, scenario);
  }

  isVaulting(): boolean {
    return IsPedVaulting(this._handle);
  }

  isWearingHelmet(): boolean {
    return IsPedWearingHelmet(this._handle);
  }

  isScriptedScenarioUsingConditionalAnim(animDict: string, anim: string): boolean {
    return IsScriptedScenarioPedUsingConditionalAnim(this._handle, animDict, anim);
  }

  isTrackedVisible(): boolean {
    return IsTrackedPedVisible(this._handle);
  }

  knockOffProp(p1: boolean, p2: boolean, p3: boolean, p4: boolean): void {
    KnockOffPedProp(this._handle, p1, p2, p3, p4);
  }

  knockOffVehicle(): void {
    KnockPedOffVehicle(this._handle);
  }

  registerHatedTargetsAround(radius: number): void {
    RegisterHatedTargetsAroundPed(this._handle, radius);
  }

  registerHeadshot(): void {
    RegisterPedheadshot(this._handle);
  }

  registerHeadshot3(): void {
    RegisterPedheadshot_3(this._handle);
  }

  registerHeadshotTransparent(): void {
    RegisterPedheadshotTransparent(this._handle);
  }

  registerTarget(targetHandle: number): void {
    RegisterTarget(this._handle, targetHandle);
  }

  releasePreloadPropData(): void {
    ReleasePedPreloadPropData(this._handle);
  }

  releasePreloadVariationData(): void {
    ReleasePedPreloadVariationData(this._handle);
  }

  removeDefensiveArea(toggle: boolean): void {
    RemovePedDefensiveArea(this._handle, toggle);
  }

  removeElegantly(): void {
    RemovePedElegantly(this._handle);
  }

  removeFromGroup(): void {
    RemovePedFromGroup(this._handle);
  }

  removeHelmet(instantly: boolean): void {
    RemovePedHelmet(this._handle, instantly);
  }

  removePreferredCoverSet(): void {
    RemovePedPreferredCoverSet(this._handle);
  }

  requestVehicleVisibilityTracking(p1: boolean): void {
    RequestPedVehicleVisibilityTracking(this._handle, p1);
  }

  requestVisibilityTracking(): void {
    RequestPedVisibilityTracking(this._handle);
  }

  resetInVehicleContext(): void {
    ResetPedInVehicleContext(this._handle);
  }

  resetLastVehicle(): void {
    ResetPedLastVehicle(this._handle);
  }

  resetMovementClipset(transitionSpeed: number): void {
    ResetPedMovementClipset(this._handle, transitionSpeed);
  }

  resetRagdollTimer(): void {
    ResetPedRagdollTimer(this._handle);
  }

  resetStrafeClipset(): void {
    ResetPedStrafeClipset(this._handle);
  }

  resetVisibleDamage(): void {
    ResetPedVisibleDamage(this._handle);
  }

  resetWeaponMovementClipset(): void {
    ResetPedWeaponMovementClipset(this._handle);
  }

  resurrect(): void {
    ResurrectPed(this._handle);
  }

  reviveInjured(): void {
    ReviveInjuredPed(this._handle);
  }

  setBlockingOfNonTemporaryEvents(toggle: boolean): void {
    SetBlockingOfNonTemporaryEvents(this._handle, toggle);
  }

  setCanAttackFriendly(toggle: boolean, p2: boolean): void {
    SetCanAttackFriendly(this._handle, toggle, p2);
  }

  setEnableHandcuffs(toggle: boolean): void {
    SetEnableHandcuffs(this._handle, toggle);
  }

  setEnableEnveffScale(toggle: boolean): void {
    SetEnablePedEnveffScale(this._handle, toggle);
  }

  setIkTarget(
    ikIndex: number,
    entityLookAtHandle: number,
    boneLookAt: number,
    offset: IVector3,
    ikTargetFlags: number,
    blendInDuration: number,
    blendOutDuration: number,
  ): void {
    SetIkTarget(
      this._handle,
      ikIndex,
      entityLookAtHandle,
      boneLookAt,
      offset.x,
      offset.y,
      offset.z,
      ikTargetFlags,
      blendInDuration,
      blendOutDuration,
    );
  }

  setAccuracy(accuracy: number): void {
    SetPedAccuracy(this._handle, accuracy);
  }

  setAlertness(value: number): void {
    SetPedAlertness(this._handle, value);
  }

  setAllowVehiclesOverride(toggle: boolean): void {
    SetPedAllowVehiclesOverride(this._handle, toggle);
  }

  setAllowedToDuck(toggle: boolean): void {
    SetPedAllowedToDuck(this._handle, toggle);
  }

  setAlternateMovementAnim(stance: number, animDictionary: string, animationName: string, p4: number, p5: boolean): void {
    SetPedAlternateMovementAnim(this._handle, stance, animDictionary, animationName, p4, p5);
  }

  setAlternateWalkAnim(animDict: string, animName: string, p3: number, p4: boolean): void {
    SetPedAlternateWalkAnim(this._handle, animDict, animName, p3, p4);
  }

  setAngledDefensiveArea(
    p1: number,
    p2: number,
    p3: number,
    p4: number,
    p5: number,
    p6: number,
    p7: number,
    p8: boolean,
    p9: boolean,
  ): void {
    SetPedAngledDefensiveArea(this._handle, p1, p2, p3, p4, p5, p6, p7, p8, p9);
  }

  setAoBlobRendering(toggle: boolean): void {
    SetPedAoBlobRendering(this._handle, toggle);
  }

  setArmour(amount: number): void {
    SetPedArmour(this._handle, amount);
  }

  setAsCop(toggle: boolean): void {
    SetPedAsCop(this._handle, toggle);
  }

  setAsEnemy(toggle: boolean): void {
    SetPedAsEnemy(this._handle, toggle);
  }

  setAsGroupLeader(groupId: number): void {
    SetPedAsGroupLeader(this._handle, groupId);
  }

  setAsGroupMember(groupId: number): void {
    SetPedAsGroupMember(this._handle, groupId);
  }

  setBlendFromParents(fatherHandle: number, motherHandle: number, fathersSide: number, mothersSide: number): void {
    SetPedBlendFromParents(this._handle, fatherHandle, motherHandle, fathersSide, mothersSide);
  }

  setBlocksPathingWhenDead(toggle: boolean): void {
    SetPedBlocksPathingWhenDead(this._handle, toggle);
  }

  setBoundsOrientation(p1: number, p2: number, p3: number, p4: number, p5: number): void {
    SetPedBoundsOrientation(this._handle, p1, p2, p3, p4, p5);
  }

  setCanArmIk(toggle: boolean): void {
    SetPedCanArmIk(this._handle, toggle);
  }

  setCanBeDraggedOut(toggle: boolean): void {
    SetPedCanBeDraggedOut(this._handle, toggle);
  }

  setCanBeKnockedOffVehicle(state: number): void {
    SetPedCanBeKnockedOffVehicle(this._handle, state);
  }

  setCanBeShotInVehicle(toggle: boolean): void {
    SetPedCanBeShotInVehicle(this._handle, toggle);
  }

  setCanBeTargetedWhenInjured(toggle: boolean): void {
    SetPedCanBeTargetedWhenInjured(this._handle, toggle);
  }

  setCanBeTargetedWithoutLos(toggle: boolean): void {
    SetPedCanBeTargetedWithoutLos(this._handle, toggle);
  }

  setCanBeTargetted(toggle: boolean): void {
    SetPedCanBeTargetted(this._handle, toggle);
  }

  setCanBeTargettedByPlayer(playerHandle: number, toggle: boolean): void {
    SetPedCanBeTargettedByPlayer(this._handle, playerHandle, toggle);
  }

  setCanBeTargettedByTeam(team: number, toggle: boolean): void {
    SetPedCanBeTargettedByTeam(this._handle, team, toggle);
  }

  setCanCowerInCover(toggle: boolean): void {
    SetPedCanCowerInCover(this._handle, toggle);
  }

  setCanEvasiveDive(toggle: boolean): void {
    SetPedCanEvasiveDive(this._handle, toggle);
  }

  setCanHeadIk(toggle: boolean): void {
    SetPedCanHeadIk(this._handle, toggle);
  }

  setCanLegIk(toggle: boolean): void {
    SetPedCanLegIk(this._handle, toggle);
  }

  setCanLosePropsOnDamage(loseProps: boolean, p2: number): void {
    SetPedCanLosePropsOnDamage(this._handle, loseProps, p2);
  }

  setCanPeekInCover(toggle: boolean): void {
    SetPedCanPeekInCover(this._handle, toggle);
  }

  setCanPlayAmbientAnims(toggle: boolean): void {
    SetPedCanPlayAmbientAnims(this._handle, toggle);
  }

  setCanPlayAmbientBaseAnims(toggle: boolean): void {
    SetPedCanPlayAmbientBaseAnims(this._handle, toggle);
  }

  setCanPlayGestureAnims(toggle: boolean): void {
    SetPedCanPlayGestureAnims(this._handle, toggle);
  }

  setCanPlayInjuredAnims(p1: boolean): void {
    SetPedCanPlayInjuredAnims(this._handle, p1);
  }

  setCanPlayVisemeAnims(toggle: boolean, p2: boolean): void {
    SetPedCanPlayVisemeAnims(this._handle, toggle, p2);
  }

  setCanRagdoll(toggle: boolean): void {
    SetPedCanRagdoll(this._handle, toggle);
  }

  setCanRagdollFromPlayerImpact(toggle: boolean): void {
    SetPedCanRagdollFromPlayerImpact(this._handle, toggle);
  }

  setCanSmashGlass(p1: boolean, p2: boolean): void {
    SetPedCanSmashGlass(this._handle, p1, p2);
  }

  setCanSwitchWeapon(toggle: boolean): void {
    SetPedCanSwitchWeapon(this._handle, toggle);
  }

  setCanTeleportToGroupLeader(groupHandle: number, toggle: boolean): void {
    SetPedCanTeleportToGroupLeader(this._handle, groupHandle, toggle);
  }

  setCanTorsoIk(toggle: boolean): void {
    SetPedCanTorsoIk(this._handle, toggle);
  }

  setCanTorsoReactIk(p1: boolean): void {
    SetPedCanTorsoReactIk(this._handle, p1);
  }

  setCanTorsoVehicleIk(p1: boolean): void {
    SetPedCanTorsoVehicleIk(this._handle, p1);
  }

  setCanUseAutoConversationLookat(toggle: boolean): void {
    SetPedCanUseAutoConversationLookat(this._handle, toggle);
  }

  setCapsule(value: number): void {
    SetPedCapsule(this._handle, value);
  }

  setClothPackageIndex(p1: number): void {
    SetPedClothPackageIndex(this._handle, p1);
  }

  setClothProne(p0: any): void {
    SetPedClothProne(this._handle, p0);
  }

  setCombatAbility(p1: number): void {
    SetPedCombatAbility(this._handle, p1);
  }

  setCombatAttributes(attributeIndex: number, enabled: boolean): void {
    SetPedCombatAttributes(this._handle, attributeIndex, enabled);
  }

  setCombatMovement(combatMovement: number): void {
    SetPedCombatMovement(this._handle, combatMovement);
  }

  setCombatRange(range: number): void {
    SetPedCombatRange(this._handle, range);
  }

  setComponentVariation(componentId: number, drawableId: number, textureId: number, paletteId: number): void {
    SetPedComponentVariation(this._handle, componentId, drawableId, textureId, paletteId);
  }

  setConfigFlag(flagId: number, value: boolean): void {
    SetPedConfigFlag(this._handle, flagId, value);
  }

  setCoordsKeepVehicle(pos: IVector3): void {
    SetPedCoordsKeepVehicle(this._handle, pos.x, pos.y, pos.z);
  }

  setCoordsNoGang(pos: IVector3): void {
    SetPedCoordsNoGang(this._handle, pos.x, pos.y, pos.z);
  }

  setCoverClipsetOverride(p1: string): void {
    SetPedCoverClipsetOverride(this._handle, p1);
  }

  setCowerHash(p1: string): void {
    SetPedCowerHash(this._handle, p1);
  }

  setDefaultComponentVariation(): void {
    SetPedDefaultComponentVariation(this._handle);
  }

  setDefensiveAreaAttachedToPed(
    attachPedHandle: number,
    p2: number,
    p3: number,
    p4: number,
    p5: number,
    p6: number,
    p7: number,
    p8: number,
    p9: boolean,
    p10: boolean,
  ): void {
    SetPedDefensiveAreaAttachedToPed(this._handle, attachPedHandle, p2, p3, p4, p5, p6, p7, p8, p9, p10);
  }

  setDefensiveAreaDirection(p1: number, p2: number, p3: number, p4: boolean): void {
    SetPedDefensiveAreaDirection(this._handle, p1, p2, p3, p4);
  }

  setDefensiveSphereAttachedToPed(targetHandle: number, offset: IVector3, radius: number, p6: boolean): void {
    SetPedDefensiveSphereAttachedToPed(this._handle, targetHandle, offset.x, offset.y, offset.z, radius, p6);
  }

  setDefensiveSphereAttachedToVehicle(targetHandle: number, offset: IVector3, radius: number, p6: boolean): void {
    SetPedDefensiveSphereAttachedToVehicle(this._handle, targetHandle, offset.x, offset.y, offset.z, radius, p6);
  }

  setDesiredHeading(heading: number): void {
    SetPedDesiredHeading(this._handle, heading);
  }

  setDiesInSinkingVehicle(toggle: boolean): void {
    SetPedDiesInSinkingVehicle(this._handle, toggle);
  }

  setDiesInVehicle(toggle: boolean): void {
    SetPedDiesInVehicle(this._handle, toggle);
  }

  setDiesInWater(toggle: boolean): void {
    SetPedDiesInWater(this._handle, toggle);
  }

  setDiesInstantlyInWater(toggle: boolean): void {
    SetPedDiesInstantlyInWater(this._handle, toggle);
  }

  setDiesWhenInjured(toggle: boolean): void {
    SetPedDiesWhenInjured(this._handle, toggle);
  }

  setDriveByClipsetOverride(clipset: string): void {
    SetPedDriveByClipsetOverride(this._handle, clipset);
  }

  setDucking(toggle: boolean): void {
    SetPedDucking(this._handle, toggle);
  }

  setEmissiveIntensity(intensity: number): void {
    SetPedEmissiveIntensity(this._handle, intensity);
  }

  setEnableWeaponBlocking(toggle: boolean): void {
    SetPedEnableWeaponBlocking(this._handle, toggle);
  }

  setEnveffColorModulator(r: number, g: number, b: number): void {
    SetPedEnveffColorModulator(this._handle, r, g, b);
  }

  setEnveffScale(value: number): void {
    SetPedEnveffScale(this._handle, value);
  }

  setEyeColor(index: number): void {
    SetPedEyeColor(this._handle, index);
  }

  setFaceFeature(index: number, scale: number): void {
    SetPedFaceFeature(this._handle, index, scale);
  }

  setFiringPattern(patternHash: number): void {
    SetPedFiringPattern(this._handle, patternHash);
  }

  setFleeAttributes(attributeFlags: number, enable: boolean): void {
    SetPedFleeAttributes(this._handle, attributeFlags, enable);
  }

  setGeneratesDeadBodyEvents(toggle: boolean): void {
    SetPedGeneratesDeadBodyEvents(this._handle, toggle);
  }

  setGestureGroup(animGroupGesture: string): void {
    SetPedGestureGroup(this._handle, animGroupGesture);
  }

  setGetOutUpsideDownVehicle(toggle: boolean): void {
    SetPedGetOutUpsideDownVehicle(this._handle, toggle);
  }

  setGravity(toggle: boolean): void {
    SetPedGravity(this._handle, toggle);
  }

  setGroupMemberPassengerIndex(index: number): void {
    SetPedGroupMemberPassengerIndex(this._handle, index);
  }

  setHairTint(colorID: number, highlightColorID: number): void {
    SetPedHairTint(this._handle, colorID, highlightColorID);
  }

  setHeadBlendData(
    shapeFirstID: number,
    shapeSecondID: number,
    shapeThirdID: number,
    skinFirstID: number,
    skinSecondID: number,
    skinThirdID: number,
    shapeMix: number,
    skinMix: number,
    thirdMix: number,
    isParent: boolean,
  ): void {
    SetPedHeadBlendData(
      this._handle,
      shapeFirstID,
      shapeSecondID,
      shapeThirdID,
      skinFirstID,
      skinSecondID,
      skinThirdID,
      shapeMix,
      skinMix,
      thirdMix,
      isParent,
    );
  }

  setHeadOverlay(overlayID: number, index: number, opacity: number): void {
    SetPedHeadOverlay(this._handle, overlayID, index, opacity);
  }

  setHeadOverlayColor(overlayID: number, colorType: number, colorID: number, secondColorID: number): void {
    SetPedHeadOverlayColor(this._handle, overlayID, colorType, colorID, secondColorID);
  }

  setHearingRange(value: number): void {
    SetPedHearingRange(this._handle, value);
  }

  setHeatscaleOverride(heatScale: number): void {
    SetPedHeatscaleOverride(this._handle, heatScale);
  }

  setHelmet(bEnable: boolean): void {
    SetPedHelmet(this._handle, bEnable);
  }

  setHelmetFlag(helmetFlag: number): void {
    SetPedHelmetFlag(this._handle, helmetFlag);
  }

  setHelmetPropIndex(propIndex: number): void {
    SetPedHelmetPropIndex(this._handle, propIndex);
  }

  setHelmetTextureIndex(textureIndex: number): void {
    SetPedHelmetTextureIndex(this._handle, textureIndex);
  }

  setHelmetUnk(p1: boolean, p2: number, p3: number): void {
    SetPedHelmetUnk(this._handle, p1, p2, p3);
  }

  setHighlyPerceptive(toggle: boolean): void {
    SetPedHighlyPerceptive(this._handle, toggle);
  }

  setIdRange(value: number): void {
    SetPedIdRange(this._handle, value);
  }

  setInVehicleContext(context: number): void {
    SetPedInVehicleContext(this._handle, context);
  }

  setIncreasedAvoidanceRadius(): void {
    SetPedIncreasedAvoidanceRadius(this._handle);
  }

  setIntoVehicle(vehicleHandle: number, seatIndex: number): void {
    SetPedIntoVehicle(this._handle, vehicleHandle, seatIndex);
  }

  setKeepTask(toggle: boolean): void {
    SetPedKeepTask(this._handle, toggle);
  }

  setLegIkMode(mode: number): void {
    SetPedLegIkMode(this._handle, mode);
  }

  setLodMultiplier(multiplier: number): void {
    SetPedLodMultiplier(this._handle, multiplier);
  }

  setMaxHealth(value: number): void {
    SetPedMaxHealth(this._handle, value);
  }

  setMaxMoveBlendRatio(value: number): void {
    SetPedMaxMoveBlendRatio(this._handle, value);
  }

  setMaxTimeInWater(value: number): void {
    SetPedMaxTimeInWater(this._handle, value);
  }

  setMaxTimeUnderwater(value: number): void {
    SetPedMaxTimeUnderwater(this._handle, value);
  }

  setMinGroundTimeForStungun(minTimeInMs: number): void {
    SetPedMinGroundTimeForStungun(this._handle, minTimeInMs);
  }

  setMinMoveBlendRatio(value: number): void {
    SetPedMinMoveBlendRatio(this._handle, value);
  }

  setMoney(amount: number): void {
    SetPedMoney(this._handle, amount);
  }

  setMotionBlur(toggle: boolean): void {
    SetPedMotionBlur(this._handle, toggle);
  }

  setMoveAnimsBlendOut(): void {
    SetPedMoveAnimsBlendOut(this._handle);
  }

  setMoveRateOverride(value: number): void {
    SetPedMoveRateOverride(this._handle, value);
  }

  setMovementClipset(clipSet: string, transitionSpeed: number): void {
    SetPedMovementClipset(this._handle, clipSet, transitionSpeed);
  }

  setNameDebug(name: string): void {
    SetPedNameDebug(this._handle, name);
  }

  setNeverLeavesGroup(toggle: boolean): void {
    SetPedNeverLeavesGroup(this._handle, toggle);
  }

  setPanicExitScenario(pos: IVector3): void {
    SetPedPanicExitScenario(this._handle, pos.x, pos.y, pos.z);
  }

  setParachuteTintIndex(tintIndex: number): void {
    SetPedParachuteTintIndex(this._handle, tintIndex);
  }

  setPhonePaletteIdx(index: number): void {
    SetPedPhonePaletteIdx(this._handle, index);
  }

  setPinnedDown(pinned: boolean, i: number): void {
    SetPedPinnedDown(this._handle, pinned, i);
  }

  setPlaysHeadOnHornAnimWhenDiesInVehicle(toggle: boolean): void {
    SetPedPlaysHeadOnHornAnimWhenDiesInVehicle(this._handle, toggle);
  }

  setPreferredCoverSet(itemSet: any): void {
    SetPedPreferredCoverSet(this._handle, itemSet);
  }

  setPreloadPropData(componentId: number, drawableId: number, textureId: number): void {
    SetPedPreloadPropData(this._handle, componentId, drawableId, textureId);
  }

  setPreloadVariationData(slot: number, drawableId: number, textureId: number): void {
    SetPedPreloadVariationData(this._handle, slot, drawableId, textureId);
  }

  setPrimaryLookat(lookAtHandle: number): void {
    SetPedPrimaryLookat(this._handle, lookAtHandle);
  }

  setPropIndex(componentId: number, drawableId: number, textureId: number, attach: boolean): void {
    SetPedPropIndex(this._handle, componentId, drawableId, textureId, attach);
  }

  setRagdollForceFall(): void {
    SetPedRagdollForceFall(this._handle);
  }

  setRagdollOnCollision(toggle: boolean): void {
    SetPedRagdollOnCollision(this._handle, toggle);
  }

  setRandomComponentVariation(p1: number): void {
    SetPedRandomComponentVariation(this._handle, p1);
  }

  setRandomProps(): void {
    SetPedRandomProps(this._handle);
  }

  setRelationshipGroupDefaultHash(hash: number): void {
    SetPedRelationshipGroupDefaultHash(this._handle, hash);
  }

  setRelationshipGroupHash(hash: number): void {
    SetPedRelationshipGroupHash(this._handle, hash);
  }

  setReserveParachuteTintIndex(p1: any): void {
    SetPedReserveParachuteTintIndex(this._handle, p1);
  }

  setResetFlag(flagId: number, doReset: boolean): void {
    SetPedResetFlag(this._handle, flagId, doReset);
  }

  setScubaGearVariation(): void {
    SetPedScubaGearVariation(this._handle);
  }

  setSeeingRange(value: number): void {
    SetPedSeeingRange(this._handle, value);
  }

  setShootRate(shootRate: number): void {
    SetPedShootRate(this._handle, shootRate);
  }

  setShootsAtCoord(pos: IVector3, toggle: boolean): void {
    SetPedShootsAtCoord(this._handle, pos.x, pos.y, pos.z, toggle);
  }

  setShouldPlayDirectedScenarioExit(pos: IVector3): void {
    SetPedShouldPlayDirectedScenarioExit(this._handle, pos.x, pos.y, pos.z);
  }

  setShouldPlayFleeScenarioExit(p1: any, p2: any, p3: any): void {
    SetPedShouldPlayFleeScenarioExit(this._handle, p1, p2, p3);
  }

  setShouldPlayImmediateScenarioExit(): void {
    SetPedShouldPlayImmediateScenarioExit(this._handle);
  }

  setShouldPlayNormalScenarioExit(): void {
    SetPedShouldPlayNormalScenarioExit(this._handle);
  }

  setSphereDefensiveArea(pos: IVector3, radius: number, p5: boolean, p6: boolean): void {
    SetPedSphereDefensiveArea(this._handle, pos.x, pos.y, pos.z, radius, p5, p6);
  }

  setStayInVehicleWhenJacked(toggle: boolean): void {
    SetPedStayInVehicleWhenJacked(this._handle, toggle);
  }

  setStealthMovement(p1: boolean, action: string): void {
    SetPedStealthMovement(this._handle, p1, action);
  }

  setSteersAroundObjects(toggle: boolean): void {
    SetPedSteersAroundObjects(this._handle, toggle);
  }

  setSteersAroundPeds(toggle: boolean): void {
    SetPedSteersAroundPeds(this._handle, toggle);
  }

  setSteersAroundVehicles(toggle: boolean): void {
    SetPedSteersAroundVehicles(this._handle, toggle);
  }

  setStrafeClipset(clipSet: string): void {
    SetPedStrafeClipset(this._handle, clipSet);
  }

  setSuffersCriticalHits(toggle: boolean): void {
    SetPedSuffersCriticalHits(this._handle, toggle);
  }

  setSurvivesBeingOutOfWater(toggle: boolean): void {
    SetPedSurvivesBeingOutOfWater(this._handle, toggle);
  }

  setSweat(sweat: number): void {
    SetPedSweat(this._handle, sweat);
  }

  setTargetLossResponse(responseType: number): void {
    SetPedTargetLossResponse(this._handle, responseType);
  }

  setToInformRespectedFriends(radius: number, maxFriends: number): void {
    SetPedToInformRespectedFriends(this._handle, radius, maxFriends);
  }

  setToLoadCover(toggle: boolean): void {
    SetPedToLoadCover(this._handle, toggle);
  }

  setToRagdoll(
    minTime: number,
    maxTime: number,
    ragdollType: number,
    bAbortIfInjured: boolean,
    bAbortIfDead: boolean,
    bForceScriptControl: boolean,
  ): void {
    SetPedToRagdoll(this._handle, minTime, maxTime, ragdollType, bAbortIfInjured, bAbortIfDead, bForceScriptControl);
  }

  setToRagdollWithFall(
    minTime: number,
    maxTime: number,
    nFallType: number,
    dir: IVector3,
    fGroundHeight: number,
    grab1: IVector3,
    grab2: IVector3,
  ): void {
    SetPedToRagdollWithFall(
      this._handle,
      minTime,
      maxTime,
      nFallType,
      dir.x,
      dir.y,
      dir.z,
      fGroundHeight,
      grab1.x,
      grab1.y,
      grab1.z,
      grab2.x,
      grab2.y,
      grab2.z,
    );
  }

  setUsingActionMode(p1: boolean, p2: number, action: string): void {
    SetPedUsingActionMode(this._handle, p1, p2, action);
  }

  setVehicleForcedSeatUsage(vehicleHandle: number, seatIndex: number, flags: number): void {
    SetPedVehicleForcedSeatUsage(this._handle, vehicleHandle, seatIndex, flags);
  }

  setVisualFieldCenterAngle(angle: number): void {
    SetPedVisualFieldCenterAngle(this._handle, angle);
  }

  setVisualFieldMaxAngle(value: number): void {
    SetPedVisualFieldMaxAngle(this._handle, value);
  }

  setVisualFieldMaxElevationAngle(angle: number): void {
    SetPedVisualFieldMaxElevationAngle(this._handle, angle);
  }

  setVisualFieldMinAngle(value: number): void {
    SetPedVisualFieldMinAngle(this._handle, value);
  }

  setVisualFieldMinElevationAngle(angle: number): void {
    SetPedVisualFieldMinElevationAngle(this._handle, angle);
  }

  setVisualFieldPeripheralRange(range: number): void {
    SetPedVisualFieldPeripheralRange(this._handle, range);
  }

  setWeaponMovementClipset(clipSet: string): void {
    SetPedWeaponMovementClipset(this._handle, clipSet);
  }

  setWetnessEnabledThisFrame(): void {
    SetPedWetnessEnabledThisFrame(this._handle);
  }

  setWetnessHeight(height: number): void {
    SetPedWetnessHeight(this._handle, height);
  }

  setRagdollBlockingFlags(flags: number): void {
    SetRagdollBlockingFlags(this._handle, flags);
  }

  specialFunctionDoNotUse(noCollisionUntilClear: boolean): void {
    SpecialFunctionDoNotUse(this._handle, noCollisionUntilClear);
  }

  stopWeaponFiringWhenDropped(): void {
    StopPedWeaponFiringWhenDropped(this._handle);
  }

  updateHeadBlendData(shapeMix: number, skinMix: number, thirdMix: number): void {
    UpdatePedHeadBlendData(this._handle, shapeMix, skinMix, thirdMix);
  }

  wasKilledByStealth(): boolean {
    return WasPedKilledByStealth(this._handle);
  }

  wasKilledByTakedown(): boolean {
    return WasPedKilledByTakedown(this._handle);
  }

  wasKnockedOut(): boolean {
    return WasPedKnockedOut(this._handle);
  }
}
