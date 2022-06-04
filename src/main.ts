import path from 'path';
import { BrowserWindow, app, ipcMain } from 'electron';
import { spawnSync } from 'child_process';
import { CharacterType } from './@types/wiz5oReRoller';
import { alimentOption, jobOption, raceOption, sexOption } from './web/utils/data';

const isDevelop = process.env.NODE_ENV === 'development';

app.commandLine.appendSwitch('lang', 'ja');

// BrowserWindow インスタンスを作成する関数
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 816,
    height: 624,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });
  
  if (isDevelop) {
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.setMenuBarVisibility(false);
  }
  mainWindow.loadFile('dist/index.html');
};

// アプリの起動イベント発火で上の関数を実行
app.whenReady().then(createWindow);

// すべてのウィンドウが閉じられたらアプリを終了する
app.once('window-all-closed', () => app.quit());

ipcMain.handle('reroll-macro', (event, character: CharacterType) => {
  console.log(character)
  const jobIndex = 1 + jobOption.findIndex(o => o.value === character.job);
  const raceIndex = 1 + raceOption.findIndex(o => o.value === character.race);
  const alimentIndex = 1 + alimentOption.findIndex(o => o.value === character.aliment);
  const sexIndex = 1 + sexOption.findIndex(o => o.value === character.sex);
  const srcDir = isDevelop ? __dirname : path.resolve(app.getPath('exe'), '../', 'resources');
  const child = spawnSync('cscript.exe', [path.resolve(srcDir, 'script', 'rerollMacro.vbs'), character.name, `${jobIndex}`, `${raceIndex}`, `${alimentIndex}`, `${sexIndex}`]);
  return child.status;
})