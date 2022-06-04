import { contextBridge, ipcRenderer } from 'electron';
import { CharacterType } from './@types/wiz5oReRoller';

contextBridge.exposeInMainWorld('rerollApi', {
  send: async (data: CharacterType) => {
    await ipcRenderer.invoke('reroll-macro', data);
  },
});