import { optionData } from "../../@types/controller";

export const makeOption = (data: optionData) => <option value={data.value} key={data.key || data.value}>{data.label}</option>;