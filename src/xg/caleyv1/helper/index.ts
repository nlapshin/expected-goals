import { TShotType, ShotType } from '../../../shot/model';

export function xgPossibleShotTypes() {
  return [
    ShotType.RegularShot,
    ShotType.DribbleShot,
    ShotType.CrossAndHeaderShot,
    ShotType.CrossAndFeetShot,
    ShotType.HeaderShot,
  ];
}

export function xgWeight(shotType: TShotType) {
  if (shotType === ShotType.HeaderShot) {
    return { coef: 1.13, exp: -0.27 };
  } else if (shotType === ShotType.CrossAndHeaderShot) {
    return { coef: 0.65, exp: -0.21 };
  } else if (shotType === ShotType.CrossAndFeetShot) {
    return { coef: 0.97, exp: -0.19 };
  } else if (shotType === ShotType.DribbleShot) {
    return { coef: 1.11, exp: -0.1 };
  } else {
    return { coef: 0.85, exp: -0.13 };
  }
}
