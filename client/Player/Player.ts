import { Utils } from '../Utlis/Utils';
import { ePedFaceFeature, ePedVarComp, IPedClothes, IPedProperties, IWeaponOptions } from '../typings/Player';
import { JSONString } from '../typings/Unions';
import { IVector3 } from '../typings/Vector3';
import { playerClothDefaultConfiguration } from './config/cfg';

export class Player {
  private pedProperties: IPedProperties = {
    clothes: [],
    headBlendData: {},
    faceFeatures: [],
  };
  constructor(
    private playerId: number,
    private playerPedId: number,
  ) {
    console.log(`[WRAPPER] Attached playerId: ${playerId} | playerPedId: ${playerPedId} `);
    onNet('wrapper:executeSpawn', this.syncSpawn.bind(this));
    onNet('wrapper:changeModel', this.syncChangeModel.bind(this));
    onNet('wrapper:setCoords', this.syncCoordsChange.bind(this));
    onNet('wrapper:giveWeapon', this.syncGiveWeapon.bind(this));
    onNet('wrapper:removeWeapon', this.syncRemoveWeapon.bind(this));
    onNet('wrapper:removeAllWeapons', this.syncRemoveAllWeapons.bind(this));
    onNet('wrapper:setClothes', this.syncChangeClothes.bind(this));
  }

  async spawn(hashModel: string, coords: IVector3): Promise<boolean> {
    const hashNumber: number = GetHashKey(hashModel);
    const maxAttempts: number = 200;
    if (!IsEntityPositionFrozen(this.playerPedId)) {
      FreezeEntityPosition(this.playerPedId, true);
    }
    const playerActive: boolean = await Utils.waitUntil(() => NetworkIsPlayerActive(this.playerId), {
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
    SetPlayerModel(this.playerId, hashNumber);
    const newPlayerPedId = PlayerPedId();
    this.playerPedId = newPlayerPedId;
    NetworkResurrectLocalPlayer(coords.x, coords.y, coords.z, 0, 0, false);
    SetPedDefaultComponentVariation(this.playerPedId);

    ClearPedTasksImmediately(this.playerPedId);
    FreezeEntityPosition(this.playerPedId, true);

    SetEntityCoordsNoOffset(this.playerPedId, coords.x, coords.y, coords.z, true, true, true);
    RequestCollisionAtCoord(coords.x, coords.y, coords.z);

    const hasCollisionLoaded: boolean = await Utils.waitUntil(() => HasCollisionLoadedAroundEntity(this.playerPedId), {
      waitInterval: 100,
      maxAttempts,
      onTick: () => {
        RequestCollisionAtCoord(coords.x, coords.y, coords.z);
      },
    });

    // if (!hasCollisionLoaded) {
    //   console.error('Cannot load collisions around Entity');
    //   FreezeEntityPosition(this.playerPedId, false);
    //   return false;
    // }
    FreezeEntityPosition(this.playerPedId, false);

    SetModelAsNoLongerNeeded(hashNumber);
    ShutdownLoadingScreenNui();
    ShutdownLoadingScreen(); 
    return true;
  }
  async changeModel(newModel: string): Promise<boolean> {
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

    SetPlayerModel(this.playerId, hashKey);
    this.playerPedId = PlayerPedId();
    SetPedDefaultComponentVariation(this.playerPedId);
    SetModelAsNoLongerNeeded(hashKey);
    return true;
  }
  get currentPedId() {
    return this.playerPedId;
  }
  async setCoords(coords: IVector3): Promise<boolean> {
    const maxAttempts: number = 100;
    const wasEntityPositionFrozen: boolean = IsEntityPositionFrozen(this.playerPedId);

    SetEntityCoordsNoOffset(this.playerPedId, coords.x, coords.y, coords.z, true, true, true);
    if (!wasEntityPositionFrozen) {
      FreezeEntityPosition(this.playerPedId, true);
    }

    const isCollisionLoaded = await Utils.waitUntil(() => HasCollisionLoadedAroundEntity(this.playerPedId), {
      waitInterval: 50,
      maxAttempts,
      onTick: () => RequestCollisionAtCoord(coords.x, coords.y, coords.z),
    });

    if (!wasEntityPositionFrozen) {
      FreezeEntityPosition(this.playerPedId, false);
    }
    return isCollisionLoaded;
  }
  get coords() {
    const [x, y, z] = GetEntityCoords(this.playerPedId, true);
    return { x, y, z };
  }
  giveWeapon(hashNumber: number, ammo: number, options?: IWeaponOptions) {
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
    GiveWeaponToPed(this.playerPedId, hashNumber, ammo, options?.isHidden ?? false, options?.bForceInHand ?? false);
  }
  removeSpecifiedWeapon(hashNumber: number) {
    if (!hashNumber) {
      console.error('[removeSpecifiedWeapon]:hashNumber not provided');
      return;
    }
    if (typeof hashNumber !== 'number') {
      console.error('[removeSpecifiedWeapon]: hashNumber type can be only number');
      return;
    }
    RemoveWeaponFromPed(this.playerPedId, hashNumber);
  }
  removeAllWeapons() {
    RemoveAllPedWeapons(this.playerPedId, true);
  }
  setClothes(componentId: ePedVarComp, drawableId: number, textureId: number, paletteId: number) {
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
    SetPedComponentVariation(this.playerPedId, componentId, drawableId, textureId, paletteId);
  }
  getWornClothes(): IPedClothes[] | undefined {
    const payload: IPedClothes[] = [];
    for (let i = 0; i <= 11; i++) {
      const drawableId = GetPedDrawableVariation(this.playerPedId, i);
      const textureId = GetPedTextureVariation(this.playerPedId, i);
      const paletteId = GetPedPaletteVariation(this.playerPedId, i);
      payload.push({ componentId: i, drawableId, textureId, paletteId });
    }
    return payload;
  }
  removeSpecifiedClothes(componentId: number) {
    if (componentId === undefined) {
      console.error('[removeSpecifiedClothes]: componentId argument not provided');
      return;
    }
    if (typeof componentId !== 'number') {
      console.error('[removeSpecifiedClothes]: componentId can be only number');
      return;
    }
    const record = this.pedProperties.clothes.find((v) => v.componentId === componentId);
    if (!record) {
      console.error('[removeSpecifiedClothes]: Cannot remove specified cloth.');
      return;
    }
    record.drawableId = -1;
    SetPedComponentVariation(this.playerPedId, componentId, -1, record.textureId, record.paletteId);
  }
  getSpecifiedCloth(componentId: number): IPedClothes | undefined {
    if (componentId === undefined) {
      console.error('[getSpecifiedClot]: componentId is not provided');
      return;
    }
    const record = this.pedProperties.clothes.find((v) => v.componentId === componentId);
    return record ?? undefined;
  }
  getSavedClothes() {
    return this.pedProperties.clothes ?? [];
  }
  setHeadBlendData(shapeFirstID: number, shapeSecondID: number, shapeMix: number, skinMix: number) {
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
      this.playerPedId,
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
    this.pedProperties.headBlendData = {
      shapeFirstID,
      shapeSecondID,
      skinFirstID: shapeFirstID,
      skinSecondID: shapeSecondID,
      shapeMix,
      skinMix,
    };
  }
  getHeadBlendData() {
    return this.pedProperties.headBlendData;
  }
  setFaceFeatures(index: ePedFaceFeature, scale: number) {
    if (index === undefined || scale=== undefined) {
      console.error('[setFaceFeature]: One of these arguments are empty');
      return;
    }
    if (typeof index !== 'number' || typeof scale !== 'number') {
      console.error('[setFaceFeature]: Only number is acceptable for these arguments');
      return;
    }
    const headBlendData = Object.keys(this.pedProperties.headBlendData);
    if (headBlendData.length < 11) {
      console.error('[setFaceFeature]: You need headBlendData before setting face features!');
      return;
    }
    SetPedFaceFeature(this.playerPedId, index, scale);
  }
  getSpecifiedFaceFeature(index: number) {
    return GetPedFaceFeature(this.playerPedId, index);
  }
  getFaceFeatures() {
    return this.pedProperties.faceFeatures;
  }
  private async syncSpawn(data: JSONString) {
    try {
      const { model, coords }: { model: string; coords: IVector3 } = JSON.parse(data);
      await this.spawn(model, coords);
    } catch (error) {
      console.error('[syncSpawn]:Parsing model or coordinates error');
      return;
    }
  }
  private async syncChangeModel(data: JSONString) {
    try {
      const { newModel }: { newModel: string } = JSON.parse(data);
      await this.changeModel(newModel);
    } catch (error) {
      console.error('[syncChangeModel]:Parsing model error');
      return;
    }
  }
  private async syncCoordsChange(data: JSONString) {
    try {
      const { coords }: { coords: IVector3 } = JSON.parse(data);
      await this.setCoords(coords);
    } catch (error) {
      console.error('[syncCoordsChange]:Parsing coordinates error');
      return;
    }
  }
  private syncGiveWeapon(data: JSONString) {
    try {
      const { hashNumber, ammo, options } = JSON.parse(data);
      this.giveWeapon(hashNumber, ammo, options);
    } catch (error) {
      console.error('[syncGiveWeapon]: Parsing error');
      return;
    }
  }
  private syncRemoveWeapon(hashNumber: number) {
    if (!hashNumber || typeof hashNumber !== 'number') {
      console.error('[syncRemoveWeapon]: Argument error');
      return;
    }
    this.removeSpecifiedWeapon(hashNumber);
  }
  private syncRemoveAllWeapons() {
    this.removeAllWeapons();
  }
  private syncChangeClothes(data: JSONString) {
    try {
      const { componentId, drawableId, textureId, paletteId } = JSON.parse(data) as {
        componentId: ePedVarComp;
        drawableId: number;
        textureId: number;
        paletteId: number;
      };
      this.setClothes(componentId, drawableId, textureId, paletteId);
    } catch (error) {
      console.error('[syncGiveWeapon]: Parsing error');
      return;
    }
  }
}
