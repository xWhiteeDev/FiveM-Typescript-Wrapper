export class CFX {
  private constructor() {}
  static emitServer(eventName: string, args?: any) {
    if (!eventName) {
      console.error('[emitServer]: You dont provided any event name!');
      return;
    }
    if ((args && typeof args === 'object') || Array.isArray(args)) {
      args = JSON.stringify(args);
    }
    emitNet(eventName, args);
  }
  static addCrossEventListener(eventName: string, handler: Function) {
    if (!eventName || !handler) {
      console.error('[addCrossEventListener]: eventName or handler argument not provided');
      return;
    }
    onNet(eventName, (...args: any) => {
      handler(...args);
    });
  }
  static addEventListener(eventName: string, handler: Function) {
    if (!eventName || !handler) {
      console.error('[addEventListener]: eventName or handler argument not provided');
      return;
    }
    on(eventName, (...args: any) => {
      handler(...args);
    });
  }
}
