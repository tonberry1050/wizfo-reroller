import React from "react";
import { FC, ReactNode, useState } from "react";
import { getBaseWait, getNetworkWait, setBaseWait, setNetworkWait } from "utils/rerollService";

export default function ConfigForm() {

  const [waitValue, setWait] = useState(getBaseWait());
  const onChangeWait = (value: number) => {
    setWait(value);
    setBaseWait(value);
  };
  const [networkWaitValue, setNetworkWaitValue] = useState(getNetworkWait());
  const onChangeNetworkWait = (value: number) => {
    setNetworkWait(value);
    setNetworkWaitValue(value);
  };

  return (
    <div className="w-full">
    <ConfigItem labelName={`入力遅延(${waitValue}ms)`} inputId="baseWait">
      <div className="flex">
        <input type="range" min="20" max="500" step="20"
          value={waitValue}
          onChange={event => {
            const value = Number(event.target.value);
            onChangeWait(value);
          }}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
        <button type="button"
          className="flex-none ml-8 bg-transparent font-semibold py-2 px-4 border border-blue-500 rounded"
          onClick={() => onChangeWait(80)}
        >デフォルト</button>
      </div>
      <p className="w-full text-xs text-gray-600">※小さくするとリロールが早く、大きくすると動作が安定します</p>
    </ConfigItem>
    <ConfigItem labelName={`ネットワーク遅延(${networkWaitValue}s)`} inputId="networkWait">
      <div className="flex">
        <input type="range" min="0" max="10" step="1"
          value={networkWaitValue}
          onChange={event => {
            const value = Number(event.target.value);
            onChangeNetworkWait(value);
          }}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
      </div>
      <p className="w-full text-xs text-gray-600">※Steam版のタイトルページでネットワークによる遅延が発生するようになったのでその調整です</p>
      <p className="w-full text-xs text-gray-600">&emsp;2~5が目安ですが訓練所への遷移がうまく行かない場合に数を増やしてください</p>
    </ConfigItem>
    </div>
  );
}

const ConfigItem: FC<{
  labelName: string,
  inputId: string,
  children: ReactNode,
}> = ({labelName, inputId, children}) => {
  return (
    <div className="pb-4">
      <div className="flex items-center py-2">
        <div className="flex-none w-1/5 px-2">
          <label htmlFor={inputId} className="block text-gray-500 sm:text-right">{labelName}</label>
        </div>
        <div className="flex-1">
          {React.Children.map(children, child => {
            if (child instanceof HTMLInputElement) {
              child.id = inputId;
            }
            return child;
          })}
        </div>
      </div>
    </div>
  );
};
