import { expect } from 'chai';

import PitchAngle from './';

describe('pitch:angle', () => {
  describe('calcAngle', () => {
    it('should calculate the angle by coords relative to the post', () => {
      const pitch = new PitchAngle();

      expect(pitch.calcAngle({ x: 34, y: 20 })).to.equal(1);
      expect(+(pitch.calcAngle({ x: 40, y: 20 })).toFixed(2)).to.equal(0.93);
      expect(+(pitch.calcAngle({ x: 50, y: 20 })).toFixed(2)).to.equal(0.65);
      expect(+(pitch.calcAngle({ x: 20, y: 20 })).toFixed(2)).to.equal(0.7);
      expect(+(pitch.calcAngle({ x: 25, y: 20 })).toFixed(2)).to.equal(0.83);
    });
  });
});
