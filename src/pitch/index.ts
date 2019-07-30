import {
  ICoord, ICoordLine,
  IShotPitchData, IAssistPitchData, IDribblePitchData,
} from './model';

import PitchCoord from './coord';
import PitchDistance from './distance';
import PitchAngle from './angle';

export default class Pitch {
  private coord: PitchCoord;
  private distance: PitchDistance;
  private angle: PitchAngle;

  constructor(options = { isYard: false, round: 2 }) {
    this.coord = new PitchCoord({ round: options.round });
    this.distance = new PitchDistance({ isYard: options.isYard, round: options.round });
    this.angle = new PitchAngle({ round: options.round });
  }

  public prepareShotData(coord: ICoord, headerOrCross: boolean = false): IShotPitchData {
    const distance = this.distance.calcShotDistance(coord, headerOrCross);
    const angle = this.angle.calcAngle(coord);

    const distanceInverse = this.distance.inverseDistance(distance);
    const angleInverse = this.angle.inverseAngle(angle);

    return {
      distance,
      angle,
      distanceInverse,
      angleInverse,
    };
  }

  public prepareAssistData(coord: ICoordLine): IAssistPitchData {
    const distance = this.distance.calcAssistDistance(coord);
    const angle = this.angle.calcAngleAssist(coord);

    const distanceInverse = this.distance.inverseDistance(distance);
    const angleInverse = this.angle.inverseAngle(angle);

    return {
      distance,
      angle,
      distanceInverse,
      angleInverse,
    };
  }

  public prepareDribbleData(dribbleCoord: ICoordLine, shotCoord: ICoord): IDribblePitchData {
    const distance = this.distance.calcDribbleDistance(dribbleCoord, shotCoord);
    const distanceInverse = this.distance.inverseDistance(distance);

    return {
      distance,
      distanceInverse,
    };
  }

  public checkPullback(coord: ICoordLine) {
    const { start, end } = coord;

    if (start.y > 6) {
      return false;
    }

    const xLeftBottom = this.coord.penaltyAreaCoord.leftBottom.x;
    const xRightBottom = this.coord.penaltyAreaCoord.rightBottom.x;

    if ((start.x < (xLeftBottom - 3)) || (start.x > (xRightBottom - 3))) {
      return false;
    }

    return this.coord.checkDangerZone(end);
  }
}
