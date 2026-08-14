import { BaseEntity } from './BaseEntity';
import type { Vehicle } from './Vehicle';

export class Ped extends BaseEntity {
  private static peds = new Map<number, Ped>();
  constructor(handle: number) {
    super(handle);
    Ped.peds.set(handle, this);
  }
  static fromNetworkId(netId: number): Ped | undefined {
    const entityHandle = NetworkGetEntityFromNetworkId(netId);
    if (entityHandle === 0) return undefined;
    return Ped.peds.get(entityHandle) ?? new Ped(netId);
  }
  static fromStateBag(stateBagName: string): Ped | undefined {
    const entityHandle = GetEntityFromStateBagName(stateBagName);
    if (entityHandle === 0) return undefined;
    return Ped.peds.get(entityHandle) ?? new Ped(entityHandle);
  }
  static getBySource(src: string) {
    const pedHandle = GetPlayerPed(src);
    if (pedHandle === 0) {
      return undefined;
    }
    return pedHandle === 0 ? undefined : (Ped.peds.get(pedHandle) ?? new Ped(pedHandle));
  }
  static getByHandle(handle: number) {
    return Ped.peds.get(handle) ?? new Ped(handle);
  }
  get armor() {
    return GetPedArmour(this._handle);
  }
  get causeOfDeath() {
    return GetPedCauseOfDeath(this._handle);
  }
  get desiredHeading() {
    return GetPedDesiredHeading(this._handle);
  }
  getVehicleSeat(vehicle: Vehicle, seatIndex: number) {}
  get maxHealth() {
    return GetPedMaxHealth(this._handle);
  }
  get relationshipGroundHash() {
    return GetPedRelationshipGroupHash(this._handle);
  }
  get scripTaskCommand() {
    return GetPedScriptTaskCommand(this._handle);
  }
  get scriptTaskStage() {
    return GetPedScriptTaskStage(this._handle);
  }
  get sourceOfDamage() {
    return GetPedSourceOfDamage(this._handle);
  }
  get stealthMovement() {
    return GetPedStealthMovement(this._handle);
  }
  getSpecificTaskType(index: number) {
    return GetPedSpecificTaskType(this._handle, index);
  }
}
