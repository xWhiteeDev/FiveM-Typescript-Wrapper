import type { IVector3 } from '../typings/Vector';
import { Ped } from '../Entities/Ped';

export class Network {
  static netToObj(netHandle: number): number {
    return NetToObj(netHandle);
  }

  static netToPed(netHandle: number): number {
    return NetToPed(netHandle);
  }

  static netToVeh(netHandle: number): number {
    return NetToVeh(netHandle);
  }

  static networkDisableProximityMigration(netID: number): void {
    NetworkDisableProximityMigration(netID);
  }

  static networkGetDestroyerOfNetworkId(netId: number): [number, number] {
    return NetworkGetDestroyerOfNetworkId(netId);
  }

  static networkHasControlOfDoor(doorHash: number): boolean {
    return NetworkHasControlOfDoor(doorHash);
  }

  static networkHasControlOfNetworkId(netId: number): boolean {
    return NetworkHasControlOfNetworkId(netId);
  }

  static networkIsDoorNetworked(doorHash: number): boolean {
    return NetworkIsDoorNetworked(doorHash);
  }

  static networkRequestControlOfDoor(doorID: number): boolean {
    return NetworkRequestControlOfDoor(doorID);
  }

  static networkRequestControlOfNetworkId(netId: number): boolean {
    return NetworkRequestControlOfNetworkId(netId);
  }

  static networkUseHighPrecisionBlending(netID: number, toggle: boolean): void {
    NetworkUseHighPrecisionBlending(netID, toggle);
  }

  static isNetworkIdOwnedByParticipant(netId: number): boolean {
    return IsNetworkIdOwnedByParticipant(netId);
  }

  static networkAreHandlesTheSame(): [boolean, number, number] {
    return NetworkAreHandlesTheSame();
  }

  static networkDoesNetworkIdExist(netId: number): boolean {
    return NetworkDoesNetworkIdExist(netId);
  }

  static networkIsNetworkIdAClone(netId: number): boolean {
    return NetworkIsNetworkIdAClone(netId);
  }

  static fadeOutLocalPlayer(p0: boolean): void {
    FadeOutLocalPlayer(p0);
  }

  static networkIsLocalPlayerInvincible(): boolean {
    return NetworkIsLocalPlayerInvincible();
  }

  static networkIsPlayerActive(player: number): boolean {
    return NetworkIsPlayerActive(player);
  }

  static networkPlayerGetCheaterReason(): number {
    return NetworkPlayerGetCheaterReason();
  }

  static networkPlayerIsCheater(): boolean {
    return NetworkPlayerIsCheater();
  }

  static networkSetPlayerIsPassive(toggle: boolean): void {
    NetworkSetPlayerIsPassive(toggle);
  }

  static setLocalPlayerInvisibleLocally(p0: boolean): void {
    SetLocalPlayerInvisibleLocally(p0);
  }

  static setLocalPlayerVisibleLocally(p0: boolean): void {
    SetLocalPlayerVisibleLocally(p0);
  }

  static networkGetAverageLatencyForPlayer(player: number): number {
    return NetworkGetAverageLatencyForPlayer(player);
  }

  static networkGetAverageLatencyForPlayer_2(player: number): number {
    return NetworkGetAverageLatencyForPlayer_2(player);
  }

  static networkGetAveragePacketLossForPlayer(player: number): number {
    return NetworkGetAveragePacketLossForPlayer(player);
  }

  static networkAmIBlockedByPlayer(player: number): boolean {
    return NetworkAmIBlockedByPlayer(player);
  }

  static networkAmIMutedByPlayer(player: number): boolean {
    return NetworkAmIMutedByPlayer(player);
  }

  static networkConcealPlayer(player: number, toggle: boolean, bAllowDamagingWhileConcealed: boolean): void {
    NetworkConcealPlayer(player, toggle, bAllowDamagingWhileConcealed);
  }

  static networkDisableInvincibleFlashing(player: number, toggle: boolean): void {
    NetworkDisableInvincibleFlashing(player, toggle);
  }

  static networkGetTalkerProximity(): number {
    return NetworkGetTalkerProximity();
  }

  static networkHasHeadset(): boolean {
    return NetworkHasHeadset();
  }

  static networkIsCableConnected(): boolean {
    return NetworkIsCableConnected();
  }

  static networkIsLocalTalking(): boolean {
    return NetworkIsLocalTalking();
  }

  static networkIsTextChatActive(): boolean {
    return NetworkIsTextChatActive();
  }

  static networkSetTalkerProximity(value: number): void {
    NetworkSetTalkerProximity(value);
  }

  static networkSetTeamOnlyChat(toggle: boolean): void {
    NetworkSetTeamOnlyChat(toggle);
  }

  static networkGetHostOfScript(scriptName: string, p1: number, p2: number): number {
    return NetworkGetHostOfScript(scriptName, p1, p2);
  }

  static networkGetHostOfThisScript(): number {
    return NetworkGetHostOfThisScript();
  }

  static networkGetNumConnectedPlayers(): number {
    return NetworkGetNumConnectedPlayers();
  }

  static networkGetNumParticipants(): number {
    return NetworkGetNumParticipants();
  }

  static networkGetTotalNumPlayers(): number {
    return NetworkGetTotalNumPlayers();
  }

  static networkIsGameInProgress(): boolean {
    return NetworkIsGameInProgress();
  }

  static networkIsHost(): boolean {
    return NetworkIsHost();
  }

  static networkIsHostOfThisScript(): boolean {
    return NetworkIsHostOfThisScript();
  }

  static networkIsSessionActive(): boolean {
    return NetworkIsSessionActive();
  }

  static networkIsSessionStarted(): boolean {
    return NetworkIsSessionStarted();
  }

  static networkGetGlobalMultiplayerClock(): [number, number, number] {
    return NetworkGetGlobalMultiplayerClock();
  }

  static networkGetRandomInt(): number {
    return NetworkGetRandomInt();
  }

  static networkGetRandomIntRanged(rangeStart: number, rangeEnd: number): number {
    return NetworkGetRandomIntRanged(rangeStart, rangeEnd);
  }

  static networkOverrideClockMillisecondsPerGameMinute(ms: number): void {
    NetworkOverrideClockMillisecondsPerGameMinute(ms);
  }

  static networkSeedRandomNumberGenerator(seed: number): void {
    NetworkSeedRandomNumberGenerator(seed);
  }

  static canRegisterMissionEntities(ped_amt: number, vehicle_amt: number, object_amt: number, pickup_amt: number): boolean {
    return CanRegisterMissionEntities(ped_amt, vehicle_amt, object_amt, pickup_amt);
  }

  static canRegisterMissionObjects(amount: number): boolean {
    return CanRegisterMissionObjects(amount);
  }

  static canRegisterMissionPeds(amount: number): boolean {
    return CanRegisterMissionPeds(amount);
  }

  static canRegisterMissionPickups(amount: number): boolean {
    return CanRegisterMissionPickups(amount);
  }

  static canRegisterMissionVehicles(amount: number): boolean {
    return CanRegisterMissionVehicles(amount);
  }

  static get maxNumNetworkObjects(): number {
    return GetMaxNumNetworkObjects();
  }

  static get maxNumNetworkPeds(): number {
    return GetMaxNumNetworkPeds();
  }

  static get maxNumNetworkPickups(): number {
    return GetMaxNumNetworkPickups();
  }

  static get maxNumNetworkVehicles(): number {
    return GetMaxNumNetworkVehicles();
  }

  static getNumCreatedMissionObjects(p0: boolean): number {
    return GetNumCreatedMissionObjects(p0);
  }

  static getNumCreatedMissionPeds(p0: boolean): number {
    return GetNumCreatedMissionPeds(p0);
  }

  static getNumCreatedMissionVehicles(p0: boolean): number {
    return GetNumCreatedMissionVehicles(p0);
  }

  static getNumReservedMissionObjects(p0: boolean): number {
    return GetNumReservedMissionObjects(p0);
  }

  static getNumReservedMissionPeds(p0: boolean): number {
    return GetNumReservedMissionPeds(p0);
  }

  static getNumReservedMissionVehicles(p0: boolean): number {
    return GetNumReservedMissionVehicles(p0);
  }

  static reserveNetworkLocalObjects(amount: number): void {
    ReserveNetworkLocalObjects(amount);
  }

  static reserveNetworkLocalPeds(amount: number): void {
    ReserveNetworkLocalPeds(amount);
  }

  static reserveNetworkLocalVehicles(amount: number): void {
    ReserveNetworkLocalVehicles(amount);
  }

  static reserveNetworkMissionObjects(amount: number): void {
    ReserveNetworkMissionObjects(amount);
  }

  static reserveNetworkMissionPeds(amount: number): void {
    ReserveNetworkMissionPeds(amount);
  }

  static reserveNetworkMissionVehicles(amount: number): void {
    ReserveNetworkMissionVehicles(amount);
  }

  static networkIsActivitySpectator(): boolean {
    return NetworkIsActivitySpectator();
  }

  static networkIsActivitySpectatorFromHandle(newtorkHandle: number): [boolean, number] {
    return NetworkIsActivitySpectatorFromHandle(newtorkHandle);
  }

  static networkIsInSpectatorMode(): boolean {
    return NetworkIsInSpectatorMode();
  }

  static networkSetActivitySpectator(toggle: boolean): void {
    NetworkSetActivitySpectator(toggle);
  }

  static networkSetActivitySpectatorMax(maxSpectators: number): void {
    NetworkSetActivitySpectatorMax(maxSpectators);
  }

  static networkSetInSpectatorMode(toggle: boolean, playerPed: Ped): void {
    NetworkSetInSpectatorMode(toggle, playerPed.handle);
  }

  static networkSetInSpectatorModeExtended(toggle: boolean, playerPed: Ped, p2: boolean): void {
    NetworkSetInSpectatorModeExtended(toggle, playerPed.handle, p2);
  }

  static networkSetNoSpectatorChat(toggle: boolean): void {
    NetworkSetNoSpectatorChat(toggle);
  }

  static networkSetOverrideSpectatorMode(toggle: boolean): void {
    NetworkSetOverrideSpectatorMode(toggle);
  }

  static networkAreCutsceneEntities(): boolean {
    return NetworkAreCutsceneEntities();
  }

  static networkIsInMpCutscene(): boolean {
    return NetworkIsInMpCutscene();
  }

  static networkSetInMpCutscene(p0: boolean, p1: boolean): void {
    NetworkSetInMpCutscene(p0, p1);
  }

  static setLocalPlayerVisibleInCutscene(p0: boolean, p1: boolean): void {
    SetLocalPlayerVisibleInCutscene(p0, p1);
  }

  static setNetworkCutsceneEntities(toggle: boolean): void {
    SetNetworkCutsceneEntities(toggle);
  }

  static setNetworkIdVisibleInCutscene(netId: number, p1: boolean, p2: boolean): void {
    SetNetworkIdVisibleInCutscene(netId, p1, p2);
  }

  static networkAddSynchronisedSceneCamera(netScene: number, animDict: string, animName: string): void {
    NetworkAddSynchronisedSceneCamera(netScene, animDict, animName);
  }

  static networkCreateSynchronisedScene(
    coords: IVector3,
    rot: IVector3,
    rotationOrder: number,
    holdLastFrame: boolean,
    looped: boolean,
    phaseToStopScene: number,
    phaseToStartScene: number,
    animSpeed: number,
  ): number {
    return NetworkCreateSynchronisedScene(
      coords.x,
      coords.y,
      coords.z,
      rot.x,
      rot.y,
      rot.z,
      rotationOrder,
      holdLastFrame,
      looped,
      phaseToStopScene,
      phaseToStartScene,
      animSpeed,
    );
  }

  static networkForceLocalUseOfSyncedSceneCamera(sceneId: number): void {
    NetworkForceLocalUseOfSyncedSceneCamera(sceneId);
  }

  static networkStartSynchronisedScene(netScene: number): void {
    NetworkStartSynchronisedScene(netScene);
  }

  static networkStopSynchronisedScene(netScene: number): void {
    NetworkStopSynchronisedScene(netScene);
  }

  static isSphereVisibleToAnotherMachine(p0: number, p1: number, p2: number, p3: number): boolean {
    return IsSphereVisibleToAnotherMachine(p0, p1, p2, p3);
  }

  static isSphereVisibleToPlayer(p0: number, p1: number, p2: number, p3: number, p4: number): boolean {
    return IsSphereVisibleToPlayer(p0, p1, p2, p3, p4);
  }
  static networkFinishBroadcastingData(): void {
    NetworkFinishBroadcastingData();
  }

  static networkGetBackgroundLoadingRecipients(p0: number, p1: number): [boolean, number, number] {
    return NetworkGetBackgroundLoadingRecipients(p0, p1);
  }

  static networkGetInstanceIdOfThisScript(): number {
    return NetworkGetInstanceIdOfThisScript();
  }

  static networkGetNumScriptParticipants(p1: number, p2: number): [number, number] {
    return NetworkGetNumScriptParticipants(p1, p2);
  }

  static networkGetParticipantIndex(index: number): number {
    return NetworkGetParticipantIndex(index);
  }

  static networkGetThisScriptIsNetworkScript(): boolean {
    return NetworkGetThisScriptIsNetworkScript();
  }

  static networkHasReceivedHostBroadcastData(): boolean {
    return NetworkHasReceivedHostBroadcastData();
  }

  static networkIsParticipantActive(p0: number): boolean {
    return NetworkIsParticipantActive(p0);
  }

  static networkIsScriptActive(scriptName: string, player: number, p2: boolean, p3: number): boolean {
    return NetworkIsScriptActive(scriptName, player, p2, p3);
  }

  static networkIsScriptActiveByHash(scriptHash: number, p1: number, p2: boolean, p3: number): boolean {
    return NetworkIsScriptActiveByHash(scriptHash, p1, p2, p3);
  }

  static networkRegisterHostBroadcastVariables(numVars: number): number {
    return NetworkRegisterHostBroadcastVariables(numVars);
  }

  static networkRegisterPlayerBroadcastVariables(numVars: number): number {
    return NetworkRegisterPlayerBroadcastVariables(numVars);
  }

  static networkSetScriptReadyForEvents(toggle: boolean): void {
    NetworkSetScriptReadyForEvents(toggle);
  }

  static networkSetThisScriptIsNetworkScript(maxNumMissionParticipants: number, p1: boolean, instanceId: number): void {
    NetworkSetThisScriptIsNetworkScript(maxNumMissionParticipants, p1, instanceId);
  }

  static participantId(): number {
    return ParticipantId();
  }

  static participantIdToInt(): number {
    return ParticipantIdToInt();
  }
}
