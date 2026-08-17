export class AnimPostFx {
  static animpostfxGetUnk(effectName: string): number {
    return AnimpostfxGetUnk(effectName);
  }

  static animpostfxIsRunning(effectName: string): boolean {
    return AnimpostfxIsRunning(effectName);
  }

  static animpostfxPlay(effectName: string, duration: number, looped: boolean): void {
    AnimpostfxPlay(effectName, duration, looped);
  }

  static animpostfxStop(effectName: string): void {
    AnimpostfxStop(effectName);
  }

  static animpostfxStopAll(): void {
    AnimpostfxStopAll();
  }

  static animpostfxStopAndDoUnk(effectName: string): void {
    AnimpostfxStopAndDoUnk(effectName);
  }
}