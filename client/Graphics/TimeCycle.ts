export class Timecycle {
  static addTcmodifierOverride(modifierName1: string, modifierName2: string): void {
    AddTcmodifierOverride(modifierName1, modifierName2);
  }

  static clearExtraTimecycleModifier(): void {
    ClearExtraTimecycleModifier();
  }

  static clearTimecycleModifier(): void {
    ClearTimecycleModifier();
  }

  static get extraTimecycleModifierIndex(): number {
    return GetExtraTimecycleModifierIndex();
  }

  static get timecycleModifierIndex(): number {
    return GetTimecycleModifierIndex();
  }

  static get timecycleTransitionModifierIndex(): number {
    return GetTimecycleTransitionModifierIndex();
  }

  static popTimecycleModifier(): void {
    PopTimecycleModifier();
  }

  static pushTimecycleModifier(): void {
    PushTimecycleModifier();
  }

  static removeTcmodifierOverride(p0: string): void {
    RemoveTcmodifierOverride(p0);
  }

  static setCurrentPlayerTcmodifier(modifierName: string): void {
    SetCurrentPlayerTcmodifier(modifierName);
  }

  static setExtraTimecycleModifier(modifierName: string): void {
    SetExtraTimecycleModifier(modifierName);
  }

  static setNextPlayerTcmodifier(modifierName: string): void {
    SetNextPlayerTcmodifier(modifierName);
  }

  static setPlayerTcmodifierTransition(value: number): void {
    SetPlayerTcmodifierTransition(value);
  }

  static setTimecycleModifier(modifierName: string): void {
    SetTimecycleModifier(modifierName);
  }

  static setTimecycleModifierStrength(strength: number): void {
    SetTimecycleModifierStrength(strength);
  }

  static setTransitionOutOfTimecycleModifier(transitionTime: number): void {
    SetTransitionOutOfTimecycleModifier(transitionTime);
  }

  static setTransitionTimecycleModifier(modifierName: string, transition: number): void {
    SetTransitionTimecycleModifier(modifierName, transition);
  }
}