import { isFinite, has } from 'lodash';
import { norm, round } from 'mathjs';

import {
  ICoord, ICoordOptions,
  IPostCoord, ICoordLine, ICoordArea,
  IShotPitchData, IAssistPitchData, IDribblePitchData,
} from './model';

export default class Pitch {
  private roundCoef: number;
  private distanceCoef: number;
  private YARD: number = 0.9144;

  private pitchSize: ICoord = {
    x: 68,
    y: 105,
  };

  private postCoord: IPostCoord = {
    left: { x: 30.34, y: 0 },
    right: { x: 37.66, y: 0 },
    center: { x: 34, y: 0 },
  };

  private penaltyAreaCoord: ICoordArea = {
    leftBottom: { x: 12.34, y: 0 },
    rightBottom: { x: 55.66, y: 0 },
    leftUpper: { x: 12.34, y: 18 },
    rightUpper: { x: 55.66, y: 18 },
  };

  private get dangerZoneCoord(): ICoordArea {
    return {
      leftBottom: { x: this.postCoord.left.x, y: 6 },
      rightBottom: { x: this.postCoord.right.x, y: 6 },
      leftUpper: { x: this.postCoord.left.x, y: this.penaltyAreaCoord.leftUpper.y },
      rightUpper: { x: this.postCoord.right.x, y: this.penaltyAreaCoord.rightUpper.y },
    };
  }

  constructor(options = { isYard: false, round: 2 }) {
    this.roundCoef = options.round ? options.round : 2;
    this.distanceCoef = options.isYard ? 1 : this.YARD;
  }

  public get maxCoord(): ICoord {
    return this.pitchSize;
  }

  public checkCoord(coord: ICoordOptions): boolean {
    if (has(coord, 'x') && !this.checkCoordHandler(coord.x, this.maxCoord.x)) {
      return false;
    }

    if (has(coord, 'y') && !this.checkCoordHandler(coord.y, this.maxCoord.y)) {
      return false;
    }

    return true;
  }

  public calcAngle(coord: ICoord): number {
    const { x, y } = coord;

    const leftX = this.postCoord.left.x;
    const rightX = this.postCoord.right.x;

    // center
    if ((leftX <= x) && (x <= rightX)) {
      return 1;
    }

    if (x < leftX) {
      return this.calcAngleHandler({ x: leftX - x, y });
    }

    return this.calcAngleHandler({ x: x - rightX, y });
  }

  public calcDistance(coord: ICoord): number {
    return this.calcDistanceBetweenCoord(coord, this.postCoord.center);
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
      return this.calcDistance({ x, y });
    }

    return this.round(y / this.distanceCoef);
  }

  public calcShotDistanceByCaley(coord: ICoord, headerOrCross: boolean = false): number {
    return this.calcDistanceByCaley(coord, headerOrCross);
  }

  public calcAssistDistanceByCaley(coord: ICoord, headerOrCross: boolean = false): number {
    return this.calcDistanceByCaley(coord, headerOrCross);
  }

  public calcDribbleDistanceByCaley(dribbleCoord: ICoord, shotCoord: ICoord): number {
    return this.calcDistanceBetweenCoord(dribbleCoord, shotCoord);
  }

  public checkArea(area: ICoordArea, coord: ICoord): boolean {
    const { x, y } = coord;

    const minx = area.leftBottom.x;
    const maxx = area.rightBottom.x;
    const miny = area.leftBottom.y;
    const maxy = area.leftUpper.y;

    if ((x < minx) || (x > maxx)) {
      return false;
    }

    if ((y < miny) || (y > maxy)) {
      return false;
    }

    return true;
  }

  public checkPullback(coord: ICoordLine) {
    const { start, end } = coord;

    if (start.y > 6) {
      return false;
    }

    const xLeftBottom = this.penaltyAreaCoord.leftBottom.x;
    const xRightBottom = this.penaltyAreaCoord.rightBottom.x;

    if ((start.x < (xLeftBottom - 3)) || (start.x > (xRightBottom - 3))) {
      return false;
    }

    return this.checkDangerZone(end);
  }

  public checkDangerZone(coord: ICoord) {
    return this.checkArea(this.dangerZoneCoord, coord);
  }

  public preparePitchData(coord: ICoord, byCaley: boolean = false, headerOrCross: boolean = false): IShotPitchData {
    const distance = byCaley ? this.calcShotDistanceByCaley(coord, headerOrCross) : this.calcDistance(coord);
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

  public prepareShotData(coord: ICoord, byCaley: boolean = false, headerOrCross: boolean = false): IShotPitchData {
    return this.preparePitchData(coord, byCaley, headerOrCross);
  }

  public prepareAssistData(coord: ICoordLine, byCaley: boolean = false, headerOrCross: boolean = false): IAssistPitchData {
    return this.preparePitchData(coord.start, byCaley, headerOrCross);
  }

  public prepareDribbleData(coord: ICoordLine): IDribblePitchData {
    const distance = this.calcDribbleDistanceByCaley(coord.start, coord.end);
    const distanceInverse = this.inverseDistance(distance);

    return {
      distance,
      distanceInverse,
    };
  }

  public convertPercentToYard(coord: ICoord) {
    const { x, y } = coord;
    const { x: xLength, y: yLength } = this.pitchSize;

    return {
      x: this.round((x * xLength) / 100),
      y: this.round((y * yLength) / 100),
    };
  }

  public convertYardToPercent(coord: ICoord) {
    const { x, y } = coord;
    const { x: xLength, y: yLength } = this.pitchSize;

    return {
      x: this.round((x * 100) / xLength),
      y: this.round((y * 100) / yLength),
    };
  }

  public inverseDistance(num: number) {
    return this.round(1 / num);
  }

  public inverseAngle(num: number) {
    return this.round(1 / num);
  }

  private checkCoordHandler(value, max) {
    return isFinite(value) && value >= 0 && value <= max;
  }

  private calcAngleHandler(coord: ICoord) {
    const { x, y } = coord;

    return this.round(2 * Math.atan2(y, x) / Math.PI);
  }

  private round(value: number): number {
    return round(value, this.roundCoef);
  }
}
