import type { IVector3 } from '../typings/Vector3';
import type { RGB } from '../Utils/RGBA';

export class Lights {
  static disableVehicleDistantlights(toggle: boolean): void {
    DisableVehicleDistantlights(toggle);
  }

  static drawLightWithRange(pos: IVector3, color: RGB, range: number, intensity: number): void {
    DrawLightWithRange(pos.x, pos.y, pos.z, color.r, color.g, color.b, range, intensity);
  }

  static drawLightWithRangeAndShadow(coords: IVector3, color: RGB, range: number, intensity: number, shadow: number): void {
    DrawLightWithRangeAndShadow(coords.x, coords.y, coords.z, color.r, color.g, color.b, range, intensity, shadow);
  }

  static drawSpotLight(pos: IVector3, dir: IVector3, color: RGB, distance: number, brightness: number, hardness: number, radius: number, falloff: number): void {
    DrawSpotLight(pos.x, pos.y, pos.z, dir.x, dir.y, dir.z, color.r, color.g, color.b, distance, brightness, hardness, radius, falloff);
  }

  static drawSpotLightWithShadow(pos: IVector3, dir: IVector3, color: RGB, distance: number, brightness: number, roundness: number, radius: number, falloff: number, shadowId: number): void {
    DrawSpotLightWithShadow(pos.x, pos.y, pos.z, dir.x, dir.y, dir.z, color.r, color.g, color.b, distance, brightness, roundness, radius, falloff, shadowId);
  }

  static fadeUpPedLight(p0: number): void {
    FadeUpPedLight(p0);
  }

  static setArtificialLightsState(state: boolean): void {
    SetArtificialLightsState(state);
  }

  static setArtificialLightsStateAffectsVehicles(toggle: boolean): void {
    SetArtificialLightsStateAffectsVehicles(toggle);
  }

  static updateLightsOnEntity(entity: number): void {
    UpdateLightsOnEntity(entity);
  }
}