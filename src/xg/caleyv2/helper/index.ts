import {
  TShotType,
  ShotType, ShotPart, ShotFollowing,
  AttackType, AssistType,
} from '../../../shot/model';

export function xgPossibleShotParams(shotType: TShotType) {
  if (shotType === ShotType.DribbleKeeperShot) {
    return {
      distance: true,
      distanceInverse: true,
      angle: true,
      meta: {
        bitChance: true,
        following: [ ShotFollowing.Error ],
      },
    };
  }

  if (shotType === ShotType.DirectFreeKickShot) {
    return {
      distance: true,
      distanceInverse: true,
      angle: true,
    };
  }

  if (shotType === ShotType.CrossAndHeaderShot) {
    return {
      distance: true,
      distanceInverse: true,
      angle: true,
      meta: {
        bitChance: true,
        following: [ ShotFollowing.Error, ShotFollowing.Corner ],
        attack: [ AttackType.FastBreak, AttackType.SetPiece ],
        assist: {
          distance: true,
          angle: true,
        },
      },
    };
  }

  if (shotType === ShotType.CrossAndFeetShot) {
    return {
      distance: true,
      distanceInverse: true,
      angle: true,
      meta: {
        bitChance: true,
        following: [ ShotFollowing.Error, ShotFollowing.Corner ],
        attack: [ AttackType.FastBreak, AttackType.SetPiece ],
        assist: {
          distance: true,
          angle: true,
          type: [ AssistType.AssistAcrossFace ],
        },
      },
    };
  }

  if (shotType === ShotType.HeaderShot) {
    return {
      distance: true,
      distanceInverse: true,
      angle: true,
      meta: {
        bitChance: true,
        rebounse: true,
        part: [ ShotPart.OtherBodyPart ],
        following: [ ShotFollowing.Error ],
        attack: [ AttackType.FastBreak, AttackType.EstablishedPossession ],
        assist: {
          distance: true,
          angle: true,
          type: [ AssistType.Throughball ],
        },
      },
    };
  }

  return {
    distance: true,
    distanceInverse: true,
    angle: true,
    meta: {
      bitChance: true,
      rebound: true,
      following: [ ShotFollowing.Error, ShotFollowing.Corner, ShotFollowing.Dribble ],
      attack: [ AttackType.FastBreak, AttackType.EstablishedPossession ],
      assist: {
        distance: true,
        angle: true,
        type: [
          AssistType.Throughball, AssistType.AssistAfterThroughball,
          AssistType.AssistAcrossFace, AssistType.Pullback,
        ],
      },
      dribble: {
        distance: true,
      },
    },
  };
}

export function xgWeightByCaley(shotType: TShotType) {
  if (shotType === ShotType.DribbleKeeperShot) {
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

  if (shotType === ShotType.DirectFreeKickShot) {
    return {
      general: -3.84,
      shotDistance: -0.1,
      shotDistanceInverse: 98.7,
      shotAngleInverse: 3.54,
      shotDistanceInverse_shotAngleInverse: -91.1,
    };
  }

  if (shotType === ShotType.CrossAndHeaderShot) {
    return {
      general: -2.88,
      shotDistance: -0.21,
      shotAngle: 2.13,
      shotPartOtherBodyPart: -0.18,
      shotBigChance: 1.2,
      shotFollowingError: 1.1,
      shotFollowingCorner: -0.24,
      shotAttackFastbreak: 0.2,
      shotAttackSetPiece: 0.12,
      assistAngle: 0.46,
      assistDistanceInverse: 4.31,
    };
  }

  if (shotType === ShotType.CrossAndFeetShot) {
    return {
      general: -2.8,
      shotDistance: -0.11,
      shotDistanceInverse: 3.52,
      shotAngle: 1.14,
      shotBigChance: 1.25,
      shotFollowingCorner: -0.12,
      shotFollowingError: 1.1,
      shotAttackFastbreak: 0.24,
      assistAngle: 0.59,
      assistDistanceInverse: 6.94,
      assistTypeAssistAcrossFace: 0.14,
    };
  }

  if (shotType === ShotType.HeaderShot) {
    return {
      general: -3.85,
      shotDistance: -0.1,
      shotDistanceInverse: 2.56,
      shotAngle: 1.94,
      shotRebound: 0.7,
      shotPartOtherBodyPart: 1.14,
      shotBigChance: 1.3,
      shotFollowingError: 1.1,
      shotAttackFastbreak: 0.44,
      shotAttackEstablishedPossession: 0.44,
      assistTypeThroughball: 0.51,
    };
  }

  return {
    general: -3.19,
    shotDistance: -0.095,
    shotDistanceInverse: 3.18,
    shotAngle: 1.88,
    shotAngleInverse: 0.24,
    shotDistanceInverse_shotAngleInverse: -2.09,
    shotBigChance: 1.2,
    shotFollowingCorner: -0.18,
    shotFollowingError: 1.1,
    shotFollowingDribble: 0.39,
    shotRebound: 0.37,
    shotAttackFastbreak: 0.23,
    shotAttackEstablishedPossession: 0.09,
    assistTypeThroughball: 0.45,
    assistTypeAssistAfterThroughball: 0.64,
    assistTypeAssistAcrossFace: 0.31,
    assistTypePullback: -0.15,
    assistAngle: 0.12,
    assistDistanceInverse: 2.18,
    dribbleDistance: 0.14,
    gameStateSignification: 0.03,
  };
}

export function xgParamValue(param, params) {
  return param.split('_').reduce((res, name) => {
    let paramValue = params[name];

    if (name === 'general') {
      paramValue = 1;
    }

    if (typeof paramValue === 'boolean') {
      paramValue = paramValue === true ? 1 : 0;
    }

    if (!paramValue) {
      paramValue = 0;
    }

    return res * paramValue;
  }, 1);
}

export function expit(value) {
  return 1 / (1 + Math.exp(-value));
}
