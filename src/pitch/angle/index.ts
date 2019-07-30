import { round } from 'mathjs';

import {
  ICoord, ICoordLine,
} from '../model';

import PitchCoord from '../coord';

export default class PitchAngle {
  private roundCoef: number;

  private coord: PitchCoord;

  constructor(options = { round: 2 }) {
    this.roundCoef = options.round ? options.round : 2;

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

  public calcAngleAssist(coord: ICoordLine): number {
    return this.calcAngle(coord.start);
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
