import { norm, round } from 'mathjs';

import {
  ICoord, ICoordLine,
} from '../model';

import PitchCoord from '../coord';

export default class PitchDistance {
  private roundCoef: number;
  private distanceCoef: number;
  private YARD: number = 0.9144;

  private coord: PitchCoord;

  constructor(options = { isYard: false, round: 2 }) {
    this.roundCoef = options.round ? options.round : 2;
    this.distanceCoef = options.isYard ? 1 : this.YARD;

    this.coord = new PitchCoord({ round: options.round });
  }

  public calcShotDistance(coord: ICoord, headerOrCross: boolean = false): number {
    const { x, y } = coord;

    if (headerOrCross) {
      return this.calcDistanceToPost({ x, y });
    }

    return this.round(y / this.distanceCoef);
  }

  public calcAssistDistance(assistCoord: ICoordLine): number {
    return this.calcDistanceToPost(assistCoord.start);
  }

  public calcDribbleDistance(dribbleCoord: ICoordLine, shotCoord: ICoord): number {
    const dribbleStart = dribbleCoord.start.y / this.distanceCoef;
    const shotStart = shotCoord.y / this.distanceCoef;

    const result = Math.abs((dribbleStart - shotStart) / shotStart);

    return this.round(result);
  }

  public inverseDistance(num: number) {
    return this.round(1 / num);
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

  private round(value: number): number {
    return round(value, this.roundCoef);
  }
}
