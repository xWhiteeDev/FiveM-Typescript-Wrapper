import { IVector3 } from '../types/Vector3';

export class BaseEntity {
  private static base_entities = new Map<number, BaseEntity>();
   constructor(protected _handle: number) {
    BaseEntity.base_entities.set(_handle, this);
  }
 
  static fromNetworkId(netId: number) {
    const entityHandle = NetworkGetEntityFromNetworkId(netId);
    if (entityHandle === 0) return undefined;
    return BaseEntity.base_entities.get(entityHandle) ?? new BaseEntity(netId);
  }
  static fromStateBag(stateBagName: string) {
    const entityHandle = GetEntityFromStateBagName(stateBagName);
    if (entityHandle === 0) return undefined;
    return BaseEntity.base_entities.get(entityHandle) ?? new BaseEntity(entityHandle)
  }
  get handle() {
    return this._handle;
  }
  get netOwner() {
    return NetworkGetEntityOwner(this._handle);
  }
  get firstNetOwner() {
    return NetworkGetFirstEntityOwner(this._handle);
  }
  get exists() {
    return this.handle !== 0 && DoesEntityExist(this._handle);
  }
  get attachedTo(): BaseEntity | undefined {
    const entity = GetEntityAttachedTo(this._handle);
    if (entity === 0) return undefined;
    return BaseEntity.base_entities.get(entity) ?? new BaseEntity(entity);
  }
  get pos(): IVector3 {
    const [x, y, z] = GetEntityCoords(this._handle);
    return { x, y, z };
  }
  set pos(pos: IVector3) {
    SetEntityCoords(this._handle, pos.x, pos.y, pos.z, true, true, true, false);
  }
  get velocity(): IVector3 {
    const [x, y, z] = GetEntityVelocity(this._handle);
    return { x, y, z };
  }
  get visible(): boolean {
    return IsEntityVisible(this.handle);
  }

  get networkId(): number {
    return NetworkGetNetworkIdFromEntity(this.handle);
  }

  get IsNoLongerNeeded(): boolean {
    return HasEntityBeenMarkedAsNoLongerNeeded(this.handle);
  }

  get OrphanMode() {
    return GetEntityOrphanMode(this._handle);
  }

  set OrphanMode(orphanMode: number) {
    SetEntityOrphanMode(this._handle, orphanMode);
  }
  delete() {
    DeleteEntity(this._handle);
  }
}
