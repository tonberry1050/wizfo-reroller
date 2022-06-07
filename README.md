# Reroll script of Wiz-FO with Tauri

## Description

Wizardry ５つの試練用にリロールを行うスクリプト、Electronより軽量なTauriを使ってWindowsで動作するGUI操作画面を作ってみたかった。
ビルド済みのzipファイルをダウンロードしてもらえばwindows11では動作することを確認してあります。
何かライセンス的な問題がありましたらご連絡ください。また動作の保証は致しません。

## How to use

1. ゲーム内config変更

    キャラ作成方法を"TYPE-A"にしてください。

2. スクリプト実行

    exeファイルを開いたら好みのキャラクターに設定してください。
    ゲームを起動した状態でリロールボタンを押すとタイトルから訓練所に進みBP割り振り画面まで自動的に進みます。
    フォーカスしているウィンドウにキーを自動で入力しているだけなので実行中は別ウィンドウをフォーカスしないでください。

## How to build

以下はソースコードを取得した場合

1. Tauriアプリのwatchビルド

    `npm run build`で全部ビルドする、Electron部分の変更があればここからやり直す

1. Reactページ部分のwatchビルド

    `npm run watch`でどこかで実行しておく。VSCodeならタスクの実行からもできる: `npm: watch`

1. Electronの起動テスト

    `npm start`でElectronウィンドウを起動する。再起動するとコードの変更が毎回反映される。
