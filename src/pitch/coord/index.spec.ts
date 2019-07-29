import { expect } from 'chai';

import Pitch from './';

describe('pitch:coord', () => {
  describe('checkCoord', () => {
    it('should validate coord value', () => {
      const pitch = new Pitch({ round: 2 });

      expect(pitch.checkCoordToPitch({ x: 1, y: 1 })).to.be.true;
      expect(pitch.checkCoordToPitch({ x: 65, y: 100 })).to.be.true;
      expect(pitch.checkCoordToPitch({ x: 69 })).to.be.false;
      expect(pitch.checkCoordToPitch({ y: 110 })).to.be.false;
      expect(pitch.checkCoordToPitch({ x: NaN })).to.be.false;
      expect(pitch.checkCoordToPitch({ y: NaN })).to.be.false;
    });
  });

  describe('checkCoordToArea', () => {
    it('should return true if the specified coord includes to area, otherwise return false', () => {
      const pitch = new Pitch();

      const area = {
        leftBottom: { x: 30, y: 30 },
        leftUpper: { x: 30, y: 40 },
        rightBottom: { x: 40, y: 30 },
        rightUpper: { x: 40, y: 40 },
      };

      expect(pitch.checkCoordToArea(area, { x: 35, y: 35 })).to.true;
      expect(pitch.checkCoordToArea(area, { x: 29, y: 29 })).to.false;
      expect(pitch.checkCoordToArea(area, { x: 29, y: 35 })).to.false;
      expect(pitch.checkCoordToArea(area, { x: 41, y: 35 })).to.false;
      expect(pitch.checkCoordToArea(area, { x: 35, y: 29 })).to.false;
      expect(pitch.checkCoordToArea(area, { x: 35, y: 41 })).to.false;
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
