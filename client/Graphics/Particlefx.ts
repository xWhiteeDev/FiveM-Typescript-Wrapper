import { Ped } from '../Entities/Ped';

export class ParticleFx {
  constructor(private _handle: number) {}

  doesParticleFxLoopedExist(): boolean {
    return DoesParticleFxLoopedExist(this._handle);
  }

  removeParticleFx(p1: boolean): void {
    RemoveParticleFx(this._handle, p1);
  }

  static removeParticleFxFromEntity(entity: number): void {
    RemoveParticleFxFromEntity(entity);
  }

  static removeParticleFxInRange(X: number, Y: number, Z: number, radius: number): void {
    RemoveParticleFxInRange(X, Y, Z, radius);
  }

  static resetParticleFxOverride(name: string): void {
    ResetParticleFxOverride(name);
  }

  static setParticleFxBulletImpactScale(scale: number): void {
    SetParticleFxBulletImpactScale(scale);
  }

  static setParticleFxCamInsideNonplayerVehicle(vehicle: number, p1: boolean): void {
    SetParticleFxCamInsideNonplayerVehicle(vehicle, p1);
  }

  static setParticleFxCamInsideVehicle(p0: boolean): void {
    SetParticleFxCamInsideVehicle(p0);
  }

  setParticleFxLoopedAlpha(alpha: number): void {
    SetParticleFxLoopedAlpha(this._handle, alpha);
  }

  setParticleFxLoopedColour(r: number, g: number, b: number, bLocalOnly: boolean): void {
    SetParticleFxLoopedColour(this._handle, r, g, b, bLocalOnly);
  }

  setParticleFxLoopedEvolution(propertyName: string, amount: number, noNetwork: boolean): void {
    SetParticleFxLoopedEvolution(this._handle, propertyName, amount, noNetwork);
  }

  setParticleFxLoopedFarClipDist(range: number): void {
    SetParticleFxLoopedFarClipDist(this._handle, range);
  }

  setParticleFxLoopedOffsets(x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number): void {
    SetParticleFxLoopedOffsets(this._handle, x, y, z, rotX, rotY, rotZ);
  }

  setParticleFxLoopedScale(scale: number): void {
    SetParticleFxLoopedScale(this._handle, scale);
  }

  static setParticleFxNonLoopedAlpha(alpha: number): void {
    SetParticleFxNonLoopedAlpha(alpha);
  }

  static setParticleFxNonLoopedColour(r: number, g: number, b: number): void {
    SetParticleFxNonLoopedColour(r, g, b);
  }

  static setParticleFxNonLoopedEmitterScale(p0: number, p1: number, scale: number): void {
    SetParticleFxNonLoopedEmitterScale(p0, p1, scale);
  }

  static setParticleFxOverride(oldAsset: string, newAsset: string): void {
    SetParticleFxOverride(oldAsset, newAsset);
  }

  static setParticleFxShootoutBoat(p0: any): void {
    SetParticleFxShootoutBoat(p0);
  }

  static startNetworkedParticleFxLoopedOnEntity(
    effectName: string,
    entity: number,
    xOffset: number,
    yOffset: number,
    zOffset: number,
    xRot: number,
    yRot: number,
    zRot: number,
    scale: number,
    xAxis: boolean,
    yAxis: boolean,
    zAxis: boolean,
  ): ParticleFx {
    const handle = StartNetworkedParticleFxLoopedOnEntity(
      effectName,
      entity,
      xOffset,
      yOffset,
      zOffset,
      xRot,
      yRot,
      zRot,
      scale,
      xAxis,
      yAxis,
      zAxis,
    );
    return new ParticleFx(handle);
  }

  static startNetworkedParticleFxLoopedOnEntityBone(
    effectName: string,
    entity: number,
    xOffset: number,
    yOffset: number,
    zOffset: number,
    xRot: number,
    yRot: number,
    zRot: number,
    boneIndex: number,
    scale: number,
    xAxis: boolean,
    yAxis: boolean,
    zAxis: boolean,
  ): ParticleFx {
    const handle = StartNetworkedParticleFxLoopedOnEntityBone(
      effectName,
      entity,
      xOffset,
      yOffset,
      zOffset,
      xRot,
      yRot,
      zRot,
      boneIndex,
      scale,
      xAxis,
      yAxis,
      zAxis,
    );
    return new ParticleFx(handle);
  }

  static startNetworkedParticleFxNonLoopedAtCoord(
    effectName: string,
    xPos: number,
    yPos: number,
    zPos: number,
    xRot: number,
    yRot: number,
    zRot: number,
    scale: number,
    xAxis: boolean,
    yAxis: boolean,
    zAxis: boolean,
  ): boolean {
    return StartNetworkedParticleFxNonLoopedAtCoord(effectName, xPos, yPos, zPos, xRot, yRot, zRot, scale, xAxis, yAxis, zAxis);
  }

  static startNetworkedParticleFxNonLoopedOnEntity(
    effectName: string,
    entity: number,
    offsetX: number,
    offsetY: number,
    offsetZ: number,
    rotX: number,
    rotY: number,
    rotZ: number,
    scale: number,
    axisX: boolean,
    axisY: boolean,
    axisZ: boolean,
  ): boolean {
    return StartNetworkedParticleFxNonLoopedOnEntity(
      effectName,
      entity,
      offsetX,
      offsetY,
      offsetZ,
      rotX,
      rotY,
      rotZ,
      scale,
      axisX,
      axisY,
      axisZ,
    );
  }

  static startNetworkedParticleFxNonLoopedOnEntityBone(
    effectName: string,
    entity: number,
    offsetX: number,
    offsetY: number,
    offsetZ: number,
    rotX: number,
    rotY: number,
    rotZ: number,
    boneIndex: number,
    scale: number,
    axisX: boolean,
    axisY: boolean,
    axisZ: boolean,
  ): boolean {
    return StartNetworkedParticleFxNonLoopedOnEntityBone(
      effectName,
      entity,
      offsetX,
      offsetY,
      offsetZ,
      rotX,
      rotY,
      rotZ,
      boneIndex,
      scale,
      axisX,
      axisY,
      axisZ,
    );
  }

  static startNetworkedParticleFxNonLoopedOnPedBone(
    effectName: string,
    ped: Ped,
    offsetX: number,
    offsetY: number,
    offsetZ: number,
    rotX: number,
    rotY: number,
    rotZ: number,
    boneIndex: number,
    scale: number,
    axisX: boolean,
    axisY: boolean,
    axisZ: boolean,
  ): boolean {
    return StartNetworkedParticleFxNonLoopedOnPedBone(
      effectName,
      ped.handle,
      offsetX,
      offsetY,
      offsetZ,
      rotX,
      rotY,
      rotZ,
      boneIndex,
      scale,
      axisX,
      axisY,
      axisZ,
    );
  }

  static startParticleFxLoopedAtCoord(
    effectName: string,
    x: number,
    y: number,
    z: number,
    xRot: number,
    yRot: number,
    zRot: number,
    scale: number,
    xAxis: boolean,
    yAxis: boolean,
    zAxis: boolean,
    p11: boolean,
  ): ParticleFx {
    const handle = StartParticleFxLoopedAtCoord(effectName, x, y, z, xRot, yRot, zRot, scale, xAxis, yAxis, zAxis, p11);
    return new ParticleFx(handle);
  }

  static startParticleFxLoopedOnEntity(
    effectName: string,
    entity: number,
    xOffset: number,
    yOffset: number,
    zOffset: number,
    xRot: number,
    yRot: number,
    zRot: number,
    scale: number,
    xAxis: boolean,
    yAxis: boolean,
    zAxis: boolean,
  ): ParticleFx {
    const handle = StartParticleFxLoopedOnEntity(
      effectName,
      entity,
      xOffset,
      yOffset,
      zOffset,
      xRot,
      yRot,
      zRot,
      scale,
      xAxis,
      yAxis,
      zAxis,
    );
    return new ParticleFx(handle);
  }

  static startParticleFxLoopedOnEntityBone(
    effectName: string,
    entity: number,
    xOffset: number,
    yOffset: number,
    zOffset: number,
    xRot: number,
    yRot: number,
    zRot: number,
    boneIndex: number,
    scale: number,
    xAxis: boolean,
    yAxis: boolean,
    zAxis: boolean,
  ): ParticleFx {
    const handle = StartParticleFxLoopedOnEntityBone(
      effectName,
      entity,
      xOffset,
      yOffset,
      zOffset,
      xRot,
      yRot,
      zRot,
      boneIndex,
      scale,
      xAxis,
      yAxis,
      zAxis,
    );
    return new ParticleFx(handle);
  }

  static startParticleFxLoopedOnPedBone(
    effectName: string,
    ped: Ped,
    xOffset: number,
    yOffset: number,
    zOffset: number,
    xRot: number,
    yRot: number,
    zRot: number,
    boneIndex: number,
    scale: number,
    xAxis: boolean,
    yAxis: boolean,
    zAxis: boolean,
  ): ParticleFx {
    const handle = StartParticleFxLoopedOnPedBone(
      effectName,
      ped.handle,
      xOffset,
      yOffset,
      zOffset,
      xRot,
      yRot,
      zRot,
      boneIndex,
      scale,
      xAxis,
      yAxis,
      zAxis,
    );
    return new ParticleFx(handle);
  }

  static startParticleFxNonLoopedAtCoord(
    effectName: string,
    xPos: number,
    yPos: number,
    zPos: number,
    xRot: number,
    yRot: number,
    zRot: number,
    scale: number,
    xAxis: boolean,
    yAxis: boolean,
    zAxis: boolean,
  ): ParticleFx {
    const handle = StartParticleFxNonLoopedAtCoord(effectName, xPos, yPos, zPos, xRot, yRot, zRot, scale, xAxis, yAxis, zAxis);
    return new ParticleFx(handle);
  }

  static startParticleFxNonLoopedOnEntity(
    effectName: string,
    entity: number,
    offsetX: number,
    offsetY: number,
    offsetZ: number,
    rotX: number,
    rotY: number,
    rotZ: number,
    scale: number,
    axisX: boolean,
    axisY: boolean,
    axisZ: boolean,
  ): boolean {
    return StartParticleFxNonLoopedOnEntity(
      effectName,
      entity,
      offsetX,
      offsetY,
      offsetZ,
      rotX,
      rotY,
      rotZ,
      scale,
      axisX,
      axisY,
      axisZ,
    );
  }

  static startParticleFxNonLoopedOnPedBone(
    effectName: string,
    ped: Ped,
    offsetX: number,
    offsetY: number,
    offsetZ: number,
    rotX: number,
    rotY: number,
    rotZ: number,
    boneIndex: number,
    scale: number,
    axisX: boolean,
    axisY: boolean,
    axisZ: boolean,
  ): boolean {
    return StartParticleFxNonLoopedOnPedBone(
      effectName,
      ped.handle,
      offsetX,
      offsetY,
      offsetZ,
      rotX,
      rotY,
      rotZ,
      boneIndex,
      scale,
      axisX,
      axisY,
      axisZ,
    );
  }

  stopParticleFxLooped(p1: boolean): void {
    StopParticleFxLooped(this._handle, p1);
  }

  static useParticleFxAsset(name: string): void {
    UseParticleFxAsset(name);
  }
}
