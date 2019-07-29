import { norm, round } from 'mathjs';

import {
  ICoord, ICoordLine,
  IShotPitchData, IAssistPitchData, IDribblePitchData,
} from './model';

import PitchCoord from './coord';

export default class Pitch {
  private roundCoef: number;
  private distanceCoef: number;
  private YARD: number = 0.9144;

  private coord: PitchCoord;

  constructor(options = { isYard: false, round: 2 }) {
    this.roundCoef = options.round ? options.round : 2;
    this.distanceCoef = options.isYard ? 1 : this.YARD;

    this.coord = new PitchCoord({ round: options.round });
  }

  public calcAngle(coord: ICoord): number {
    const { x, y } = coord;

    const leftX = this.coord.postCoord.left.x;
    const rightX = this.coord.postCoord.right.x;

    // center
    if ((leftX <= x) && (x <= rightX)) {
      return 1;
    }

    if (x < leftX) {
      return this.calcAngleHandler({ x: leftX - x, y });
    }

    return this.calcAngleHandler({ x: x - rightX, y });
  }

  public calcDistanceToPost(coord: ICoord): number {
    return this.calcDistanceBetweenCoord(coord, this.coord.postCoord.center);
  }

  public calcDistanceBetweenCoord(coord1: ICoord, coord2: ICoord, isYard = false): number {
    const xSub = coord1.x - coord2.x;
    const ySub = coord1.y - coord2.y;

    const distance = norm([xSub, ySub]) / this.distanceCoef;

    return this.round(distance);
  }

  public calcDistanceByCaley(coord: ICoord, headerOrCross: boolean = false): number {
    const { x, y } = coord;

    if (headerOrCross) {
      return this.calcDistanceToPost({ x, y });
    }

    return this.round(y / this.distanceCoef);
  }

  public calcShotDistance(coord: ICoord, headerOrCross: boolean = false): number {
    return this.calcDistanceByCaley(coord, headerOrCross);
  }

  public calcAssistDistance(assistCoord: ICoord): number {
    return this.calcDistanceToPost(assistCoord);
  }

  public calcDribbleDistance(dribbleCoord: ICoord, shotCoord: ICoord): number {
    const dribbleStart = dribbleCoord.y / this.distanceCoef;
    const shotStart = shotCoord.y / this.distanceCoef;

    const result = Math.abs(dribbleStart - shotStart / shotStart);

    return this.round(result);
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

  public prepareShotData(coord: ICoord, headerOrCross: boolean = false): IShotPitchData {
    const distance = this.calcShotDistance(coord, headerOrCross);
    const angle = this.calcAngle(coord);

    const distanceInverse = this.inverseDistance(distance);
    const angleInverse = this.inverseAngle(angle);

    return {
      distance,
      angle,
      distanceInverse,
      angleInverse,
    };
  }

  public prepareAssistData(coord: ICoordLine): IAssistPitchData {
    const distance = this.calcAssistDistance(coord.start);
    const angle = this.calcAngle(coord.start);

    const distanceInverse = this.inverseDistance(distance);
    const angleInverse = this.inverseAngle(angle);

    return {
      distance,
      angle,
      distanceInverse,
      angleInverse,
    };
  }

  public prepareDribbleData(coord: ICoordLine): IDribblePitchData {
    const distance = this.calcDribbleDistance(coord.start, coord.end);
    const distanceInverse = this.inverseDistance(distance);

    return {
      distance,
      distanceInverse,
    };
  }

  public inverseDistance(num: number) {
    return this.round(1 / num);
  }

  public inverseAngle(num: number) {
    return this.round(1 / num);
  }

  private calcAngleHandler(coord: ICoord) {
    const { x, y } = coord;

    return this.round(2 * Math.atan2(y, x) / Math.PI);
  }

  private round(value: number): number {
    return round(value, this.roundCoef);
  }
}
