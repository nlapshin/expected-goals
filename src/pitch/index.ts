import { norm } from 'mathjs';

import { ICoord, IPostCoord } from './model';

export default class Pitch {
  private postCoord: IPostCoord = {
    left: { x: 30.34, y: 0 },
    right: { x: 37.66, y: 0 },
    center: { x: 34, y: 0 },
  };

  public calcAngle(coord: ICoord) {
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

  public calcDistance(coord: ICoord) {
    return norm([[ coord.x, coord.y ], [ this.postCoord.center.x, this.postCoord.center.y]], 'fro');
  }

  private calcAngleHandler(coord: ICoord) {
    const { x, y } = coord;

    return 2 * Math.atan2(y, x) / Math.PI;
  }
}
