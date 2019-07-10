import { TxG, TxGs } from './model';

const util = {
  additionXgsInAttack(xgs: TxGs): TxG {
    if (xgs.length === 1) {
      return xgs[0];
    }

    let result = 0;

    for (let i = 0; i < xgs.length; i++) {
      let xg = xgs[i];

      for (let j = 0; j <= (i - 1); j++) {
        xg *= (1 - xgs[j]);
      }

      result += xg;
    }

    const output = +(result.toFixed(2));

    return output > 1 ? 1 : output;
  },
};

export default util;
