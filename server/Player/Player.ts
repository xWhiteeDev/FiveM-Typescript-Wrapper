import { CFX } from '../CFX/cfx';
import {
  ePedFaceFeature,
  ePedVarComp,
  IPedClothes,
  IPlayerCurrentState,
  IPlayerPendingState,
  IWeaponOptions,
} from '../types/Player';
import { IVector3 } from '../types/Vector3';

export class Player {
  private pending: Partial<IPlayerPendingState> = {};
  private current: IPlayerCurrentState = {
    weapons: new Map(),
    clothes: new Map(),
    headBlendData: {},
    faceFeatures: new Map(),
  };
  private static instances = new Map<string, Player>();

  constructor(private source: string) {
    console.log(`[Player] Player assigned to: ${this.source}`);
    Player.instances.set(this.source, this);
  }

  spawn(model: string, coords: IVector3) {
    if (!model || !coords) {
      console.error('[spawn]: Model or coords not provided');
      return;
    }
    emitNet('wrapper:executeSpawn', this.source, JSON.stringify({ model, coords }));
  }
  changeModel(newModel: string) {
    if (!newModel) {
      console.error('[changeModel]: Model not provided');
      return;
    }
    if (typeof newModel !== 'string') {
      console.error('[changeModel]: Model can be only string');
      return;
    }
    this.pending.model = newModel;
    emitNet('wrapper:changeModel', this.source, JSON.stringify({ newModel }));
  }
  setCoords(coords: IVector3) {
    if (!coords) {
      console.error('[setCoords]: coords not provided');
      return;
    }
    if (typeof coords !== 'object') {
      console.error('[setCoords]: Type of coords can be only an object');
      return;
    }
    if (!('x' in coords || 'y' in coords || 'z' in coords)) {
      console.error('[setCoords]: Some of coords parameters mismatch');
      return;
    }
    this.pending.coords = coords;
    emitNet('wrapper:setCoords', this.source, JSON.stringify({ coords }));
  }
  giveWeapon(hashNumber: number, ammo: number, options?: IWeaponOptions) {
    if (!hashNumber) {
      console.error('[giveWeapon]:hashNumber not provided');
      return;
    }
    if (ammo === undefined) {
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
    this.pending.weapons?.set(hashNumber, { hashNumber, ammo, options });
    emitNet('wrapper:giveWeapon', this.source, JSON.stringify({ hashNumber, ammo, options }));
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
    this.pending.removableWeapons = this.pending.removableWeapons ?? new Set();
    this.pending.removableWeapons.add(hashNumber);
    emitNet('wrapper:removeWeapon', this.source, hashNumber);
  }
  removeAllWeapons() {
    this.pending.removableAllWeapons = true;
    emitNet('wrapper:removeAllWeapons', this.source);
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
    this.pending.clothes?.set(componentId, { componentId, drawableId, textureId, paletteId });
    emitNet('wrapper:setClothes', this.source, JSON.stringify({ componentId, drawableId, textureId, paletteId }));
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
    this.pending.removedClothesComponentId = componentId;
    emitNet('wrapper:removeCloth', this.source, JSON.stringify({ componentId }));
  }
  getSpecifiedCloth(componentId: number): IPedClothes | undefined {
    if (componentId === undefined) {
      console.error('[getSpecifiedClot]: componentId is not provided');
      return;
    }
    return this.current.clothes.get(componentId);
  }
  getSavedClothes() {}
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
    this.pending.headBlendData = {
      shapeFirstID: shapeFirstID,
      shapeSecondID: shapeSecondID,
      skinFirstID: shapeFirstID,
      skinSecondID: shapeSecondID,
      shapeMix: shapeMix,
      skinMix: skinMix,
    };
    emitNet('wrapper:setHeadBlendData', this.source, JSON.stringify({ shapeFirstID, shapeSecondID, shapeMix, skinMix }));
  }
  getHeadBlendData() {
    return this.current.headBlendData;
  }
  setFaceFeatures(index: ePedFaceFeature, scale: number) {
    if (index === undefined || scale === undefined) {
      console.error('[setFaceFeature]: One of these arguments are empty');
      return;
    }
    if (typeof index !== 'number' || typeof scale !== 'number') {
      console.error('[setFaceFeature]: Only number is acceptable for these arguments');
      return;
    }
    this.pending.faceFeatures?.set(index, { index, scale });
    emitNet('wrapper:setFaceFeatures', this.source, JSON.stringify({ index, scale}));
  }
  getSpecifiedFaceFeature(index: number) {
    return this.current.faceFeatures.get(index);
  }
  getFaceFeatures() {}
  static get(source: string): Player | undefined {
    return Player.instances.get(source);
  }

  static handleSyncModelChange(player: Player, newModel: string, success: boolean) {
    if (success && player.pending.model === newModel) {
      player.current.model = newModel;
    } else if (!success) {
      console.warn(`[handleSyncModelChange]:Player with src: ${player.source} tried to change model but unsucessfully. `);
    }
    player.pending.model = undefined;
    return;
  }
  static handleSyncCoordsChange(player: Player, newCoords: IVector3, success: boolean) {
    const matches =
      player.pending.coords &&
      player.pending.coords.x === newCoords.x &&
      player.pending.coords.y === newCoords.y &&
      player.pending.coords.z === newCoords.z;
    if (success && matches) {
      player.current.coords = newCoords;
    } else if (!success) {
      console.warn(`[handleSyncCoordsChange]:Player with src: ${player.source} tried to change coords but unsucessfully. `);
    }
    player.pending.coords = undefined;
    return;
  }
  static handleSyncWeaponChange(player: Player, hashNumber: number, ammo: number, success: boolean, options?: IWeaponOptions) {
    const pendingWeapon = player.pending.weapons?.get(hashNumber);
    if (!pendingWeapon) return;
    const optionsMatch =
      pendingWeapon.options?.isHidden === options?.isHidden &&
      pendingWeapon.ammo === ammo &&
      pendingWeapon.options?.bForceInHand === options?.bForceInHand;
    if (success && optionsMatch) {
      player.current.weapons.set(hashNumber, { hashNumber, ammo, options });
    } else {
      console.warn(`[handleSyncWeaponChange]:Player with src: ${player.source} tried to change weapon but unsucessfully. `);
    }
    player.pending.weapons?.delete(hashNumber);
  }
}
CFX.addPlayerSyncEventListener('wrapper:result:sync:model', (player: Player, newModel: string, success: boolean) => {
  Player.handleSyncModelChange(player, newModel, success);
});
