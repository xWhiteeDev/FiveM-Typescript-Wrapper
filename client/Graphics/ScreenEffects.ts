import type { RGB } from '../Utils/RGBA';

export class ScreenEffects {
  static get usingseethrough(): boolean {
    return GetUsingseethrough();
  }

  static seethroughGetMaxThickness(): number {
    return SeethroughGetMaxThickness();
  }

  static seethroughReset(): void {
    SeethroughReset();
  }

  static seethroughSetColorNear(color: RGB): void {
    SeethroughSetColorNear(color.r, color.g, color.b);
  }

  static seethroughSetFadeEndDistance(distance: number): void {
    SeethroughSetFadeEndDistance(distance);
  }

  static seethroughSetFadeStartDistance(distance: number): void {
    SeethroughSetFadeStartDistance(distance);
  }

  static seethroughSetHeatscale(index: number, heatScale: number): void {
    SeethroughSetHeatscale(index, heatScale);
  }

  static seethroughSetHiLightIntensity(intensity: number): void {
    SeethroughSetHiLightIntensity(intensity);
  }

  static seethroughSetHiLightNoise(noise: number): void {
    SeethroughSetHiLightNoise(noise);
  }

  static seethroughSetMaxThickness(thickness: number): void {
    SeethroughSetMaxThickness(thickness);
  }

  static seethroughSetNoiseAmountMax(amount: number): void {
    SeethroughSetNoiseAmountMax(amount);
  }

  static seethroughSetNoiseAmountMin(amount: number): void {
    SeethroughSetNoiseAmountMin(amount);
  }

  static setSeethrough(toggle: boolean): void {
    SetSeethrough(toggle);
  }
}