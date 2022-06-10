export type Aliment = 'good' | 'neutral' | 'evil';

export type JobTableType = { [key in string]: Aliment[] };
export type ParameterType = {
  jobs: string[],
  races: string[],
  aliments: Aliment[],
  sexes: string[],
};

export type CharacterType = {
  name: string,
  sex: string,
  race: string,
  job: string,
  aliment: Aliment,
};
