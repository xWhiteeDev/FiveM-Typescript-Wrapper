import { IVector3 } from '../typings/Vector3';
import { IVehicleOptions } from '../typings/Vehicle';
import { Utils } from '../Utils/Utils';

export class Vehicle {
  private constructor(private _handle:number) {

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
    const hasCollisionLoadedAroundVehicle = await Utils.waitUntil(() => HasCollisionLoadedAroundEntity(vehHandle), {
      waitInterval: 100,
      maxAttempts: 100,
      onTick: () => RequestCollisionAtCoord(coords.x, coords.y, coords.z),
    });
    FreezeEntityPosition(vehHandle, false);

    SetEntityCoordsNoOffset(vehHandle, coords.x, coords.y, coords.z, false, false, false);
    SetModelAsNoLongerNeeded(hashKey);
    
    return new this(vehHandle);
  }
  get handle() {
    return this._handle;
  }
}
