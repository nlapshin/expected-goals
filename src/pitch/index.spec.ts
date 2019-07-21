import { expect } from 'chai';

import Pitch from './';

describe('pitch', () => {
  describe('checkCoord', () => {
    it('should validate coord value', () => {
      const pitch = new Pitch({ isYard: true, round: 2 });

      expect(pitch.checkCoord({ x: 1, y: 1 })).to.be.true;
      expect(pitch.checkCoord({ x: 65, y: 100 })).to.be.true;
      expect(pitch.checkCoord({ x: 69 })).to.be.false;
      expect(pitch.checkCoord({ y: 110 })).to.be.false;
      expect(pitch.checkCoord({ x: NaN })).to.be.false;
      expect(pitch.checkCoord({ y: NaN })).to.be.false;
    });
  });

  describe('calcAngle', () => {
    it('should calculate the angle by coords relative to the post', () => {
      const pitch = new Pitch();

      expect(pitch.calcAngle({ x: 34, y: 20 })).to.equal(1);
      expect(+(pitch.calcAngle({ x: 40, y: 20 })).toFixed(2)).to.equal(0.93);
      expect(+(pitch.calcAngle({ x: 50, y: 20 })).toFixed(2)).to.equal(0.65);
      expect(+(pitch.calcAngle({ x: 20, y: 20 })).toFixed(2)).to.equal(0.7);
      expect(+(pitch.calcAngle({ x: 25, y: 20 })).toFixed(2)).to.equal(0.83);
    });
  });

  describe('calcDistance', () => {
    it('should calculate the distance between the point and the post center', () => {
      const pitch = new Pitch();

      expect(pitch.calcDistance({ x: 34, y: 20 })).to.equal(21.87);
      expect(pitch.calcDistance({ x: 40, y: 20 })).to.equal(22.84);
      expect(pitch.calcDistance({ x: 50, y: 30 })).to.equal(37.18);
    });
  });

  describe('calcDistanceBetweenCoord', () => {
    it('should calculate the distance between two coords', () => {
      const pitch = new Pitch();

      expect(pitch.calcDistanceBetweenCoord({ x: 34, y: 20 }, { x: 34, y: 0 })).to.equal(21.87);
      expect(pitch.calcDistanceBetweenCoord({ x: 40, y: 20 }, { x: 34, y: 0 })).to.equal(22.84);
      expect(pitch.calcDistanceBetweenCoord({ x: 50, y: 30 }, { x: 34, y: 0 })).to.equal(37.18);
    });
  });

  describe('calcShotDistanceByCaley', () => {
    it('should calculate the shot distance by Caley metric', () => {
      const pitch = new Pitch();

      expect(pitch.calcShotDistanceByCaley({ x: 34, y: 20 }, true)).to.equal(21.87);
      expect(pitch.calcShotDistanceByCaley({ x: 50, y: 30 }, true)).to.equal(37.18);
      expect(pitch.calcShotDistanceByCaley({ x: 50, y: 30 })).to.equal(32.81);
    });
  });

  describe('checkArea', () => {
    it('should return true if the specified coord includes to area, otherwise return false', () => {
      const pitch = new Pitch();

      const area = {
        leftBottom: { x: 30, y: 30 },
        leftUpper: { x: 30, y: 40 },
        rightBottom: { x: 40, y: 30 },
        rightUpper: { x: 40, y: 40 },
      };

      expect(pitch.checkArea(area, { x: 35, y: 35 })).to.true;
      expect(pitch.checkArea(area, { x: 29, y: 29 })).to.false;
      expect(pitch.checkArea(area, { x: 29, y: 35 })).to.false;
      expect(pitch.checkArea(area, { x: 41, y: 35 })).to.false;
      expect(pitch.checkArea(area, { x: 35, y: 29 })).to.false;
      expect(pitch.checkArea(area, { x: 35, y: 41 })).to.false;
    });
  });

  describe('checkDangerZone', () => {
    it('should return true if the specified coord includes to danger zone, otherwise return false', () => {
      const pitch = new Pitch();

      expect(pitch.checkDangerZone({ x: 34, y: 12 })).to.true;
      expect(pitch.checkDangerZone({ x: 31, y: 12 })).to.true;
      expect(pitch.checkDangerZone({ x: 30, y: 12 })).to.false;
      expect(pitch.checkDangerZone({ x: 38, y: 12 })).to.false;
      expect(pitch.checkDangerZone({ x: 34, y: 20 })).to.false;
    });
  });

  describe('checkPullback', () => {
    it('should return true if the line coords match pass type pullback', () => {
      const pitch = new Pitch();

      expect(pitch.checkPullback({ start: { x: 20, y: 5 }, end: { x: 34, y: 12 } })).to.true;
      expect(pitch.checkPullback({ start: { x: 40, y: 5 }, end: { x: 34, y: 12 } })).to.true;
      expect(pitch.checkPullback({ start: { x: 20, y: 7 }, end: { x: 34, y: 12 } })).to.false;
      expect(pitch.checkPullback({ start: { x: 9, y: 5 }, end: { x: 34, y: 12 } })).to.false;
      expect(pitch.checkPullback({ start: { x: 70, y: 5 }, end: { x: 34, y: 12 } })).to.false;
    });
  });

  describe('convertPercentToYard', () => {
    it('should convert percent coord to yard coord', () => {
      const pitch = new Pitch();

      expect(pitch.convertPercentToYard({ x: 63.1, y: 9.3 })).to.deep.equal({ x: 42.91, y: 9.77 });
      expect(pitch.convertPercentToYard({ x: 28.1, y: 19.8 })).to.deep.equal({ x: 19.11, y: 20.79 });
    });
  });

  describe('convertYardToPercent', () => {
    it('should convert yard coord to percent coord', () => {
      const pitch = new Pitch();

      expect(pitch.convertYardToPercent({ x: 42.91, y: 9.77 })).to.deep.equal({ x: 63.1, y: 9.3 });
      expect(pitch.convertYardToPercent({ x: 19.11, y: 20.79 })).to.deep.equal({ x: 28.1, y: 19.8 });
    });
  });
});
