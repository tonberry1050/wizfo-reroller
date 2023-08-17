import React from "react";
import { FC, ReactNode, useState } from "react";
import { getBaseWait, setBaseWait } from "utils/rerollService";

export default function ConfigForm() {

  const [waitValue, setWait] = useState(getBaseWait());
  const onChangeWait = (value: number) => {
    setWait(value);
    setBaseWait(value);
  };

  return (
    <div className="w-full">
      <ConfigItem labelName={`入力遅延(${waitValue})`} inputId="baseWait">
        <div className="flex">
          <input type="range" min="20" max="500" step="20"
            value={waitValue}
            onChange={event => {
              const value = Number(event.target.value);
              onChangeWait(value);
            }}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
          <button type="button"
            className="flex-none ml-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => onChangeWait(100)}
          >デフォルト</button>
        </div>
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
