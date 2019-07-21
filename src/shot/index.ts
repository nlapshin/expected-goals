import { get } from 'dotty';

import Pitch from '../pitch';

import { IShot, IShotFlat } from './model';

export default class Shot {
  private pitch: Pitch;

  constructor(options = { isYard: false, round: 2 }) {
    this.pitch = new Pitch({ isYard: options.isYard, round: options.round });
  }

  public flatShot(shot: IShot): IShotFlat {
    const shotType = get(shot, 'meta.type');
    const shotPart = get(shot, 'meta.part');
    const shotFollowing = get(shot, 'meta.following');
    const shotAttack = get(shot, 'meta.attack');

    let output: IShotFlat = {
      id: shot.id,
      relativeShots: shot.relativeShots,
      shotTime: shot.time,
      shotCoord: shot.coord,
      shotAngle: shot.angle,
      shotAngleInverse: shot.angleInverse,
      shotDistance: shot.distance,
      shotDistanceInverse: shot.distanceInverse,
      shotType,
      shotPart,
      shotFollowing,
      shotAttack,
      shotBigChance: get(shot, 'meta.bigChance'),
    };

    if (shotType) {
      output[`shotType${shotType}`] = true;
    }

    if (shotPart) {
      output[`shotPart${shotPart}`] = true;
    }

    if (shotFollowing) {
      output[`shotFollowing${shotFollowing}`] = true;
    }

    if (shotAttack) {
      output[`shotAttack${shotAttack}`] = true;
    }

    const assist = get(shot, 'meta.assist');

    if (assist) {
      const assistType = get(assist, 'meta.type');

      output = {
        ...output,
        ...{
          assistCoord: assist.coord,
          assistAngle: assist.angle,
          assistAngleInverse: assist.angleInverse,
          assistDistance: assist.distance,
          assistDistanceInverse: assist.distanceInverse,
          assistType,
          assistIntentional: get(assist,   'meta.intentional'),
          assistKeyPass: get(assist, 'meta.keyPass'),
        },
      };

      if (assistType) {
        output[`assistType${assistType}`] = true;
      }
    }

    const dribble = get(shot, 'meta.dribble');

    if (dribble) {
      output = {
        ...output,
        ...{
          dribbleCoord: dribble.coord,
          dribbleDistance: dribble.distance,
          dribbleDistanceInverse: dribble.distanceInverse,
        },
      };
    }

    return output;
  }

  public prepareShot(shot: IShot, byCaley = false): IShot {
    if (!shot.distance) {
      if (byCaley) {
        const headerOrCross = this.headerOrCross(shot);

        shot.distance = this.pitch.calcShotDistanceByCaley(shot.coord, headerOrCross);
      } else {
        shot.distance = this.pitch.calcDistance(shot.coord);
      }
    }

    if (!shot.distanceInverse) {
      shot.distanceInverse = this.pitch.inverseDistance(shot.distance);
    }

    if (!shot.angle) {
      shot.angle = this.pitch.calcAngle(shot.coord);
    }

    if (!shot.angleInverse) {
      shot.angleInverse = this.pitch.inverseAngle(shot.angle);
    }

    if (shot.meta && shot.meta.assist) {
      const assist = shot.meta.assist;

      if (!assist.distance) {
        assist.distance = this.pitch.calcDistance(assist.coord.start);
      }

      if (!assist.distanceInverse) {
        assist.distanceInverse = this.pitch.inverseDistance(assist.distance);
      }

      if (!assist.angle) {
        assist.angle = this.pitch.calcAngle(assist.coord.start);
      }

      if (!assist.angleInverse) {
        assist.angleInverse = this.pitch.inverseAngle(assist.angleInverse);
      }
    }

    if (shot.meta && shot.meta.dribble) {
      const dribble = shot.meta.dribble;

      if (!dribble.distance) {
        dribble.distance = this.pitch.calcDistance(dribble.coord);
      }

      if (!dribble.distanceInverse) {
        dribble.distanceInverse = this.pitch.inverseDistance(dribble.distance);
      }
    }

    return shot;
  }

  public headerOrCross(shot: IShot) {
    const type = shot.meta.type;

    return type === 'CrossAndHeaderShot' ||
      type === 'CrossAndFeetShot' ||
      type === 'HeaderShot';
  }
}
