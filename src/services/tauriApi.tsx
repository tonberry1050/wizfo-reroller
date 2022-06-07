import { invoke, InvokeArgs } from '@tauri-apps/api/tauri';
import { names } from 'keycode';
import { TauriApiHandlerName } from "../@types";

function callTauriApi (handlerName: TauriApiHandlerName, arg?: InvokeArgs) {
  return invoke(handlerName, arg);
}

const keyLog = (msg: string, keyCode: number,) => {console.log(`${msg} "${names[keyCode]}"(${keyCode})`)};

/**
 * focus specified name window
 * @param windowName 
 * @returns 
 */
export function focusApi(windowName: string) {
  return callTauriApi('focus_window_handler', {windowName,});
}

/**
 * enter the key
 * 
 * please see MS official virtual-key code list
 * https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes
 * @param vKeyCode windows virtual-key code
 * @returns 
 */
export function enterKeyApi(keyCode: number) {
  keyLog('enter', keyCode);
  return callTauriApi('enter_key_handler', {keyCode,});
}

export function combinationKeyApi(keyCodes: number[]) {
  keyCodes.forEach((keyCode, i) => {keyLog(`combination${i}`, keyCode)});
  return callTauriApi('combination_key_handler', {keyCodes,});
}