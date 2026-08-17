export class CFX {
  private constructor() {}
  static emitServer(eventName: string, args?: any) {
    if (!eventName) {
      console.error('[emitServer]: You dont provided any event name!');
      return;
    }
    if ((args && typeof args === 'object') || Array.isArray(args)) {
      args = JSON.stringify(args);
    }
    emitNet(eventName, args);
  }
  static addCrossEventListener(eventName: string, handler: Function) {
    if (!eventName || !handler) {
      console.error('[addCrossEventListener]: eventName or handler argument not provided');
      return;
    }
    onNet(eventName, (...args: any) => {
      handler(...args);
    });
  }
  static addEventListener(eventName: string, handler: Function) {
    if (!eventName || !handler) {
      console.error('[addEventListener]: eventName or handler argument not provided');
      return;
    }
    on(eventName, (...args: any) => {
      handler(...args);
    });
  }
  static cancelEvent() {
    CancelEvent();
  }
  static wasEventCanceled() {
    return WasEventCanceled();
  }


  static addAudioSubmixOutput(submixId: number, outputSubmixId: number): void {
    AddAudioSubmixOutput(submixId, outputSubmixId);
  }

  static addAuthorizedParachuteModel(modelNameHash: number): void {
    AddAuthorizedParachuteModel(modelNameHash);
  }

  static addAuthorizedParachutePackModel(modelNameHash: number): void {
    AddAuthorizedParachutePackModel(modelNameHash);
  }

  static addConvarChangeListener(convarFilter: string, handler: Function): void {
    AddConvarChangeListener(convarFilter, handler);
  }

  static addHealthConfig(
    configName: string,
    defaultHealth: number,
    defaultArmor: number,
    defaultEndurance: number,
    fatiguedHealthThreshold: number,
    injuredHealthThreshold: number,
    dyingHealthThreshold: number,
    hurtHealthThreshold: number,
    dogTakedownThreshold: number,
    writheFromBulletThreshold: number,
    meleeCardinalFatalAttack: boolean,
    invincible: boolean,
  ): void {
    AddHealthConfig(
      configName,
      defaultHealth,
      defaultArmor,
      defaultEndurance,
      fatiguedHealthThreshold,
      injuredHealthThreshold,
      dyingHealthThreshold,
      hurtHealthThreshold,
      dogTakedownThreshold,
      writheFromBulletThreshold,
      meleeCardinalFatalAttack,
      invincible,
    );
  }

  static addMinimapOverlay(name: string): void {
    AddMinimapOverlay(name);
  }

  static addMinimapOverlayWithDepth(name: string, depth: number): void {
    AddMinimapOverlayWithDepth(name, depth);
  }

  static addReplaceTexture(origTxd: string, origTxn: string, newTxd: string, newTxn: string): void {
    AddReplaceTexture(origTxd, origTxn, newTxd, newTxn);
  }

  static addStateBagChangeHandler(keyFilter: string, bagFilter: string, handler: Function): void {
    AddStateBagChangeHandler(keyFilter, bagFilter, handler);
  }

  static addTextEntry(entryKey: string, entryText: string): void {
    AddTextEntry(entryKey, entryText);
  }

  static addTextEntryByHash(entryKey: number, entryText: string): void {
    AddTextEntryByHash(entryKey, entryText);
  }

  static applyWeatherCycles(numEntries: number, msPerCycle: number): void {
    ApplyWeatherCycles(numEntries, msPerCycle);
  }
 
  static commitRuntimeTexture(tex: number): void {
    CommitRuntimeTexture(tex);
  }


  static createRuntimeTexture(txd: number, txn: string, width: number, height: number): void {
    CreateRuntimeTexture(txd, txn, width, height);
  }

  static createRuntimeTextureFromDuiHandle(txd: number, txn: string, duiHandle: string): void {
    CreateRuntimeTextureFromDuiHandle(txd, txn, duiHandle);
  }

  static createRuntimeTextureFromImage(txd: number, txn: string, filename: string): void {
    CreateRuntimeTextureFromImage(txd, txn, filename);
  }

  static createRuntimeTxd(name: string): void {
    CreateRuntimeTxd(name);
  }



  static deleteFunctionReference(referenceIdentity: string): void {
    DeleteFunctionReference(referenceIdentity);
  }

  static deleteResourceKvp(key: string): void {
    DeleteResourceKvp(key);
  }

  static deleteResourceKvpNoSync(key: string): void {
    DeleteResourceKvpNoSync(key);
  }

  static disableEditorRuntime(): void {
    DisableEditorRuntime();
  }

  static disableRawKeyThisFrame(rawKeyIndex: number): void {
    DisableRawKeyThisFrame(rawKeyIndex);
  }

  static disableWorldhorizonRendering(state: boolean): void {
    DisableWorldhorizonRendering(state);
  }


  static doorSystemGetActive(): boolean {
    return DoorSystemGetActive();
  }

  static doorSystemGetSize(): number {
    return DoorSystemGetSize();
  }

  static duplicateFunctionReference(referenceIdentity: string): string {
    return DuplicateFunctionReference(referenceIdentity);
  }

  static enableEditorRuntime(): void {
    EnableEditorRuntime();
  }

  static endFindKvp(handle: number): void {
    EndFindKvp(handle);
  }

  static endFindObject(findHandle: number): void {
    EndFindObject(findHandle);
  }

  static endFindPed(findHandle: number): void {
    EndFindPed(findHandle);
  }

  static endFindPickup(findHandle: number): void {
    EndFindPickup(findHandle);
  }

  static endFindVehicle(findHandle: number): void {
    EndFindVehicle(findHandle);
  }

  static ensureEntityStateBag(entityHandle: number): void {
    EnsureEntityStateBag(entityHandle);
  }

  static enterCursorMode(): void {
    EnterCursorMode();
  }

  static executeCommand(commandString: string): void {
    ExecuteCommand(commandString);
  }

  static experimentalLoadCloneCreate(data: string, objectId: number, tree: string): number {
    return ExperimentalLoadCloneCreate(data, objectId, tree);
  }

  static experimentalLoadCloneSync(entityHandle: number, data: string): void {
    ExperimentalLoadCloneSync(entityHandle, data);
  }

  static experimentalSaveCloneCreate(entityHandle: number): string {
    return ExperimentalSaveCloneCreate(entityHandle);
  }

  static experimentalSaveCloneSync(entityHandle: number): string {
    return ExperimentalSaveCloneSync(entityHandle);
  }

  static findFirstObject(outEntity: number): [number, number] {
    return FindFirstObject(outEntity);
  }

  static findFirstPed(outEntity: number): [number, number] {
    return FindFirstPed(outEntity);
  }

  static findFirstPickup(outEntity: number): [number, number] {
    return FindFirstPickup(outEntity);
  }

  static findFirstVehicle(outEntity: number): [number, number] {
    return FindFirstVehicle(outEntity);
  }

  static findKvp(handle: number): string {
    return FindKvp(handle);
  }

  static findNextObject(findHandle: number): [boolean, number] {
    return FindNextObject(findHandle);
  }

  static findNextPed(findHandle: number): [boolean, number] {
    return FindNextPed(findHandle);
  }

  static findNextPickup(findHandle: number): [boolean, number] {
    return FindNextPickup(findHandle);
  }

  static findNextVehicle(findHandle: number): [boolean, number] {
    return FindNextVehicle(findHandle);
  }

  static forcesSnowPass(enabled: boolean): void {
    ForceSnowPass(enabled);
  }

  static formatStackTrace(traceData: object): string {
    return FormatStackTrace(traceData);
  }

  static getAllRopes(): number[] {
    return GetAllRopes();
  }

  static getAllTrackJunctions(): number[] {
    return GetAllTrackJunctions();
  }

  static getAllVehicleModels(): number[] {
    return GetAllVehicleModels();
  }

  static getAmbientPedRangeMultiplier(): number {
    return GetAmbientPedRangeMultiplier();
  }

  static getAmbientVehicleRangeMultiplier(): number {
    return GetAmbientVehicleRangeMultiplier();
  }

  static getCalmingQuadAtCoords(x: number, y: number): number {
    return GetCalmingQuadAtCoords(x, y);
  }

  static getCalmingQuadBounds(waterQuad: number): any {
    return GetCalmingQuadBounds(waterQuad);
  }

  static getCalmingQuadCount(): number {
    return GetCalmingQuadCount();
  }

  static getCalmingQuadDampening(waterQuad: number): number {
    return GetCalmingQuadDampening(waterQuad)[1];
  }

  static getClosestTrackNodes(radius: number): any {
    return GetClosestTrackNodes(radius);
  }

  static getConvar(varName: string, default_: string): string {
    return GetConvar(varName, default_);
  }

  static getConvarBool(varName: string, defaultValue: boolean): boolean {
    return GetConvarBool(varName, defaultValue);
  }

  static getConvarFloat(varName: string, defaultValue: number): number {
    return GetConvarFloat(varName, defaultValue);
  }

  static getConvarInt(varName: string, default_: number): number {
    return GetConvarInt(varName, default_);
  }

  static getCurrentGameName(): string {
    return GetCurrentGameName();
  }

  static getCurrentResourceName(): string {
    return GetCurrentResourceName();
  }

  static getCurrentServerEndpoint(): string {
    return GetCurrentServerEndpoint();
  }

  static getEntitiesInRadius(
    x: number,
    y: number,
    z: number,
    radius: number,
    entityType: number,
    sortByDistance: boolean,
    models: object,
  ): number[] {
    return GetEntitiesInRadius(x, y, z, radius, entityType, sortByDistance, models);
  }

  static getExternalKvpFloat(resource: string, key: string): number {
    return GetExternalKvpFloat(resource, key);
  }

  static getExternalKvpInt(resource: string, key: string): number {
    return GetExternalKvpInt(resource, key);
  }

  static getExternalKvpString(resource: string, key: string): string {
    return GetExternalKvpString(resource, key);
  }

  static getFallDamageLandOnFootMultiplier(): number {
    return GetFallDamageLandOnFootMultiplier();
  }
  static getFallDamageMultiplier() {
    return GetFallDamageMultiplier();
  }
  static getHudComponentAlign(id: number): [number, number] {
    return GetHudComponentAlign(id);
  }

  static getHudComponentName(id: number): string {
    return GetHudComponentName(id);
  }

  static getHudComponentSize(id: number): any {
    return GetHudComponentSize(id);
  }

  static getInstanceId(): number {
    return GetInstanceId();
  }

  static getGameBuildNumber(): number {
    return GetGameBuildNumber();
  }

  static getGameName(): string {
    return GetGameName();
  }

  static getGamePool(poolName: string): number[] {
    return GetGamePool(poolName);
  }
  static getInvokingResource() {
    return GetInvokingResource();
  }
  static getMapZoomDataLevel(index: number): any {
    return GetMapZoomDataLevel(index);
  }

  static getMapdataEntityHandle(mapDataHash: number, entityInternalIdx: number): number {
    return GetMapdataEntityHandle(mapDataHash, entityInternalIdx)[1];
  }

  static getMapdataEntityMatrix(mapDataHash: number, entityInternalIdx: number, matrixPtr: number): void {
    GetMapdataEntityMatrix(mapDataHash, entityInternalIdx, matrixPtr);
  }

  static getMapdataFromHashKey(mapdataHandle: number): number {
    return GetMapdataFromHashKey(mapdataHandle);
  }


  static getNumResourceMetadata(resourceName: string, metadataKey: string): number {
    return GetNumResourceMetadata(resourceName, metadataKey);
  }

  static getNumResources(): number {
    return GetNumResources();
  }

  static getRegisteredCommands(): any {
    return GetRegisteredCommands();
  }

  static getResourceByFindIndex(findIndex: number): string {
    return GetResourceByFindIndex(findIndex);
  }

  static getResourceCommands(resource: string): any {
    return GetResourceCommands(resource);
  }

  static getResourceKvpFloat(key: string): number {
    return GetResourceKvpFloat(key);
  }

  static getResourceKvpInt(key: string): number {
    return GetResourceKvpInt(key);
  }

  static getResourceKvpString(key: string): string {
    return GetResourceKvpString(key);
  }

  static getResourceMetadata(resourceName: string, metadataKey: string, index: number): string {
    return GetResourceMetadata(resourceName, metadataKey, index);
  }

  static getResourceState(resourceName: string): string {
    return GetResourceState(resourceName);
  }

  static getRuntimeTextureHeight(tex: number): number {
    return GetRuntimeTextureHeight(tex);
  }

  static getRuntimeTexturePitch(tex: number): number {
    return GetRuntimeTexturePitch(tex);
  }

  static getRuntimeTextureWidth(tex: number): number {
    return GetRuntimeTextureWidth(tex);
  }

  static getScenarioPedDensityMultiplier(): number {
    return GetScenarioPedDensityMultiplier();
  }

  static getStateBagKeys(bagName: string): string[] {
    return GetStateBagKeys(bagName);
  }

  static getStateBagValue(bagName: string, key: string): any {
    return GetStateBagValue(bagName, key);
  }
}
