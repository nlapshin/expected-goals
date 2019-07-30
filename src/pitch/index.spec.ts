import { expect } from 'chai';

import Pitch from './';

describe('pitch', () => {
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
