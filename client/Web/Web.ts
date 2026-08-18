import { JSONString } from '../typings/Unions';
import {IVector2} from '../typings/Vector';

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
  addEventNUIListener(eventName: string, handler: (data: JSONString, callback: (args?:any) => void) => unknown): void {
    if (!eventName) {
      console.error('[addEventNUIListener]: eventName argument not provided! ');
      return;
    }
    if (typeof eventName !== 'string') {
      console.error('[addEventNUIListener]: eventName can be only string!');
      return;
    }
    if (!handler) {
      console.error('[addEventNUIListener]: handler argument not provided!');
      return;
    }
    RegisterNuiCallback(eventName, handler);
  }

  registerNuiCallbackType(callbackType: string): void {
    if (!callbackType) {
      console.error('[registerNuiCallbackType]: callbackType argument not provided!');
      return;
    }
    if (typeof callbackType !== 'string') {
      console.error('[registerNuiCallbackType]: callbackType can be only string!');
      return;
    }
    RegisterNuiCallbackType(callbackType);
  }

  registerRawNuiCallback(callbackType: string, callback: (data: JSONString, callback: (args?: any) => void) => unknown): void {
    if (!callbackType) {
      console.error('[registerRawNuiCallback]: callbackType argument not provided!');
      return;
    }
    if (typeof callbackType !== 'string') {
      console.error('[registerRawNuiCallback]: callbackType can be only string!');
      return;
    }
    if (!callback) {
      console.error('[registerRawNuiCallback]: callback argument not provided!');
      return;
    }
    RegisterRawNuiCallback(callbackType, callback);
  }

  unregisterRawNuiCallback(callbackType: string): void {
    if (!callbackType) {
      console.error('[unregisterRawNuiCallback]: callbackType argument not provided!');
      return;
    }
    if (typeof callbackType !== 'string') {
      console.error('[unregisterRawNuiCallback]: callbackType can be only string!');
      return;
    }
    UnregisterRawNuiCallback(callbackType);
  }

  setNuiFocus(hasFocus: boolean, hasCursor: boolean): void {
    if (typeof hasFocus !== 'boolean') {
      console.error('[setNuiFocus]: hasFocus can be only boolean!');
      return;
    }
    if (typeof hasCursor !== 'boolean') {
      console.error('[setNuiFocus]: hasCursor can be only boolean!');
      return;
    }
    SetNuiFocus(hasFocus, hasCursor);
  }

  setNuiFocusKeepInput(keepInput: boolean): void {
    if (typeof keepInput !== 'boolean') {
      console.error('[setNuiFocusKeepInput]: keepInput can be only boolean!');
      return;
    }
    SetNuiFocusKeepInput(keepInput);
  }

  isNuiFocused(): boolean {
    return IsNuiFocused();
  }

  isNuiFocusKeepingInput(): boolean {
    return IsNuiFocusKeepingInput();
  }

  setNuiZindex(zIndex: number): void {
    if (typeof zIndex !== 'number') {
      console.error('[setNuiZindex]: zIndex can be only number!');
      return;
    }
    SetNuiZindex(zIndex);
  }

  getNuiCursorPosition(): IVector2 {
    const [x, y] = GetNuiCursorPosition();
    return { x, y };
  }

  shutdownLoadingScreenNui(): void {
    ShutdownLoadingScreenNui();
  }

  /** @deprecated Non-functional per FiveM docs — use loadscreen_manual_shutdown in fxmanifest.lua instead. */
  setManualShutdownLoadingScreenNui(manualShutdown: boolean): void {
    if (typeof manualShutdown !== 'boolean') {
      console.error('[setManualShutdownLoadingScreenNui]: manualShutdown can be only boolean!');
      return;
    }
    SetManualShutdownLoadingScreenNui(manualShutdown);
  }
}