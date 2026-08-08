//Version 1.0
//It can't be ideal. It only needs to work actually.
import type { Player } from '../Player/Player';
import { CFXServerEvents } from '../types/Events';
export class CFX {
  private static get:(src:string) => Player | undefined
  static init (getPlayer:(src:string)=>Player | undefined) {
    CFX.get = getPlayer
    console.log('CFX Initialized')
  }
  static addEventListener(eventName: CFXServerEvents , handler: (player: Player, args?: any) => void) {
    if (!eventName) {
      console.error('[addEventListener]: eventName is not provided!');
      return;
    }
    if (!handler) {
      console.error('[addEventListener]: Handler is not provided!');
      return;
    }
    onNet(eventName, (args: any) => {
      const src = source;
      const player = CFX.get(String(src));
      if (!player) {
        console.warn(`[${eventName}] Player dont have instance: ${source}`);
        return;
      }
      handler(player, args);
    });
  }
  static addPlayerSyncEventListener<T extends unknown[]>(eventName: string, handler: (player: Player, ...args: T) => void) {
    onNet(eventName, (...args: T) => {
      let src = source;
      const player = CFX.get(String(src));
      if (!player) {
        console.warn(`[${eventName}] Player dont have instance: ${source}`);
        return;
      }
      handler(player, ...args);
    });
  }
}
