import { round } from 'mathjs';

import { TxG } from './../model';
import { IShot } from '../../shot/model';
import { xgWeightByCaley, xgParamValue, expit } from './helper';

import Shot from '../../shot';
const shotModule = new Shot();

const calcXg = (shot: IShot): TxG => {
  const flatShot = shotModule.flatShot(shot);
  const type = flatShot.shotType;

  const weights = xgWeightByCaley(type);

  return calcXgHandler(flatShot, weights);
};

export default calcXg;

function calcXgHandler(params, weights) {
  const weightParams = Object.keys(weights);

  const coeficients = weightParams.map((param) => {
    const weight = weights[param];
    const value = xgParamValue(param, params);

    return [ param, weight, value ];
  });

  const sum = coeficients.reduce((res, [, weight, value]) => res + ( weight * value ), 0);
  const xg = expit(sum);

  return round(xg, 2);
}
