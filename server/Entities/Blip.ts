import type { IVector3 } from '../types/Vector3';

export class Blip {
  private constructor(
    private _handle: number,
    private _sprite?: number,
  ) {}
  static createAtCoords(sprite: number, coords: IVector3) {
    const handle = AddBlipForCoord(coords.x, coords.y, coords.z);
    SetBlipSprite(handle, sprite);
    return new this(handle, sprite);
  }
  static createAtEntity(sprite: number, entityHandle: number) {
    const handle = AddBlipForEntity(entityHandle);
    SetBlipSprite(handle, sprite);
    return new this(handle, sprite);
  }
  static createWithRadius(coords: IVector3, radius: number) {
    const handle = AddBlipForRadius(coords.x, coords.y, coords.z, radius);
    return new this(handle);
  }
  static createInArea(coords: IVector3, width: number, height: number) {
    const handle = AddBlipForArea(coords.x, coords.y, coords.z, width, height);
    return new this(handle);
  }
  remove() {
    RemoveBlip(this._handle);
  }
  set sprite(spriteId: number) {
    SetBlipSprite(this._handle, spriteId);
    this._sprite = spriteId
  }
  get sprite() : number | null {
    return this._sprite ?? null;
  }
}
