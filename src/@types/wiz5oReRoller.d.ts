export type aliment = 'good' | 'neutral' | 'evil';

export type JobTableType = { [key in string]: aliment[] };
export type ParameterType = {
  jobs: string[],
  races: string[],
  aliments: aliment[],
  sexes: string[],
}
export type CharacterType = {
  name: string,
  sex: string,
  race: string,
  job: string,
  aliment: aliment,
};