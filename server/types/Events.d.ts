import type { Player } from '../Entities/Player/Player';
import type { IWeaponOptions } from './Player';
import type { IVector3 } from './Vector3';

export type CFXServerEvents =
  | 'playerSpawned'
  | 'playerChangeModel'
  | 'playerChangeCoords'
  | 'playerChangeWeapon'
  | 'playerRemoveWeapon'
  | 'playerChangeClothes'
  | 'playerKicked';
export type CFXCrossEvents = 'playerReady';
export interface CFXServerEventsFunctions {
  playerChangeModel: (player: Player, oldModel: string, newModel: string) => void;
  playerChangeCoords: (player: Player, coords: IVector3) => void;
  playerChangeWeapon: (player: Player, hashNumber: number, ammo: number, weaponOptions: IWeaponOptions) => void;
  playerRemoveWeapon: (player: Player, hashNumber: number) => void;
  playerChangeClothes: (player: Player, componentId: number, drawableId: number, textureId: number, paletteId: number) => void;
  playerKicked: (player: Player, reason: string) => void;
  playerSpawned: (player: Player) => void;
}
