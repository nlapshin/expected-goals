import { expect } from 'chai';

import PitchDistance from './';

describe('pitch:distance', () => {
  describe('calcDistanceToPost', () => {
    it('should calculate the distance between the point and the post center', () => {
      const distance = new PitchDistance();

      expect(distance.calcDistanceToPost({ x: 34, y: 20 })).to.equal(21.87);
      expect(distance.calcDistanceToPost({ x: 40, y: 20 })).to.equal(22.84);
      expect(distance.calcDistanceToPost({ x: 50, y: 30 })).to.equal(37.18);
    });
  });

  describe('calcDistanceBetweenCoord', () => {
    it('should calculate the distance between two coords', () => {
      const distance = new PitchDistance();

      expect(distance.calcDistanceBetweenCoord({ x: 34, y: 20 }, { x: 34, y: 0 })).to.equal(21.87);
      expect(distance.calcDistanceBetweenCoord({ x: 40, y: 20 }, { x: 34, y: 0 })).to.equal(22.84);
      expect(distance.calcDistanceBetweenCoord({ x: 50, y: 30 }, { x: 34, y: 0 })).to.equal(37.18);
    });
  });

  describe('calcShotDistance', () => {
    it('should calculate the shot distance by Caley metric', () => {
      const distance = new PitchDistance();

      expect(distance.calcShotDistance({ x: 34, y: 20 }, true)).to.equal(21.87);
      expect(distance.calcShotDistance({ x: 50, y: 30 }, true)).to.equal(37.18);
      expect(distance.calcShotDistance({ x: 50, y: 30 })).to.equal(32.81);
    });
  });

  describe('calcAssistDistance', () => {
    it('should calculate the assist distance by Caley metric', () => {
      const distance = new PitchDistance();

      expect(distance.calcAssistDistance({ start: { x: 34, y: 20 }, end: { x: 40, y: 30 } })).to.equal(21.87);
      expect(distance.calcAssistDistance({ start: { x: 40, y: 20 }, end: { x: 40, y: 30 } })).to.equal(22.84);
      expect(distance.calcAssistDistance({ start: { x: 50, y: 30 }, end: { x: 40, y: 30 } })).to.equal(37.18);
    });
  });

  describe('calcDribbleDistance', () => {
    it('should calculate the dribble distance by Caley metric', () => {
      const distance = new PitchDistance();

      expect(distance.calcDribbleDistance({ start: { x: 34, y: 20 }, end: { x: 40, y: 30 } }, { x: 34, y: 10 })).to.equal(1);
      expect(distance.calcDribbleDistance({ start: { x: 40, y: 20 }, end: { x: 40, y: 30 } }, { x: 34, y: 15 })).to.equal(0.33);
      expect(distance.calcDribbleDistance({ start: { x: 50, y: 30 }, end: { x: 40, y: 30 } }, { x: 34, y: 22 })).to.equal(0.36);
    });
  });
});
