import React from 'react';
import { OptionData } from '../@types/controller';

export const makeOption = (
  data: OptionData
) => <option value={data.value} key={data.key || data.value}>{data.label}</option>;
