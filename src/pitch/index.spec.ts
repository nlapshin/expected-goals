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
});
