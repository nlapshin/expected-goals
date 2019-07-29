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

  describe('calcDistanceToPost', () => {
    it('should calculate the distance between the point and the post center', () => {
      const pitch = new Pitch();

      expect(pitch.calcDistanceToPost({ x: 34, y: 20 })).to.equal(21.87);
      expect(pitch.calcDistanceToPost({ x: 40, y: 20 })).to.equal(22.84);
      expect(pitch.calcDistanceToPost({ x: 50, y: 30 })).to.equal(37.18);
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

      expect(pitch.calcShotDistance({ x: 34, y: 20 }, true)).to.equal(21.87);
      expect(pitch.calcShotDistance({ x: 50, y: 30 }, true)).to.equal(37.18);
      expect(pitch.calcShotDistance({ x: 50, y: 30 })).to.equal(32.81);
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
});
