import { Vector3 } from '../Math/Vector3';
import { IVector3 } from '../typings/Vector3';
import { IVehicleOptions } from '../typings/Vehicle';
import { Utils } from '../Utils/Utils';
import {BaseEntity} from './BaseEntity';
import { Ped } from './Ped';

export class Vehicle extends BaseEntity{
  private constructor(protected _handle: number) {
    super(_handle)
  }
  static async create(model: string, coords: IVector3, optional?: IVehicleOptions): Promise<Vehicle | undefined> {
    const hashKey = GetHashKey(model);
    if (!hashKey) {
      console.error(`[Vehicle]:Vehicle hashkey not valid: ${model}`);
      return;
    }
    RequestModel(hashKey);
    const hasVehicleModelLoaded = await Utils.waitUntil(() => HasModelLoaded(hashKey), {
      waitInterval: 100,
      maxAttempts: 100,
      onTick: () => RequestModel(hashKey),
    });
    if (!hasVehicleModelLoaded) {
      console.error('[Vehicle][create]: Vehicle model not loaded!');
      return;
    }
    RequestCollisionAtCoord(coords.x, coords.y, coords.z);
    const vehHandle = CreateVehicle(hashKey, coords.x, coords.y, coords.z, 0, true, true);
    FreezeEntityPosition(vehHandle, true);
    await Utils.waitUntil(() => HasCollisionLoadedAroundEntity(vehHandle), {
      waitInterval: 100,
      maxAttempts: 100,
      onTick: () => RequestCollisionAtCoord(coords.x, coords.y, coords.z),
    });
    FreezeEntityPosition(vehHandle, false);

    SetEntityCoordsNoOffset(vehHandle, coords.x, coords.y, coords.z, false, false, false);
    SetModelAsNoLongerNeeded(hashKey);

    return new this(vehHandle);
  }
  static fromHandle(handle: number): Vehicle {
    return new this(handle);
  }

  get handle(): number {
    return this._handle;
  }

  get bodyHealth(): number {
    return GetVehicleBodyHealth(this._handle);
  }

  get engineHealth(): number {
    return GetVehicleEngineHealth(this._handle);
  }

  get petrolTankHealth(): number {
    return GetVehiclePetrolTankHealth(this._handle);
  }

  get isEngineRunning(): boolean {
    return GetIsVehicleEngineRunning(this._handle);
  }

  get engineStarting(): boolean {
    return IsVehicleEngineStarting(this._handle);
  }

  get clutch(): number {
    return GetVehicleClutch(this._handle);
  }

  get currentGear(): number {
    return GetVehicleCurrentGear(this._handle);
  }

  get currentRpm(): number {
    return GetVehicleCurrentRpm(this._handle);
  }

  get numberOfWheels(): number {
    return GetVehicleNumberOfWheels(this._handle);
  }

  isTyreBurst(wheelID: number, completely: boolean): boolean {
    return IsVehicleTyreBurst(this._handle, wheelID, completely);
  }

  wheelBrakePressure(wheelIndex: number): number {
    return GetVehicleWheelBrakePressure(this._handle, wheelIndex);
  }

  get numberPlateText(): string {
    return GetVehicleNumberPlateText(this._handle);
  }

  get doorLockStatus(): number {
    return GetVehicleDoorLockStatus(this._handle);
  }

  get isUseFuel(): boolean {
    return DoesVehicleUseFuel(this._handle);
  }

  get fuelLevel(): number {
    return GetVehicleFuelLevel(this._handle);
  }
  setBodyHealth(value: number): void {
    SetVehicleBodyHealth(this._handle, value);
  }

  setEngineHealth(value: number): void {
    SetVehicleEngineHealth(this._handle, value);
  }

  setClutch(clutch: number): void {
    SetVehicleClutch(this._handle, clutch);
  }

  setCurrentGear(gear: number): void {
    SetVehicleCurrentGear(this._handle, gear);
  }

  setCurrentRpm(rpm: number): void {
    SetVehicleCurrentRpm(this._handle, rpm);
  }

  breakOffWheel(
    wheelIndex: number,
    leaveDebrisTrail: boolean,
    deleteWheel: boolean,
    unknownFlag: boolean,
    putOnFire: boolean,
  ): void {
    BreakOffVehicleWheel(this._handle, wheelIndex, leaveDebrisTrail, deleteWheel, unknownFlag, putOnFire);
  }

  setWheelBrakePressure(wheelIndex: number, pressure: number): void {
    SetVehicleWheelBrakePressure(this._handle, wheelIndex, pressure);
  }

  setColours(colorPrimary: number, colorSecondary: number): void {
    SetVehicleColours(this._handle, colorPrimary, colorSecondary);
  }

  setCustomPrimaryColour(r: number, g: number, b: number): void {
    SetVehicleCustomPrimaryColour(this._handle, r, g, b);
  }

  clearXenonLightsCustomColor(): void {
    ClearVehicleXenonLightsCustomColor(this._handle);
  }

  setNumberPlateText(plateText: string): void {
    SetVehicleNumberPlateText(this._handle, plateText);
  }

  setDoorsLocked(doorLockStatus: number): void {
    SetVehicleDoorsLocked(this._handle, doorLockStatus);
  }

  setFuelLevel(level: number): void {
    SetVehicleFuelLevel(this._handle, level);
  }
  setAlarmTimeLeft(time: number): void {
    SetVehicleAlarmTimeLeft(this._handle, time);
  }

  setAutoRepairDisabled(value: boolean): void {
    SetVehicleAutoRepairDisabled(this._handle, value);
  }

  setEngineTemperature(temperature: number): void {
    SetVehicleEngineTemperature(this._handle, temperature);
  }

  setFlag(flagIndex: number, value: boolean): void {
    SetVehicleFlag(this._handle, flagIndex, value);
  }

  setGearRatio(gear: number, ratio: number): void {
    SetVehicleGearRatio(this._handle, gear, ratio);
  }

  setGravityAmount(gravity: number): void {
    SetVehicleGravityAmount(this._handle, gravity);
  }

  setHandlingField(className: string, fieldName: string, value: any): void {
    SetVehicleHandlingField(this._handle, className, fieldName, value);
  }

  setHandlingFloat(className: string, fieldName: string, value: number): void {
    SetVehicleHandlingFloat(this._handle, className, fieldName, value);
  }

  setHandlingInt(className: string, fieldName: string, value: number): void {
    SetVehicleHandlingInt(this._handle, className, fieldName, value);
  }

  setHandlingVector(className: string, fieldName: string): void {
    SetVehicleHandlingVector(this._handle, className, fieldName);
  }

  setHighGear(gear: number): void {
    SetVehicleHighGear(this._handle, gear);
  }

  setNextGear(nextGear: number): void {
    SetVehicleNextGear(this._handle, nextGear);
  }

  setOilLevel(level: number): void {
    SetVehicleOilLevel(this._handle, level);
  }

  setPitchBias(value: number): void {
    SetVehiclePitchBias(this._handle, value);
  }

  setRollBias(value: number): void {
    SetVehicleRollBias(this._handle, value);
  }

  setSteeringAngle(angle: number): void {
    SetVehicleSteeringAngle(this._handle, angle);
  }

  setSteeringScale(scale: number): void {
    SetVehicleSteeringScale(this._handle, scale);
  }

  setSuspensionHeight(newHeight: number): void {
    SetVehicleSuspensionHeight(this._handle, newHeight);
  }

  setTurboPressure(pressure: number): void {
    SetVehicleTurboPressure(this._handle, pressure);
  }

  setWheelFlags(wheelIndex: number, flags: number): void {
    SetVehicleWheelFlags(this._handle, wheelIndex, flags);
  }

  setWheelHealth(wheelIndex: number, health: number): void {
    SetVehicleWheelHealth(this._handle, wheelIndex, health);
  }

  setWheelIsPowered(wheelIndex: number, powered: boolean): void {
    SetVehicleWheelIsPowered(this._handle, wheelIndex, powered);
  }

  setWheelPower(wheelIndex: number, power: number): void {
    SetVehicleWheelPower(this._handle, wheelIndex, power);
  }

  setWheelRimColliderSize(wheelIndex: number, value: number): void {
    SetVehicleWheelRimColliderSize(this._handle, wheelIndex, value);
  }

  setWheelRotationSpeed(wheelIndex: number, speed: number): void {
    SetVehicleWheelRotationSpeed(this._handle, wheelIndex, speed);
  }

  setWheelSize(size: number): void {
    SetVehicleWheelSize(this._handle, size);
  }

  setWheelTireColliderSize(wheelIndex: number, value: number): void {
    SetVehicleWheelTireColliderSize(this._handle, wheelIndex, value);
  }

  setWheelTireColliderWidth(wheelIndex: number, value: number): void {
    SetVehicleWheelTireColliderWidth(this._handle, wheelIndex, value);
  }

  setWheelTractionVectorLength(wheelIndex: number, length: number): void {
    SetVehicleWheelTractionVectorLength(this._handle, wheelIndex, length);
  }

  setWheelWidth(width: number): void {
    SetVehicleWheelWidth(this._handle, width);
  }

  setWheelXOffset(wheelIndex: number, offset: number): void {
    SetVehicleWheelXOffset(this._handle, wheelIndex, offset);
  }

  setWheelYRotation(wheelIndex: number, value: number): void {
    SetVehicleWheelYRotation(this._handle, wheelIndex, value);
  }

  setWheelieState(state: number): void {
    SetVehicleWheelieState(this._handle, state);
  }

  setXenonLightsCustomColor(red: number, green: number, blue: number): void {
    SetVehicleXenonLightsCustomColor(this._handle, red, green, blue);
  }
  enableExhaustPops(toggle: boolean): void {
    EnableVehicleExhaustPops(this._handle, toggle);
  }

  enableFanbeltDamage(enableFanbeltDamage: boolean): void {
    EnableVehicleFanbeltDamage(this._handle, enableFanbeltDamage);
  }

  forceUseAudioGameObject(gameObjectname: string): void {
    ForceUseAudioGameObject(this._handle, gameObjectname);
  }

  forceVehicleEngineSynth(force: boolean): void {
    ForceVehicleEngineSynth(this._handle, force);
  }

  defaultHorn(): void {
    GetVehicleDefaultHorn(this._handle);
  }

  defaultHornIgnoreMods(): void {
    GetVehicleDefaultHornIgnoreMods(this._handle);
  }

  hornsSoundIndex(): number {
    return GetVehicleHornSoundIndex(this._handle);
  }

  isAudiblyDamaged(): boolean {
    return IsVehicleAudiblyDamaged(this._handle);
  }

  isRadioOn(): boolean {
    return IsVehicleRadioOn(this._handle);
  }

  overrideVehHorn(override: boolean, hornHash: number): void {
    OverrideVehHorn(this._handle, override, hornHash);
  }

  playStreamFromVehicle(): void {
    PlayStreamFromVehicle(this._handle);
  }

  playVehicleDoorCloseSound(doorIndex: number): void {
    PlayVehicleDoorCloseSound(this._handle, doorIndex);
  }

  playVehicleDoorOpenSound(doorIndex: number): void {
    PlayVehicleDoorOpenSound(this._handle, doorIndex);
  }

  resetVehicleStartupRevSound(): void {
    ResetVehicleStartupRevSound(this._handle);
  }

  setAudioVehiclePriority(priority: number): void {
    SetAudioVehiclePriority(this._handle, priority);
  }

  setHornPermanentlyOnTime(time: number): void {
    SetHornPermanentlyOnTime(this._handle, time);
  }

  setPlayerVehicleAlarmAudioActive(active: boolean): void {
    SetPlayerVehicleAlarmAudioActive(this._handle, active);
  }

  setVehicleAudioBodyDamageFactor(intensity: number): void {
    SetVehicleAudioBodyDamageFactor(this._handle, intensity);
  }

  setVehicleAudioEngineDamageFactor(damageFactor: number): void {
    SetVehicleAudioEngineDamageFactor(this._handle, damageFactor);
  }

  setVehicleBoostActive(toggle: boolean): void {
    SetVehicleBoostActive(this._handle, toggle);
  }

  setVehicleHornVariation(value: number): void {
    SetVehicleHornVariation(this._handle, value);
  }

  setVehicleMissileWarningEnabled(toggle: boolean): void {
    SetVehicleMissileWarningEnabled(this._handle, toggle);
  }

  setVehicleRadioEnabled(toggle: boolean): void {
    SetVehicleRadioEnabled(this._handle, toggle);
  }

  setVehicleRadioLoud(loud: boolean): void {
    SetVehicleRadioLoud(this._handle, loud);
  }

  setVehicleStartupRevSound(soundName: string, setName: string): void {
    SetVehicleStartupRevSound(this._handle, soundName, setName);
  }

  soundVehicleHornThisFrame(): void {
    SoundVehicleHornThisFrame(this._handle);
  }

  triggerSiren(): void {
    TriggerSiren(this._handle);
  }

  setInVehicleCamStateThisUpdate(p1: number): void {
    SetInVehicleCamStateThisUpdate(this._handle, p1);
  }

  hasCrewEmblem(p1: number): boolean {
    return DoesVehicleHaveCrewEmblem(this._handle, p1);
  }

  addCrewEmblem(
    ped: number,
    boneIndex: number,
    x1: number,
    x2: number,
    x3: number,
    y1: number,
    y2: number,
    y3: number,
    z1: number,
    z2: number,
    z3: number,
    scale: number,
    p13: any,
    alpha: number,
  ): boolean {
    return AddVehicleCrewEmblem(this._handle, ped, boneIndex, x1, x2, x3, y1, y2, y3, z1, z2, z3, scale, p13, alpha);
  }
  removeDecals(): void {
    RemoveDecalsFromVehicle(this._handle);
  }

  removeCrewEmblem(p1: number): void {
    RemoveVehicleCrewEmblem(this._handle, p1);
  }

  setParticleFxCamInsideNonplayerVehicle(p1: boolean): void {
    SetParticleFxCamInsideNonplayerVehicle(this._handle, p1);
  }

  setParticleFxCamInsideVehicle(p0: boolean): void {
    SetParticleFxCamInsideVehicle(p0);
  }

  washDecals(p1: number): void {
    WashDecalsFromVehicle(this._handle, p1);
  }

  networkExplode(isAudible: boolean, isInvisible: boolean, p3: boolean): void {
    NetworkExplodeVehicle(this._handle, isAudible, isInvisible, p3);
  }

  networkSetWheelsDestructible(toggle: boolean): void {
    NetworkSetVehicleWheelsDestructible(this._handle, toggle);
  }

  setNetworkEnablePositionCorrection(toggle: boolean): void {
    SetNetworkEnableVehiclePositionCorrection(this._handle, toggle);
  }

  setNetworkAsGhost(toggle: boolean): void {
    SetNetworkVehicleAsGhost(this._handle, toggle);
  }

  setNetworkPositionUpdateMultiplier(multiplier: number): void {
    SetNetworkVehiclePositionUpdateMultiplier(this._handle, multiplier);
  }

  toNet(): number {
    return VehToNet(this._handle);
  }

  addPhoneExplosiveDevice(): void {
    AddVehiclePhoneExplosiveDevice(this._handle);
  }
  addVehicleUpsidedownCheck(): void {
    AddVehicleUpsidedownCheck(this._handle);
  }

  allowAmbientVehiclesToAvoidAdverseConditions(): void {
    AllowAmbientVehiclesToAvoidAdverseConditions(this._handle);
  }

  areAllVehicleWindowsIntact(): boolean {
    return AreAllVehicleWindowsIntact(this._handle);
  }

  areAnyVehicleSeatsFree(): boolean {
    return AreAnyVehicleSeatsFree(this._handle);
  }

  areOutriggerLegsDeployed(): boolean {
    return AreOutriggerLegsDeployed(this._handle);
  }

  arePlaneWingsIntact(planeHandler: number): boolean {
    return ArePlaneWingsIntact(planeHandler);
  }

  attachVehicleOntoTrailer(
    trailerHandle: number,
    offsetX: number,
    offsetY: number,
    offsetZ: number,
    coordsX: number,
    coordsY: number,
    coordsZ: number,
    rotationX: number,
    rotationY: number,
    rotationZ: number,
    disableColls: number,
  ): void {
    AttachVehicleOnToTrailer(
      this._handle,
      trailerHandle,
      offsetX,
      offsetY,
      offsetZ,
      coordsX,
      coordsY,
      coordsZ,
      rotationX,
      rotationY,
      rotationZ,
      disableColls,
    );
  }

  attachVehicleToCargobob(cargobobHandle: number, vehicleBoneIndex: number, x: number, y: number, z: number): void {
    AttachVehicleToCargobob(cargobobHandle, this._handle, vehicleBoneIndex, x, y, z);
  }

  attachVehicleToTowTruck(
    towTruckHandle: number,
    rear: boolean,
    hookOffsetX: number,
    hookOffsetY: number,
    hookOffsetZ: number,
  ): void {
    AttachVehicleToTowTruck(towTruckHandle, this._handle, rear, hookOffsetX, hookOffsetY, hookOffsetZ);
  }

  attachVehicleToTrailer(trailerHandle: number, radius: number): void {
    AttachVehicleToTrailer(this._handle, trailerHandle, radius);
  }

  bringVehicleToHalt(distance: number, duration: number, bControlVerticalVelocity: boolean): void {
    BringVehicleToHalt(this._handle, distance, duration, bControlVerticalVelocity);
  }

  clearNitrous(): void {
    ClearNitrous(this._handle);
  }

  clearVehicleCustomPrimaryColour(): void {
    ClearVehicleCustomPrimaryColour(this._handle);
  }

  clearVehicleCustomSecondaryColour(): void {
    ClearVehicleCustomSecondaryColour(this._handle);
  }

  clearVehicleRouteHistory(): void {
    ClearVehicleRouteHistory(this._handle);
  }

  controlLandingGear(state: number): void {
    ControlLandingGear(this._handle, state);
  }

  copyVehicleDamages(targetVehicleHandle: number): void {
    CopyVehicleDamages(this._handle, targetVehicleHandle);
  }

  detachVehicleFromAnyCargobob(): void {
    DetachVehicleFromAnyCargobob(this._handle);
  }

  detachVehicleFromAnyTowTruck(): void {
    DetachVehicleFromAnyTowTruck(this._handle);
  }

  detachVehicleFromCargobob(cargobobHandle: number): void {
    DetachVehicleFromCargobob(cargobobHandle, this._handle);
  }

  detachVehicleFromTowTruck(towTruckHandle: number): void {
    DetachVehicleFromTowTruck(towTruckHandle, this._handle);
  }

  detachVehicleFromTrailer(): void {
    DetachVehicleFromTrailer(this._handle);
  }

  disableVehicleNeonLights(toggle: boolean): void {
    DisableVehicleNeonLights(this._handle, toggle);
  }

  disableVehicleTurretMovementThisFrame(): void {
    DisableVehicleTurretMovementThisFrame(this._handle);
  }

  disableVehicleWorldCollision(): void {
    DisableVehicleWorldCollision(this._handle);
  }

  doesExtraExist(extraId: number): boolean {
    return DoesExtraExist(this._handle, extraId);
  }

  doesVehicleAllowRappel(): boolean {
    return DoesVehicleAllowRappel(this._handle);
  }

  static doesVehicleExistWithDecorator(decorator: string): boolean {
    return DoesVehicleExistWithDecorator(decorator);
  }

  doesVehicleHaveLandingGear(): boolean {
    return DoesVehicleHaveLandingGear(this._handle);
  }

  doesVehicleHaveRoof(): boolean {
    return DoesVehicleHaveRoof(this._handle);
  }

  doesVehicleHaveSearchlight(): boolean {
    return DoesVehicleHaveSearchlight(this._handle);
  }

  doesVehicleHaveStuckVehicleCheck(): boolean {
    return DoesVehicleHaveStuckVehicleCheck(this._handle);
  }

  doesVehicleHaveWeapons(): boolean {
    return DoesVehicleHaveWeapons(this._handle);
  }

  doesVehicleTyreExist(tyreIndex: number): boolean {
    return DoesVehicleTyreExist(this._handle, tyreIndex);
  }

  enableAircraftObstacleAvoidance(avoidObstacles: boolean): void {
    EnableAircraftObstacleAvoidance(this._handle, avoidObstacles);
  }

  explodeVehicle(isAudible: boolean, isInvisible: boolean): void {
    ExplodeVehicle(this._handle, isAudible, isInvisible);
  }

  explodeVehicleInCutscene(p1: boolean): void {
    ExplodeVehicleInCutscene(this._handle, p1);
  }

  fixVehicleWindow(windowIndex: number): void {
    FixVehicleWindow(this._handle, windowIndex);
  }

  forcePlaybackRecordedVehicleUpdate(p1: boolean): void {
    ForcePlaybackRecordedVehicleUpdate(this._handle, p1);
  }

  fullyChargeNitrous(): void {
    FullyChargeNitrous(this._handle);
  }
  getBoatBoomPositionRatio(p1: boolean): unknown {
    return GetBoatBoomPositionRatio_2(this._handle, p1);
  }

  canVehicleJump(): boolean {
    return GetCanVehicleJump(this._handle);
  }

  getConvertibleRoofState(): number {
    return GetConvertibleRoofState(this._handle);
  }

  getCurrentPlaybackForVehicle(): number {
    return GetCurrentPlaybackForVehicle(this._handle);
  }

  static getDisplayNameFromVehicleModel(modelHash: number): string {
    return GetDisplayNameFromVehicleModel(modelHash);
  }

  doesVehicleHaveTombstone(): boolean {
    return GetDoesVehicleHaveTombstone(this._handle);
  }

  getEntryPositionOfDoor(doorIndex: number): Vector3 {
    const [x, y, z] = GetEntryPositionOfDoor(this._handle, doorIndex);
    return { x, y, z };
  }

  hasRetractableWheels(): boolean {
    return GetHasRetractableWheels(this._handle);
  }

  hasRocketBoost(): boolean {
    return GetHasRocketBoost(this._handle);
  }

  isBoatCapsized(): boolean {
    return GetIsBoatCapsized(this._handle);
  }

  isDoorValid(doorIndex: number): boolean {
    return GetIsDoorValid(this._handle, doorIndex);
  }

  isLeftVehicleHeadlightDamaged(): boolean {
    return GetIsLeftVehicleHeadlightDamaged(this._handle);
  }

  isRightVehicleHeadlightDamaged(): boolean {
    return GetIsRightVehicleHeadlightDamaged(this._handle);
  }

  static isVehicleElectric(vehicleModel: number): boolean {
    return GetIsVehicleElectric(vehicleModel);
  }

  isVehicleEmpDisabled(): boolean {
    return GetIsVehicleEmpDisabled(this._handle);
  }

  isVehicleEngineRunning(): boolean {
    return GetIsVehicleEngineRunning(this._handle);
  }

  isVehiclePrimaryColourCustom(): boolean {
    return GetIsVehiclePrimaryColourCustom(this._handle);
  }

  isVehicleSecondaryColourCustom(): boolean {
    return GetIsVehicleSecondaryColourCustom(this._handle);
  }

  isVehicleShuntBoostActive(): boolean {
    return GetIsVehicleShuntBoostActive(this._handle);
  }

  getLandingGearState(): number {
    return GetLandingGearState(this._handle);
  }

  getLastPedInVehicleSeat(seatIndex: number): Ped {
    const handlePed = GetLastPedInVehicleSeat(this._handle, seatIndex);
    return new Ped(handlePed);
  }

  getLastRammedVehicle(): Vehicle {
    return Vehicle.fromHandle(GetLastRammedVehicle(this._handle));
  }

  getLiveryName(liveryIndex: number): string {
    return GetLiveryName(this._handle, liveryIndex);
  }

  static getMakeNameFromVehicleModel(modelHash: number): string {
    return GetMakeNameFromVehicleModel(modelHash);
  }

  getModTextLabel(modType: number, modValue: number): string {
    return GetModTextLabel(this._handle, modType, modValue);
  }

  getNumVehicleMods(modType: number): number {
    return GetNumVehicleMods(this._handle, modType);
  }

  getNumberOfVehicleColours(): number {
    return GetNumberOfVehicleColours(this._handle);
  }

  getNumberOfVehicleDoors(): number {
    return GetNumberOfVehicleDoors(this._handle);
  }

  static getNumberOfVehicleNumberPlates(): number {
    return GetNumberOfVehicleNumberPlates();
  }

  getPedInVehicleSeat(seatIndex: number): Ped {
    return new Ped(GetPedInVehicleSeat(this._handle, seatIndex));
  }

  getPedUsingVehicleDoor(doorIndex: number): Ped {
    return new Ped(GetPedUsingVehicleDoor(this._handle, doorIndex));
  }

  getPositionInRecording(): number {
    return GetPositionInRecording(this._handle);
  }

  getRemainingNitrousDuration(): number {
    return GetRemainingNitrousDuration(this._handle);
  }

  getTimePositionInRecording(): number {
    return GetTimePositionInRecording(this._handle);
  }

  getVehicleAcceleration(): number {
    return GetVehicleAcceleration(this._handle);
  }

  static getVehicleAttachedToCargobob(cargobob: Vehicle): Vehicle {
    return Vehicle.fromHandle(GetVehicleAttachedToCargobob(cargobob._handle));
  }

  getVehicleBodyHealth(): number {
    return GetVehicleBodyHealth(this._handle);
  }

  static getVehicleBombCount(aircraft: Vehicle): number {
    return GetVehicleBombCount(aircraft._handle);
  }

  getVehicleCanActivateParachute(): boolean {
    return GetVehicleCanActivateParachute(this._handle);
  }

  getVehicleCauseOfDestruction(): number {
    return GetVehicleCauseOfDestruction(this._handle);
  }

  getVehicleClass(): number {
    return GetVehicleClass(this._handle);
  }

  static getVehicleClassEstimatedMaxSpeed(vehicleClass: number): number {
    return GetVehicleClassEstimatedMaxSpeed(vehicleClass);
  }

  static getVehicleClassFromName(modelHash: number): number {
    return GetVehicleClassFromName(modelHash);
  }

  static getVehicleClassMaxAcceleration(vehicleClass: number): number {
    return GetVehicleClassMaxAcceleration(vehicleClass);
  }

  static getVehicleClassMaxAgility(vehicleClass: number): number {
    return GetVehicleClassMaxAgility(vehicleClass);
  }

  static getVehicleClassMaxBraking(vehicleClass: number): number {
    return GetVehicleClassMaxBraking(vehicleClass);
  }

  static getVehicleClassMaxTraction(vehicleClass: number): number {
    return GetVehicleClassMaxTraction(vehicleClass);
  }

  getVehicleColor(): [number, number, number] {
    return GetVehicleColor(this._handle);
  }

  getVehicleColourCombination(): number {
    return GetVehicleColourCombination(this._handle);
  }

  getVehicleColours(): [number, number] {
    return GetVehicleColours(this._handle);
  }

  getVehicleColoursWhichCanBeSet(): number {
    return GetVehicleColoursWhichCanBeSet(this._handle);
  }

  static getVehicleCountermeasureCount(aircraft: Vehicle): number {
    return GetVehicleCountermeasureCount(aircraft._handle);
  }

  getVehicleCurrentSlipstreamDraft(): number {
    return GetVehicleCurrentSlipstreamDraft(this._handle);
  }

  getVehicleCustomPrimaryColour(): [number, number, number] {
    return GetVehicleCustomPrimaryColour(this._handle);
  }

  getVehicleCustomSecondaryColour(): [number, number, number] {
    return GetVehicleCustomSecondaryColour(this._handle);
  }

  getVehicleDashboardColor(): number {
    return GetVehicleDashboardColor(this._handle);
  }

  getVehicleDeformationAtPos(offsetX: number, offsetY: number, offsetZ: number): Vector3 {
    const [x, y, z] = GetVehicleDeformationAtPos(this._handle, offsetX, offsetY, offsetZ);
    return { x, y, z };
  }
  getVehicleDirtLevel(): number {
    return GetVehicleDirtLevel(this._handle);
  }

  getVehicleDoorAngleRatio(doorIndex: number): number {
    return GetVehicleDoorAngleRatio(this._handle, doorIndex);
  }

  getVehicleDoorLockStatus(): number {
    return GetVehicleDoorLockStatus(this._handle);
  }

  getDoorsLockedForPlayer(): boolean {
    return GetVehicleDoorsLockedForPlayer(this._handle, PlayerId());
  }

  static getVehicleDrivetrainType(vehicleModel: number): number {
    return GetVehicleDrivetrainType(vehicleModel);
  }

  getVehicleEngineHealth(): number {
    return GetVehicleEngineHealth(this._handle);
  }

  getVehicleEnveffScale(): number {
    return GetVehicleEnveffScale(this._handle);
  }

  getVehicleEstimatedMaxSpeed(): number {
    return GetVehicleEstimatedMaxSpeed(this._handle);
  }

  getVehicleExtraColours(): [number, number] {
    return GetVehicleExtraColours(this._handle);
  }

  static getVehicleFlightNozzlePosition(aircraft: Vehicle): number {
    return GetVehicleFlightNozzlePosition(aircraft.handle);
  }

  getVehicleHaskers(): boolean {
    return GetVehicleHasKers(this._handle);
  }

  getVehicleHasParachute(): boolean {
    return GetVehicleHasParachute(this._handle);
  }

  getVehicleHealthPercentage(): number {
    return GetVehicleHealthPercentage(this._handle);
  }

  getVehicleHomingLockonState(): number {
    return GetVehicleHomingLockonState(this._handle);
  }

  getVehicleIndividualDoorLockStatus(doorIndex: number): number {
    return GetVehicleIndividualDoorLockStatus(this._handle, doorIndex);
  }

  getVehicleInteriorColor(): number {
    return GetVehicleInteriorColor(this._handle);
  }

  isVehicleMercenary(): boolean {
    return GetVehicleIsMercenary(this._handle);
  }

  getVehicleLayoutHash(): number {
    return GetVehicleLayoutHash(this._handle);
  }

  getVehicleLightsState(): [boolean, any, any] {
    return GetVehicleLightsState(this._handle);
  }

  getVehicleLivery(): number {
    return GetVehicleLivery(this._handle);
  }

  getVehicleLiveryCount(): number {
    return GetVehicleLiveryCount(this._handle);
  }

  getVehicleLockOnTarget(): Vehicle {
    return Vehicle.fromHandle(GetVehicleLockOnTarget(this._handle)[1]);
  }

  getVehicleMaxBraking(): number {
    return GetVehicleMaxBraking(this._handle);
  }

  getVehicleMaxNumberOfPassengers(): number {
    return GetVehicleMaxNumberOfPassengers(this._handle);
  }

  getVehicleMaxTraction(): number {
    return GetVehicleMaxTraction(this._handle);
  }

  getVehicleMod(modType: number): number {
    return GetVehicleMod(this._handle, modType);
  }

  getVehicleModColor_1(): [number, number, number] {
    return GetVehicleModColor_1(this._handle);
  }

  getVehicleModColor_1Name(p1: boolean): string {
    return GetVehicleModColor_1Name(this._handle, p1);
  }

  getVehicleModColor_2(): [number, number] {
    return GetVehicleModColor_2(this._handle);
  }

  getVehicleModColor_2Name(): string {
    return GetVehicleModColor_2Name(this._handle);
  }

  getVehicleModIdentifierHash(modType: number, modIndex: number): number {
    return GetVehicleModIdentifierHash(this._handle, modType, modIndex);
  }

  getVehicleModKit(): number {
    return GetVehicleModKit(this._handle);
  }

  getVehicleModKitType(): number {
    return GetVehicleModKitType(this._handle);
  }

  getVehicleModModifierValue(modType: number, modIndex: number): number {
    return GetVehicleModModifierValue(this._handle, modType, modIndex);
  }

  getVehicleModVariation(modType: number): boolean {
    return GetVehicleModVariation(this._handle, modType);
  }

  static getVehicleModelAcceleration(modelHash: number): number {
    return GetVehicleModelAcceleration(modelHash);
  }

  static getVehicleModelEstimatedAgility(modelHash: number): number {
    return GetVehicleModelEstimatedAgility(modelHash);
  }

  static getVehicleModelEstimatedMaxSpeed(modelHash: number): number {
    return GetVehicleModelEstimatedMaxSpeed(modelHash);
  }

  static getVehicleModelMaxBraking(modelHash: number): number {
    return GetVehicleModelMaxBraking(modelHash);
  }

  static getVehicleModelMaxBrakingMaxMods(modelHash: number): number {
    return GetVehicleModelMaxBrakingMaxMods(modelHash);
  }

  static getVehicleModelMaxKnots(modelHash: number): number {
    return GetVehicleModelMaxKnots(modelHash);
  }

  static getVehicleModelMaxTraction(modelHash: number): number {
    return GetVehicleModelMaxTraction(modelHash);
  }

  static getVehicleModelNumberOfSeats(modelHash: number): number {
    return GetVehicleModelNumberOfSeats(modelHash);
  }

  getVehicleModelValue(vehicleModel: number): number {
    return GetVehicleModelValue(vehicleModel);
  }

  getVehicleNeonLightsColour(): [number, number, number] {
    return GetVehicleNeonLightsColour(this._handle);
  }

  getVehicleNumberOfBrokenBones(): number {
    return GetVehicleNumberOfBrokenBones(this._handle);
  }

  getVehicleNumberOfBrokenOffBones(): number {
    return GetVehicleNumberOfBrokenOffBones(this._handle);
  }
  getVehicleNumberOfPassengers(): number {
    return GetVehicleNumberOfPassengers(this._handle);
  }

  getVehicleNumberPlateText(): string {
    return GetVehicleNumberPlateText(this._handle);
  }

  getVehicleNumberPlateTextIndex(): number {
    return GetVehicleNumberPlateTextIndex(this._handle);
  }

  getVehiclePetrolTankHealth(): number {
    return GetVehiclePetrolTankHealth(this._handle);
  }

  getVehiclePlateType(): number {
    return GetVehiclePlateType(this._handle);
  }

  getVehicleRoofLivery(): number {
    return GetVehicleRoofLivery(this._handle);
  }

  getVehicleRoofLiveryCount(): number {
    return GetVehicleRoofLiveryCount(this._handle);
  }

  getVehicleSuspensionBounds(): [Vector3, Vector3[]] {
    const [[x, y, z], [x2, y2, z2]] = GetVehicleSuspensionBounds(this._handle);
    return [{ x, y, z }, [{ x:x2, y:y2, z:z2 }]];
  }

  getVehicleSuspensionHeight(): number {
    return GetVehicleSuspensionHeight(this._handle);
  }

  getVehicleTrailerVehicle(): Vehicle {
    return Vehicle.fromHandle(GetVehicleTrailerVehicle(this._handle)[1]);
  }

  getVehicleTyreSmokeColor(): [number,number,number] {
  return  GetVehicleTyreSmokeColor(this._handle);
  }

  getVehicleTyresCanBurst(): boolean {
    return GetVehicleTyresCanBurst(this._handle);
  }

  getVehicleWeaponRestrictedAmmo(weaponIndex: number): number {
    return GetVehicleWeaponRestrictedAmmo(this._handle, weaponIndex);
  }

  getVehicleWheelType(): number {
    return GetVehicleWheelType(this._handle);
  }

  getVehicleWindowTint(): number {
    return GetVehicleWindowTint(this._handle);
  }

  getVehicleXenonLightsColor(): number {
    return GetVehicleXenonLightsColor(this._handle);
  }

  haveVehicleModsStreamedIn(): boolean {
    return HaveVehicleModsStreamedIn(this._handle);
  }

  hideVehicleTombstone(toggle: boolean): void {
    HideVehicleTombstone(this._handle, toggle);
  }

  isAnyPedRappellingFromHeli(): boolean {
    return IsAnyPedRappellingFromHeli(this._handle);
  }

  static isAnyVehicleNearPoint(x: number, y: number, z: number, radius: number): boolean {
    return IsAnyVehicleNearPoint(x, y, z, radius);
  }

  isBigVehicle(): boolean {
    return IsBigVehicle(this._handle);
  }

  isEntityAttachedToHandlerFrame(entityHandle: number): boolean {
    return IsEntityAttachedToHandlerFrame(this._handle, entityHandle);
  }

  isNitrousActive(): boolean {
    return IsNitrousActive(this._handle);
  }

  static isPlaneLandingGearIntact(plane: Vehicle): boolean {
    return IsPlaneLandingGearIntact(plane.handle);
  }

  isPlaybackGoingOnForVehicle(): boolean {
    return IsPlaybackGoingOnForVehicle(this._handle);
  }

  isPlaybackUsingAiGoingOnForVehicle(): boolean {
    return IsPlaybackUsingAiGoingOnForVehicle(this._handle);
  }

  isVehicleAConvertible(checkRoofExtras: boolean): boolean {
    return IsVehicleAConvertible(this._handle, checkRoofExtras);
  }

  isVehicleAlarmActivated(): boolean {
    return IsVehicleAlarmActivated(this._handle);
  }

  static isVehicleAttachedToCargobob(cargobob: Vehicle, vehicleAttached: Vehicle): boolean {
    return IsVehicleAttachedToCargobob(cargobob.handle, vehicleAttached.handle);
  }

  static isVehicleAttachedToTowTruck(towTruck: Vehicle, vehicle: Vehicle): boolean {
    return IsVehicleAttachedToTowTruck(towTruck.handle, vehicle.handle);
  }

  isVehicleAttachedToTrailer(): boolean {
    return IsVehicleAttachedToTrailer(this._handle);
  }

  isVehicleBeingHalted(): boolean {
    return IsVehicleBeingHalted(this._handle);
  }

  isVehicleBumperBouncing(frontBumper: boolean): boolean {
    return IsVehicleBumperBouncing(this._handle, frontBumper);
  }

  isVehicleBumperBrokenOff(front: boolean): boolean {
    return IsVehicleBumperBrokenOff(this._handle, front);
  }

  isVehicleDamaged(): boolean {
    return IsVehicleDamaged(this._handle);
  }

  isVehicleDoorDamaged(doorID: number): boolean {
    return IsVehicleDoorDamaged(this._handle, doorID);
  }

  isVehicleDoorFullyOpen(doorIndex: number): boolean {
    return IsVehicleDoorFullyOpen(this._handle, doorIndex);
  }

  isVehicleDriveable(isOnFireCheck: boolean): boolean {
    return IsVehicleDriveable(this._handle, isOnFireCheck);
  }

  isVehicleEngineOnFire(): boolean {
    return IsVehicleEngineOnFire(this._handle);
  }

  isVehicleExtraTurnedOn(extraId: number): boolean {
    return IsVehicleExtraTurnedOn(this._handle, extraId);
  }

  isVehicleHighDetail(): boolean {
    return IsVehicleHighDetail(this._handle);
  }

  isVehicleInBurnout(): boolean {
    return IsVehicleInBurnout(this._handle);
  }

  static isVehicleInGarageArea(garageName: string, vehicle: Vehicle): boolean {
    return IsVehicleInGarageArea(garageName, vehicle.handle);
  }

  isVehicleInSubmarineMode(): boolean {
    return IsVehicleInSubmarineMode(this._handle);
  }

  isVehicleModGen9Exclusive(modType: number, modIndex: number): boolean {
    return IsVehicleModGen9Exclusive(this._handle, modType, modIndex);
  }

  isVehicleModel(model: number): boolean {
    return IsVehicleModel(this._handle, model);
  }

  isVehicleNeonLightEnabled(index: number): boolean {
    return IsVehicleNeonLightEnabled(this._handle, index);
  }

  isVehicleOnAllWheels(): boolean {
    return IsVehicleOnAllWheels(this._handle);
  }

  isVehicleOnBoostPad(): boolean {
    return IsVehicleOnBoostPad(this._handle);
  }

  isVehicleParachuteActive(): boolean {
    return IsVehicleParachuteActive(this._handle);
  }

  isVehicleRocketBoostActive(): boolean {
    return IsVehicleRocketBoostActive(this._handle);
  }

  isVehicleSearchlightOn(): boolean {
    return IsVehicleSearchlightOn(this._handle);
  }

  isVehicleSeatFree(seatIndex: number): boolean {
    return IsVehicleSeatFree(this._handle, seatIndex);
  }

  isVehicleSirenAudioOn(): boolean {
    return IsVehicleSirenAudioOn(this._handle);
  }

  isVehicleSirenOn(): boolean {
    return IsVehicleSirenOn(this._handle);
  }

  isVehicleSlipstreamLeader(): boolean {
    return IsVehicleSlipstreamLeader(this._handle);
  }

  isVehicleSprayable(): boolean {
    return IsVehicleSprayable(this._handle);
  }

  isVehicleStolen(): boolean {
    return IsVehicleStolen(this._handle);
  }

  isVehicleStopped(): boolean {
    return IsVehicleStopped(this._handle);
  }

  isVehicleStoppedAtTrafficLights(): boolean {
    return IsVehicleStoppedAtTrafficLights(this._handle);
  }

  isVehicleStuckOnRoof(): boolean {
    return IsVehicleStuckOnRoof(this._handle);
  }

  isVehicleStuckTimerUp(p1: number, p2: number): boolean {
    return IsVehicleStuckTimerUp(this._handle, p1, p2);
  }

  isVehicleTyreBurst(wheelID: number, isBurstToRim: boolean): boolean {
    return IsVehicleTyreBurst(this._handle, wheelID, isBurstToRim);
  }

  isVehicleVisible(): boolean {
    return IsVehicleVisible(this._handle);
  }

  static isVehicleWeaponDisabled(weaponHash: number, vehicle: Vehicle, owner: Ped): boolean {
    return IsVehicleWeaponDisabled(weaponHash, vehicle.handle, owner.handle);
  }

  isVehicleWindowIntact(windowIndex: number): boolean {
    return IsVehicleWindowIntact(this._handle, windowIndex);
  }

  lowerConvertibleRoof(instantlyLower: boolean): void {
    LowerConvertibleRoof(this._handle, instantlyLower);
  }

  modifyVehicleTopSpeed(percentChange: number): void {
    ModifyVehicleTopSpeed(this._handle, percentChange);
  }

  networkUseHighPrecisionVehicleBlending(toggle: boolean): void {
    NetworkUseHighPrecisionVehicleBlending(this._handle, toggle);
  }

  openBombBayDoors(): void {
    OpenBombBayDoors(this._handle);
  }

  pausePlaybackRecordedVehicle(): void {
    PausePlaybackRecordedVehicle(this._handle);
  }

  popOutVehicleWindscreen(): void {
    PopOutVehicleWindscreen(this._handle);
  }
  raiseConvertibleRoof(instantlyRaise: boolean): void {
    RaiseConvertibleRoof(this._handle, instantlyRaise);
  }

  static removeVehicleAsset(vehicleAsset: number): void {
    RemoveVehicleAsset(vehicleAsset);
  }

  static removeVehicleCombatAvoidanceArea(p0: any): void {
    RemoveVehicleCombatAvoidanceArea(p0);
  }

  removeVehicleHighDetailModel(): void {
    RemoveVehicleHighDetailModel(this._handle);
  }

  removeVehicleMod(modType: number): void {
    RemoveVehicleMod(this._handle, modType);
  }

  static removeVehicleRecording(recording: number, script: string): void {
    RemoveVehicleRecording(recording, script);
  }

  removeVehicleShadowEffect(): void {
    RemoveVehicleShadowEffect(this._handle);
  }

  removeVehicleStuckCheck(): void {
    RemoveVehicleStuckCheck(this._handle);
  }

  removeVehicleUpsidedownCheck(): void {
    RemoveVehicleUpsidedownCheck(this._handle);
  }

  removeVehicleWindow(windowIndex: number): void {
    RemoveVehicleWindow(this._handle, windowIndex);
  }

  static requestVehicleAsset(vehicleHash: number, vehicleAsset: number): void {
    RequestVehicleAsset(vehicleHash, vehicleAsset);
  }

  requestVehicleDashboardScaleformMovie(): void {
    RequestVehicleDashboardScaleformMovie(this._handle);
  }

  requestVehicleHighDetailModel(): void {
    RequestVehicleHighDetailModel(this._handle);
  }

  static requestVehicleRecording(recording: number, script: string): void {
    RequestVehicleRecording(recording, script);
  }

  resetVehicleStuckTimer(nullAttributes: number): void {
    ResetVehicleStuckTimer(this._handle, nullAttributes);
  }

  resetVehicleWheels(toggle: boolean): void {
    ResetVehicleWheels(this._handle, toggle);
  }

  rollDownWindow(windowIndex: number): void {
    RollDownWindow(this._handle, windowIndex);
  }

  rollDownWindows(): void {
    RollDownWindows(this._handle);
  }

  rollUpWindow(windowIndex: number): void {
    RollUpWindow(this._handle, windowIndex);
  }

  setCanResprayVehicle(state: boolean): void {
    SetCanResprayVehicle(this._handle, state);
  }

  static setCargobobForcedDontDetachVehicle(cargobob: Vehicle, toggle: boolean): void {
    SetCargobobForceDontDetachVehicle(cargobob.handle, toggle);
  }

  setCargobobHookCanAttach(toggle: boolean): void {
    SetCargobobHookCanAttach(this._handle, toggle);
  }

  setCargobobPickupMagnetActive(isActive: boolean): void {
    SetCargobobPickupMagnetActive(this._handle, isActive);
  }

  setConvertibleRoof(toggle: boolean): void {
    SetConvertibleRoof(this._handle, toggle);
  }

  setConvertibleRoofLatchState(bLatched: boolean): void {
    SetConvertibleRoofLatchState(this._handle, bLatched);
  }

  setDisableExplodeFromBodyDamageOnCollision(disableExplode: boolean): void {
    SetDisableExplodeFromBodyDamageOnCollision(this._handle, disableExplode);
  }

  static setDisableExplodeFromBodyDamageReceivedByAiVehicle(plane: Vehicle, disable: boolean): void {
    SetDisableExplodeFromBodyDamageReceivedByAiVehicle(plane.handle, disable);
  }

  setDisableHoverModeFlight(toggle: boolean): void {
    SetDisableHoverModeFlight(this._handle, toggle);
  }

  setDisableVehicleEngineFires(toggle: boolean): void {
    SetDisableVehicleEngineFires(this._handle, toggle);
  }

  setDisableVehicleFlightNozzlePosition(direction: boolean): void {
    SetDisableVehicleFlightNozzlePosition(this._handle, direction);
  }

  setDisableVehiclePetrolTankDamage(toggle: boolean): void {
    SetDisableVehiclePetrolTankDamage(this._handle, toggle);
  }

  setDisableVehiclePetrolTankFires(toggle: boolean): void {
    SetDisableVehiclePetrolTankFires(this._handle, toggle);
  }

  static setDisableVehicleUnk(toggle: boolean): void {
    SetDisableVehicleUnk(toggle);
  }

  static setDisableVehicleUnk_2(toggle: boolean): void {
    SetDisableVehicleUnk_2(toggle);
  }

  setDisableVehicleWindowCollisions(toggle: boolean): void {
    SetDisableVehicleWindowCollisions(this._handle, toggle);
  }

  setForceHdVehicle(toggle: boolean): void {
    SetForceHdVehicle(this._handle, toggle);
  }

  setForkliftForkHeight(height: number): void {
    SetForkliftForkHeight(this._handle, height);
  }

  setHeliBladesFullSpeed(): void {
    SetHeliBladesFullSpeed(this._handle);
  }

  setHydraulicWheelStateTransition(wheelId: number, state: number, value: number, p4: number): void {
    SetHydraulicWheelStateTransition(this._handle, wheelId, state, value, p4);
  }

  setHydraulicWheelValue(wheelId: number, value: number): void {
    SetHydraulicWheelValue(this._handle, wheelId, value);
  }

  setLastDrivenVehicle(): void {
    SetLastDrivenVehicle(this._handle);
  }

  setNitrousIsActive(isActive: boolean): void {
    SetNitrousIsActive(this._handle, isActive);
  }

  static setNumberOfParkedVehicles(value: number): void {
    SetNumberOfParkedVehicles(value);
  }

  setOpenRearDoorsOnExplosion(toggle: boolean): void {
    SetOpenRearDoorsOnExplosion(this._handle, toggle);
  }

  setOverrideNitrousLevel(override: boolean): void {
    SetOverrideNitrousLevel(this._handle, override);
  }

  static setParkedVehicleDensityMultiplierThisFrame(multiplier: number): void {
    SetParkedVehicleDensityMultiplierThisFrame(multiplier);
  }

  setPlaneEngineHealth(health: number): void {
    SetPlaneEngineHealth(this._handle, health);
  }

  setPlayersLastVehicle(): void {
    SetPlayersLastVehicle(this._handle);
  }

  setPoliceFocusWillTrackVehicle(p1: boolean): void {
    SetPoliceFocusWillTrackVehicle(this._handle, p1);
  }

  static setRandomVehicleDensityMultiplierThisFrame(multiplier: number): void {
    SetRandomVehicleDensityMultiplierThisFrame(multiplier);
  }

  setReduceDriftVehicleSuspension(enable: boolean): void {
    SetReduceDriftVehicleSuspension(this._handle, enable);
  }

  static setScriptVehicleGenerator(vehicleGenerator: number, enabled: boolean): void {
    SetScriptVehicleGenerator(vehicleGenerator, enabled);
  }

  setSpecialFlightModeAllowed(toggle: boolean): void {
    SetSpecialFlightModeAllowed(this._handle, toggle);
  }

  setSpecialFlightModeRatio(ratio: number): void {
    SetSpecialFlightModeRatio(this._handle, ratio);
  }

  setSpecialFlightModeTargetRatio(state: number): void {
    SetSpecialFlightModeTargetRatio(this._handle, state);
  }

  setSubmarineCrushDepths(toggle: boolean, depth1: number, depth2: number, depth3: number): void {
    SetSubmarineCrushDepths(this._handle, toggle, depth1, depth2, depth3);
  }

  static setTaskVehicleGotoPlaneMinHeightAboveTerrain(plane: Vehicle, height: number): void {
    SetTaskVehicleGotoPlaneMinHeightAboveTerrain(plane.handle, height);
  }

  setTaxiLights(state: boolean): void {
    SetTaxiLights(this._handle, state);
  }

  setTrailerAttachmentEnabled(enabled: boolean): void {
    SetTrailerAttachmentEnabled(this._handle, enabled);
  }

  static setTrailerLegsLowered(): void {
    SetTrailerLegsLowered();
  }

  setTrailerLegsRaised(): void {
    SetTrailerLegsRaised(this._handle);
  }

  setTransformRateForAnimation(transformRate: number): void {
    SetTransformRateForAnimation(this._handle, transformRate);
  }

  setTransformToSubmarineUsesAlternateInput(useAlternateInput: boolean): void {
    SetTransformToSubmarineUsesAlternateInput(this._handle, useAlternateInput);
  }

  setUseHigherVehicleJumpForce(toggle: boolean): void {
    SetUseHigherVehicleJumpForce(this._handle, toggle);
  }

  setVehicleActAsIfHighSpeedForFragSmashing(actHighSpeed: boolean): void {
    SetVehicleActAsIfHighSpeedForFragSmashing(this._handle, actHighSpeed);
  }

  setVehicleActiveDuringPlayback(toggle: boolean): void {
    SetVehicleActiveDuringPlayback(this._handle, toggle);
  }

  setVehicleActiveForPedNavigation(toggle: boolean): void {
    SetVehicleActiveForPedNavigation(this._handle, toggle);
  }

  setVehicleAlarm(state: boolean): void {
    SetVehicleAlarm(this._handle, state);
  }

  setVehicleAllowHomingMissleLockon(toggle: boolean, p2: boolean): void {
    SetVehicleAllowHomingMissleLockon(this._handle, toggle, p2);
  }

  setVehicleAllowNoPassengersLockon(toggle: boolean): void {
    SetVehicleAllowNoPassengersLockon(this._handle, toggle);
  }

  setVehicleAutomaticallyAttaches(p1: boolean, p2: any): void {
    SetVehicleAutomaticallyAttaches(this._handle, p1, p2);
  }

  setVehicleBodyHealth(value: number): void {
    SetVehicleBodyHealth(this._handle, value);
  }

  static setVehicleBombCount(aircraft: Vehicle, bombCount: number): void {
    SetVehicleBombCount(aircraft.handle, bombCount);
  }

  setVehicleBrake(toggle: boolean): void {
    SetVehicleBrake(this._handle, toggle);
  }

  setVehicleBrakeLights(toggle: boolean): void {
    SetVehicleBrakeLights(this._handle, toggle);
  }

  setVehicleBulldozerArmPosition(position: number, p2: boolean): void {
    SetVehicleBulldozerArmPosition(this._handle, position, p2);
  }

  setVehicleBurnout(toggle: boolean): void {
    SetVehicleBurnout(this._handle, toggle);
  }

  setVehicleCanBeLockedOn(canBeLockedOn: boolean, unk: boolean): void {
    SetVehicleCanBeLockedOn(this._handle, canBeLockedOn, unk);
  }

  setVehicleCanBeTargetted(state: boolean): void {
    SetVehicleCanBeTargetted(this._handle, state);
  }

  setVehicleCanBeUsedByFleeingPeds(toggle: boolean): void {
    SetVehicleCanBeUsedByFleeingPeds(this._handle, toggle);
  }

  setVehicleCanBeVisiblyDamaged(state: boolean): void {
    SetVehicleCanBeVisiblyDamaged(this._handle, state);
  }

  setVehicleCanBreak(toggle: boolean): void {
    SetVehicleCanBreak(this._handle, toggle);
  }

  setVehicleCanDeformWheels(toggle: boolean): void {
    SetVehicleCanDeformWheels(this._handle, toggle);
  }

  setVehicleCanEngineOperateOnFire(toggle: boolean): void {
    SetVehicleCanEngineOperateOnFire(this._handle, toggle);
  }

  setVehicleCanLeakOil(toggle: boolean): void {
    SetVehicleCanLeakOil(this._handle, toggle);
  }

  setVehicleCanLeakPetrol(toggle: boolean): void {
    SetVehicleCanLeakPetrol(this._handle, toggle);
  }

  setVehicleCanSaveInGarage(toggle: boolean): void {
    SetVehicleCanSaveInGarage(this._handle, toggle);
  }

  setVehicleCeilingHeight(height: number): void {
    SetVehicleCeilingHeight(this._handle, height);
  }

  setVehicleCheatPowerIncrease(value: number): void {
    SetVehicleCheatPowerIncrease(this._handle, value);
  }

  setVehicleColourCombination(colorCombination: number): void {
    SetVehicleColourCombination(this._handle, colorCombination);
  }

  setVehicleColours(colorPrimary: number, colorSecondary: number): void {
    SetVehicleColours(this._handle, colorPrimary, colorSecondary);
  }

  setVehicleControlsInverted(state: boolean): void {
    SetVehicleControlsInverted(this._handle, state);
  }

  static setVehicleCountermeasureCount(aircraft: Vehicle, count: number): void {
    SetVehicleCountermeasureCount(aircraft.handle, count);
  }

  setVehicleCustomPrimaryColour(r: number, g: number, b: number): void {
    SetVehicleCustomPrimaryColour(this._handle, r, g, b);
  }

  setVehicleCustomSecondaryColour(r: number, g: number, b: number): void {
    SetVehicleCustomSecondaryColour(this._handle, r, g, b);
  }

  setVehicleDamage(
    xOffset: number,
    yOffset: number,
    zOffset: number,
    damage: number,
    radius: number,
    focusOnModel: boolean,
  ): void {
    SetVehicleDamage(this._handle, xOffset, yOffset, zOffset, damage, radius, focusOnModel);
  }

  setVehicleDamageModifier(p1: number): void {
    SetVehicleDamageModifier(this._handle, p1);
  }

  setVehicleDashboardColor(color: number): void {
    SetVehicleDashboardColor(this._handle, color);
  }

  setVehicleDeformationFixed(): void {
    SetVehicleDeformationFixed(this._handle);
  }

  static setVehicleDensityMultiplierThisFrame(multiplier: number): void {
    SetVehicleDensityMultiplierThisFrame(multiplier);
  }

  setVehicleDirtLevel(dirtLevel: number): void {
    SetVehicleDirtLevel(this._handle, dirtLevel);
  }

  setVehicleDisableTowing(toggle: boolean): void {
    SetVehicleDisableTowing(this._handle, toggle);
  }

  setVehicleDoorBroken(doorIndex: number, deleteDoor: boolean): void {
    SetVehicleDoorBroken(this._handle, doorIndex, deleteDoor);
  }

  setVehicleDoorCanBreak(doorIndex: number, isBreakable: boolean): void {
    SetVehicleDoorCanBreak(this._handle, doorIndex, isBreakable);
  }

  setVehicleDoorControl(doorIndex: number, speed: number, angle: number): void {
    SetVehicleDoorControl(this._handle, doorIndex, speed, angle);
  }

  setVehicleDoorLatched(doorIndex: number, forceClose: boolean, lock: boolean, p4: boolean): void {
    SetVehicleDoorLatched(this._handle, doorIndex, forceClose, lock, p4);
  }

  setVehicleDoorOpen(doorIndex: number, loose: boolean, openInstantly: boolean): void {
    SetVehicleDoorOpen(this._handle, doorIndex, loose, openInstantly);
  }

  setVehicleDoorShut(doorIndex: number, closeInstantly: boolean): void {
    SetVehicleDoorShut(this._handle, doorIndex, closeInstantly);
  }

  setVehicleDoorsLocked(doorLockStatus: number): void {
    SetVehicleDoorsLocked(this._handle, doorLockStatus);
  }

  setVehicleDoorsLockedForAllPlayers(toggle: boolean): void {
    SetVehicleDoorsLockedForAllPlayers(this._handle, toggle);
  }

  setVehicleDoorsLockedForNonScriptPlayers(toggle: boolean): void {
    SetVehicleDoorsLockedForNonScriptPlayers(this._handle, toggle);
  }

  setVehicleDoorsLockedForPlayer( toggle: boolean): void {
    SetVehicleDoorsLockedForPlayer(this._handle, PlayerId(), toggle);
  }

  setVehicleDoorsLockedForTeam(team: number, toggle: boolean): void {
    SetVehicleDoorsLockedForTeam(this._handle, team, toggle);
  }

  setVehicleDoorsLockedForUnk(toggle: boolean): void {
    SetVehicleDoorsLockedForUnk(this._handle, toggle);
  }

  setVehicleDoorsShut(closeInstantly: boolean): void {
    SetVehicleDoorsShut(this._handle, closeInstantly);
  }

  setVehicleDropsMoneyWhenBlownUp(toggle: boolean): void {
    SetVehicleDropsMoneyWhenBlownUp(this._handle, toggle);
  }

  setVehicleEngineCanDegrade(toggle: boolean): void {
    SetVehicleEngineCanDegrade(this._handle, toggle);
  }

  setVehicleEngineHealth(health: number): void {
    SetVehicleEngineHealth(this._handle, health);
  }

  setVehicleEngineOn(value: boolean, instantly: boolean, disableAutoStart: boolean): void {
    SetVehicleEngineOn(this._handle, value, instantly, disableAutoStart);
  }

  setVehicleEnveffScale(fade: number): void {
    SetVehicleEnveffScale(this._handle, fade);
  }

  setVehicleExclusiveDriver(toggle: boolean): void {
    SetVehicleExclusiveDriver(this._handle, toggle);
  }

  setVehicleExclusiveDriver_2(ped: Ped, index: number): void {
    SetVehicleExclusiveDriver_2(this._handle, ped.handle, index);
  }

  setVehicleExplodesOnHighExplosionDamage(toggle: boolean): void {
    SetVehicleExplodesOnHighExplosionDamage(this._handle, toggle);
  }

  setVehicleExplosiveDamageScale(scale: number): void {
    SetVehicleExplosiveDamageScale(this._handle, scale);
  }

  setVehicleExtendedRemovalRange(range: number): void {
    SetVehicleExtendedRemovalRange(this._handle, range);
  }

  setVehicleExtra(extraId: number, disable: boolean): void {
    SetVehicleExtra(this._handle, extraId, disable);
  }

  setVehicleExtraColours(pearlescentColor: number, wheelColor: number): void {
    SetVehicleExtraColours(this._handle, pearlescentColor, wheelColor);
  }

  setVehicleFixed(): void {
    SetVehicleFixed(this._handle);
  }

  setVehicleFlightNozzlePosition(angleRatio: number): void {
    SetVehicleFlightNozzlePosition(this._handle, angleRatio);
  }

  setVehicleFlightNozzlePositionImmediate(angle: number): void {
    SetVehicleFlightNozzlePositionImmediate(this._handle, angle);
  }

  setVehicleForceAfterburner(toggle: boolean): void {
    SetVehicleForceAfterburner(this._handle, toggle);
  }

  setVehicleForwardsSpeed(speed: number): void {
    SetVehicleForwardSpeed(this._handle, speed);
  }

  setVehicleFrictionOverride(friction: number): void {
    SetVehicleFrictionOverride(this._handle, friction);
  }

  setVehicleFullbeam(toggle: boolean): void {
    SetVehicleFullbeam(this._handle, toggle);
  }

  setVehicleGeneratesEngineShockingEvents(toggle: boolean): void {
    SetVehicleGeneratesEngineShockingEvents(this._handle, toggle);
  }

  static setVehicleGeneratorAreaOfInterest(x: number, y: number, z: number, radius: number): void {
    SetVehicleGeneratorAreaOfInterest(x, y, z, radius);
  }

  setVehicleGravity(toggle: boolean): void {
    SetVehicleGravity(this._handle, toggle);
  }

  setVehicleHandbrake(toggle: boolean): void {
    SetVehicleHandbrake(this._handle, toggle);
  }

  setVehicleHandlingHashForAi(hash: number): void {
    SetVehicleHandlingHashForAi(this._handle, hash);
  }

  setVehicleHasBeenDrivenFlag(toggle: boolean): void {
    SetVehicleHasBeenDrivenFlag(this._handle, toggle);
  }

  setVehicleHasBeenOwnedByPlayer(owned: boolean): void {
    SetVehicleHasBeenOwnedByPlayer(this._handle, owned);
  }

  setVehicleHasMutedSirens(toggle: boolean): void {
    SetVehicleHasMutedSirens(this._handle, toggle);
  }

  setVehicleHasStrongAxles(toggle: boolean): void {
    SetVehicleHasStrongAxles(this._handle, toggle);
  }

  setVehicleHasUnbreakableLights(toggle: boolean): void {
    SetVehicleHasUnbreakableLights(this._handle, toggle);
  }

  setVehicleHeadlightShadows(flag: number): void {
    SetVehicleHeadlightShadows(this._handle, flag);
  }

  setVehicleInactiveDuringPlayback(toggle: boolean): void {
    SetVehicleInactiveDuringPlayback(this._handle, toggle);
  }

  setVehicleIndicatorLights(turnSignal: number, toggle: boolean): void {
    SetVehicleIndicatorLights(this._handle, turnSignal, toggle);
  }

  setVehicleIndividualDoorsLocked(doorIndex: number, doorLockStatus: number): void {
    SetVehicleIndividualDoorsLocked(this._handle, doorIndex, doorLockStatus);
  }

  setVehicleInfluencesWantedLevel(influencewantedLevel: boolean): void {
    SetVehicleInfluencesWantedLevel(this._handle, influencewantedLevel);
  }
  setVehicleInteriorColor(color: number): void {
    SetVehicleInteriorColor(this._handle, color);
  }

  setVehicleInteriorLight(toggle: boolean): void {
    SetVehicleInteriorlight(this._handle, toggle);
  }

  setVehicleIsConsideredByPlayer(toggle: boolean): void {
    SetVehicleIsConsideredByPlayer(this._handle, toggle);
  }

  setVehicleIsRacing(toggle: boolean): void {
    SetVehicleIsRacing(this._handle, toggle);
  }

  setVehicleIsStolen(isStolen: boolean): void {
    SetVehicleIsStolen(this._handle, isStolen);
  }

  setVehicleIsWanted(state: boolean): void {
    SetVehicleIsWanted(this._handle, state);
  }

  setVehicleKeepEngineOnWhenAbandoned(toggle: boolean): void {
    SetVehicleKeepEngineOnWhenAbandoned(this._handle, toggle);
  }

  setVehicleKersAllowed(toggle: boolean): void {
    SetVehicleKersAllowed(this._handle, toggle);
  }

  setVehicleLightMultiplier(multiplier: number): void {
    SetVehicleLightMultiplier(this._handle, multiplier);
  }

  setVehicleLights(state: number): void {
    SetVehicleLights(this._handle, state);
  }

  setVehicleLivery(livery: number): void {
    SetVehicleLivery(this._handle, livery);
  }

  setVehicleLodMultiplier(multiplier: number): void {
    SetVehicleLodMultiplier(this._handle, multiplier);
  }

  setVehicleMaxSpeed(speed: number): void {
    SetVehicleMaxSpeed(this._handle, speed);
  }

  setVehicleMod(modType: number, modIndex: number, customTires: boolean): void {
    SetVehicleMod(this._handle, modType, modIndex, customTires);
  }

  setVehicleModColor_1(paintType: number, color: number, pearlescentColor: number): void {
    SetVehicleModColor_1(this._handle, paintType, color, pearlescentColor);
  }

  setVehicleModColor_2(paintType: number, color: number): void {
    SetVehicleModColor_2(this._handle, paintType, color);
  }

  setVehicleModKit(modKit: number): void {
    SetVehicleModKit(this._handle, modKit);
  }

  static setVehicleModelIsSuppressed(model: number, suppressed: boolean): void {
    SetVehicleModelIsSuppressed(model, suppressed);
  }

  setVehicleNameDebug(name: string): void {
    SetVehicleNameDebug(this._handle, name);
  }

  setVehicleNeedsToBeHotwired(toggle: boolean): void {
    SetVehicleNeedsToBeHotwired(this._handle, toggle);
  }

  setVehicleNeonLightEnabled(index: number, toggle: boolean): void {
    SetVehicleNeonLightEnabled(this._handle, index, toggle);
  }

  setVehicleNeonLightsColor_2(color: number): void {
    SetVehicleNeonLightsColor_2(this._handle, color);
  }

  setVehicleNeonLightsColour(r: number, g: number, b: number): void {
    SetVehicleNeonLightsColour(this._handle, r, g, b);
  }

  setVehicleNumberPlateText(plateText: string): void {
    SetVehicleNumberPlateText(this._handle, plateText);
  }

  setVehicleNumberPlateTextIndex(plateIndex: number): void {
    SetVehicleNumberPlateTextIndex(this._handle, plateIndex);
  }

  setVehicleOnGroundProperly(): void {
    SetVehicleOnGroundProperly(this._handle);
  }

  setVehicleOutOfControl(killDriver: boolean, explodeOnImpact: boolean): void {
    SetVehicleOutOfControl(this._handle, killDriver, explodeOnImpact);
  }

  setVehicleParachuteActive(active: boolean): void {
    SetVehicleParachuteActive(this._handle, active);
  }

  setVehicleParachuteModel(modelHash: number): void {
    SetVehicleParachuteModel(this._handle, modelHash);
  }

  setVehicleParachuteTextureVariation(textureVariation: number): void {
    SetVehicleParachuteTextureVariation(this._handle, textureVariation);
  }

  setVehiclePetrolTankHealth(health: number): void {
    SetVehiclePetrolTankHealth(this._handle, health);
  }

  setVehicleProvidesCover(toggle: boolean): void {
    SetVehicleProvidesCover(this._handle, toggle);
  }

  setVehicleRampLaunchModifier(p1: number): void {
    SetVehicleRampLaunchModifier(this._handle, p1);
  }

  setVehicleRampSidewaysLaunchMotion(toggle: boolean): void {
    SetVehicleRampSidewaysLaunchMotion(this._handle, toggle);
  }

  setVehicleRampUpwardsLaunchMotion(toggle: boolean): void {
    SetVehicleRampUpwardsLaunchMotion(this._handle, toggle);
  }

  setVehicleReceivesRampDamage(toggle: boolean): void {
    SetVehicleReceivesRampDamage(this._handle, toggle);
  }

  setVehicleReduceGrip(toggle: boolean): void {
    SetVehicleReduceGrip(this._handle, toggle);
  }

  setVehicleReduceTraction(val: number): void {
    SetVehicleReduceTraction(this._handle, val);
  }

  setVehicleRocketBoostActive(active: boolean): void {
    SetVehicleRocketBoostActive(this._handle, active);
  }

  setVehicleRocketBoostPercentage(percentage: number): void {
    SetVehicleRocketBoostPercentage(this._handle, percentage);
  }

  setVehicleRocketBoostRefillTime(time: number): void {
    SetVehicleRocketBoostRefillTime(this._handle, time);
  }

  setVehicleRoofLivery(livery: number): void {
    SetVehicleRoofLivery(this._handle, livery);
  }

  setVehicleRudderBroken(toggle: boolean): void {
    SetVehicleRudderBroken(this._handle, toggle);
  }

  static setVehicleSearchlight(heli: Vehicle, toggle: boolean, canBeUsedByAI: boolean): void {
    SetVehicleSearchlight(heli.handle, toggle, canBeUsedByAI);
  }

  setVehicleShadowEffect(p1: number, p2: number): void {
    SetVehicleShadowEffect(this._handle, p1, p2);
  }

  static setVehicleShootAtTarget(driver: Ped, entityHandle: number, xTarget: number, yTarget: number, zTarget: number): void {
    SetVehicleShootAtTarget(driver.handle, entityHandle, xTarget, yTarget, zTarget);
  }

  setVehicleSilent(toggle: boolean): void {
    SetVehicleSilent(this._handle, toggle);
  }

  setVehicleSiren(state: boolean): void {
    SetVehicleSiren(this._handle, state);
  }

  SET_MISSION_TRAIN_AS_NO_LONGER_NEEDED(toggle: boolean): void {
    SetVehicleSt(this._handle, toggle);
  }

  setVehicleSteerBias(value: number): void {
    SetVehicleSteerBias(this._handle, value);
  }

  setVehicleSteeringBiasScalar(scalar: number): void {
    SetVehicleSteeringBiasScalar(this._handle, scalar);
  }

  setVehicleStrong(toggle: boolean): void {
    SetVehicleStrong(this._handle, toggle);
  }

  setVehicleTankTurretPosition(position: number, p2: boolean): void {
    SetVehicleTankTurretPosition(this._handle, position, p2);
  }

  setVehicleTimedExplosion(ped: Ped, toggle: boolean): void {
    SetVehicleTimedExplosion(this._handle, ped.handle, toggle);
  }

  setVehicleTowTruckArmPosition(position: number): void {
    SetVehicleTowTruckArmPosition(this._handle, position);
  }

  setVehicleTurretSpeedThisFrame(speed: number): void {
    SetVehicleTurretSpeedThisFrame(this._handle, speed);
  }

  setVehicleTurretUnk(index: number, toggle: boolean): void {
    SetVehicleTurretUnk(this._handle, index, toggle);
  }

  setVehicleTyreBurst(index: number, onRim: boolean, p3: number): void {
    SetVehicleTyreBurst(this._handle, index, onRim, p3);
  }

  setVehicleTyreFixed(tyreIndex: number): void {
    SetVehicleTyreFixed(this._handle, tyreIndex);
  }

  setVehicleTyreSmokeColor(r: number, g: number, b: number): void {
    SetVehicleTyreSmokeColor(this._handle, r, g, b);
  }

  setVehicleTyresCanBurst(toggle: boolean): void {
    SetVehicleTyresCanBurst(this._handle, toggle);
  }

  setVehicleUndriveable(toggle: boolean): void {
    SetVehicleUndriveable(this._handle, toggle);
  }

  setVehicleUnkDamageMultiplier(multiplier: number): void {
    SetVehicleUnkDamageMultiplier(this._handle, multiplier);
  }

  setVehicleUseAlternateHandling(toggle: boolean): void {
    SetVehicleUseAlternateHandling(this._handle, toggle);
  }

  static setVehicleUseCutsceneWheelCompression(veh: Vehicle, p1: boolean, p2: boolean, p3: boolean): void {
    SetVehicleUseCutsceneWheelCompression(veh.handle, p1, p2, p3);
  }

  setVehicleUseHornButtonForNitrous(bToggle: boolean): void {
    SetVehicleUseHornButtonForNitrous(this._handle, bToggle);
  }

  setVehicleUsePlayerLightSettings(toggle: boolean): void {
    SetVehicleUsePlayerLightSettings(this._handle, toggle);
  }

  setVehicleUsesLargeRearRamp(toggle: boolean): void {
    SetVehicleUsesLargeRearRamp(this._handle, toggle);
  }

  setVehicleWeaponRestrictedAmmo(weaponIndex: number, ammoCount: number): void {
    SetVehicleWeaponRestrictedAmmo(this._handle, weaponIndex, ammoCount);
  }

  setVehicleWeaponsDisabled(weaponSlot: number): void {
    SetVehicleWeaponsDisabled(this._handle, weaponSlot);
  }

  setVehicleWheelType(wheelType: number): void {
    SetVehicleWheelType(this._handle, wheelType);
  }

  setVehicleWheelsCanBreak(enabled: boolean): void {
    SetVehicleWheelsCanBreak(this._handle, enabled);
  }

  setVehicleWheelsCanBreakOffWhenBlownUp(toggle: boolean): void {
    SetVehicleWheelsCanBreakOffWhenBlowUp(this._handle, toggle);
  }

  setVehicleWheelsDealDamage(toggle: boolean): void {
    SetVehicleWheelsDealDamage(this._handle, toggle);
  }

  setVehicleWindowTint(tint: number): void {
    SetVehicleWindowTint(this._handle, tint);
  }

  setVehicleXenonLightsColor(color: number): void {
    SetVehicleXenonLightsColor(this._handle, color);
  }

  skipTimeInPlaybackRecordedVehicle(time: number): void {
    SkipTimeInPlaybackRecordedVehicle(this._handle, time);
  }

  skipToEndAndStopPlaybackRecordedVehicle(): void {
    SkipToEndAndStopPlaybackRecordedVehicle(this._handle);
  }

  smashVehicleWindow(windowIndex: number): void {
    SmashVehicleWindow(this._handle, windowIndex);
  }

  startPlaybackRecordedVehicle(recording: number, script: string, p3: boolean): void {
    StartPlaybackRecordedVehicle(this._handle, recording, script, p3);
  }

  startPlaybackRecordedVehicleUsingAi(recording: number, script: string, speed: number, drivingStyle: number): void {
    StartPlaybackRecordedVehicleUsingAi(this._handle, recording, script, speed, drivingStyle);
  }

  startPlaybackRecordedVehicleWithFlags(
    recording: number,
    script: string,
    flags: number,
    time: number,
    drivingStyle: number,
  ): void {
    StartPlaybackRecordedVehicleWithFlags(this._handle, recording, script, flags, time, drivingStyle);
  }

  startVehicleAlarm(): void {
    StartVehicleAlarm(this._handle);
  }

  startVehicleHorn(duration: number, mode: number, forever: boolean): void {
    StartVehicleHorn(this._handle, duration, mode, forever);
  }

  stopBringVehicleToHalt(): void {
    StopBringVehicleToHalt(this._handle);
  }

  stopPlaybackRecordedVehicle(): void {
    StopPlaybackRecordedVehicle(this._handle);
  }

  toggleVehicleMod(modType: number, toggle: boolean): void {
    ToggleVehicleMod(this._handle, modType, toggle);
  }

  trackVehicleVisibility(): void {
    TrackVehicleVisibility(this._handle);
  }

  transformToCar(instantly: boolean): void {
    TransformToCar(this._handle, instantly);
  }

  transformToSubmarine(instantly: boolean): void {
    TransformToSubmarine(this._handle, instantly);
  }

  unpausePlaybackRecordedVehicle(): void {
    UnpausePlaybackRecordedVehicle(this._handle);
  }
}
