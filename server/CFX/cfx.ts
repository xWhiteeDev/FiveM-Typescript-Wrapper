import { Player } from '../Player/Player';

export class CFX {
  private static currentEventExecutor: number;
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
    CFX.currentEventExecutor = source;
    onNet(eventName, (args: any) => {
      handler(CFX.currentEventExecutor, args);
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
      handler(player,...args)
    });
  }
}
