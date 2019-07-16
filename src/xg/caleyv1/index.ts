import { round } from 'mathjs';
import { get } from 'lodash';

import { TxG } from '../model';
import { IShot } from '../../shot/model';

const calcXg = (shot: IShot): TxG => {
  const distance = shot.distance;
  const type = get(shot, 'meta.type');

  const weight = getShotTypeWeight(type);
  const result = weight.coef * Math.exp(weight.exp * distance);

  console.log(`Distance: ${distance}; Type: ${type}; XG: ${result}`);

  return round(result, 2);
};

export default calcXg;

function getShotTypeWeight(type) {
  if (type === 'HeaderShot') {
    return { coef: 1.13, exp: -0.27 };
  } else if (type === 'CrossAndHeaderShot') {
    return { coef: 0.65, exp: -0.21 };
  } else if (type === 'CrossAndFeetShot') {
    return { coef: 0.97, exp: -0.19 };
  } else if (type === 'DribbleShot' || type === 'DribbleKeeperShot') {
    return { coef: 1.11, exp: -0.1 };
  } else {
    return { coef: 0.85, exp: -0.13 };
  }
}
