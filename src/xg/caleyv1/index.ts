import { round } from 'mathjs';
import { get } from 'lodash';

import { TxG } from '../model';
import { IShot } from '../../shot/model';

import { xgWeight } from './helper';

const calcXg = (shot: IShot): TxG => {
  const distance = shot.distance;
  const type = shot.type;

  const weight = xgWeight(type);
  const result = weight.coef * Math.exp(weight.exp * distance);

  console.log(`Type: ${type}; XG: ${result}`);

  return round(result, 2);
};

export default calcXg;
