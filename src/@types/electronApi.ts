import { CharacterType } from "./wiz5oReRoller";

declare global {
  interface Window {
    rerollApi: IRerollApi;
  }
}
export interface IRerollApi {
  send: (data: CharacterType) => Promise<void>;
}