//Version 1.0
//It can't be ideal. It only needs to work actually.

import { CFX } from '../CFX/Cfx';
import {
  ePedFaceFeature,
  ePedVarComp,
  IPedClothes,
  IPedFaceFeature,
  IPlayerCurrentState,
  IPlayerPendingState,
  IProps,
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
    props: new Map(),
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
  getSavedClothes() {
    const clothes: IPedClothes[] = [];
    this.current.clothes.forEach((v, k) => {
      clothes.push(v);
    });
    return clothes;
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
    emitNet('wrapper:setFaceFeatures', this.source, JSON.stringify({ index, scale }));
  }
  getSpecifiedFaceFeature(index: number) {
    return this.current.faceFeatures.get(index);
  }
  getFaceFeatures() {
    const faceFeatures: IPedFaceFeature[] = [];
    this.current.faceFeatures.forEach((v) => faceFeatures.push(v));
    return faceFeatures;
  }
  setProp(componentId: number, drawableId: number, textureId: number, attach: boolean) {
    SetPedPropIndex(GetPlayerPed(this.source), componentId, drawableId, textureId, attach);
    this.current.props.set(componentId, { componentId, drawableId, textureId, attach });
  }
  clearProp(componentId: number) {
    ClearPedProp(GetPlayerPed(this.source), componentId);
    this.current.props.delete(componentId);
  }
  getProp(propId:number):IProps | undefined {
    return this.current.props.get(propId)
  }
  get armour() {
    return GetPedArmour(GetPlayerPed(this.source));
  }
  get currentWeapon() {
    return GetCurrentPedWeapon(GetPlayerPed(this.source));
  }
  get health() {
    return GetEntityHealth(GetPlayerPed(this.source));
  }
  get maxHealth() {
    return GetPedMaxHealth(GetPlayerPed(this.source));
  }
  static get(source: string): Player | undefined {
    return Player.instances.get(source);
  }

  //Sync Methods
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
  static handleSyncWeaponRemoval(player: Player, hashNumber: number, success: boolean) {
    const pendingRemovalWeapon = player.pending.removableWeapons?.has(hashNumber);
    if (!pendingRemovalWeapon) return;
    if (success) {
      player.current.weapons.delete(hashNumber);
    } else {
      console.warn(`[handleSyncWeaponRemoval]:Player with src: ${player.source} tried to remove weapon but unsucessfully. `);
    }
    player.pending.removableWeapons?.delete(hashNumber);
  }
  static handleSyncAllWeaponsRemove(player: Player, success: boolean) {
    if (success) {
      player.current.weapons.clear();
    }
    player.pending.removableAllWeapons = false;
  }
  static handleSyncClothesChange(player: Player, data: string, success: boolean) {
    if (success) {
      try {
        const { componentId, drawableId, textureId, paletteId } = JSON.parse(data) as {
          componentId: ePedVarComp;
          drawableId: number;
          textureId: number;
          paletteId: number;
        };
        const expectedClothes = player.pending.clothes?.get(componentId);
        const isMatch =
          expectedClothes &&
          expectedClothes.componentId === componentId &&
          expectedClothes.drawableId === drawableId &&
          expectedClothes.textureId === textureId &&
          expectedClothes.paletteId === paletteId;
        if (isMatch) {
          player.current.clothes.set(componentId, { componentId, drawableId, textureId, paletteId });
        } else {
          console.warn(
            `[handleSyncClothesChange]:Player with src: ${player.source} tried to change other clothes than expected!`,
          );
        }
      } catch (error) {
        console.warn(`[handleSyncClothesChange]:Player with src: ${player.source} parsing error`);
      }
    } else {
      console.warn(`[handleSyncClothesChange]:Player with src: ${player.source} clothes change failed`);
    }
    player.pending.clothes?.clear();
  }
  static handleSyncSpecifiedClothesRemoval(player: Player, componentId: number, success: boolean) {
    const pendingRemovalAction = player.pending.removedClothesComponentId === componentId;
    if (pendingRemovalAction && success) {
      const record = player.current.clothes.get(componentId);
      if (!record) {
        console.warn(
          `[handleSyncSpecifiedClothesRemoval]:Player with src: ${player.source} tried to remove cloth but record not found!`,
        );
        return;
      }
      player.current.clothes.set(componentId, {
        componentId,
        drawableId: -1,
        textureId: record.textureId,
        paletteId: record.paletteId,
      });
    } else {
      console.warn(
        `[handleSyncSpecifiedClothesRemoval]:Player with src: ${player.source} tried to remove cloth operation failed or expected not match with current`,
      );
    }
    player.pending.removedClothesComponentId = undefined;
  }

  static handleSyncSetHeadBlendData(player: Player, data: string, success: boolean) {
    if (success) {
      const expectedHeadBlendData = player.pending.headBlendData;
      try {
        const providedHeadBlendData = JSON.parse(data) as {
          shapeFirstID: number;
          shapeSecondID: number;
          shapeMix: number;
          skinMix: number;
        };
        const isMatch =
          expectedHeadBlendData?.shapeFirstID === providedHeadBlendData.shapeFirstID &&
          expectedHeadBlendData.shapeSecondID === providedHeadBlendData.shapeSecondID &&
          expectedHeadBlendData.shapeMix === providedHeadBlendData.shapeMix &&
          expectedHeadBlendData.skinMix === providedHeadBlendData.skinMix;
        if (isMatch) {
          player.current.headBlendData = providedHeadBlendData;
        } else {
          console.warn(
            `[handleSyncSetHeadBlendData]:Player with src: ${player.source} tried to change head blend data but values not matching!`,
          );
        }
        player.pending.headBlendData = undefined;
      } catch (error) {
        console.warn(`[handleSyncSetHeadBlendData]:Player with src: ${player.source} parsing json error. `);
      }
    } else {
      console.warn(`[handleSyncSetHeadBlendData]:Player with src: ${player.source} failed change head blend data. `);
    }
  }
  static handleSyncSetFaceFeature(player: Player, data: string, success: boolean) {
    if (success && data) {
      try {
        const { index, scale } = JSON.parse(data) as { index: number; scale: number };
        const expectedFaceFeature = player.pending.faceFeatures?.get(index);
        if (!expectedFaceFeature) {
          console.warn(
            `[handleSyncSetFaceFeature]:Player with src: ${player.source} tried to apply face features but record not found!`,
          );
          player.pending.faceFeatures?.clear();
          return;
        }
        if (scale === expectedFaceFeature.scale) {
          player.current.faceFeatures.set(index, { index, scale });
        } else {
          console.warn(
            `[handleSyncSetFaceFeature]:Player with src: ${player.source} tried to apply face features with different scale`,
          );
        }
        player.pending.faceFeatures?.clear();
      } catch (error) {
        console.warn(`[handleSyncSetFaceFeature]:Player with src: ${player.source} parsing json error. `);
      }
    }
  }
}

CFX.addPlayerSyncEventListener('wrapper:result:sync:model', Player.handleSyncModelChange);
CFX.addPlayerSyncEventListener('wrapper:result:sync:coords', Player.handleSyncCoordsChange);
CFX.addPlayerSyncEventListener('wrapper:result:sync:weapon', Player.handleSyncWeaponChange);
CFX.addPlayerSyncEventListener('wrapper:result:sync:removeWeapon', Player.handleSyncWeaponRemoval);
CFX.addPlayerSyncEventListener('wrapper:result:sync:removeAllWeapons', Player.handleSyncAllWeaponsRemove);
CFX.addPlayerSyncEventListener('wrapper:result:sync:setClothes', Player.handleSyncClothesChange);
CFX.addPlayerSyncEventListener('wrapper:result:sync:removeSpecifiedCloth', Player.handleSyncSpecifiedClothesRemoval);
CFX.addPlayerSyncEventListener('wrapper:result:sync:setHeadBlendData', Player.handleSyncSetHeadBlendData);
CFX.addPlayerSyncEventListener('wrapper:result:sync:setFaceFeatures', Player.handleSyncSetFaceFeature);
