import logo from '../../images/logo.svg';
import { codes } from 'keycode';
import { WIZ_WINDOW_NAME } from '../../services/constants';
import { combinationKeyApi, enterKeyApi, focusApi } from '../../services/tauriApi';
import './App.css';

function App() {

  const reroll = async () => {
    const sleep = (ms: number) => {return new Promise(res => setTimeout(res, ms))};
    const inputKeys = async (keys: Array<keyof typeof codes | number>, ms: number) => {
      for (const key of keys) {
        await enterKeyApi(typeof key === 'number' ? key : codes[key]);
        await sleep(ms);
      };
    };
    await focusApi(WIZ_WINDOW_NAME);
    await sleep(400);
    await combinationKeyApi([codes['ctrl'], codes['f1']]);
    await sleep(400);
    await enterKeyApi(codes["enter"]); // after reset, cursor focuses 1st option "GAME START"
    await sleep(400);
    await inputKeys(['e', 't', 'm',], 400);
    const characterName = 'char1';
    const characterJob = codes['1'];
    const characterRace = codes['1'];
    const characterAliment = codes['1'];
    const characterSex = codes['1'];
    await inputKeys([...(characterName.split("") as any)], 100);
    await inputKeys(["enter", "enter", characterJob, characterRace, characterAliment, characterSex], 400);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button className="App-link" type="button" onClick={reroll}>
          <span>Call Rust API</span>
        </button>
      </header>
    </div>
  );
}

export default App;