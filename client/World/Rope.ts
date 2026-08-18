import type { IVector3 } from '../typings/Vector';

export class Rope {
    constructor (private _handle:number) {
    }
    getRopeFlags(): number {
        return GetRopeFlags(this._handle);
    }

    getRopeLengthChangerRate(): number {
        return GetRopeLengthChangeRate(this._handle);
    }

    getRopeTimeMultiplier(): number {
        return GetRopeTimeMultiplier(this._handle);
    }

    getRopeUpdateOrder(): number {
        return GetRopeUpdateOrder(this._handle);
    }


  static create(
    coords: IVector3,
    rotation: IVector3,
    maxLength: number,
    ropeType: number,
    initLength: number,
    minLength: number,
    lengthChangeRate: number,
    onlyPPU: boolean,
    collisionOn: boolean,
    lockFromFront: boolean,
    timeMultiplier: number,
    breakable: boolean,
  ): Rope {
    const handle = AddRope(
      coords.x,
      coords.y,
      coords.z,
      rotation.x,
      rotation.y,
      rotation.z,
      maxLength,
      ropeType,
      initLength,
      minLength,
      lengthChangeRate,
      onlyPPU,
      collisionOn,
      lockFromFront,
      timeMultiplier,
      breakable,
      0,
    );
    return new Rope(handle[0]);
  }

  attachEntitiesToRope(ent1: number, ent2: number, ent1_x: number, ent1_y: number, ent1_z: number, ent2_x: number, ent2_y: number, ent2_z: number, length: number, p10: boolean, p11: boolean, boneName1: string, boneName2: string): void {
    AttachEntitiesToRope(this._handle, ent1, ent2, ent1_x, ent1_y, ent1_z, ent2_x, ent2_y, ent2_z, length, p10, p11, boneName1, boneName2);
  }

  attachRopeToEntity(entity: number, x: number, y: number, z: number, p5: boolean): void {
    AttachRopeToEntity(this._handle, entity, x, y, z, p5);
  }

  deleteChildRope(): void {
    DeleteChildRope(this._handle);
  }

  deleteRope(): void {
    DeleteRope(this._handle);
  }

  detachRopeFromEntity(entity: number): void {
    DetachRopeFromEntity(this._handle, entity);
  }

  doesRopeBelongToThisScript(): boolean {
    return DoesRopeBelongToThisScript(this._handle);
  }

  doesRopeExist(): boolean {
    return DoesRopeExist(this._handle)[0];
  }

  get ropeLastVertexCoord(): IVector3 {
    const [x, y, z] = GetRopeLastVertexCoord(this._handle);
    return { x, y, z };
  }

  getRopeVertexCoord(vertex: number): IVector3 {
    const [x, y, z] = GetRopeVertexCoord(this._handle, vertex);
    return { x, y, z };
  }

  get ropeVertexCount(): number {
    return GetRopeVertexCount(this._handle);
  }

  loadRopeData(rope_preset: string): void {
    LoadRopeData(this._handle, rope_preset);
  }

  pinRopeVertex(vertex: number, x: number, y: number, z: number): void {
    PinRopeVertex(this._handle, vertex, x, y, z);
  }

  static ropeAreTexturesLoaded(): boolean {
    return RopeAreTexturesLoaded();
  }

  ropeConvertToSimple(): void {
    RopeConvertToSimple(this._handle);
  }

  ropeDrawShadowEnabled(toggle: boolean): void {
    //@ts-ignore
    RopeDrawShadowEnabled(this._handle, toggle); //Note: Function requires 1 argument but in fact it needs 2 arguments: handle and toggle boolean.
  }

  ropeForceLength(length: number): void {
    RopeForceLength(this._handle, length);
  }

  ropeGetDistanceBetweenEnds(): number {
    return RopeGetDistanceBetweenEnds(this._handle);
  }

  static ropeLoadTextures(): void {
    RopeLoadTextures();
  }

  ropeResetLength(length: number): void {
    RopeResetLength(this._handle, length);
  }

  ropeSetUpdateOrder(p1: any): void {
    RopeSetUpdateOrder(this._handle, p1);
  }

  ropeSetUpdatePinverts(): void {
    RopeSetUpdatePinverts(this._handle);
  }

  static ropeUnloadTextures(): void {
    RopeUnloadTextures();
  }

  startRopeUnwindingFront(): void {
    StartRopeUnwindingFront(this._handle);
  }

  startRopeWinding(): void {
    StartRopeWinding(this._handle);
  }

  stopRopeUnwindingFront(): void {
    StopRopeUnwindingFront(this._handle);
  }

  stopRopeWinding(): void {
    StopRopeWinding(this._handle);
  }

  unpinRopeVertex(vertex: number): void {
    UnpinRopeVertex(this._handle, vertex);
  }
}