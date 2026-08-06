import { JSONString } from '../typings/Unions';

export class Web {
  private id: number = 0;
  constructor() {
    console.log(`External Web interface created with ID: ${this.id}`);
  }
  emitWeb(eventName: string, args?: unknown): void {
    if (!eventName) {
      console.error('[emitWeb]: eventName argument not provided!');
      return;
    }
    if (typeof eventName !== 'string') {
      console.error('[emitWeb]: eventName can be only string!');
      return;
    }
    if (args) {
      SendNUIMessage({ eventName, payload:args });
      return;
    }
    SendNUIMessage({ eventName });
  }
  addEventNUIListender(eventName: string, handler: (data: JSONString, callback: (args?:any) => void) => unknown): void {
    if (!eventName) {
      console.error('[addEventNUIListender]: eventName argument not provided! ');
      return;
    }
    if (typeof eventName !== 'string') {
      console.error('[addEventNUIListender]: eventName can be only string!');
      return;
    }
    if (!handler) {
      console.error('[addEventNUIListender]: handler argument not provided!');
      return;
    }
    RegisterNuiCallback(eventName, handler);
  }
}
