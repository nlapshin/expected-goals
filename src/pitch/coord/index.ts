import { isFinite, has } from 'lodash';
import { round } from 'mathjs';

import {
  ICoord, ICoordOptions,
  IPostCoord, ICoordArea,
} from '../model';

export default class Pitch {
  private roundCoef: number;

  private get dangerZoneCoord(): ICoordArea {
    return {
      leftBottom: { x: this.postCoord.left.x, y: 6 },
      rightBottom: { x: this.postCoord.right.x, y: 6 },
      leftUpper: { x: this.postCoord.left.x, y: this.penaltyAreaCoord.leftUpper.y },
      rightUpper: { x: this.postCoord.right.x, y: this.penaltyAreaCoord.rightUpper.y },
    };
  }

  constructor(options = { round: 2 }) {
    this.roundCoef = options.round ? options.round : 2;
  }

  public get pitchSize(): ICoord {
    return { x: 68, y: 105};
  }

  public get postCoord(): IPostCoord  {
    return {
      left: { x: 30.34, y: 0 },
      right: { x: 37.66, y: 0 },
      center: { x: 34, y: 0 },
    };
  }

  public get penaltyAreaCoord(): ICoordArea {
    return {
      leftBottom: { x: 12.34, y: 0 },
      rightBottom: { x: 55.66, y: 0 },
      leftUpper: { x: 12.34, y: 18 },
      rightUpper: { x: 55.66, y: 18 },
    };
  }

  public checkCoordToPitch(coord: ICoordOptions): boolean {
    const handler = (value, max) => isFinite(value) && value >= 0 && value <= max;

    if (has(coord, 'x') && !handler(coord.x, this.pitchSize.x)) {
      return false;
    }

    if (has(coord, 'y') && !handler(coord.y, this.pitchSize.y)) {
      return false;
    }

    return true;
  }

  public checkCoordToArea(area: ICoordArea, coord: ICoord): boolean {
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

  public checkDangerZone(coord: ICoord) {
    return this.checkCoordToArea(this.dangerZoneCoord, coord);
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

  private round(value: number): number {
    return round(value, this.roundCoef);
  }
}
