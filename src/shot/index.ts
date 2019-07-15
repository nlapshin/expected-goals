import { get } from 'dotty';
import { round } from 'mathjs';

import { IShot, IShotFlat } from './model';

export default class Shot {
  public flatShot(shot: IShot): IShotFlat {
    let output: IShotFlat = {
      id: shot.id,
      relativeShots: shot.relativeShots,
      shotTime: shot.time,
      shotCoord: shot.coord,
      shotAngle: shot.angle,
      shotAngleInverse: this.inverseNumber(shot.angle),
      shotDistance: shot.distance,
      shotDistanceInverse: this.inverseNumber(shot.distance),
      shotType: get(shot, 'meta.type'),
      shotPart: get(shot, 'meta.part'),
      shotFollowing: get(shot, 'meta.following'),
      shotAttack: get(shot, 'meta.attack'),
      shotBigChance: get(shot, 'meta.bigChance'),
    };

    const assist = get(shot, 'meta.assist');

    if (assist) {
      output = {
        ...output,
        ...{
          assistCoord: assist.coord,
          assistAngle: assist.angle,
          assistAngleInverse: this.inverseNumber(assist.angle),
          assistDistance: assist.distance,
          assistDistanceInverse: this.inverseNumber(assist.distance),
          assistType: get(assist, 'meta.type'),
          assistKeyPass: get(assist, 'meta.keyPass') || false,
        },
      };
    }

    return output;
  }

  private inverseNumber(num: number) {
    return round(1 / num, 2);
  }
}
