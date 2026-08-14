import type { IVector3 } from '../types/Vector3';

export class WorldObject {
  private static world_objects = new Map<number, WorldObject>();
  private constructor(private _handle: number) {
    WorldObject.world_objects.set(_handle, this);
  }
  static create(hashOrName: number | string, coords: IVector3, isNetwork: boolean, netMissionEntity: boolean, doorFlag: boolean) {
    const model = typeof hashOrName === 'string' ? GetHashKey(hashOrName) : hashOrName;
    if (model == undefined) {
      console.error(`[WorldObject][createObject]: Model not exist!`);
      return;
    }
    const handle = CreateObject(model, coords.x, coords.y, coords.z, isNetwork, netMissionEntity, doorFlag);
    if (!handle) {
      console.error(`[WorldObject] Creating object fault!`);
      return;
    }
    return new this(handle);
  }
  static createWithNoOffset(
    hashOrName: number | string,
    coords: IVector3,
    isNetwork: boolean,
    netMissionEntity: boolean,
    doorFlag: boolean,
  ) {
    const model = typeof hashOrName === 'string' ? GetHashKey(hashOrName) : hashOrName;
    if (model == undefined) {
      console.error(`[WorldObject][createWithNoOffset]: Model not exist!`);
      return;
    }
    const handle = CreateObjectNoOffset(model, coords.x, coords.y, coords.z, isNetwork, netMissionEntity, doorFlag);
    if (!handle) {
      console.error(`[WorldObject] Creating object fault!`);
      return;
    }
    return new this(handle);
  }
  get handle() {
    return this._handle;
  }
  static get(handle:number) {
    WorldObject.world_objects.get(handle)
  }
  delete () {
    DeleteEntity(this._handle);
    WorldObject.world_objects.delete(this._handle)
  }
}
