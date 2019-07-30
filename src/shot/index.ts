import Pitch from '../pitch';

import { IShot, IShotFlat } from './model';

export default class Shot {
  private pitch: Pitch;

  constructor(options = { isYard: false, round: 2 }) {
    this.pitch = new Pitch({ isYard: options.isYard, round: options.round });
  }

  public flatShot(shot: IShot): IShotFlat {
    const shotType = shot.type;
    const shotPart = shot.part;
    const shotFollowing = shot.following;
    const shotAttack = shot.attack;

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
      shotBigChance: shot.bigChance,
      gameState: shot.gameState,
      league: shot.league,
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

    const assist = shot.assist;

    if (assist) {
      const assistType = assist.type;

      output = {
        ...output,
        ...{
          assistCoord: assist.coord,
          assistAngle: assist.angle,
          assistAngleInverse: assist.angleInverse,
          assistDistance: assist.distance,
          assistDistanceInverse: assist.distanceInverse,
          assistType,
          assistIntentional: assist.intentional,
          assistKeyPass: assist.keyPass,
        },
      };

      if (assistType) {
        output[`assistType${assistType}`] = true;
      }
    }

    const dribble = shot.dribble;

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
    const headerOrCross = this.headerOrCross(shot);

    shot = {
      ...shot,
      ...this.pitch.prepareShotData(shot.coord, headerOrCross),
    };

    if (shot.assist) {
      shot.assist = {
        ...shot.assist,
        ...this.pitch.prepareAssistData(shot.assist.coord),
      };
    }

    if (shot.dribble) {
      shot.dribble = {
        ...shot.dribble,
        ...this.pitch.prepareDribbleData(shot.dribble.coord, shot.coord),
      };
    }

    return shot;
  }

  public headerOrCross(shot: IShot) {
    const type = shot.type;

    return type === 'CrossAndHeaderShot' ||
      type === 'CrossAndFeetShot' ||
      type === 'HeaderShot';
  }
}
