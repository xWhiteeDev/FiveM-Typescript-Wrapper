import { IVector3 } from '../typings/Vector';
import { IVehicleOptions } from '../typings/Vehicle';
import { Utils } from '../Utils/Utils';
import { BaseEntity } from './BaseEntity';
import { Ped } from './Ped';

export class Vehicle extends BaseEntity {
  private constructor(protected _handle: number) {
    super(_handle);
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

  get isAudiblyDamaged(): boolean {
    return IsVehicleAudiblyDamaged(this._handle);
  }

  get isRadioOn(): boolean {
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
  removeCrewEmblem(p1: number): void {
    RemoveVehicleCrewEmblem(this._handle, p1);
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

  get convertibleRoofState(): number {
    return GetConvertibleRoofState(this._handle);
  }

  get currentPlaybackForVehicle(): number {
    return GetCurrentPlaybackForVehicle(this._handle);
  }

  static getDisplayNameFromVehicleModel(modelHash: number): string {
    return GetDisplayNameFromVehicleModel(modelHash);
  }

  doesVehicleHaveTombstone(): boolean {
    return GetDoesVehicleHaveTombstone(this._handle);
  }

  getEntryPositionOfDoor(doorIndex: number): IVector3 {
    const [x, y, z] = GetEntryPositionOfDoor(this._handle, doorIndex);
    return { x, y, z };
  }

  get hasRetractableWheels(): boolean {
    return GetHasRetractableWheels(this._handle);
  }

  get hasRocketBoost(): boolean {
    return GetHasRocketBoost(this._handle);
  }

  get isBoatCapsized(): boolean {
    return GetIsBoatCapsized(this._handle);
  }

  isDoorValid(doorIndex: number): boolean {
    return GetIsDoorValid(this._handle, doorIndex);
  }
  get trackBrakingDistance(): number {
    return GetTrackBrakingDistance(this._handle);
  }

  get trackMaxSpeed(): number {
    return GetTrackMaxSpeed(this._handle);
  }

  getTrackNodeCoords(trackNode: number): number[] {
    return GetTrackNodeCoords(this._handle, trackNode)[1];
  }

  get trackNodeCount(): number {
    return GetTrackNodeCount(this._handle);
  }
  get trainCruiseSpeed(): number {
    return GetTrainCruiseSpeed(this._handle);
  }

  get trainCurrentTrackNode(): number {
    return GetTrainCurrentTrackNode(this._handle);
  }

  get isTrainMovingForward(): boolean {
    return GetTrainDirection(this._handle);
  }

  get trainDoorCount(): number {
    return GetTrainDoorCount(this._handle);
  }

  getTrainDoorOpenRatio(doorIndex: number): number {
    return GetTrainDoorOpenRatio(this._handle, doorIndex);
  }

  get trainSpeed(): number {
    return GetTrainSpeed(this._handle);
  }

  get trainState(): number {
    return GetTrainState(this._handle);
  }

  get trainTrackIndex(): number {
    return GetTrainTrackIndex(this._handle);
  }
  get isLeftVehicleHeadlightDamaged(): boolean {
    return GetIsLeftVehicleHeadlightDamaged(this._handle);
  }

  get isRightVehicleHeadlightDamaged(): boolean {
    return GetIsRightVehicleHeadlightDamaged(this._handle);
  }

  static isVehicleElectric(vehicleModel: number): boolean {
    return GetIsVehicleElectric(vehicleModel);
  }

  get isVehicleEmpDisabled(): boolean {
    return GetIsVehicleEmpDisabled(this._handle);
  }

  get isVehicleEngineRunning(): boolean {
    return GetIsVehicleEngineRunning(this._handle);
  }

  get isVehiclePrimaryColourCustom(): boolean {
    return GetIsVehiclePrimaryColourCustom(this._handle);
  }

 get  isVehicleSecondaryColourCustom(): boolean {
    return GetIsVehicleSecondaryColourCustom(this._handle);
  }

  get isVehicleShuntBoostActive(): boolean {
    return GetIsVehicleShuntBoostActive(this._handle);
  }

  get landingGearState(): number {
    return GetLandingGearState(this._handle);
  }

  getLastPedInVehicleSeat(seatIndex: number): Ped {
    const handlePed = GetLastPedInVehicleSeat(this._handle, seatIndex);
    return new Ped(handlePed);
  }

  get lastRammedVehicle(): Vehicle {
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
  get fuelConsumptionRateMultiplier(): number {
    return GetFuelConsumptionRateMultiplier();
  }

  get fuelConsumptionState(): boolean {
    return GetFuelConsumptionState();
  }
  get globalPassengerMassMultiplier(): number {
    return GetGlobalPassengerMassMultiplier();
  }

  get vehicleDashboardBoost(): number {
    return GetVehicleDashboardBoost();
  }

  get vehicleDashboardColour(): number {
    return GetVehicleDashboardColour(this._handle);
  }

  get vehicleDashboardCurrentGear(): number {
    return GetVehicleDashboardCurrentGear();
  }

  get vehicleDashboardFuel(): number {
    return GetVehicleDashboardFuel();
  }

  get vehicleDashboardLights(): number {
    return GetVehicleDashboardLights();
  }

  get vehicleDashboardOilPressure(): number {
    return GetVehicleDashboardOilPressure();
  }

  get vehicleDashboardOilTemp(): number {
    return GetVehicleDashboardOilTemp();
  }

  get vehicleDashboardRpm(): number {
    return GetVehicleDashboardRpm();
  }

  get vehicleDashboardSpeed(): number {
    return GetVehicleDashboardSpeed(this._handle);
  }

  get vehicleDashboardTemp(): number {
    return GetVehicleDashboardTemp();
  }

  get vehicleDashboardVacuum(): number {
    return GetVehicleDashboardVacuum();
  }

  get vehicleDensityMultiplier(): number {
    return GetVehicleDensityMultiplier();
  }

  getNumVehicleMods(modType: number): number {
    return GetNumVehicleMods(this._handle, modType);
  }

  get numberOfVehicleColours(): number {
    return GetNumberOfVehicleColours(this._handle);
  }

  get numberOfVehicleDoors(): number {
    return GetNumberOfVehicleDoors(this._handle);
  }

  static get numberOfVehicleNumberPlates(): number {
    return GetNumberOfVehicleNumberPlates();
  }

  getPedInVehicleSeat(seatIndex: number): Ped {
    return new Ped(GetPedInVehicleSeat(this._handle, seatIndex));
  }

  getPedUsingVehicleDoor(doorIndex: number): Ped {
    return new Ped(GetPedUsingVehicleDoor(this._handle, doorIndex));
  }

  get positionInRecording(): number {
    return GetPositionInRecording(this._handle);
  }

  get remainingNitrousDuration(): number {
    return GetRemainingNitrousDuration(this._handle);
  }

  get timePositionInRecording(): number {
    return GetTimePositionInRecording(this._handle);
  }

  get vehicleAcceleration(): number {
    return GetVehicleAcceleration(this._handle);
  }

  static getVehicleAttachedToCargobob(cargobob: Vehicle): Vehicle {
    return Vehicle.fromHandle(GetVehicleAttachedToCargobob(cargobob._handle));
  }

  get vehicleBodyHealth(): number {
    return GetVehicleBodyHealth(this._handle);
  }

  static getVehicleBombCount(aircraft: Vehicle): number {
    return GetVehicleBombCount(aircraft._handle);
  }

  get vehicleCanActivateParachute(): boolean {
    return GetVehicleCanActivateParachute(this._handle);
  }

  get vehicleCauseOfDestruction(): number {
    return GetVehicleCauseOfDestruction(this._handle);
  }

  get vehicleClass(): number {
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

  get vehicleColor(): [number, number, number] {
    return GetVehicleColor(this._handle);
  }

  get vehicleColourCombination(): number {
    return GetVehicleColourCombination(this._handle);
  }

  get vehicleColours(): [number, number] {
    return GetVehicleColours(this._handle);
  }

  get vehicleColoursWhichCanBeSet(): number {
    return GetVehicleColoursWhichCanBeSet(this._handle);
  }

  static getVehicleCountermeasureCount(aircraft: Vehicle): number {
    return GetVehicleCountermeasureCount(aircraft._handle);
  }

  get vehicleCurrentSlipstreamDraft(): number {
    return GetVehicleCurrentSlipstreamDraft(this._handle);
  }

  get vehicleCustomPrimaryColour(): [number, number, number] {
    return GetVehicleCustomPrimaryColour(this._handle);
  }

  get vehicleCustomSecondaryColour(): [number, number, number] {
    return GetVehicleCustomSecondaryColour(this._handle);
  }

  get vehicleDashboardColor(): number {
    return GetVehicleDashboardColor(this._handle);
  }

  getVehicleDeformationAtPos(offsetX: number, offsetY: number, offsetZ: number): IVector3 {
    const [x, y, z] = GetVehicleDeformationAtPos(this._handle, offsetX, offsetY, offsetZ);
    return { x, y, z };
  }
  get vehicleDirtLevel(): number {
    return GetVehicleDirtLevel(this._handle);
  }

  getVehicleDoorAngleRatio(doorIndex: number): number {
    return GetVehicleDoorAngleRatio(this._handle, doorIndex);
  }

  get vehicleDoorLockStatus(): number {
    return GetVehicleDoorLockStatus(this._handle);
  }

  get doorsLockedForPlayer(): boolean {
    return GetVehicleDoorsLockedForPlayer(this._handle, PlayerId());
  }

  static getVehicleDrivetrainType(vehicleModel: number): number {
    return GetVehicleDrivetrainType(vehicleModel);
  }

  get vehicleEngineHealth(): number {
    return GetVehicleEngineHealth(this._handle);
  }

  get vehicleEnveffScale(): number {
    return GetVehicleEnveffScale(this._handle);
  }

  get vehicleEstimatedMaxSpeed(): number {
    return GetVehicleEstimatedMaxSpeed(this._handle);
  }

  get vehicleExtraColours(): [number, number] {
    return GetVehicleExtraColours(this._handle);
  }

  static getVehicleFlightNozzlePosition(aircraft: Vehicle): number {
    return GetVehicleFlightNozzlePosition(aircraft.handle);
  }

  get vehicleHaskers(): boolean {
    return GetVehicleHasKers(this._handle);
  }

  get vehicleHasParachute(): boolean {
    return GetVehicleHasParachute(this._handle);
  }

  get vehicleHealthPercentage(): number {
    return GetVehicleHealthPercentage(this._handle);
  }

  get vehicleHomingLockonState(): number {
    return GetVehicleHomingLockonState(this._handle);
  }

  getVehicleIndividualDoorLockStatus(doorIndex: number): number {
    return GetVehicleIndividualDoorLockStatus(this._handle, doorIndex);
  }

  get vehicleInteriorColor(): number {
    return GetVehicleInteriorColor(this._handle);
  }

  get isVehicleMercenary(): boolean {
    return GetVehicleIsMercenary(this._handle);
  }

  get vehicleLayoutHash(): number {
    return GetVehicleLayoutHash(this._handle);
  }

  get vehicleLightsState(): [boolean, any, any] {
    return GetVehicleLightsState(this._handle);
  }

  get vehicleLivery(): number {
    return GetVehicleLivery(this._handle);
  }

  get vehicleLiveryCount(): number {
    return GetVehicleLiveryCount(this._handle);
  }

  get vehicleLockOnTarget(): Vehicle {
    return Vehicle.fromHandle(GetVehicleLockOnTarget(this._handle)[1]);
  }

  get vehicleMaxBraking(): number {
    return GetVehicleMaxBraking(this._handle);
  }

  get vehicleMaxNumberOfPassengers(): number {
    return GetVehicleMaxNumberOfPassengers(this._handle);
  }

  get vehicleMaxTraction(): number {
    return GetVehicleMaxTraction(this._handle);
  }

  getVehicleMod(modType: number): number {
    return GetVehicleMod(this._handle, modType);
  }

  get vehicleModColor_1(): [number, number, number] {
    return GetVehicleModColor_1(this._handle);
  }

  getVehicleModColor_1Name(p1: boolean): string {
    return GetVehicleModColor_1Name(this._handle, p1);
  }

  get vehicleModColor_2(): [number, number] {
    return GetVehicleModColor_2(this._handle);
  }

  get vehicleModColor_2Name(): string {
    return GetVehicleModColor_2Name(this._handle);
  }

  getVehicleModIdentifierHash(modType: number, modIndex: number): number {
    return GetVehicleModIdentifierHash(this._handle, modType, modIndex);
  }

  get vehicleModKit(): number {
    return GetVehicleModKit(this._handle);
  }

  get vehicleModKitType(): number {
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

  get vehicleNeonLightsColour(): [number, number, number] {
    return GetVehicleNeonLightsColour(this._handle);
  }

  get vehicleNumberOfBrokenBones(): number {
    return GetVehicleNumberOfBrokenBones(this._handle);
  }

  get vehicleNumberOfBrokenOffBones(): number {
    return GetVehicleNumberOfBrokenOffBones(this._handle);
  }
  get vehicleNumberOfPassengers(): number {
    return GetVehicleNumberOfPassengers(this._handle);
  }

  get vehicleNumberPlateText(): string {
    return GetVehicleNumberPlateText(this._handle);
  }

  get vehicleNumberPlateTextIndex(): number {
    return GetVehicleNumberPlateTextIndex(this._handle);
  }

  get vehiclePetrolTankHealth(): number {
    return GetVehiclePetrolTankHealth(this._handle);
  }

  get vehiclePlateType(): number {
    return GetVehiclePlateType(this._handle);
  }

  get vehicleRoofLivery(): number {
    return GetVehicleRoofLivery(this._handle);
  }

  get vehicleRoofLiveryCount(): number {
    return GetVehicleRoofLiveryCount(this._handle);
  }

  get vehicleSuspensionBounds(): [IVector3, IVector3[]] {
    const [[x, y, z], [x2, y2, z2]] = GetVehicleSuspensionBounds(this._handle);
    return [{ x, y, z }, [{ x: x2, y: y2, z: z2 }]];
  }

  get vehicleSuspensionHeight(): number {
    return GetVehicleSuspensionHeight(this._handle);
  }

  get vehicleTrailerVehicle(): Vehicle {
    return Vehicle.fromHandle(GetVehicleTrailerVehicle(this._handle)[1]);
  }

  get vehicleTyreSmokeColor(): [number, number, number] {
    return GetVehicleTyreSmokeColor(this._handle);
  }

  get vehicleTyresCanBurst(): boolean {
    return GetVehicleTyresCanBurst(this._handle);
  }

  getVehicleWeaponRestrictedAmmo(weaponIndex: number): number {
    return GetVehicleWeaponRestrictedAmmo(this._handle, weaponIndex);
  }

  get vehicleWheelType(): number {
    return GetVehicleWheelType(this._handle);
  }

  get vehicleWindowTint(): number {
    return GetVehicleWindowTint(this._handle);
  }

  get vehicleXenonLightsColor(): number {
    return GetVehicleXenonLightsColor(this._handle);
  }

  haveVehicleModsStreamedIn(): boolean {
    return HaveVehicleModsStreamedIn(this._handle);
  }

  hideVehicleTombstone(toggle: boolean): void {
    HideVehicleTombstone(this._handle, toggle);
  }

  get isAnyPedRappellingFromHeli(): boolean {
    return IsAnyPedRappellingFromHeli(this._handle);
  }

  static isAnyVehicleNearPoint(x: number, y: number, z: number, radius: number): boolean {
    return IsAnyVehicleNearPoint(x, y, z, radius);
  }

  get isBigVehicle(): boolean {
    return IsBigVehicle(this._handle);
  }

  isEntityAttachedToHandlerFrame(entityHandle: number): boolean {
    return IsEntityAttachedToHandlerFrame(this._handle, entityHandle);
  }

  get isNitrousActive(): boolean {
    return IsNitrousActive(this._handle);
  }

  static isPlaneLandingGearIntact(plane: Vehicle): boolean {
    return IsPlaneLandingGearIntact(plane.handle);
  }

  get isPlaybackGoingOnForVehicle(): boolean {
    return IsPlaybackGoingOnForVehicle(this._handle);
  }

  get isPlaybackUsingAiGoingOnForVehicle(): boolean {
    return IsPlaybackUsingAiGoingOnForVehicle(this._handle);
  }

  isVehicleAConvertible(checkRoofExtras: boolean): boolean {
    return IsVehicleAConvertible(this._handle, checkRoofExtras);
  }

  get isVehicleAlarmActivated(): boolean {
    return IsVehicleAlarmActivated(this._handle);
  }

  static isVehicleAttachedToCargobob(cargobob: Vehicle, vehicleAttached: Vehicle): boolean {
    return IsVehicleAttachedToCargobob(cargobob.handle, vehicleAttached.handle);
  }

  static isVehicleAttachedToTowTruck(towTruck: Vehicle, vehicle: Vehicle): boolean {
    return IsVehicleAttachedToTowTruck(towTruck.handle, vehicle.handle);
  }

  get isVehicleAttachedToTrailer(): boolean {
    return IsVehicleAttachedToTrailer(this._handle);
  }

  get isVehicleBeingHalted(): boolean {
    return IsVehicleBeingHalted(this._handle);
  }

  isVehicleBumperBouncing(frontBumper: boolean): boolean {
    return IsVehicleBumperBouncing(this._handle, frontBumper);
  }

  isVehicleBumperBrokenOff(front: boolean): boolean {
    return IsVehicleBumperBrokenOff(this._handle, front);
  }

  get isVehicleDamaged(): boolean {
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

  get isVehicleEngineOnFire(): boolean {
    return IsVehicleEngineOnFire(this._handle);
  }

  isVehicleExtraTurnedOn(extraId: number): boolean {
    return IsVehicleExtraTurnedOn(this._handle, extraId);
  }

  get isVehicleHighDetail(): boolean {
    return IsVehicleHighDetail(this._handle);
  }

  get isVehicleInBurnout(): boolean {
    return IsVehicleInBurnout(this._handle);
  }

  static isVehicleInGarageArea(garageName: string, vehicle: Vehicle): boolean {
    return IsVehicleInGarageArea(garageName, vehicle.handle);
  }

  get isVehicleInSubmarineMode(): boolean {
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

  get isVehicleOnAllWheels(): boolean {
    return IsVehicleOnAllWheels(this._handle);
  }

  get isVehicleOnBoostPad(): boolean {
    return IsVehicleOnBoostPad(this._handle);
  }

  get isVehicleParachuteActive(): boolean {
    return IsVehicleParachuteActive(this._handle);
  }

  get isVehicleRocketBoostActive(): boolean {
    return IsVehicleRocketBoostActive(this._handle);
  }

  get isVehicleSearchlightOn(): boolean {
    return IsVehicleSearchlightOn(this._handle);
  }

  isVehicleSeatFree(seatIndex: number): boolean {
    return IsVehicleSeatFree(this._handle, seatIndex);
  }

  get isVehicleSirenAudioOn(): boolean {
    return IsVehicleSirenAudioOn(this._handle);
  }

  get isVehicleSirenOn(): boolean {
    return IsVehicleSirenOn(this._handle);
  }

  get isVehicleSlipstreamLeader(): boolean {
    return IsVehicleSlipstreamLeader(this._handle);
  }

  get isVehicleSprayable(): boolean {
    return IsVehicleSprayable(this._handle);
  }

  get isVehicleStolen(): boolean {
    return IsVehicleStolen(this._handle);
  }

  get isVehicleStopped(): boolean {
    return IsVehicleStopped(this._handle);
  }

  get isVehicleStoppedAtTrafficLights(): boolean {
    return IsVehicleStoppedAtTrafficLights(this._handle);
  }

  get isVehicleStuckOnRoof(): boolean {
    return IsVehicleStuckOnRoof(this._handle);
  }

  isVehicleStuckTimerUp(p1: number, p2: number): boolean {
    return IsVehicleStuckTimerUp(this._handle, p1, p2);
  }

  isVehicleTyreBurst(wheelID: number, isBurstToRim: boolean): boolean {
    return IsVehicleTyreBurst(this._handle, wheelID, isBurstToRim);
  }

  get isVehicleVisible(): boolean {
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

  setVehicleDoorsLockedForPlayer(toggle: boolean): void {
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

  static addRoadNodeSpeedZone(x: number, y: number, z: number, radius: number, speed: number, p5: boolean): number {
    return AddRoadNodeSpeedZone(x, y, z, radius, speed, p5);
  }

  static addVehicleCombatAngledAvoidanceArea(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number): any {
    return AddVehicleCombatAngledAvoidanceArea(p0, p1, p2, p3, p4, p5, p6);
  }

  static addVehicleStuckCheckWithWarp(p0: any, p1: number, p2: any, p3: boolean, p4: boolean, p5: boolean, p6: any): void {
    AddVehicleStuckCheckWithWarp(p0, p1, p2, p3, p4, p5, p6);
  }

  areBombBayDoorsOpen(): boolean {
    return AreBombBayDoorsOpen(this._handle);
  }

  areHeliStubWingsDeployed(): boolean {
    return AreHeliStubWingsDeployed(this._handle);
  }

  arePlaneControlPanelsIntact(checkForZeroHealth: boolean): boolean {
    return ArePlaneControlPanelsIntact(this._handle, checkForZeroHealth);
  }

  arePlanePropellersIntact(): boolean {
    return ArePlanePropellersIntact(this._handle);
  }

  attachContainerToHandlerFrame(container: number): void {
    AttachContainerToHandlerFrame(this._handle, container);
  }

  attachEntityToCargobob(entity: number, p2: number, x: number, y: number, z: number): void {
    AttachEntityToCargobob(this._handle, entity, p2, x, y, z);
  }

  canAnchorBoatHere(): boolean {
    return CanAnchorBoatHere(this._handle);
  }

  canAnchorBoatHereIgnorePlayers(): boolean {
    return CanAnchorBoatHereIgnorePlayers(this._handle);
  }

  canCargobobPickUpEntity(entity: number): boolean {
    return CanCargobobPickUpEntity(this._handle, entity);
  }

  canShuffleSeat(seatIndex: number): boolean {
    return CanShuffleSeat(this._handle, seatIndex);
  }

  static clearLastDrivenVehicle(): void {
    ClearLastDrivenVehicle();
  }

  static clearVehicleGeneratorAreaOfInterest(): void {
    ClearVehicleGeneratorAreaOfInterest();
  }

  static clearVehiclePhoneExplosiveDevice(): void {
    ClearVehiclePhoneExplosiveDevice();
  }

  closeBombBayDoors(): void {
    CloseBombBayDoors(this._handle);
  }

  static createMissionTrain(variation: number, x: number, y: number, z: number, direction: boolean): Vehicle {
    return Vehicle.fromHandle(CreateMissionTrain(variation, x, y, z, direction));
  }

  createPickUpRopeForCargobob(state: number): void {
    CreatePickUpRopeForCargobob(this._handle, state);
  }

  static createScriptVehicleGenerator(x: number, y: number, z: number, heading: number, p4: number, p5: number, modelHash: number, p7: number, p8: number, p9: number, p10: number, p11: boolean, p12: boolean, p13: boolean, p14: boolean, p15: boolean, p16: number): number {
    return CreateScriptVehicleGenerator(x, y, z, heading, p4, p5, modelHash, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16);
  }

  static deleteAllTrains(): void {
    DeleteAllTrains();
  }

  deleteMissionTrain(): void {
    DeleteMissionTrain(this._handle);
  }

  static deleteScriptVehicleGenerator(vehicleGenerator: number): void {
    DeleteScriptVehicleGenerator(vehicleGenerator);
  }

  deleteVehicle(): void {
    DeleteVehicle(this._handle);
  }

  detachContainerFromHandlerFrame(): void {
    DetachContainerFromHandlerFrame(this._handle);
  }

  detachEntityFromCargobob(entity: number): any {
    return DetachEntityFromCargobob(this._handle, entity);
  }

  static detonateVehiclePhoneExplosiveDevice(): void {
    DetonateVehiclePhoneExplosiveDevice();
  }

  disableIndividualPlanePropeller(propeller: number): void {
    DisableIndividualPlanePropeller(this._handle, propeller);
  }

  disablePlaneAileron(p1: boolean, p2: boolean): void {
    DisablePlaneAileron(this._handle, p1, p2);
  }

  static disableVehicleWeapon(disabled: boolean, weaponHash: number, vehicle: Vehicle, owner: Ped): void {
    DisableVehicleWeapon(disabled, weaponHash, vehicle.handle, owner.handle);
  }

  doesCargobobHavePickUpRope(): boolean {
    return DoesCargobobHavePickUpRope(this._handle);
  }

  doesCargobobHavePickupMagnet(): boolean {
    return DoesCargobobHavePickupMagnet(this._handle);
  }

  static doesScriptVehicleGeneratorExist(vehicleGenerator: number): boolean {
    return DoesScriptVehicleGeneratorExist(vehicleGenerator);
  }

  ejectJb700Roof(x: number, y: number, z: number): void {
    EjectJb700Roof(this._handle, x, y, z);
  }

  enableIndividualPlanePropeller(propeller: number): void {
    EnableIndividualPlanePropeller(this._handle, propeller);
  }

  static findRandomPointInSpace(ped: Ped): IVector3 {
    const [x, y, z] = FindRandomPointInSpace(ped.handle);
    return { x, y, z };
  }

  static findVehicleCarryingThisEntity(entity: number): Vehicle {
    return Vehicle.fromHandle(FindVehicleCarryingThisEntity(entity));
  }

  forceSubmarineNeurtalBuoyancy(time: number): void {
    ForceSubmarineNeurtalBuoyancy(this._handle, time);
  }

  forceSubmarineSurfaceMode(toggle: boolean): void {
    ForceSubmarineSurfaceMode(this._handle, toggle);
  }

  static get allVehicles(): [number, unknown] {
    return GetGamePool('CVehicle');
  }

  get boatBoomPositionRatio(): number {
    return GetBoatBoomPositionRatio(this._handle);
  }

  getBoatBoomPositionRatio_3(p1: boolean): void {
    GetBoatBoomPositionRatio_3(this._handle, p1);
  }

  static getBoatVehicleModelAgility(modelHash: number): number {
    return GetBoatVehicleModelAgility(modelHash);
  }

  get cargobobHookPosition(): IVector3 {
    const [x, y, z] = GetCargobobHookPosition(this._handle);
    return { x, y, z };
  }

  static getClosestVehicle(x: number, y: number, z: number, radius: number, modelHash: number, flags: number): Vehicle {
    return Vehicle.fromHandle(GetClosestVehicle(x, y, z, radius, modelHash, flags));
  }

  get driftTyresEnabled(): boolean {
    return GetDriftTyresEnabled(this._handle);
  }

  get entityAttachedToCargobob(): number {
    return GetEntityAttachedToCargobob(this._handle);
  }

  get entityAttachedToTowTruck(): number {
    return GetEntityAttachedToTowTruck(this._handle);
  }

  get heliMainRotorHealth(): number {
    return GetHeliMainRotorHealth(this._handle);
  }

  get heliTailBoomHealth(): number {
    return GetHeliTailBoomHealth(this._handle);
  }

  get heliTailRotorHealth(): number {
    return GetHeliTailRotorHealth(this._handle);
  }

  getHydraulicWheelValue(wheelId: number): number {
    return GetHydraulicWheelValue(this._handle, wheelId);
  }

  get isWheelsLoweredStateActive(): boolean {
    return GetIsWheelsLoweredStateActive(this._handle);
  }

  static get lastDrivenVehicle(): Vehicle {
    return Vehicle.fromHandle(GetLastDrivenVehicle());
  }

  getModSlotName(modType: number): string {
    return GetModSlotName(this._handle, modType);
  }

  static getNumModColors(paintType: number, p1: boolean): number {
    return GetNumModColors(paintType, p1);
  }

  get numModKits(): number {
    return GetNumModKits(this._handle);
  }

  static get numVehicleWindowTints(): number {
    return GetNumVehicleWindowTints();
  }

  static getPositionOfVehicleRecordingAtTime(recording: number, time: number, script: string): IVector3 {
    const [x, y, z] = GetPositionOfVehicleRecordingAtTime(recording, time, script);
    return { x, y, z };
  }

  static getPositionOfVehicleRecordingIdAtTime(id: number, time: number): IVector3 {
    const [x, y, z] = GetPositionOfVehicleRecordingIdAtTime(id, time);
    return { x, y, z };
  }

  static getRandomVehicleBackBumperInSphere(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number): Vehicle {
    return Vehicle.fromHandle(GetRandomVehicleBackBumperInSphere(p0, p1, p2, p3, p4, p5, p6));
  }

  static getRandomVehicleFrontBumperInSphere(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number): Vehicle {
    return Vehicle.fromHandle(GetRandomVehicleFrontBumperInSphere(p0, p1, p2, p3, p4, p5, p6));
  }

  static getRandomVehicleInSphere(x: number, y: number, z: number, radius: number, modelHash: number, flags: number): Vehicle {
    return Vehicle.fromHandle(GetRandomVehicleInSphere(x, y, z, radius, modelHash, flags));
  }

  static getRandomVehicleModelInMemory(p0: boolean): [any, any] {
    return GetRandomVehicleModelInMemory(p0);
  }

  static getRotationOfVehicleRecordingAtTime(recording: number, time: number, script: string): IVector3 {
    const [x, y, z] = GetRotationOfVehicleRecordingAtTime(recording, time, script);
    return { x, y, z };
  }

  static getRotationOfVehicleRecordingIdAtTime(id: number, time: number): IVector3 {
    const [x, y, z] = GetRotationOfVehicleRecordingIdAtTime(id, time);
    return { x, y, z };
  }

  get submarineIsUnderDesignDepth(): boolean {
    return GetSubmarineIsUnderDesignDepth(this._handle);
  }

  get submarineNumberOfAirLeaks(): number {
    return GetSubmarineNumberOfAirLeaks(this._handle);
  }

  static getTotalDurationOfVehicleRecording(recording: number, script: string): number {
    return GetTotalDurationOfVehicleRecording(recording, script);
  }

  static getTotalDurationOfVehicleRecordingId(id: number): number {
    return GetTotalDurationOfVehicleRecordingId(id);
  }

  getTrainCarriage(trailerNumber: number): number {
    return GetTrainCarriage(this._handle, trailerNumber);
  }

  getTyreHealth(wheelIndex: number): number {
    return GetTyreHealth(this._handle, wheelIndex);
  }

  getTyreWearMultiplier(wheelIndex: number): number {
    return GetTyreWearMultiplier(this._handle, wheelIndex);
  }

  static getVehicleDriveTrainType(vehicleModel: number): number {
    return GetVehicleDrivetrainType(vehicleModel);
  }

  static getVehicleRecordingId(recording: number, script: string): number {
    return GetVehicleRecordingId(recording, script);
  }

  static hasFilledVehiclePopulation(): boolean {
    return HasFilledVehiclePopulation();
  }

  static hasPreloadModsFinished(p0: any): boolean {
    return HasPreloadModsFinished(p0);
  }

  static hasVehicleAssetLoaded(vehicleAsset: number): boolean {
    return HasVehicleAssetLoaded(vehicleAsset);
  }

  static hasVehiclePhoneExplosiveDevice(): boolean {
    return HasVehiclePhoneExplosiveDevice();
  }

  static hasVehicleRecordingBeenLoaded(recording: number, script: string): boolean {
    return HasVehicleRecordingBeenLoaded(recording, script);
  }

  static instantlyFillVehiclePopulation(): void {
    InstantlyFillVehiclePopulation();
  }

  get isAnyEntityAttachedToHandlerFrame(): boolean {
    return IsAnyEntityAttachedToHandlerFrame(this._handle);
  }

  get isBoatAnchored(): boolean {
    return IsBoatAnchored(this._handle);
  }

  static isCopVehicleInArea_3d(x1: number, x2: number, y1: number, y2: number, z1: number, z2: number): boolean {
    return IsCopVehicleInArea_3d(x1, x2, y1, y2, z1, z2);
  }

  static isEntryPointForSeatClear(ped: Ped, vehicle: Vehicle, seatIndex: number, checkSide: boolean, leftSide: boolean): boolean {
    return IsEntryPointForSeatClear(ped.handle, vehicle.handle, seatIndex, checkSide, leftSide);
  }

  isHandlerFrameAboveContainer(container: number): boolean {
    return IsHandlerFrameAboveContainer(this._handle, container);
  }

  get isHeliLandingAreaBlocked(): boolean {
    return IsHeliLandingAreaBlocked(this._handle);
  }

  isHeliPartBroken(p1: boolean, p2: boolean, p3: boolean): boolean {
    return IsHeliPartBroken(this._handle, p1, p2, p3);
  }

  get isMissionTrain(): boolean {
    return IsMissionTrain(this._handle);
  }

  static isPedExclusiveDriverOfVehicle(ped: Ped, vehicle: Vehicle): [boolean, any] {
    return IsPedExclusiveDriverOfVehicle(ped.handle, vehicle.handle);
  }

  isSeatWarpOnly(seatIndex: number): boolean {
    return IsSeatWarpOnly(this._handle, seatIndex);
  }

  get isTaxiLightOn(): boolean {
    return IsTaxiLightOn(this._handle);
  }

  static isThisModelABicycle(model: number): boolean {
    return IsThisModelABicycle(model);
  }

  static isThisModelABike(model: number): boolean {
    return IsThisModelABike(model);
  }

  static isThisModelABoat(model: number): boolean {
    return IsThisModelABoat(model);
  }

  static isThisModelACar(model: number): boolean {
    return IsThisModelACar(model);
  }

  static isThisModelAHeli(model: number): boolean {
    return IsThisModelAHeli(model);
  }

  static isThisModelAJetski(model: number): boolean {
    return IsThisModelAJetski(model);
  }

  static isThisModelAPlane(model: number): boolean {
    return IsThisModelAPlane(model);
  }

  static isThisModelAQuadbike(model: number): boolean {
    return IsThisModelAQuadbike(model);
  }

  static isThisModelATrain(model: number): boolean {
    return IsThisModelATrain(model);
  }

  static isThisModelAnAmphibiousCar(model: number): boolean {
    return IsThisModelAnAmphibiousCar(model);
  }

  static isThisModelAnAmphibiousQuadbike(model: number): boolean {
    return IsThisModelAnAmphibiousQuadbike(model);
  }

  isToggleModOn(modType: number): boolean {
    return IsToggleModOn(this._handle, modType);
  }

  isTurretSeat(seatIndex: number): boolean {
    return IsTurretSeat(this._handle, seatIndex);
  }

  lowerRetractableWheels(): void {
    LowerRetractableWheels(this._handle);
  }

  static preloadVehicleMod(p0: any, modType: number, p2: any): void {
    PreloadVehicleMod(p0, modType, p2);
  }

  raiseRetractableWheels(): void {
    RaiseRetractableWheels(this._handle);
  }

  releasePreloadMods(): void {
    ReleasePreloadMods(this._handle);
  }

  removePickUpRopeForCargobob(): void {
    RemovePickUpRopeForCargobob(this._handle);
  }

  static removeRoadNodeSpeedZone(speedzone: number): boolean {
    return RemoveRoadNodeSpeedZone(speedzone);
  }

  static removeVehiclesFromGeneratorsInArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, unk: any): void {
    RemoveVehiclesFromGeneratorsInArea(x1, y1, z1, x2, y2, z2, unk);
  }

  static setAllLowPriorityVehicleGeneratorsActive(active: boolean): void {
    SetAllLowPriorityVehicleGeneratorsActive(active);
  }

  static setAllVehicleGeneratorsActive(): void {
    SetAllVehicleGeneratorsActive();
  }

  static setAllVehicleGeneratorsActiveInArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, p6: boolean, p7: boolean): void {
    SetAllVehicleGeneratorsActiveInArea(x1, y1, z1, x2, y2, z2, p6, p7);
  }

  static setAmbientVehicleRangeMultiplierThisFrame(range: number): void {
    SetAmbientVehicleRangeMultiplierThisFrame(range);
  }

  setBikeOnStand(x: number, y: number): void {
    SetBikeOnStand(this._handle, x, y);
  }

  setBoatAnchor(toggle: boolean): void {
    SetBoatAnchor(this._handle, toggle);
  }

  setBoatBoomPositionRatio(ratio: number): void {
    SetBoatBoomPositionRatio(this._handle, ratio);
  }

  setBoatDisableAvoidance(p1: boolean): void {
    SetBoatDisableAvoidance(this._handle, p1);
  }

  setBoatIsSinking(): void {
    SetBoatIsSinking(this._handle);
  }

  setBoatLowLodAnchorDistance(value: number): void {
    SetBoatLowLodAnchorDistance(this._handle, value);
  }

  setBoatRemainsAnchoredWhilePlayerIsDriver(toggle: boolean): void {
    SetBoatRemainsAnchoredWhilePlayerIsDriver(this._handle, toggle);
  }

  setBoatSinksWhenWrecked(toggle: boolean): void {
    SetBoatSinksWhenWrecked(this._handle, toggle);
  }

  setCamberedWheelsDisabled(toggle: boolean): void {
    SetCamberedWheelsDisabled(this._handle, toggle);
  }

  setCarBootOpen(): void {
    SetCarBootOpen(this._handle);
  }

  static setCarHighSpeedBumpSeverityMultiplier(multiplier: number): void {
    SetCarHighSpeedBumpSeverityMultiplier(multiplier);
  }

  setCargobobExcludeFromPickupEntity(entity: number): void {
    SetCargobobExcludeFromPickupEntity(this._handle, entity);
  }

  setCargobobPickupMagnetEffectRadius(p1: number): void {
    SetCargobobPickupMagnetEffectRadius(this._handle, p1);
  }

  setCargobobPickupMagnetFalloff(p1: number): void {
    SetCargobobPickupMagnetFalloff(this._handle, p1);
  }

  setCargobobPickupMagnetPullRopeLength(p1: number): void {
    SetCargobobPickupMagnetPullRopeLength(this._handle, p1);
  }

  setCargobobPickupMagnetPullStrength(p1: number): void {
    SetCargobobPickupMagnetPullStrength(this._handle, p1);
  }

  setCargobobPickupMagnetReducedFalloff(p1: number): void {
    SetCargobobPickupMagnetReducedFalloff(this._handle, p1);
  }

  setCargobobPickupMagnetReducedStrength(vehicle: Vehicle): void {
    SetCargobobPickupMagnetReducedStrength(this._handle, vehicle.handle);
  }

  setCargobobPickupMagnetStrength(strength: number): void {
    SetCargobobPickupMagnetStrength(this._handle, strength);
  }

  setCargobobPickupRopeDampingMultiplier(p1: number): void {
    SetCargobobPickupRopeDampingMultiplier(this._handle, p1);
  }

  setCargobobPickupRopeType(state: number): void {
    SetCargobobPickupRopeType(this._handle, state);
  }

  setDeployHeliStubWings(deploy: boolean, p2: boolean): void {
    SetDeployHeliStubWings(this._handle, deploy, p2);
  }

  static setDisableBmxExtraTrickForces(disableExtraTrickForces: boolean): void {
    SetDisableBmxExtraTrickForces(disableExtraTrickForces);
  }

  setDisableHeliExplodeFromBodyDamage(disableExplode: boolean): void {
    SetDisableHeliExplodeFromBodyDamage(this._handle, disableExplode);
  }

  setDisablePretendOccupants(toggle: boolean): void {
    SetDisablePretendOccupants(this._handle, toggle);
  }

  static setDisableRandomTrainsThisFrame(toggle: boolean): void {
    SetDisableRandomTrainsThisFrame(toggle);
  }

  setDisableSuperdummyMode(p1: boolean): void {
    SetDisableSuperdummyMode(this._handle, p1);
  }

  setDisableTurretMovementThisFrame(turretIdx: number): void {
    SetDisableTurretMovementThisFrame(this._handle, turretIdx);
  }

  static setDistantCarsEnabled(toggle: boolean): void {
    SetDistantCarsEnabled(toggle);
  }

  setDriftTyresEnabled(toggle: boolean): void {
    SetDriftTyresEnabled(this._handle, toggle);
  }

  static setEnableVehicleSlipstreaming(toggle: boolean): void {
    SetEnableVehicleSlipstreaming(toggle);
  }

  static setFarDrawVehicles(toggle: boolean): void {
    SetFarDrawVehicles(toggle);
  }

  setForceLowLodAnchorMode(toggle: boolean): void {
    SetForceLowLodAnchorMode(this._handle, toggle);
  }

  static setGarbageTrucks(toggle: boolean): void {
    SetGarbageTrucks(toggle);
  }

  setHeliBladesSpeed(speed: number): void {
    SetHeliBladesSpeed(this._handle, speed);
  }

  setHeliCombatOffset(x: number, y: number, z: number): void {
    SetHeliCombatOffset(this._handle, x, y, z);
  }

  setHeliMainRotorHealth(health: number): void {
    SetHeliMainRotorHealth(this._handle, health);
  }

  setHeliResistToExplosion(bResistToExplosion: boolean): void {
    SetHeliResistToExplosion(this._handle, bResistToExplosion);
  }

  setHeliTailBoomCanBreakOff(toggle: boolean): void {
    SetHeliTailBoomCanBreakOff(this._handle, toggle);
  }

  setHeliTailRotorHealth(health: number): void {
    SetHeliTailRotorHealth(this._handle, health);
  }

  setHeliTurbulenceScalar(p1: number): void {
    SetHeliTurbulenceScalar(this._handle, p1);
  }

  setHelicopterRollPitchYawMult(multiplier: number): void {
    SetHelicopterRollPitchYawMult(this._handle, multiplier);
  }

  setHoverModeWingRatio(ratio: number): void {
    SetHoverModeWingRatio(this._handle, ratio);
  }

  setHydraulicRaised(toggle: boolean): void {
    SetHydraulicRaised(this._handle, toggle);
  }

  setHydraulicWheelState(state: number): void {
    SetHydraulicWheelState(this._handle, state);
  }

  static setLightsCutoffDistanceTweak(distance: number): void {
    SetLightsCutoffDistanceTweak(distance);
  }

  setMissionTrainAsNoLongerNeeded(p1: boolean): void {
    SetMissionTrainAsNoLongerNeeded(p1);
  }

  setMissionTrainCoords(x: number, y: number, z: number): void {
    SetMissionTrainCoords(this._handle, x, y, z);
  }

  setOppressorTransformState(extend: boolean): void {
    SetOppressorTransformState(this._handle, extend);
  }

  setPickupRopeLengthForCargobob(length1: number, length2: number, state: boolean): void {
    SetPickupRopeLengthForCargobob(this._handle, length1, length2, state);
  }

  setPlaneAvoidsOther(toggle: boolean): void {
    SetPlaneAvoidsOthers(this._handle, toggle);
  }

  setPlaneControlSectionsShouldBreakOffFromExplosions(toggle: boolean): void {
    SetPlaneControlSectionsShouldBreakOffFromExplosions(this._handle, toggle);
  }

  setPlanePropellersHealth(health: number): void {
    SetPlanePropellersHealth(this._handle, health);
  }

  setPlaneResistToExplosion(toggle: boolean): void {
    SetPlaneResistToExplosion(this._handle, toggle);
  }

  setPlaneSectionDamageScale(damageSection: number, damageScale: number): void {
    SetPlaneSectionDamageScale(this._handle, damageSection, damageScale);
  }

  setPlaneTurbulenceMultiplier(multiplier: number): void {
    SetPlaneTurbulenceMultiplier(this._handle, multiplier);
  }

  setPlaybackSpeed(speed: number): void {
    SetPlaybackSpeed(this._handle, speed);
  }

  setPlaybackToUseAi(drivingStyle: number): void {
    SetPlaybackToUseAi(this._handle, drivingStyle);
  }

  setPlaybackToUseAiTryToRevertBackLater(time: number, drivingStyle: number, p3: boolean): void {
    SetPlaybackToUseAiTryToRevertBackLater(this._handle, time, drivingStyle, p3);
  }

  static setRandomBoats(toggle: boolean): void {
    SetRandomBoats(toggle);
  }

  static setRandomBoatsInMp(toggle: boolean): void {
    SetRandomBoatsInMp(toggle);
  }

  static setRandomTrains(toggle: boolean): void {
    SetRandomTrains(toggle);
  }

  setRenderTrainAsDerailed(toggle: boolean): void {
    SetRenderTrainAsDerailed(this._handle, toggle);
  }

  setTrailerInverseMassScale(p1: number): void {
    SetTrailerInverseMassScale(this._handle, p1);
  }

  setTrainCruiseSpeed(speed: number): void {
    SetTrainCruiseSpeed(this._handle, speed);
  }

  setTrainSpeed(speed: number): void {
    SetTrainSpeed(this._handle, speed);
  }

  static setTrainTrackSpawnFrequency(trackIndex: number, frequency: number): void {
    SetTrainTrackSpawnFrequency(trackIndex, frequency);
  }

  setTyreHealth(wheelIndex: number, health: number): void {
    SetTyreHealth(this._handle, wheelIndex, health);
  }

  setTyreSoftnessMultiplier(wheelIndex: number, multiplier: number): void {
    SetTyreSoftnessMultiplier(this._handle, wheelIndex, multiplier);
  }

  setTyreTractionLossMultiplier(wheelIndex: number, multiplier: number): void {
    SetTyreTractionLossMultiplier(this._handle, wheelIndex, multiplier);
  }

  setTyreWearMultiplier(wheelIndex: number, multiplier: number): void {
    SetTyreWearMultiplier(this._handle, wheelIndex, multiplier);
  }

  stabiliseEntityAttachedToHeli(entity: number, p2: number): void {
    StabiliseEntityAttachedToHeli(this._handle, entity, p2);
  }

  static stopAllGarageActivity(): void {
    StopAllGarageActivity();
  }

  static switchTrainTrack(trackId: number, state: boolean): void {
    SwitchTrainTrack(trackId, state);
  }
}