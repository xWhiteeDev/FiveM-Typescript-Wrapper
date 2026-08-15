import { IVector3 } from '../types/Vector3';
import { VehicleType } from '../types/Vehicle';
import { BaseEntity } from './BaseEntity';

export class Vehicle extends BaseEntity {
  private constructor(protected _handle: number) {
    super(_handle);
  }
  static async createBySetter(model: string, type: VehicleType, coords: IVector3, heading: number) {
    if (!model) {
      console.error('[Vehicle][create]: Model argument empty');
      return;
    }
    if (!coords) {
      console.error('[Vehicle][create]: Coords argument empty');
      return;
    }
    if (typeof model !== 'string') {
      console.error('[Vehicle][create]: Model is not a string');
      return;
    }
    if (typeof coords !== 'object') {
      console.error('[Vehicle][create]: coords is not a object');
      return;
    }
    const hash = GetHashKey(model);
    if (!hash) {
      console.error('[Vehicle][create]: model not valid');
      return;
    }
    const handle = CreateVehicleServerSetter(hash, type, coords.x, coords.y, coords.z, heading);
    return new this(handle);
  }
  static async create(model: string, coords: IVector3, heading: number, isNetwork: boolean, netMissionEntity: boolean) {
    if (!model) {
      console.error('[Vehicle][create]: Model argument empty');
      return;
    }
    if (!coords) {
      console.error('[Vehicle][create]: Coords argument empty');
      return;
    }
    if (typeof model !== 'string') {
      console.error('[Vehicle][create]: Model is not a string');
      return;
    }
    if (typeof coords !== 'object') {
      console.error('[Vehicle][create]: coords is not a object');
      return;
    }
    const hash = GetHashKey(model);
    if (!hash) {
      console.error('[Vehicle][create]: model not valid');
      return;
    }
    const handle = CreateVehicle(hash, coords.x, coords.y, coords.z, heading, isNetwork, netMissionEntity);
    return new this(handle);
  }
  static getAll():number[] {
    return GetAllVehicles()
  }
  get handle(): number {
    return this._handle;
  }
  setPrimaryColor(r: number, g: number, b: number) {
    if (r == undefined || g === undefined || b === undefined) {
      console.error('[Vehicle][create]: One of RGB arguments is empty.');
      return;
    }
    SetVehicleCustomPrimaryColour(this._handle, r, g, b);
  }
  setSecondaryColor(r: number, g: number, b: number) {
    if (r == undefined || g === undefined || b === undefined) {
      console.error('[Vehicle][create]: One of RGB arguments is empty.');
      return;
    }
    SetVehicleCustomSecondaryColour(this._handle, r, g, b);
  }
  setAlarm(state: boolean) {
    SetVehicleAlarm(this._handle, state);
  }
  SetBodyHealth(value: number) {
    SetVehicleBodyHealth(this._handle, value);
  }
  setColorCombination(combination: number) {
    SetVehicleColourCombination(this._handle, combination);
  }
  setGameColors(primary: number, secondary: number) {
    SetVehicleColours(this._handle, primary, secondary);
  }
  setDoorBroken(doorIndex: number, deleteDoor: boolean) {
    SetVehicleDoorBroken(this._handle, doorIndex, deleteDoor);
  }
  setDoorLockState(doorLockStatus: number) {
    SetVehicleDoorsLocked(this._handle, doorLockStatus);
  }
  setNumberPlateText(text: string) {
    SetVehicleNumberPlateText(this._handle, text);
  }
  getVehicleDoorStatus(doorIndex: number) {
    return GetVehicleDoorStatus(this._handle, doorIndex);
  }

  getVehiclePedIsIn(lastVehicle: boolean) {
    return GetVehiclePedIsIn(this._handle, lastVehicle);
  }

  getVehicleNeonEnabled(neonIndex: number) {
    return GetVehicleNeonEnabled(this._handle, neonIndex);
  }

  taskDriveBy(
    driverHandle: number,
    targetPedHandle: number,
    targetX: number,
    targetY: number,
    targetZ: number,
    distanceToShoot: number,
    pedAccuracy: number,
    p8: boolean,
    firingPattern: number,
  ) {
    return TaskDriveBy(
      driverHandle,
      targetPedHandle,
      this._handle,
      targetX,
      targetY,
      targetZ,
      distanceToShoot,
      pedAccuracy,
      p8,
      firingPattern,
    );
  }
  isExtraTurnedOn(extraId: number) {
    return IsVehicleExtraTurnedOn(this._handle, extraId);
  }

  isTyreBurst(wheelID: number, completely: boolean) {
    return IsVehicleTyreBurst(this._handle, wheelID, completely);
  }

  isWindowIntact(windowIndex: number) {
    return IsVehicleWindowIntact(this._handle, windowIndex);
  }

  set dirtLevel(v: number) {
    SetVehicleDirtLevel(this._handle, v);
  }
  get bodyHealth() {
    return GetVehicleBodyHealth(this._handle);
  }
  get gameColors() {
    return GetVehicleColours(this._handle);
  }
  get customPrimaryColor() {
    return GetVehicleCustomPrimaryColour(this._handle);
  }
  get customSecondaryColor() {
    return GetVehicleCustomSecondaryColour(this._handle);
  }
  get dashboardColor() {
    return GetVehicleDashboardColour(this._handle);
  }
  get dirtLevel() {
    return GetVehicleDirtLevel(this._handle);
  }
  get doorLockStatus() {
    return GetVehicleDoorLockStatus(this._handle);
  }

  get doorsLockedForPlayer() {
    return GetVehicleDoorsLockedForPlayer(this._handle);
  }

  get engineHealth() {
    return GetVehicleEngineHealth(this._handle);
  }

  get extraColours() {
    return GetVehicleExtraColours(this._handle);
  }

  get flightNozzlePosition() {
    return GetVehicleFlightNozzlePosition(this._handle);
  }

  get handbrake() {
    return GetVehicleHandbrake(this._handle);
  }

  get headlightsColour() {
    return GetVehicleHeadlightsColour(this._handle);
  }

  get homingLockOnState() {
    return GetVehicleHomingLockonState(this._handle);
  }

  get hornType() {
    return GetVehicleHornType(this._handle);
  }

  get interiorColour() {
    return GetVehicleInteriorColour(this._handle);
  }

  get lightsState() {
    return GetVehicleLightsState(this._handle);
  }

  get livery() {
    return GetVehicleLivery(this._handle);
  }

  get lockOnTarget() {
    return GetVehicleLockOnTarget(this._handle);
  }

  get neonColour() {
    return GetVehicleNeonColour(this._handle);
  }

  get numberPlateText() {
    return GetVehicleNumberPlateText(this._handle);
  }

  get numberPlateTextIndex() {
    return GetVehicleNumberPlateTextIndex(this._handle);
  }

  get petrolTankHealth() {
    return GetVehiclePetrolTankHealth(this._handle);
  }

  get radioStationIndex() {
    return GetVehicleRadioStationIndex(this._handle);
  }

  get roofLivery() {
    return GetVehicleRoofLivery(this._handle);
  }

  get steeringAngle() {
    return GetVehicleSteeringAngle(this._handle);
  }

  get totalRepairs() {
    return GetVehicleTotalRepairs(this._handle);
  }

  get vehicleType() {
    return GetVehicleType(this._handle);
  }

  get tyresSmokeColor() {
    return GetVehicleTyreSmokeColor(this._handle);
  }

  get wheelType() {
    return GetVehicleWheelType(this._handle);
  }

  get windowTint() {
    return GetVehicleWindowTint(this._handle);
  }
  get isEngineStarting() {
    return IsVehicleEngineStarting(this._handle);
  }

  get isSirenOn() {
    return IsVehicleSirenOn(this._handle);
  }
  get hasBeenDamagedByBullets() {
    return HasVehicleBeenDamagedByBullets(this._handle);
  }

  get hasBeenOwnedByPlayer() {
    return HasVehicleBeenOwnedByPlayer(this._handle);
  }
  get heliBodyHealth() {
    return GetHeliBodyHealth(this._handle);
  }

  get heliEngineHealth() {
    return GetHeliEngineHealth(this._handle);
  }

  get heliGasTankHealth() {
    return GetHeliGasTankHealth(this._handle);
  }
}
