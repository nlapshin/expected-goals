import { TxG, TxGs } from './model';

import Shot from '../shot';
const shotModule = new Shot();

const util = {
  xgByCaley(shot) {
    const flatShot = shotModule.flatShot(shot);
    const weights = this.xgWeightByCaley(flatShot.shotAttack);

    return this.calcXg(flatShot, weights);
  },

  xgWeightByCaley(shotAttack) {
    if (shotAttack === 'DribbleGoalkeeper') {
      return {
        general: -0.61,
        shotDistance: -0.09,
        shotDistanceInverse: 7.4,
        shotAngle: 1.04,
        shotBigChance: 1.1,
        shotDistanceInverse_shotAngleInverse: -3.2,
        shotFollowingError: 0.67,
      };
    }

    if (shotAttack === 'DirectFreeKick') {
      return {
        general: -3.84,
        shotDistance: -0.1,
        shotDistanceInverse: 98.7,
        shotAngleInverse: 3.54,
        shotDistanceInverse_shotAngleInverse: -91.1,
      };
    }

    if (shotAttack === 'CrossAndHeaderShot') {
      return {
        general: -2.88,
        shotDistance: -0.21,
        shotDistanceInverse: 7.4,
        shotAngle: 2.13,
        shotPartOtherBodyPart: -0.18,
        shotBigChance: 1.2,
        shotFollowingError: 1.1,
        shotFollowingCorner: -0.24,
        assistAngle: 0.46,
        assistDistanceInverse: 4.31,
        attackTypeFastbreak: 0.2,
        attackTypeSetPiece: 0.12,
      };
    }

    if (shotAttack === 'CrossAndFeetShot') {
      return {
        general: -2.8,
        shotDistance: -0.11,
        shotDistanceInverse: 3.52,
        shotAngle: 1.14,
        shotBigChance: 1.25,
        shotFollowingCorner: -0.12,
        shotFollowingError: 1.1,
        assistAngle: 0.59,
        assistDistanceInverse: 6.94,
        assistTypeAssistAcrossFace: 0.14,
        attackTypeFastbreak: 0.24,
      };
    }

    if (shotAttack === 'HeaderShot') {
      return {
        general: -3.85,
        shotDistance: -0.1,
        shotDistanceInverse: 2.56,
        shotAngle: 1.94,
        shotRebound: 0.7,
        shotPartOtherBodyPart: 1.14,
        shotBigChance: 1.3,
        shotFollowingError: 1.1,
        assistTypeThroughball: 0.51,
        attackTypeFastbreak: 0.44,
        attackTypeEstablishedPossession: 0.44,
      };
    }

    return {
      general: -3.19,
      shotDistance: -0.095,
      shotDistanceInverse: 3.18,
      shotAngle: 0.59,
      shotAngleInverse: 0.24,
      shotDistanceInverse_shotAngleInverse: -2.09,
      shotBigChance: 1.2,
      shotFollowingCorner: -0.18,
      shotFollowingError: 1.1,
      shotFollowingDribble: 0.39,
      shotRebound: 0.37,
      assistTypeThroughball: 0.45,
      assistTypeAssistAfterThroughball: 0.64,
      assistTypeAssistAcrossFace: 0.31,
      assistTypePullback: -0.15,
      assistAngle: 0.12,
      assistDistanceInverse: 2.18,
      attackTypeFastbreak: 0.23,
      attackTypeEstablishedPossession: 0.09,
      dribbleDistance: 0.14,
    };
  },

  calcXg(params, weights) {
    let xg = weights.general || 0;

    const weightParams = Object.keys(weights);

    weightParams.forEach((param) => {
      const value = param.split('_').reduce((res, name) => {
        let paramValue = params[name];

        if (typeof paramValue === 'boolean') {
          paramValue = paramValue === true ? 1 : 0;
        }

        if (!paramValue) {
          paramValue = 0;
        }

        return res * paramValue;
      }, 1);

      const weight = weights[param];

      xg += value * weight;
    });

    return xg;
  },

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
