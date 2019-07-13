import { norm } from 'mathjs';

import { ICoord, IPostCoord, ICoordLine, ICoordArea } from './model';

export default class Pitch {
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

    return  this.calcAngleHandler({ x: x - rightX, y });
  }

  public calcDistance(coord: ICoord): number {
    return norm([[ coord.x, coord.y ], [ this.postCoord.center.x, this.postCoord.center.y]], 'fro');
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

  private calcAngleHandler(coord: ICoord) {
    const { x, y } = coord;

    return 2 * Math.atan2(y, x) / Math.PI;
  }
}
