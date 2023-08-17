import diceImage from 'images/casino_FILL0_wght400_GRAD200_opsz24.svg';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { alimentOption, jobOption, jobTable, raceOption, sexOption } from 'utils/constants';
import { reroll } from 'utils/rerollService';
import { makeOption } from 'utils/viewService';
import { Aliment, CharacterType } from '../../@types/wiz5oReRoller';

export default function CharacterForm() {
  const [isRunning, setRunning] = useState<boolean>(false);
  const [job, setJob] = useState<string>(jobOption[0].value);
  let availableAlimentOption = jobTable[job].map((v) => alimentOption.find((o) => o.value === v));
  const isMatchedAliment = (aliment: Aliment) => jobTable[job].includes(aliment);

  const { register, getValues, setValue, formState: { errors }, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      name: 'character',
      sex: sexOption[0].value,
      race: raceOption[0].value,
      job,
      aliment: jobTable[job][0],
    }
  });

  useEffect(() => {
    availableAlimentOption = alimentOption.filter((o) => isMatchedAliment(o.value));
    if (!isMatchedAliment(getValues('aliment'))) {
      setValue('aliment', jobTable[job][0]);
    }
  });

  const alimentValidate = (alimentValue: string) => isMatchedAliment(alimentValue as Aliment) || '職業と性格が一致していません';

  const onSubmit = async (data: CharacterType, event?: BaseSyntheticEvent) => {
    event?.preventDefault();
    setRunning(true);
    await reroll(data);
    console.log('finished');
    setRunning(false);
  };
  const onError = (errors: unknown, event?: BaseSyntheticEvent) => {
    event?.preventDefault();
    console.error(errors);
  };

  return (
    <form className="w-full character-form-background" onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="pb-4">
        <div className="flex items-center py-2">
          <div className="flex-none w-1/5 px-2">
            <label htmlFor="name" className="block text-gray-500 sm:text-right">キャラクター名</label>
          </div>
          <div className="flex-1">
            <input type="text" id="name" placeholder="name"
              className="
              block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500
              px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              {...register('name', {
                required: '名前は必須です',
                pattern: {
                  value: /^\w+$/i,
                  message: '小文字半角英数のみ入力に対応しています、必要なら後でゲーム内で改名してください',
                }
              })}
            />
            {errors.name
              ? <p className="text-xs text-red-500">{errors.name.message}</p>
              : <p className="text-xs text-gray-600">※半角英数のみ入力に対応しています、必要なら後でゲーム内で改名してください</p>
            }
          </div>
        </div>
        <div className="flex items-center py-2">
          <div className="flex-none w-1/5 px-2">
            <label htmlFor="job" className="block text-gray-500 sm:text-right">職業</label>
          </div>
          <div className="flex-1 relative">
            <select className="
              block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500
              px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              {...register('job', { required: true })} onChange={(e) => setJob(e.target.value)}
            >
              {jobOption.map(makeOption)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>
        <div className="flex items-center py-2">
          <div className="flex-none w-1/5 px-2">
            <label htmlFor="race" className="block text-gray-500 sm:text-right">種族</label>
          </div>
          <div className="flex-1 relative">
            <select className="
              block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500
              px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              {...register('race', { required: true })}
            >
              {raceOption.map(makeOption)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>
        <div className="flex items-center py-2">
          <div className="flex-none w-1/5 px-2">
            <label htmlFor="aliment" className="block text-gray-500 sm:text-right">性格</label>
          </div>
          <div className="flex-1">
            <div className="relative">
              <select className="
                block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500
                px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                {...register('aliment', {
                  required: '性格は必須です',
                  validate: {
                    message: alimentValidate,
                  }
                })}
              >
                {availableAlimentOption.map((o) => makeOption(o as any))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
            {errors.aliment ?
              <p className="text-xs text-red-500">{errors.aliment.message}</p>
              : <p className="text-xs text-gray-600">※対応していない職業を選んだとき、選択内容が変わります</p>
            }
          </div>
        </div>
        <div className="flex items-center py-2">
          <div className="flex-none w-1/5 px-2">
            <label htmlFor="sex" className="block text-gray-500 sm:text-right">性別</label>
          </div>
          <div className="flex-1 relative">
            <select className="
              block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500
              px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              {...register('sex', { required: true })}
            >
              {sexOption.map(makeOption)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center py-2">
        <span className="flex-grow" />
        <div className="flex-grow-0 items-center text-center py-2">
          <button type="submit" disabled={isRunning}
            className="block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mb-6 rounded inline-flex items-center"
          >
            <img src={diceImage} alt="dice-icon" />
            <span>リロール</span>
          </button>
          {isRunning
            ? <p className="block">
              実行中です...wiz5o以外のウィンドウをクリックしないでください
            </p> :
            <p className="block">
              実行前にwiz5oを起動してください
            </p>
          }
        </div>
        <span className="flex-grow" />
      </div>
    </form>

  );
}
