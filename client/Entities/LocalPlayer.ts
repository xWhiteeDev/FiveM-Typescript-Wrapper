//Version 1.0
//It can't be ideal. It only needs to work actually.

import { IPedProperties, IWeaponOptions, ePedVarComp, IPedClothes, ePedFaceFeature } from '../typings/Player';
import { JSONString } from '../typings/Unions';
import { IVector3 } from '../typings/Vector3';
import { eVehicleSeat } from '../typings/Vehicle';
import { Utils } from '../Utils/Utils';

export class LocalPlayer {
  private static pedProperties: IPedProperties = {
    clothes: [],
    headBlendData: {},
    faceFeatures: [],
  };
  private static playerId: number;
  private static inited: boolean;
  static initEvents() {
    if (LocalPlayer.inited) {
      console.error('LocalPlayer is already inited!');
      return;
    }
    LocalPlayer.playerId = PlayerId();
    onNet('wrapper:executeSpawn', LocalPlayer.syncSpawn.bind(Player));
    onNet('wrapper:changeModel', LocalPlayer.syncChangeModel.bind(Player));
    onNet('wrapper:setCoords', LocalPlayer.syncCoordsChange.bind(Player));
    onNet('wrapper:giveWeapon', LocalPlayer.syncGiveWeapon.bind(Player));
    onNet('wrapper:removeWeapon', LocalPlayer.syncRemoveWeapon.bind(Player));
    onNet('wrapper:removeAllWeapons', LocalPlayer.syncRemoveAllWeapons.bind(Player));
    onNet('wrapper:setClothes', LocalPlayer.syncChangeClothes.bind(Player));
    onNet('wrapper:removeCloth', LocalPlayer.syncRemoveSpecifiedCloth.bind(Player));
    onNet('wrapper:setHeadBlendData', LocalPlayer.syncSetHeadBlendData.bind(Player));
    onNet('wrapper:setFaceFeatures', LocalPlayer.syncSetFaceFeatures.bind(Player));
    onNet('wrapper:setHealth', LocalPlayer.setHealth.bind(Player));
    onNet('wrapper:setMaxHealth', LocalPlayer.setMaxHealth.bind(Player));
    LocalPlayer.inited = true;
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

    const hasCollisionLoaded: boolean = await Utils.waitUntil(() => HasCollisionLoadedAroundEntity(PlayerPedId()), {
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

  static setIntoVehicle(handle: number, seat: eVehicleSeat) {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    const targetVehicleHash: number = GetEntityModel(handle);
    if (!targetVehicleHash) {
      console.error('[setIntoVehicle]: Vehicle handle not exist');
      return;
    }
    const seatsCount = GetVehicleModelNumberOfSeats(targetVehicleHash);
    let availableSeat: number;
    if (seat > seatsCount) {
      availableSeat = -2;
    } else {
      availableSeat = seat;
    }
    if (GetPedInVehicleSeat(handle, availableSeat)) {
      return;
    }
    SetPedIntoVehicle(PlayerPedId(), handle, seat);
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

    const isCollisionLoaded = await Utils.waitUntil(() => HasCollisionLoadedAroundEntity(PlayerPedId()), {
      waitInterval: 50,
      maxAttempts,
      onTick: () => RequestCollisionAtCoord(coords.x, coords.y, coords.z),
    });

    if (!wasEntityPositionFrozen) {
      FreezeEntityPosition(PlayerPedId(), false);
    }
    return isCollisionLoaded;
  }
  static get coords() {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    const [x, y, z] = GetEntityCoords(PlayerPedId(), true);
    return { x, y, z };
  }
  static giveWeapon(hashNumber: number, ammo: number, options?: IWeaponOptions) {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    if (!hashNumber) {
      console.error('[giveWeapon]:hashNumber not provided');
      return;
    }
    if (!ammo) {
      console.error('[giveWeapon]:ammo not provided');
      return;
    }
    if (typeof hashNumber !== 'number') {
      console.error('[giveWeapon]: hashNumber type can be only number');
      return;
    }
    if (typeof ammo !== 'number') {
      console.error('[giveWeapon]: Ammo type can be only number');
      return;
    }
    GiveWeaponToPed(PlayerPedId(), hashNumber, ammo, options?.isHidden ?? false, options?.bForceInHand ?? false);
  }
  static removeSpecifiedWeapon(hashNumber: number) {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    if (!hashNumber) {
      console.error('[removeSpecifiedWeapon]:hashNumber not provided');
      return;
    }
    if (typeof hashNumber !== 'number') {
      console.error('[removeSpecifiedWeapon]: hashNumber type can be only number');
      return;
    }
    RemoveWeaponFromPed(PlayerPedId(), hashNumber);
  }
  static removeAllWeapons() {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    RemoveAllPedWeapons(PlayerPedId(), true);
  }
  static setClothes(componentId: ePedVarComp, drawableId: number, textureId: number, paletteId: number) {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return false;
    }
    if (componentId === undefined || drawableId === undefined || textureId === undefined || paletteId === undefined) {
      console.error('[setClothes]: One of arguments mismatch');
      return;
    }
    if (
      typeof componentId !== 'number' ||
      typeof drawableId !== 'number' ||
      typeof textureId !== 'number' ||
      typeof paletteId !== 'number'
    ) {
      console.error('[setClothes] One of argument is not a number');
      return;
    }
    SetPedComponentVariation(PlayerPedId(), componentId, drawableId, textureId, paletteId);
  }
  static getWornClothes(): IPedClothes[] | undefined {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return;
    }
    const payload: IPedClothes[] = [];
    for (let i = 0; i <= 11; i++) {
      const drawableId = GetPedDrawableVariation(PlayerPedId(), i);
      const textureId = GetPedTextureVariation(PlayerPedId(), i);
      const paletteId = GetPedPaletteVariation(PlayerPedId(), i);
      payload.push({ componentId: i, drawableId, textureId, paletteId });
    }
    return payload;
  }
  static removeSpecifiedClothes(componentId: number) {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return;
    }
    if (componentId === undefined) {
      console.error('[removeSpecifiedClothes]: componentId argument not provided');
      return;
    }
    if (typeof componentId !== 'number') {
      console.error('[removeSpecifiedClothes]: componentId can be only number');
      return;
    }
    const record = LocalPlayer.pedProperties.clothes.find((v) => v.componentId === componentId);
    if (!record) {
      console.error('[removeSpecifiedClothes]: Cannot remove specified cloth.');
      return;
    }
    record.drawableId = -1;
    SetPedComponentVariation(PlayerPedId(), componentId, -1, record.textureId, record.paletteId);
  }
  static getSpecifiedCloth(componentId: number): IPedClothes | undefined {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return;
    }
    if (componentId === undefined) {
      console.error('[getSpecifiedClot]: componentId is not provided');
      return;
    }
    const record = LocalPlayer.pedProperties.clothes.find((v) => v.componentId === componentId);
    return record ?? undefined;
  }
  getSavedClothes() {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return;
    }
    return LocalPlayer.pedProperties.clothes ?? [];
  }
  static setHeadBlendData(shapeFirstID: number, shapeSecondID: number, shapeMix: number, skinMix: number) {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return;
    }
    if (shapeFirstID === undefined || shapeSecondID === undefined || shapeMix === undefined || skinMix === undefined) {
      console.error('[setHeadBlendData]: One of those arguments are empty!');
      return;
    }
    if (
      typeof shapeFirstID !== 'number' ||
      typeof shapeSecondID !== 'number' ||
      typeof skinMix !== 'number' ||
      typeof shapeMix !== 'number'
    ) {
      console.error('[setHeadBlendData]: One of those arguments are not a number!');
      return;
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
  }
  static getHeadBlendData() {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return;
    }
    return LocalPlayer.pedProperties.headBlendData;
  }
  static setFaceFeatures(index: ePedFaceFeature, scale: number) {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return;
    }
    if (index === undefined || scale === undefined) {
      console.error('[setFaceFeature]: One of these arguments are empty');
      return;
    }
    if (typeof index !== 'number' || typeof scale !== 'number') {
      console.error('[setFaceFeature]: Only number is acceptable for these arguments');
      return;
    }
    const headBlendData = Object.keys(LocalPlayer.pedProperties.headBlendData);
    if (headBlendData.length < 11) {
      console.error('[setFaceFeature]: You need headBlendData before setting face features!');
      return;
    }
    SetPedFaceFeature(PlayerPedId(), index, scale);
  }
  static getSpecifiedFaceFeature(index: number) {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return;
    }
    if (index === undefined) {
      console.error('[getSpecifiedFaceFeature]: index not provided!');
      return;
    }
    return GetPedFaceFeature(PlayerPedId(), index);
  }
  static getFaceFeatures() {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return;
    }
    return LocalPlayer.pedProperties.faceFeatures;
  }
  static setHealth(value: number) {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return;
    }
    if (value === undefined) {
      console.error('[setHealth]: value not provided!');
      return;
    }
    SetEntityHealth(PlayerPedId(), value);
  }
  static setMaxHealth(value: number) {
    if (!LocalPlayer.inited) {
      console.error('LocalPlayer is not inited! Use LocalPlayer.initEvents()');
      return;
    }
    if (value === undefined) {
      console.error('[setHealth]: value not provided!');
      return;
    }
    SetEntityMaxHealth(PlayerPedId(), value);
  }
  private static async syncSpawn(data: JSONString) {
    try {
      const { model, coords }: { model: string; coords: IVector3 } = JSON.parse(data);
      await LocalPlayer.spawn(model, coords);
      emitNet('wrapper:result:sync:spawn', model, coords, true);
    } catch (error) {
      console.error('[syncSpawn]:Parsing model or coordinates error');
      return;
    }
  }
  private static async syncChangeModel(data: JSONString) {
    try {
      const { newModel }: { newModel: string } = JSON.parse(data);
      await LocalPlayer.changeModel(newModel);
      emitNet('wrapper:result:sync:model', newModel, true);
    } catch (error) {
      console.error('[syncChangeModel]:Parsing model error');
      emitNet('wrapper:result:sync:model', null, false);
      return;
    }
  }
  private static async syncCoordsChange(data: JSONString) {
    try {
      const { coords }: { coords: IVector3 } = JSON.parse(data);
      await LocalPlayer.setCoords(coords);
      emitNet('wrapper:result:sync:coords', coords, true);
      emitNet('playerChangeCoords', coords);
    } catch (error) {
      console.error('[syncCoordsChange]:Parsing coordinates error');
      emitNet('wrapper:result:sync:coords', null, false);
      return;
    }
  }
  private static syncGiveWeapon(data: JSONString) {
    try {
      const { hashNumber, ammo, options } = JSON.parse(data);
      LocalPlayer.giveWeapon(hashNumber, ammo, options);
      emitNet('wrapper:result:sync:weapon', hashNumber, ammo, true, options);
    } catch (error) {
      console.error('[syncGiveWeapon]: Parsing error');
      emitNet('wrapper:result:sync:weapon', null, null, false, null);
      return;
    }
  }
  private static syncRemoveWeapon(hashNumber: number) {
    if (!hashNumber || typeof hashNumber !== 'number') {
      console.error('[syncRemoveWeapon]: Argument error');
      emitNet('wrapper:result:sync:removeWeapon', hashNumber, false);

      return;
    }
    LocalPlayer.removeSpecifiedWeapon(hashNumber);
    emitNet('wrapper:result:sync:removeWeapon', hashNumber, true);
  }
  private static syncRemoveAllWeapons() {
    LocalPlayer.removeAllWeapons();
    emitNet('wrapper:result:sync:removeAllWeapons', true);
  }
  private static syncChangeClothes(data: JSONString) {
    try {
      const { componentId, drawableId, textureId, paletteId } = JSON.parse(data) as {
        componentId: ePedVarComp;
        drawableId: number;
        textureId: number;
        paletteId: number;
      };
      LocalPlayer.setClothes(componentId, drawableId, textureId, paletteId);
      emitNet('wrapper:result:sync:setClothes', JSON.stringify({ componentId, drawableId, textureId, paletteId }), true);
    } catch (error) {
      console.error('[syncGiveWeapon]: Parsing error');
      emitNet('wrapper:result:sync:setClothes', JSON.stringify({}), false);

      return;
    }
  }
  private static syncRemoveSpecifiedCloth(componentId: number) {
    if (!componentId) {
      console.error('[syncRemoveSpecifiedCloth]: componentId mismatch');
      emitNet('wrapper:result:sync:removeSpecifiedCloth', componentId, false);
      return;
    }
    LocalPlayer.removeSpecifiedClothes(componentId);
    emitNet('wrapper:result:sync:removeSpecifiedCloth', componentId, true);
  }
  private static syncSetHeadBlendData(data: JSONString) {
    try {
      const { shapeFirstID, shapeSecondID, shapeMix, skinMix } = JSON.parse(data) as {
        shapeFirstID: number;
        shapeSecondID: number;
        shapeMix: number;
        skinMix: number;
      };
      LocalPlayer.setHeadBlendData(shapeFirstID, shapeSecondID, shapeMix, skinMix);
      emitNet('wrapper:result:sync:setHeadBlendData', data, true);
    } catch (error) {
      console.error('[syncSetHeadBlendData]: Parsing error');
      emitNet('wrapper:result:sync:setHeadBlendData', data, false);
      return;
    }
  }
  private static syncSetFaceFeatures(data: JSONString) {
    try {
      const { index, scale } = JSON.parse(data) as { index: number; scale: number };
      LocalPlayer.setFaceFeatures(index, scale);
      emitNet('wrapper:result:sync:setFaceFeatures', data, true);
    } catch (error) {
      console.error('[syncSetFaceFeatures]: Parsing error');
      emitNet('wrapper:result:sync:setFaceFeatures', data, false);
      return;
    }
  }
}
