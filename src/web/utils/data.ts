import { optionData } from "../../@types/controller";
import { aliment, JobTableType } from "../../@types/wiz5oReRoller";

export const sexOption: optionData[] = [
  { value: "male", label: "男性", },
  { value: "female", label: "女性", },
];
export const jobOption: optionData[] = [
  { value: "warrior", label: "戦士 ", },
  { value: "wizard", label: "魔法使い ", },
  { value: "cleric", label: "僧侶 ", },
  { value: "thief", label: "盗賊 ", },
  { value: "bishop", label: "司祭 ", },
  { value: "samurai", label: "侍 ", },
  { value: "lord", label: "君主 ", },
  { value: "ninja", label: "忍者 ", },
];
export const raceOption: optionData[] = [
  { value: "human", label: "人間", },
  { value: "elf", label: "エルフ", },
  { value: "dwarf", label: "ドワーフ", },
  { value: "gnome", label: "ノーム", },
  { value: "hobgoblin", label: "ホブゴブリン", },
];
export type alimentOption = (optionData & {value: aliment})[];
export const alimentOption: alimentOption = [
  { value: "good", label: "善", },
  { value: "neutral", label: "中立", },
  { value: "evil", label: "悪", },
];

export const jobTable: JobTableType = {
  "warrior": ["good", "neutral", "evil"],
  "wizard": ["good", "neutral", "evil"],
  "cleric": ["good", "evil"],
  "thief": ["neutral", "evil"],
  "bishop": ["good", "evil"],
  "samurai": ["good", "neutral"],
  "lord": ["good"],
  "ninja": ["evil"],
};