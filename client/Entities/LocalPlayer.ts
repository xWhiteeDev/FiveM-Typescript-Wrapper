//Version 1.0
//It can't be ideal. It only needs to work actually.

import { IVector3 } from '../typings/Vector3';
import {
  IPedProperties,
  IWeaponOptions,
  ePedVarComp,
  IClothes,
  ePedFaceFeature,
  IFaceFeature,
  IPedHeadBlendData,
} from '../typings/Player';
import { JSONString } from '../typings/Unions';
import { eVehicleSeat } from '../typings/Vehicle';
import { Utils } from '../Utils/Utils';

export class LocalPlayer {
  private static pedProperties: IPedProperties = {
    clothes: new Map<number, IClothes>(),
    headBlendData: {},
    faceFeatures: new Map<number, IFaceFeature>(),
  };
  private static playerId: number;
  private static inited: boolean;
  static initEvents(): boolean {
    if (LocalPlayer.inited) {
      console.error('LocalPlayer is already inited!');
      return false;
    }
    LocalPlayer.playerId = PlayerId();
    onNet('wrapper:executeSpawn', LocalPlayer.syncSpawn.bind(LocalPlayer));
    onNet('wrapper:changeModel', LocalPlayer.syncChangeModel.bind(LocalPlayer));
    onNet('wrapper:setCoords', LocalPlayer.syncCoordsChange.bind(LocalPlayer));
    onNet('wrapper:giveWeapon', LocalPlayer.syncGiveWeapon.bind(LocalPlayer));
    onNet('wrapper:removeWeapon', LocalPlayer.syncRemoveWeapon.bind(LocalPlayer));
    onNet('wrapper:removeAllWeapons', LocalPlayer.syncRemoveAllWeapons.bind(LocalPlayer));
    onNet('wrapper:setClothes', LocalPlayer.syncChangeClothes.bind(LocalPlayer));
    onNet('wrapper:removeCloth', LocalPlayer.syncRemoveSpecifiedCloth.bind(LocalPlayer));
    onNet('wrapper:setHeadBlendData', LocalPlayer.syncSetHeadBlendData.bind(LocalPlayer));
    onNet('wrapper:setFaceFeatures', LocalPlayer.syncSetFaceFeatures.bind(LocalPlayer));
    onNet('wrapper:setHealth', LocalPlayer.setHealth.bind(LocalPlayer));
    onNet('wrapper:setMaxHealth', LocalPlayer.setMaxHealth.bind(LocalPlayer));
    LocalPlayer.inited = true;
    return true;
  }

  static async spawn(hashModel: string, coords: IVector3): Promise<boolean> {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    const hashNumber: number = GetHashKey(hashModel);
    const maxAttempts: number = 200;
    if (!IsEntityPositionFrozen(PlayerPedId())) {
      FreezeEntityPosition(PlayerPedId(), true);
    }
    const playerActive: boolean = await Utils.waitUntil(() => NetworkIsPlayerActive(LocalPlayer.playerId), {
      waitInterval: 150,
      maxAttempts: 50,
    });

    if (!playerActive) {
      console.error('Player did not become network active in time');
      return false;
    }

    if (!IsModelValid(hashNumber)) {
      console.error('Cannot load hash');
      return false;
    }
    const modelLoaded: boolean = await Utils.waitUntil(() => HasModelLoaded(hashNumber), {
      waitInterval: 30,
      maxAttempts,
      onTick: () => {
        RequestModel(hashNumber);
      },
    });

    if (!modelLoaded) {
      console.error('Cannot load ped model');
      SetModelAsNoLongerNeeded(hashNumber);
      return false;
    }
    SetPlayerModel(LocalPlayer.playerId, hashNumber);
    NetworkResurrectLocalPlayer(coords.x, coords.y, coords.z, 0, 0, false);
    SetPedDefaultComponentVariation(PlayerPedId());

    ClearPedTasksImmediately(PlayerPedId());
    FreezeEntityPosition(PlayerPedId(), true);

    SetEntityCoordsNoOffset(PlayerPedId(), coords.x, coords.y, coords.z, true, true, true);
    RequestCollisionAtCoord(coords.x, coords.y, coords.z);

    await Utils.waitUntil(() => HasCollisionLoadedAroundEntity(PlayerPedId()), {
      waitInterval: 100,
      maxAttempts,
      onTick: () => {
        RequestCollisionAtCoord(coords.x, coords.y, coords.z);
      },
    });
    FreezeEntityPosition(PlayerPedId(), false);

    SetModelAsNoLongerNeeded(hashNumber);
    ShutdownLoadingScreenNui();
    ShutdownLoadingScreen();
    emit('playerSpawned', coords);
    return true;
  }
  static async changeModel(newModel: string): Promise<boolean> {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    const maxAttempts: number = 100;
    const hashKey = GetHashKey(newModel);
    if (!IsModelValid(hashKey)) {
      console.error('Cannot load hash');
      return false;
    }
    const hasModelLoaded: boolean = await Utils.waitUntil(() => HasModelLoaded(hashKey), {
      waitInterval: 30,
      maxAttempts,
      onTick: () => RequestModel(hashKey),
    });

    if (!hasModelLoaded) {
      console.error('Cannot load ped model');
      SetModelAsNoLongerNeeded(hashKey);
      return false;
    }

    SetPlayerModel(LocalPlayer.playerId, hashKey);
    SetPedDefaultComponentVariation(PlayerPedId());
    SetModelAsNoLongerNeeded(hashKey);
    return true;
  }

  static setIntoVehicle(handle: number, seat: eVehicleSeat): boolean {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    const targetVehicleHash: number = GetEntityModel(handle);
    if (!targetVehicleHash) {
      console.error('[setIntoVehicle]: Vehicle handle not exist');
      return false;
    }
    const seatsCount = GetVehicleModelNumberOfSeats(targetVehicleHash);
    let availableSeat: number;
    if (seat > seatsCount) {
      availableSeat = -2;
    } else {
      availableSeat = seat;
    }
    if (GetPedInVehicleSeat(handle, availableSeat)) {
      return false;
    }
    SetPedIntoVehicle(PlayerPedId(), handle, seat);
    return true;
  }
  static async setCoords(coords: IVector3): Promise<boolean> {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    const maxAttempts: number = 100;
    const wasEntityPositionFrozen: boolean = IsEntityPositionFrozen(PlayerPedId());

    SetEntityCoordsNoOffset(PlayerPedId(), coords.x, coords.y, coords.z, true, true, true);
    if (!wasEntityPositionFrozen) {
      FreezeEntityPosition(PlayerPedId(), true);
    }

    await Utils.waitUntil(() => HasCollisionLoadedAroundEntity(PlayerPedId()), {
      waitInterval: 50,
      maxAttempts,
      onTick: () => RequestCollisionAtCoord(coords.x, coords.y, coords.z),
    });

    if (!wasEntityPositionFrozen) {
      FreezeEntityPosition(PlayerPedId(), false);
    }
    return true;
  }
  static get coords(): IVector3 | undefined {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return undefined;
    }
    const [x, y, z] = GetEntityCoords(PlayerPedId(), true);
    return { x, y, z };
  }
  static giveWeapon(hashNumber: number, ammo: number, options?: IWeaponOptions): boolean {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    if (!hashNumber) {
      console.error('[giveWeapon]:hashNumber not provided');
      return false;
    }
    if (ammo === undefined) {
      console.error('[giveWeapon]:ammo not provided');
      return false;
    }
    if (typeof hashNumber !== 'number') {
      console.error('[giveWeapon]: hashNumber type can be only number');
      return false;
    }
    if (typeof ammo !== 'number') {
      console.error('[giveWeapon]: Ammo type can be only number');
      return false;
    }
    GiveWeaponToPed(PlayerPedId(), hashNumber, ammo, options?.isHidden ?? false, options?.bForceInHand ?? false);
    return true;
  }
  static removeSpecifiedWeapon(hashNumber: number): boolean {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    if (!hashNumber) {
      console.error('[removeSpecifiedWeapon]:hashNumber not provided');
      return false;
    }
    if (typeof hashNumber !== 'number') {
      console.error('[removeSpecifiedWeapon]: hashNumber type can be only number');
      return false;
    }
    RemoveWeaponFromPed(PlayerPedId(), hashNumber);
    return true;
  }
  static removeAllWeapons(): boolean {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    RemoveAllPedWeapons(PlayerPedId(), true);
    return true;
  }
  static setClothes(componentId: ePedVarComp, drawableId: number, textureId: number, paletteId: number): boolean {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    if (componentId === undefined || drawableId === undefined || textureId === undefined || paletteId === undefined) {
      console.error('[setClothes]: One of arguments mismatch');
      return false;
    }
    if (
      typeof componentId !== 'number' ||
      typeof drawableId !== 'number' ||
      typeof textureId !== 'number' ||
      typeof paletteId !== 'number'
    ) {
      console.error('[setClothes] One of argument is not a number');
      return false;
    }
    const payload: IClothes = {
      componentId,
      drawableId,
      textureId,
      paletteId,
    };
    LocalPlayer.pedProperties.clothes.set(componentId, payload);
    SetPedComponentVariation(PlayerPedId(), payload.componentId, payload.drawableId, payload.textureId, payload.paletteId);
    return true;
  }
  static getGameClothes(): IClothes[] | undefined {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return undefined;
    }
    const payload: IClothes[] = [];
    for (let i = 0; i <= 11; i++) {
      const drawableId = GetPedDrawableVariation(PlayerPedId(), i);
      const textureId = GetPedTextureVariation(PlayerPedId(), i);
      const paletteId = GetPedPaletteVariation(PlayerPedId(), i);
      payload.push({ componentId: i, drawableId, textureId, paletteId });
    }
    return payload;
  }
  static removeSpecifiedClothes(componentId: number): boolean {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    if (componentId === undefined) {
      console.error('[removeSpecifiedClothes]: componentId argument not provided');
      return false;
    }
    if (typeof componentId !== 'number') {
      console.error('[removeSpecifiedClothes]: componentId can be only number');
      return false;
    }
    const record = LocalPlayer.pedProperties.clothes.get(componentId);
    if (!record) {
      console.error('[removeSpecifiedClothes]: Cannot remove specified cloth.');
      return false;
    }
    record.drawableId = -1;
    SetPedComponentVariation(PlayerPedId(), componentId, -1, record.textureId, record.paletteId);
    return true;
  }
  static getSavedCloth(componentId: number): IClothes | undefined {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return undefined;
    }
    if (componentId === undefined) {
      console.error('[getSavedCloth]: componentId is not provided');
      return undefined;
    }
    const record: IClothes | undefined = LocalPlayer.pedProperties.clothes.get(componentId);
    return record;
  }
  static getGameCloth(componentId: number): IClothes | undefined {
    if (!LocalPlayer.inited) {
      console.error('[getGameCloth] LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return undefined;
    }
    if (componentId === undefined) {
      console.error('[getGameCloth]: componentId is not provided');
      return undefined;
    }
    const [drawableId, textureId, paletteId] = [
      GetPedDrawableVariation(PlayerPedId(), componentId),
      GetPedTextureVariation(PlayerPedId(), componentId),
      GetPedPaletteVariation(PlayerPedId(), componentId),
    ];
    return { componentId, drawableId, textureId, paletteId };
  }
  static getSavedClothes(): IClothes[] | undefined {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return undefined;
    }
    const payload: IClothes[] = [];
    LocalPlayer.pedProperties.clothes.forEach((value) => payload.push(value));
    return payload;
  }
  static setHeadBlendData(shapeFirstID: number, shapeSecondID: number, shapeMix: number, skinMix: number): boolean {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    if (shapeFirstID === undefined || shapeSecondID === undefined || shapeMix === undefined || skinMix === undefined) {
      console.error('[setHeadBlendData]: One of those arguments are empty!');
      return false;
    }
    if (
      typeof shapeFirstID !== 'number' ||
      typeof shapeSecondID !== 'number' ||
      typeof skinMix !== 'number' ||
      typeof shapeMix !== 'number'
    ) {
      console.error('[setHeadBlendData]: One of those arguments are not a number!');
      return false;
    }
    SetPedHeadBlendData(
      PlayerPedId(),
      shapeFirstID,
      shapeSecondID,
      0,
      shapeFirstID,
      shapeSecondID,
      0,
      shapeMix,
      skinMix,
      0,
      true,
    );
    LocalPlayer.pedProperties.headBlendData = {
      shapeFirstID,
      shapeSecondID,
      skinFirstID: shapeFirstID,
      skinSecondID: shapeSecondID,
      shapeMix,
      skinMix,
    };
    return true;
  }
  static getHeadBlendData(): Partial<IPedHeadBlendData> | undefined {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return undefined;
    }
    return LocalPlayer.pedProperties.headBlendData;
  }
  static setFaceFeatures(index: ePedFaceFeature, scale: number): boolean {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    if (index === undefined || scale === undefined) {
      console.error('[setFaceFeature]: One of these arguments are empty');
      return false;
    }
    if (typeof index !== 'number' || typeof scale !== 'number') {
      console.error('[setFaceFeature]: Only number is acceptable for these arguments');
      return false;
    }
    const headBlendData = Object.keys(LocalPlayer.pedProperties.headBlendData);
    if (headBlendData.length < 11) {
      console.error('[setFaceFeature]: You need headBlendData before setting face features!');
      return false;
    }
    SetPedFaceFeature(PlayerPedId(), index, scale);
    LocalPlayer.pedProperties.faceFeatures.set(index, { index, scale });

    return true;
  }
  static getGameFaceFeature(index: number): number | undefined {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return undefined;
    }
    if (index === undefined) {
      console.error('[getGameFaceFeature]: index not provided!');
      return undefined;
    }
    return GetPedFaceFeature(PlayerPedId(), index);
  }
  static getSavedFaceFeature(index: number): IFaceFeature | undefined {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return undefined;
    }
    if (index === undefined) {
      console.error('[getSavedFaceFeature]: index not provided!');
      return undefined;
    }
    return LocalPlayer.pedProperties.faceFeatures.get(index);
  }
  static getSavedFaceFeatures(): IFaceFeature[] | undefined {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return undefined;
    }
    const payload: IFaceFeature[] = [];
    for (const v of LocalPlayer.pedProperties.faceFeatures.values()) {
      payload.push(v);
    }
    return payload;
  }
  static setHealth(value: number): boolean {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    if (value === undefined) {
      console.error('[setHealth]: value not provided!');
      return false;
    }
    SetEntityHealth(PlayerPedId(), value);
    return true;
  }
  static setMaxHealth(value: number): boolean {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    if (value === undefined) {
      console.error('[setHealth]: value not provided!');
      return false;
    }
    SetEntityMaxHealth(PlayerPedId(), value);
    return true;
  }

  //sync
  private static async syncSpawn(data: JSONString) {
    try {
      const { model, coords }: { model: string; coords: IVector3 } = JSON.parse(data);
      const result = await LocalPlayer.spawn(model, coords);
      emitNet('wrapper:result:sync:spawn', model, coords, result);
    } catch (error) {
      console.error('[syncSpawn]:Parsing model or coordinates error');
      return undefined;
    }
  }
  private static async syncChangeModel(data: JSONString) {
    try {
      const { newModel }: { newModel: string } = JSON.parse(data);
      const result = await LocalPlayer.changeModel(newModel);
      emitNet('wrapper:result:sync:model', newModel, result);
    } catch (error) {
      console.error('[syncChangeModel]:Parsing model error');
      emitNet('wrapper:result:sync:model', null, false);
      return undefined;
    }
  }
  private static async syncCoordsChange(data: JSONString) {
    try {
      const { coords }: { coords: IVector3 } = JSON.parse(data);
      const result = await LocalPlayer.setCoords(coords);
      emitNet('wrapper:result:sync:coords', coords, result);
      if (!result) {
        return;
      }
      emitNet('playerChangeCoords', coords);
    } catch (error) {
      console.error('[syncCoordsChange]:Parsing coordinates error');
      emitNet('wrapper:result:sync:coords', null, false);
      return undefined;
    }
  }
  private static syncGiveWeapon(data: JSONString) {
    try {
      const { hashNumber, ammo, options } = JSON.parse(data);
      const result = LocalPlayer.giveWeapon(hashNumber, ammo, options);
      emitNet('wrapper:result:sync:weapon', hashNumber, ammo, result, options);
    } catch (error) {
      console.error('[syncGiveWeapon]: Parsing error');
      emitNet('wrapper:result:sync:weapon', null, null, false, null);
      return undefined;
    }
  }
  private static syncRemoveWeapon(hashNumber: number) {
    if (!hashNumber || typeof hashNumber !== 'number') {
      console.error('[syncRemoveWeapon]: Argument error');
      emitNet('wrapper:result:sync:removeWeapon', hashNumber, false);
      return undefined;
    }
    const result = LocalPlayer.removeSpecifiedWeapon(hashNumber);
    emitNet('wrapper:result:sync:removeWeapon', hashNumber, result);
  }
  private static syncRemoveAllWeapons() {
    const result = LocalPlayer.removeAllWeapons();
    emitNet('wrapper:result:sync:removeAllWeapons', result);
  }
  private static syncChangeClothes(data: JSONString) {
    try {
      const { componentId, drawableId, textureId, paletteId } = JSON.parse(data) as {
        componentId: ePedVarComp;
        drawableId: number;
        textureId: number;
        paletteId: number;
      };
      const result = LocalPlayer.setClothes(componentId, drawableId, textureId, paletteId);
      emitNet('wrapper:result:sync:setClothes', JSON.stringify({ componentId, drawableId, textureId, paletteId }), result);
    } catch (error) {
      console.error('[syncGiveWeapon]: Parsing error');
      emitNet('wrapper:result:sync:setClothes', JSON.stringify({}), false);

      return undefined;
    }
  }
  private static syncRemoveSpecifiedCloth(componentId: number) {
    if (componentId === undefined) {
      console.error('[syncRemoveSpecifiedCloth]: componentId mismatch');
      emitNet('wrapper:result:sync:removeSpecifiedCloth', componentId, false);
      return undefined;
    }
    const result = LocalPlayer.removeSpecifiedClothes(componentId);
    emitNet('wrapper:result:sync:removeSpecifiedCloth', componentId, result);
  }
  private static syncSetHeadBlendData(data: JSONString) {
    try {
      const { shapeFirstID, shapeSecondID, shapeMix, skinMix } = JSON.parse(data) as {
        shapeFirstID: number;
        shapeSecondID: number;
        shapeMix: number;
        skinMix: number;
      };
      const result = LocalPlayer.setHeadBlendData(shapeFirstID, shapeSecondID, shapeMix, skinMix);
      emitNet('wrapper:result:sync:setHeadBlendData', data, result);
    } catch (error) {
      console.error('[syncSetHeadBlendData]: Parsing error');
      emitNet('wrapper:result:sync:setHeadBlendData', data, false);
      return undefined;
    }
  }
  private static syncSetFaceFeatures(data: JSONString) {
    try {
      const { index, scale } = JSON.parse(data) as { index: number; scale: number };
      const result = LocalPlayer.setFaceFeatures(index, scale);
      emitNet('wrapper:result:sync:setFaceFeatures', data, result);
    } catch (error) {
      console.error('[syncSetFaceFeatures]: Parsing error');
      emitNet('wrapper:result:sync:setFaceFeatures', data, false);
      return undefined;
    }
  }
}
