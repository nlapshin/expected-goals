import { expect } from 'chai';

import Pitch from './';

describe('pitch', () => {
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

      expect(+(pitch.calcDistance({ x: 34, y: 20 })).toFixed(2)).to.equal(52.08);
      expect(+(pitch.calcDistance({ x: 40, y: 20 })).toFixed(2)).to.equal(56.18);
      expect(+(pitch.calcDistance({ x: 50, y: 30 })).toFixed(2)).to.equal(67.5);
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
    it('should return true if the pass coords match pass type pullback', () => {
      const pitch = new Pitch();

      expect(pitch.checkPullback({ start: { x: 20, y: 5 }, end: { x: 34, y: 12 } })).to.true;
      expect(pitch.checkPullback({ start: { x: 40, y: 5 }, end: { x: 34, y: 12 } })).to.true;
      expect(pitch.checkPullback({ start: { x: 20, y: 7 }, end: { x: 34, y: 12 } })).to.false;
      expect(pitch.checkPullback({ start: { x: 9, y: 5 }, end: { x: 34, y: 12 } })).to.false;
      expect(pitch.checkPullback({ start: { x: 70, y: 5 }, end: { x: 34, y: 12 } })).to.false;
    });
  });
});
