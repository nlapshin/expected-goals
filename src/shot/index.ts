import { get } from 'dotty';
import { round } from 'mathjs';

import Pitch from '../pitch';
import { IShot, IShotFlat } from './model';

export default class Shot {
  private pitch: Pitch;

  constructor(options = { isYard: false }) {
    this.pitch = new Pitch({ isYard: options.isYard });
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
      shotAngleInverse: this.inverseNumber(shot.angle),
      shotDistance: shot.distance,
      shotDistanceInverse: this.inverseNumber(shot.distance),
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
          assistAngleInverse: this.inverseNumber(assist.angle),
          assistDistance: assist.distance,
          assistDistanceInverse: this.inverseNumber(assist.distance),
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

    if (!shot.angle) {
      shot.angle = this.pitch.calcAngle(shot.coord);
    }

    return shot;
  }

  public headerOrCross(shot: IShot) {
    const type = shot.meta.type;

    return type === 'CrossAndHeaderShot' ||
      type === 'CrossAndFeetShot' ||
      type === 'HeaderShot';
  }

  private inverseNumber(num: number) {
    return round(1 / num, 2);
  }
}
