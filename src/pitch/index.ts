import { norm, round } from 'mathjs';

import { ICoord, IPostCoord, ICoordLine, ICoordArea } from './model';

export default class Pitch {
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

  public calcDistanceBetweenCoord(coord1: ICoord, coord2: ICoord): number {
    const xSub = coord1.x - coord2.x;
    const ySub = coord1.y - coord2.y;

    const distance = norm([xSub, ySub]) / this.YARD;

    return round(distance, 2);
  }

  public calcShotDistanceByCaley(coord: ICoord, headerOrCross: boolean = false): number {
    const { x, y } = coord;

    if (headerOrCross) {
      return round(y / this.YARD, 2);
    }

    return this.calcDistance({ x, y });
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

  public convertPercentToYard(coord: ICoord) {
    const { x, y } = coord;
    const { x: xLength, y: yLength } = this.pitchSize;

    return {
      x: round((x * xLength) / 100, 2),
      y: round((y * yLength) / 100, 2),
    };
  }

  public convertYardToPercent(coord: ICoord) {
    const { x, y } = coord;
    const { x: xLength, y: yLength } = this.pitchSize;

    return {
      x: round((x * 100) / xLength, 2),
      y: round((y * 100) / yLength, 2),
    };
  }

  private calcAngleHandler(coord: ICoord) {
    const { x, y } = coord;

    return round(2 * Math.atan2(y, x) / Math.PI, 2);
  }
}
