import { codes } from 'keycode';
import { invoke } from '@tauri-apps/api';

declare module '*.svg' {
  const content: string;
  export default content;
}

declare global {
  interface Window {
    __TAURI__: {
      invoke: typeof invoke;
    };
  }
}

export type TauriApiHandlerName = [
  'focus_window_handler',
  'enter_key_handler',
  'combination_key_handler',
][number];

export type CodeMapKey = keyof typeof codes;
