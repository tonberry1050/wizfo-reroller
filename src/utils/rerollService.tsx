import { codes } from 'keycode';
import { alimentOption, jobOption, raceOption, sexOption, WIZ_WINDOW_NAME } from './constants';
import { enterKeyApi, focusApi, combinationKeyApi } from './tauriApi';
import { CharacterType } from '../@types/wiz5oReRoller';
import { CodeMapKey } from '../@types';

let baseWait = ((defaultWait: number) => {
  const mem = Number(localStorage.getItem('BASE_WAIT') ?? defaultWait);
  return Number.isInteger(mem) ? mem : defaultWait;
})(100);
export const getBaseWait = () => { return baseWait; };
export const setBaseWait = (ms = 100) => {
  localStorage.setItem('BASE_WAIT', `${ms}`);
  return baseWait = ms;
};

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
const wait = (scale = 1) => sleep(baseWait * scale);


export const inputKeys = async (keys: Array<CodeMapKey | number>, waitScale = 1) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    if (typeof key === 'string') {
      if (/[A-Z]/.test(key)) {
        await combinationKeyApi([codes['shift'], codes[key.toLocaleLowerCase() as CodeMapKey]]);
      } else {
        await enterKeyApi(codes[key]);
      }
    } else {
      await enterKeyApi(key);
    }
    await wait(waitScale);
  }
};

export async function reroll(character: CharacterType) {
  const jobIndex = 1 + jobOption.findIndex((o) => o.value === character.job);
  const raceIndex = 1 + raceOption.findIndex((o) => o.value === character.race);
  const alimentIndex = 1 + alimentOption.findIndex((o) => o.value === character.aliment);
  const sexIndex = 1 + sexOption.findIndex((o) => o.value === character.sex);
  try {
    await focusApi(WIZ_WINDOW_NAME);
    await wait();
    await combinationKeyApi([codes['ctrl'], codes['f1']]);
    await wait(5);
    await enterKeyApi(codes['enter']); // after reset, cursor focuses 1st option "GAME START"
    await wait(5);
    await inputKeys(['e', 't', 'm'], 1);
    const characterName = character.name;
    const characterJob = codes[`${jobIndex}` as CodeMapKey];
    const characterRace = codes[`${raceIndex}` as CodeMapKey];
    const characterAliment = codes[`${alimentIndex}` as CodeMapKey];
    const characterSex = codes[`${sexIndex}` as CodeMapKey];
    await inputKeys([...(characterName.split('') as CodeMapKey[])]);
    await inputKeys(['enter', 'enter', characterJob, characterRace, characterAliment, characterSex], 4);
  } catch (e) {
    console.warn('failed reroll', JSON.stringify(e));
  }
}
