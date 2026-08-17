export class Scaleform {
  constructor(private _handle: number) {}

  beginScaleformMovieMethod(methodName: string): boolean {
    return BeginScaleformMovieMethod(this._handle, methodName);
  }

  static beginScaleformMovieMethodOnFrontend(functionName: string): boolean {
    return BeginScaleformMovieMethodOnFrontend(functionName);
  }

  static beginScaleformMovieMethodOnFrontendHeader(functionName: string): boolean {
    return BeginScaleformMovieMethodOnFrontendHeader(functionName);
  }

  static beginScaleformScriptHudMovieMethod(hudComponent: number, methodName: string): boolean {
    return BeginScaleformScriptHudMovieMethod(hudComponent, methodName);
  }

  static beginTextCommandScaleformString(textLabel: string): void {
    BeginTextCommandScaleformString(textLabel);
  }

  callScaleformMovieMethod(method: string): void {
    CallScaleformMovieMethod(this._handle, method);
  }

  callScaleformMovieMethodWithNumber(methodName: string, param1: number, param2: number, param3: number, param4: number, param5: number): void {
    CallScaleformMovieMethodWithNumber(this._handle, methodName, param1, param2, param3, param4, param5);
  }

  callScaleformMovieMethodWithNumberAndString(methodName: string, floatParam1: number, floatParam2: number, floatParam3: number, floatParam4: number, floatParam5: number, stringParam1: string, stringParam2: string, stringParam3: string, stringParam4: string, stringParam5: string): void {
    CallScaleformMovieMethodWithNumberAndString(this._handle, methodName, floatParam1, floatParam2, floatParam3, floatParam4, floatParam5, stringParam1, stringParam2, stringParam3, stringParam4, stringParam5);
  }

  callScaleformMovieMethodWithString(methodName: string, param1: string, param2: string, param3: string, param4: string, param5: string): void {
    CallScaleformMovieMethodWithString(this._handle, methodName, param1, param2, param3, param4, param5);
  }

  drawScaleformMovie(x: number, y: number, width: number, height: number, red: number, green: number, blue: number, alpha: number, unk: number): void {
    DrawScaleformMovie(this._handle, x, y, width, height, red, green, blue, alpha, unk);
  }

  drawScaleformMovieFullscreen(red: number, green: number, blue: number, alpha: number, unk: number): void {
    DrawScaleformMovieFullscreen(this._handle, red, green, blue, alpha, unk);
  }

  drawScaleformMovieFullscreenMasked(scaleform2: number, red: number, green: number, blue: number, alpha: number): void {
    DrawScaleformMovieFullscreenMasked(this._handle, scaleform2, red, green, blue, alpha);
  }

  drawScaleformMovie_3d(posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, p7: number, sharpness: number, p9: number, scaleX: number, scaleY: number, scaleZ: number, p13: any): void {
    DrawScaleformMovie_3d(this._handle, posX, posY, posZ, rotX, rotY, rotZ, p7, sharpness, p9, scaleX, scaleY, scaleZ, p13);
  }

  drawScaleformMovie_3dSolid(posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, p7: number, p8: number, p9: number, scaleX: number, scaleY: number, scaleZ: number, p13: any): void {
    DrawScaleformMovie_3dSolid(this._handle, posX, posY, posZ, rotX, rotY, rotZ, p7, p8, p9, scaleX, scaleY, scaleZ, p13);
  }

  static endScaleformMovieMethod(): void {
    EndScaleformMovieMethod();
  }

  static endScaleformMovieMethodReturnValue(): number {
    return EndScaleformMovieMethodReturnValue();
  }

  static endTextCommandScaleformString(): void {
    EndTextCommandScaleformString();
  }

  static endTextCommandUnparsedScaleformString(): void {
    EndTextCommandUnparsedScaleformString();
  }

  static getScaleformMovieMethodReturnValueBool(methodReturn: number): boolean {
    return GetScaleformMovieMethodReturnValueBool(methodReturn);
  }

  static getScaleformMovieMethodReturnValueInt(method_return: number): number {
    return GetScaleformMovieMethodReturnValueInt(method_return);
  }

  static getScaleformMovieMethodReturnValueString(method_return: number): string {
    return GetScaleformMovieMethodReturnValueString(method_return);
  }

  hasScaleformContainerMovieLoadedIntoParent(): boolean {
    return HasScaleformContainerMovieLoadedIntoParent(this._handle);
  }

  static hasScaleformMovieFilenameLoaded(scaleformName: string): boolean {
    return HasScaleformMovieFilenameLoaded(scaleformName);
  }

  hasScaleformMovieLoaded(): boolean {
    return HasScaleformMovieLoaded(this._handle);
  }

  hasScaleformMovieNamedLoaded(scaleformName: string): boolean {
    //@ts-ignore
    return HasScaleformMovieNamedLoaded(this._handle, scaleformName)[0]; //Note: Typings problem with citizenfx/client. In fact that function needs 2 args (handle and scaleformname)
  }

  static hasScaleformScriptHudMovieLoaded(hudComponent: number): boolean {
    return HasScaleformScriptHudMovieLoaded(hudComponent);
  }

  get isScaleformMovieDeleting(): boolean {
    return IsScaleformMovieDeleting(this._handle);
  }

  static isScaleformMovieMethodReturnValueReady(method_return: number): boolean {
    return IsScaleformMovieMethodReturnValueReady(method_return);
  }

  passKeyboardInputToScaleform(): boolean {
    return PassKeyboardInputToScaleform(this._handle);
  }

  static removeScaleformScriptHudMovie(hudComponent: number): void {
    RemoveScaleformScriptHudMovie(hudComponent);
  }

  static create(scaleformName: string): Scaleform {
    const handle = RequestScaleformMovie(scaleformName);
    return new Scaleform(handle);
  }

  static requestScaleformMovieInstance(scaleformName: string): number {
    return RequestScaleformMovieInstance(scaleformName);
  }

  static requestScaleformMovieSkipRenderWhilePaused(scaleformName: string): number {
    return RequestScaleformMovieSkipRenderWhilePaused(scaleformName);
  }

  static requestScaleformMovieWithIgnoreSuperWidescreen(scaleformName: string): number {
    return RequestScaleformMovieWithIgnoreSuperWidescreen(scaleformName);
  }

  static requestScaleformScriptHudMovie(hudComponent: number): void {
    RequestScaleformScriptHudMovie(hudComponent);
  }

  static scaleformMovieMethodAddParamBool(value: boolean): void {
    ScaleformMovieMethodAddParamBool(value);
  }

  static scaleformMovieMethodAddParamFloat(value: number): void {
    ScaleformMovieMethodAddParamFloat(value);
  }

  static scaleformMovieMethodAddParamInt(value: number): void {
    ScaleformMovieMethodAddParamInt(value);
  }

  static scaleformMovieMethodAddParamLatestBriefString(value: number): void {
    ScaleformMovieMethodAddParamLatestBriefString(value);
  }

  static scaleformMovieMethodAddParamLiteralString(string: string): void {
    ScaleformMovieMethodAddParamLiteralString(string);
  }

  static scaleformMovieMethodAddParamPlayerNameString(string: string): void {
    ScaleformMovieMethodAddParamPlayerNameString(string);
  }

  static scaleformMovieMethodAddParamTextureNameString(string: string): void {
    ScaleformMovieMethodAddParamTextureNameString(string);
  }

  setScaleformMovieAsNoLongerNeeded(): void {
    SetScaleformMovieAsNoLongerNeeded(this._handle);
  }

  setScaleformMovieToUseLargeRt(useLargeRT: boolean): void {
    SetScaleformMovieToUseLargeRt(this._handle, useLargeRT);
  }

  setScaleformMovieToUseSuperLargeRt(toggle: boolean): void {
    SetScaleformMovieToUseSuperLargeRt(this._handle, toggle);
  }

  setScaleformMovieToUseSystemTime(toggle: boolean): void {
    SetScaleformMovieToUseSystemTime(this._handle, toggle);
  }
}