import type { BlipOptions } from '../typings/Blip';
import type { IVector3 } from '../typings/Vector3';

export class Blip {
  private _name: string | undefined;

  private constructor(
    private _handle: number,
    private _sprite?: number,
  ) {}


  static createAtCoords(sprite: number, coords: IVector3): Blip {
    const handle = AddBlipForCoord(coords.x, coords.y, coords.z);
    SetBlipSprite(handle, sprite);
    return new this(handle, sprite);
  }

  static createAtEntity(sprite: number, entityHandle: number): Blip {
    const handle = AddBlipForEntity(entityHandle);
    SetBlipSprite(handle, sprite);
    return new this(handle, sprite);
  }

  static createWithRadius(coords: IVector3, radius: number): Blip {
    const handle = AddBlipForRadius(coords.x, coords.y, coords.z, radius);
    return new this(handle);
  }

  static createInArea(coords: IVector3, width: number, height: number): Blip {
    const handle = AddBlipForArea(coords.x, coords.y, coords.z, width, height);
    return new this(handle);
  }

  static createForPickup(pickup: number, blipOptions: BlipOptions): Blip {
    const handle = AddBlipForPickup(pickup);
    SetBlipSprite(handle, blipOptions.spriteId);
    return new this(handle, blipOptions.spriteId);
  }

  static getFromEntity(entityHandle: number): Blip | null {
    const handle = GetBlipFromEntity(entityHandle);
    if (!DoesBlipExist(handle)) return null;
    return new this(handle);
  }

  static allowSonar(toggle: boolean): void {
    AllowSonarBlips(toggle);
  }

  static clearAllRoutes(): void {
    ClearAllBlipRoutes();
  }

  static clearRaceGallery(): void {
    ClearRaceGalleryBlips();
  }

  static displayPlayerNameTags(toggle: boolean): void {
    DisplayPlayerNameTagsOnBlips(toggle);
  }

  static doesPedHaveAi(pedHandle: number): boolean {
    return DoesPedHaveAiBlip(pedHandle);
  }

  static forceSonarThisFrame(): void {
    ForceSonarBlipsThisFrame();
  }

  static getAi(pedHandle: number): Blip | null {
    const handle = GetAiBlip(pedHandle);
    if (!DoesBlipExist(handle)) return null;
    return new this(handle);
  }

  static getAi2(pedHandle: number): Blip | null {
    const handle = GetAiBlip_2(pedHandle);
    if (!DoesBlipExist(handle)) return null;
    return new this(handle);
  }

  static getClosestOfType(blipSprite: number): number {
    return GetClosestBlipOfType(blipSprite);
  }

  static getFirstInfoId(blipSprite: number): Blip | null {
    const handle = GetFirstBlipInfoId(blipSprite);
    if (!DoesBlipExist(handle)) return null;
    return new this(handle);
  }

  static getMainPlayerId(): number {
    return GetMainPlayerBlipId();
  }

  static getNewSelectedMissionCreator(): Blip | null {
    const handle = GetNewSelectedMissionCreatorBlip();
    if (!DoesBlipExist(handle)) return null;
    return new this(handle);
  }

  static getNextInfoId(blipSprite: number): Blip | null {
    const handle = GetNextBlipInfoId(blipSprite);
    if (!DoesBlipExist(handle)) return null;
    return new this(handle);
  }

  static getNorthRadar(): Blip | null {
    const handle = GetNorthRadarBlip();
    if (!DoesBlipExist(handle)) return null;
    return new this(handle);
  }

  static getNumberOfActive(): number {
    return GetNumberOfActiveBlips();
  }

  static getStandardEnumId(): number {
    return GetStandardBlipEnumId();
  }

  static getWaypointEnumId(): number {
    return GetWaypointBlipEnumId();
  }

  static isHoveringOverMissionCreator(): boolean {
    return IsHoveringOverMissionCreatorBlip();
  }

  static raceGalleryAdd(x: number, y: number, z: number): number {
    return RaceGalleryAddBlip(x, y, z);
  }

  static raceGalleryNextSprite(spriteId: number): void {
    RaceGalleryNextBlipSprite(spriteId);
  }

  static setCustomMpHudColor(hudColorId: number): void {
    SetCustomMpHudColor(hudColorId);
  }

  static setFakePausemapPlayerPositionThisFrame(x: number, y: number): void {
    SetFakePausemapPlayerPositionThisFrame(x, y);
  }

  static setMainPlayerColour(color: number): void {
    SetMainPlayerBlipColour(color);
  }

  static setPedAiForcedOn(pedHandle: number, toggle: boolean): void {
    SetPedAiBlipForcedOn(pedHandle, toggle);
  }

  static setPedAiGangId(pedHandle: number, gangId: number): void {
    SetPedAiBlipGangId(pedHandle, gangId);
  }

  static setPedAiHasCone(pedHandle: number, toggle: boolean): void {
    SetPedAiBlipHasCone(pedHandle, toggle);
  }

  static setPedAiNoticeRange(pedHandle: number, range: number): void {
    SetPedAiBlipNoticeRange(pedHandle, range);
  }

  static setPedAiSprite(pedHandle: number, spriteId: number): void {
    SetPedAiBlipSprite(pedHandle, spriteId);
  }

  static setPedHasAi(pedHandle: number, hasCone: boolean): void {
    SetPedHasAiBlip(pedHandle, hasCone);
  }

  static setPedHasAiWithColor(pedHandle: number, hasCone: boolean, color: number): void {
    SetPedHasAiBlipWithColor(pedHandle, hasCone, color);
  }


  set name(name: string) {
    AddTextEntry('MYBLIP', '~a~');
    BeginTextCommandSetBlipName('MYBLIP');
    AddTextComponentSubstringPlayerName(name);
    EndTextCommandSetBlipName(this._handle);
    this._name = name;
  }

  get name(): string | undefined {
    return this._name;
  }

  get alpha(): number {
    return GetBlipAlpha(this._handle);
  }

  get colour(): number {
    return GetBlipColour(this._handle);
  }

  get coords(): IVector3 {
    const [x, y, z] = GetBlipCoords(this._handle);
    return { x, y, z };
  }

  get hudColour(): number {
    return GetBlipHudColour(this._handle);
  }

  get infoIdCoord(): IVector3 {
    const [x, y, z] = GetBlipInfoIdCoord(this._handle);
    return { x, y, z };
  }

  get infoIdDisplay(): number {
    return GetBlipInfoIdDisplay(this._handle);
  }

  get infoIdEntityIndex(): number {
    return GetBlipInfoIdEntityIndex(this._handle);
  }

  get infoIdPickupIndex(): number {
    return GetBlipInfoIdPickupIndex(this._handle);
  }

  get infoIdType(): number {
    return GetBlipInfoIdType(this._handle);
  }

  get rotation(): number {
    return GetBlipRotation(this._handle);
  }

  get sprite(): number {
    return GetBlipSprite(this._handle);
  }


  addTextComponentSubstringName(): void {
    AddTextComponentSubstringBlipName(this._handle);
  }

  doesExist(): boolean {
    return DoesBlipExist(this._handle);
  }

  doesHaveGpsRoute(): boolean {
    return DoesBlipHaveGpsRoute(this._handle);
  }

  endTextCommandSetName(): void {
    EndTextCommandSetBlipName(this._handle);
  }

  hideNumber(): void {
    HideNumberOnBlip(this._handle);
  }

  isFlashing(): boolean {
    return IsBlipFlashing(this._handle);
  }

  isOnMinimap(): boolean {
    return IsBlipOnMinimap(this._handle);
  }

  isShortRange(): boolean {
    return IsBlipShortRange(this._handle);
  }

  isMissionCreator(): boolean {
    return IsMissionCreatorBlip(this._handle);
  }

  pulse(): void {
    PulseBlip(this._handle);
  }

  remove(): void {
    RemoveBlip(this._handle);
  }

  setAlpha(alpha: number): void {
    SetBlipAlpha(this._handle, alpha);
  }

  setAsFriendly(toggle: boolean): void {
    SetBlipAsFriendly(this._handle, toggle);
  }

  setAsMissionCreator(toggle: boolean): void {
    SetBlipAsMissionCreatorBlip(this._handle, toggle);
  }

  setAsShortRange(toggle: boolean): void {
    SetBlipAsShortRange(this._handle, toggle);
  }

  setBright(toggle: boolean): void {
    SetBlipBright(this._handle, toggle);
  }

  setCategory(index: number): void {
    SetBlipCategory(this._handle, index);
  }

  setColour(color: number): void {
    SetBlipColour(this._handle, color);
  }

  setCoords(posX: number, posY: number, posZ: number): void {
    SetBlipCoords(this._handle, posX, posY, posZ);
  }

  setDisplay(displayId: number): void {
    SetBlipDisplay(this._handle, displayId);
  }

  setDisplayIndicatorOn(toggle: boolean): void {
    SetBlipDisplayIndicatorOnBlip(this._handle, toggle);
  }

  setFade(opacity: number, duration: number): void {
    SetBlipFade(this._handle, opacity, duration);
  }

  setFlashInterval(interval: number): void {
    SetBlipFlashInterval(this._handle, interval);
  }

  setFlashTimer(duration: number): void {
    SetBlipFlashTimer(this._handle, duration);
  }

  setFlashes(toggle: boolean): void {
    SetBlipFlashes(this._handle, toggle);
  }

  setFlashesAlternate(toggle: boolean): void {
    SetBlipFlashesAlternate(this._handle, toggle);
  }

  setHiddenOnLegend(toggle: boolean): void {
    SetBlipHiddenOnLegend(this._handle, toggle);
  }

  setHighDetail(toggle: boolean): void {
    SetBlipHighDetail(this._handle, toggle);
  }

  setNameFromFile(gxtEntry: string): void {
    SetBlipNameFromTextFile(this._handle, gxtEntry);
  }

  setNameToPlayerName(player: number): void {
    SetBlipNameToPlayerName(this._handle, player);
  }

  setPriority(priority: number): void {
    SetBlipPriority(this._handle, priority);
  }

  setRadarZoom(zoom: number): void {
    SetRadarZoomToBlip(this._handle, zoom);
  }

  setRadiusEdge(toggle: boolean): void {
    SetRadiusBlipEdge(this._handle, toggle);
  }

  setRotation(rotation: number): void {
    SetBlipRotation(this._handle, rotation);
  }

  setRoute(enabled: boolean): void {
    SetBlipRoute(this._handle, enabled);
  }

  setRouteColour(colour: number): void {
    SetBlipRouteColour(this._handle, colour);
  }

  setScale(scale: number): void {
    SetBlipScale(this._handle, scale);
  }

  setScaleTransformation(xScale: number, yScale: number): void {
    SetBlipScaleTransformation(this._handle, xScale, yScale);
  }

  setSecondaryColour(r: number, g: number, b: number): void {
    SetBlipSecondaryColour(this._handle, r, g, b);
  }

  setShowCone(toggle: boolean): void {
    SetBlipShowCone(this._handle, toggle);
  }

  setShrink(toggle: boolean): void {
    SetBlipShrink(this._handle, toggle);
  }

  setSprite(spriteId: number): void {
    SetBlipSprite(this._handle, spriteId);
    this._sprite = spriteId;
  }

  setSquaredRotation(heading: number): void {
    SetBlipSquaredRotation(this._handle, heading);
  }

  showCrewIndicatorOn(toggle: boolean): void {
    ShowCrewIndicatorOnBlip(this._handle, toggle);
  }

  showFriendIndicatorOn(toggle: boolean): void {
    ShowFriendIndicatorOnBlip(this._handle, toggle);
  }

  showHasCompletedIndicatorOn(toggle: boolean): void {
    ShowHasCompletedIndicatorOnBlip(this._handle, toggle);
  }

  showHeadingIndicatorOn(toggle: boolean): void {
    ShowHeadingIndicatorOnBlip(this._handle, toggle);
  }

  showHeightOn(toggle: boolean): void {
    ShowHeightOnBlip(this._handle, toggle);
  }

  showNumberOn(number: number): void {
    ShowNumberOnBlip(this._handle, number);
  }

  showOutlineIndicatorOn(toggle: boolean): void {
    ShowOutlineIndicatorOnBlip(this._handle, toggle);
  }

  showTickOn(toggle: boolean): void {
    ShowTickOnBlip(this._handle, toggle);
  }
}