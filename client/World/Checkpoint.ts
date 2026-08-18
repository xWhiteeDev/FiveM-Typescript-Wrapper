import { IVector3 } from '../typings/Vector';
import { RGBA } from '../typings/World';

export class Checkpoint {
  private constructor(private _handle: number) {}
  static create(type: number, coords: IVector3, coordsToPoint: IVector3, diameter: number, color: RGBA, reserved: number = 0) {
    const handle = CreateCheckpoint(
      type,
      coords.x,
      coords.y,
      coords.z,
      coordsToPoint.x,
      coordsToPoint.y,
      coordsToPoint.z,
      diameter,
      color.red,
      color.green,
      color.blue,
      color.alpha,
      reserved,
    );
    return new this(handle);
  }
  delete() {
    DeleteCheckpoint(this._handle)
  }
  get handle(): number {
    return this._handle;
  }

  setCylinderHeight(nearHeight: number, farHeight: number, radius: number): void {
    SetCheckpointCylinderHeight(this._handle, nearHeight, farHeight, radius);
  }

  setIconHeight(heightMultiplier: number): void {
    SetCheckpointIconHeight(this._handle, heightMultiplier);
  }

  setIconScale(scale: number): void {
    SetCheckpointIconScale(this._handle, scale);
  }

  setRgba(red: number, green: number, blue: number, alpha: number): void {
    SetCheckpointRgba(this._handle, red, green, blue, alpha);
  }

  setRgba2(red: number, green: number, blue: number, alpha: number): void {
    SetCheckpointRgba2(this._handle, red, green, blue, alpha);
  }
}
