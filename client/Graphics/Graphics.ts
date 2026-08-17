import type { IVector3 } from '../typings/Vector3';
import type { RGBA } from '../Utils/RGBA';

export class Graphics {
  static addEntityIcon(entity: number, icon: string): any {
    return AddEntityIcon(entity, icon);
  }

  static adjustNextPosSizeAsNormalized_16_9(): void {
    AdjustNextPosSizeAsNormalized_16_9();
  }

  static attachTvAudioToEntity(entity: number): void {
    AttachTvAudioToEntity(entity);
  }

  static cascadeShadowsClearShadowSampleType(): void {
    CascadeShadowsClearShadowSampleType();
  }

  static cascadeShadowsEnableEntityTracker(toggle: boolean): void {
    CascadeShadowsEnableEntityTracker(toggle);
  }

  static cascadeShadowsInitSession(): void {
    CascadeShadowsInitSession();
  }

  static cascadeShadowsSetAircraftMode(p0: boolean): void {
    CascadeShadowsSetAircraftMode(p0);
  }

  static cascadeShadowsSetCascadeBounds(p0: number, p1: boolean, p2: number, p3: number, p4: number, p5: number, p6: boolean, p7: number): void {
    CascadeShadowsSetCascadeBounds(p0, p1, p2, p3, p4, p5, p6, p7);
  }

  static cascadeShadowsSetCascadeBoundsScale(p0: number): void {
    CascadeShadowsSetCascadeBoundsScale(p0);
  }

  static cascadeShadowsSetDynamicDepthMode(p0: boolean): void {
    CascadeShadowsSetDynamicDepthMode(p0);
  }

  static cascadeShadowsSetDynamicDepthValue(p0: number): void {
    CascadeShadowsSetDynamicDepthValue(p0);
  }

  static cascadeShadowsSetEntityTrackerScale(p0: number): void {
    CascadeShadowsSetEntityTrackerScale(p0);
  }

  static cascadeShadowsSetShadowSampleType(type: string): void {
    CascadeShadowsSetShadowSampleType(type);
  }

  static createTrackedPoint(): number {
    return CreateTrackedPoint();
  }

  static destroyTrackedPoint(point: number): void {
    DestroyTrackedPoint(point);
  }

  static disableMoonCycleOverride(): void {
    DisableMoonCycleOverride();
  }

  static disableOcclusionThisFrame(): void {
    DisableOcclusionThisFrame();
  }

  static disableScreenblurFade(): void {
    DisableScreenblurFade();
  }

  static disableScriptAmbientEffects(p0: any): void {
    DisableScriptAmbientEffects(p0);
  }

  static doesLatestBriefStringExist(briefValue: number): boolean {
    return DoesLatestBriefStringExist(briefValue);
  }

  static dontRenderInGameUi(p0: boolean): void {
    DontRenderInGameUi(p0);
  }

  static enableAlienBloodVfx(toggle: boolean): void {
    EnableAlienBloodVfx(toggle);
  }

  static enableClownBloodVfx(toggle: boolean): void {
    EnableClownBloodVfx(toggle);
  }

  static enableMoonCycleOverride(phase: number): void {
    EnableMoonCycleOverride(phase);
  }

  static forceRenderInGameUi(toggle: boolean): void {
    ForceRenderInGameUi(toggle);
  }

  static get actualScreenResolution(): [any, any] {
    return GetActualScreenResolution();
  }

  static getAspectRatio(physicalAspect: boolean): number {
    return GetAspectRatio(physicalAspect);
  }

  static get isHidef(): boolean {
    return GetIsHidef();
  }

  static get isWidescreen(): boolean {
    return GetIsWidescreen();
  }

  static get requestingnightvision(): boolean {
    return GetRequestingnightvision();
  }

  static get safeZoneSize(): number {
    return GetSafeZoneSize();
  }

  static getScreenCoordFromWorldCoord(world: IVector3): [boolean, any, any] {
    return GetScreenCoordFromWorldCoord(world.x, world.y, world.z);
  }

  static get screenResolution(): [any, any] {
    return GetScreenResolution();
  }

  static get screenblurFadeCurrentTime(): number {
    return GetScreenblurFadeCurrentTime();
  }

  static getScriptGfxPosition(x: number, y: number): [any, any] {
    return GetScriptGfxPosition(x, y);
  }

  static getStatusOfSortedListOperation(scanForSaving: boolean): number {
    return GetStatusOfSortedListOperation(scanForSaving);
  }

  static get togglePausedRenderphasesStatus(): boolean {
    return GetTogglePausedRenderphasesStatus();
  }

  static get tvVolume(): number {
    return GetTvVolume();
  }

  static get usingnightvision(): boolean {
    return GetUsingnightvision();
  }

  static golfTrailGetMaxHeight(): number {
    return GolfTrailGetMaxHeight();
  }

  static golfTrailGetVisualControlPoint(p0: number): IVector3 {
    const [x, y, z] = GolfTrailGetVisualControlPoint(p0);
    return { x, y, z };
  }

  static golfTrailSetColour(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: number, p11: number): void {
    GolfTrailSetColour(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11);
  }

  static golfTrailSetEnabled(toggle: boolean): void {
    GolfTrailSetEnabled(toggle);
  }

  static golfTrailSetFacing(p0: boolean): void {
    GolfTrailSetFacing(p0);
  }

  static golfTrailSetFixedControlPoint(type: number, pos: IVector3, p4: number, color: RGBA): void {
    GolfTrailSetFixedControlPoint(type, pos.x, pos.y, pos.z, p4, color.r, color.g, color.b, color.a);
  }

  static golfTrailSetPath(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: boolean): void {
    GolfTrailSetPath(p0, p1, p2, p3, p4, p5, p6, p7, p8);
  }

  static golfTrailSetRadius(p0: number, p1: number, p2: number): void {
    GolfTrailSetRadius(p0, p1, p2);
  }

  static golfTrailSetShaderParams(p0: number, p1: number, p2: number, p3: number, p4: number): void {
    GolfTrailSetShaderParams(p0, p1, p2, p3, p4);
  }

  static golfTrailSetTessellation(p0: number, p1: number): void {
    GolfTrailSetTessellation(p0, p1);
  }

  static grassLodResetScriptAreas(): void {
    GrassLodResetScriptAreas();
  }

  static grassLodShrinkScriptAreas(coords: IVector3, radius: number, p4: number, p5: number, p6: number): void {
    GrassLodShrinkScriptAreas(coords.x, coords.y, coords.z, radius, p4, p5, p6);
  }

  static isPlaylistUnk(tvChannel: number, p1: any): boolean {
    return IsPlaylistUnk(tvChannel, p1);
  }

  static get isScreenblurFadeRunning(): boolean {
    return IsScreenblurFadeRunning();
  }

  static isTrackedPointVisible(point: number): boolean {
    return IsTrackedPointVisible(point);
  }

  static isTvPlaylistItemPlaying(videoCliphash: number): boolean {
    return IsTvPlaylistItemPlaying(videoCliphash);
  }

  static overrideInteriorSmokeEnd(): void {
    OverrideInteriorSmokeEnd();
  }

  static overrideInteriorSmokeLevel(level: number): void {
    OverrideInteriorSmokeLevel(level);
  }

  static overrideInteriorSmokeName(name: string): void {
    OverrideInteriorSmokeName(name);
  }

  static presetInteriorAmbientCache(timecycleModifierName: string): void {
    PresetInteriorAmbientCache(timecycleModifierName);
  }

  static registerNoirScreenEffectThisFrame(): void {
    RegisterNoirScreenEffectThisFrame();
  }

  static resetAdaptation(numFrames: number): void {
    ResetAdaptation(numFrames);
  }

  static resetPausedRenderphases(): void {
    ResetPausedRenderphases();
  }

  static resetScriptGfxAlign(): void {
    ResetScriptGfxAlign();
  }

  static returnTwo(p0: number): number {
    return ReturnTwo(p0);
  }

  static setBackfaceculling(toggle: boolean): void {
    SetBackfaceculling(toggle);
  }

  static setEntityIconColor(entity: number, color: RGBA): void {
    SetEntityIconColor(entity, color.r, color.g, color.b, color.a);
  }

  static setEntityIconVisibility(entity: number, toggle: boolean): void {
    SetEntityIconVisibility(entity, toggle);
  }

  static setFlash(p0: number, p1: number, fadeIn: number, duration: number, fadeOut: number): void {
    SetFlash(p0, p1, fadeIn, duration, fadeOut);
  }

  static setForcePedFootstepsTracks(toggle: boolean): void {
    SetForcePedFootstepsTracks(toggle);
  }

  static setForceVehicleTrails(toggle: boolean): void {
    SetForceVehicleTrails(toggle);
  }

  static setHidofOverride(p0: boolean, p1: boolean, nearplaneOut: number, nearplaneIn: number, farplaneOut: number, farplaneIn: number): void {
    SetHidofOverride(p0, p1, nearplaneOut, nearplaneIn, farplaneOut, farplaneIn);
  }

  static setNightvision(toggle: boolean): void {
    SetNightvision(toggle);
  }

  static setNoiseoveride(toggle: boolean): void {
    SetNoiseoveride(toggle);
  }

  static setNoisinessoveride(value: number): void {
    SetNoisinessoveride(value);
  }

  static setScriptGfxAlign(horizontalAlign: number, verticalAlign: number): void {
    SetScriptGfxAlign(horizontalAlign, verticalAlign);
  }

  static setScriptGfxAlignParams(x: number, y: number, w: number, h: number): void {
    SetScriptGfxAlignParams(x, y, w, h);
  }

  static setTrackedPointInfo(point: number, coords: IVector3, radius: number): void {
    SetTrackedPointInfo(point, coords.x, coords.y, coords.z, radius);
  }

  static setTvAudioFrontend(toggle: boolean): void {
    SetTvAudioFrontend(toggle);
  }

  static setTvVolume(volume: number): void {
    SetTvVolume(volume);
  }

  static terraingridActivate(toggle: boolean): void {
    TerraingridActivate(toggle);
  }

  static terraingridSetColours(lowColor: RGBA, color: RGBA, highColor: RGBA): void {
    TerraingridSetColours(lowColor.r, lowColor.g, lowColor.b, lowColor.a, color.r, color.g, color.b, color.a, highColor.r, highColor.g, highColor.b, highColor.a);
  }

  static terraingridSetParams(coords: IVector3, p3: number, rotation: number, p5: number, width: number, height: number, p8: number, scale: number, glowIntensity: number, normalHeight: number, heightDiff: number): void {
    TerraingridSetParams(coords.x, coords.y, coords.z, p3, rotation, p5, width, height, p8, scale, glowIntensity, normalHeight, heightDiff);
  }

  static togglePausedRenderphases(toggle: boolean): void {
    TogglePausedRenderphases(toggle);
  }

  static triggerScreenblurFadeIn(transitionTime: number): boolean {
    return TriggerScreenblurFadeIn(transitionTime);
  }

  static triggerScreenblurFadeOut(transitionTime: number): boolean {
    return TriggerScreenblurFadeOut(transitionTime);
  }

  static ui3dsceneIsAvailable(): boolean {
    return Ui3dsceneIsAvailable();
  }

  static ui3dscenePushPreset(presetName: string): boolean {
    return Ui3dscenePushPreset(presetName);
  }
}