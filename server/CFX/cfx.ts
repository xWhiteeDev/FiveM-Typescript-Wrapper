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
}
