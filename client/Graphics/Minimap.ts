import type { Ped } from '../Entities/Ped';

export class Minimap {
  static dontTiltMinimapThisFrame(): void {
    DontTiltMinimapThisFrame();
  }

  static flashMinimapDisplay(): void {
    FlashMinimapDisplay();
  }

  static flashMinimapDisplayWithColor(hudColorIndex: number): void {
    FlashMinimapDisplayWithColor(hudColorIndex);
  }

  static getMinimapFowCoordinateIsRevealed(x: number, y: number, z: number): boolean {
    return GetMinimapFowCoordinateIsRevealed(x, y, z);
  }

  static get minimapFowDiscoveryRatio(): number {
    return GetMinimapFowDiscoveryRatio();
  }

  static hideMinimapExteriorMapThisFrame(): void {
    HideMinimapExteriorMapThisFrame();
  }

  static hideMinimapInteriorMapThisFrame(): void {
    HideMinimapInteriorMapThisFrame();
  }

  static isBlipOnMinimap(blip: number): boolean {
    return IsBlipOnMinimap(blip);
  }

  static get isMinimapRendering(): boolean {
    return IsMinimapRendering();
  }

  static lockMinimapAngle(angle: number): void {
    LockMinimapAngle(angle);
  }

  static lockMinimapPosition(x: number, y: number): void {
    LockMinimapPosition(x, y);
  }

  static setMinimapAltitudeIndicatorLevel(altitude: number, p1: boolean): void {
    SetMinimapAltitudeIndicatorLevel(altitude, p1);
  }

  static setMinimapBlockWaypoint(toggle: boolean): void {
    SetMinimapBlockWaypoint(toggle);
  }

  static setMinimapComponent(componentID: number, toggle: boolean, hudColor: number): number {
    return SetMinimapComponent(componentID, toggle, hudColor);
  }

  static setMinimapFowRevealCoordinate(x: number, y: number, z: number): void {
    SetMinimapFowRevealCoordinate(x, y, z);
  }

  static setMinimapGolfCourse(hole: number): void {
    SetMinimapGolfCourse(hole);
  }

  static setMinimapGolfCourseOff(): void {
    SetMinimapGolfCourseOff();
  }

  static setMinimapHideFow(toggle: boolean): void {
    SetMinimapHideFow(toggle);
  }

  static setMinimapInPrologue(toggle: boolean): void {
    SetMinimapInPrologue(toggle);
  }

  static setMinimapInSpectatorMode(toggle: boolean, ped: Ped): void {
    SetMinimapInSpectatorMode(toggle, ped.handle);
  }

  static setMinimapSonarSweep(toggle: boolean): void {
    SetMinimapSonarSweep(toggle);
  }

  static unlockMinimapAngle(): void {
    UnlockMinimapAngle();
  }

  static unlockMinimapPosition(): void {
    UnlockMinimapPosition();
  }
}