import { round } from 'mathjs';

import { TxG } from './../model';
import { IShot } from '../../shot/model';
import { xgWeight, xgParamValue, expit } from './helper';

import Shot from '../../shot';
const shotModule = new Shot();

const calcXg = (shot: IShot): TxG => {
  const flatShot = shotModule.flatShot(shot);
  const type = flatShot.shotType;

  const weights = xgWeight(type);
  const result = calcXgHandler(flatShot, weights);

  console.log(`Type: ${type}; XG: ${result}`);

  return result;
};

export default calcXg;

function calcXgHandler(params, weights) {
  const weightParams = Object.keys(weights);

  const coeficients = weightParams.map((param) => {
    const weight = weights[param];
    const value = xgParamValue(param, params);
    const res = weight * value;

    return [ param, weight, value, res ];
  });

  coeficients.forEach(([param, weight, value, result]) => {
    if (result === 0) {
      return;
    }

    console.log(`${param}. Weight: ${weight}. Value: ${value}. Result: ${result}`);
  });

  const sum = coeficients.reduce((res, [, , , result]) => res + result, 0);
  const xg = expit(sum);

  return round(xg, 2);
}
