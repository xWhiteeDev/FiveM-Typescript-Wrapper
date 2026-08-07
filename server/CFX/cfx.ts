//Version 1.0 
//It can't be ideal. It only needs to work actually.
import { Player } from '../Player/Player';

export class CFX {
  private constructor() {}
  static addEventListener(eventName: string, handler: Function) {
    if (!eventName) {
      console.error('[addEventListener]: eventName is not provided!');
      return;
    }
    if (!handler) {
      console.error('[addEventListener]: Handler is not provided!');
      return;
    }
    onNet(eventName, (args: any) => {
      const src = source
      handler(src, args);
    });
  }
  static addPlayerSyncEventListener<T extends unknown[]>(eventName: string, handler: (player: Player, ...args: T) => void) {
    onNet(eventName, (...args: T) => {
      let src = source;
      const player = Player.get(String(src));
      if (!player) {
        console.warn(`[${eventName}] Player dont have instance: ${source}`);
        return;
      }
      handler(player, ...args);
    });
  }
}
