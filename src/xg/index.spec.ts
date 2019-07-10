import { expect } from 'chai';

import xg from './';

describe('xg', () => {
  describe('additionXgsPerAttack', () => {
    it('should add all xg values obtained for a single attack using a special formula', () => {
      expect(xg.additionXgsInAttack([0.5])).to.equal(0.5);
      expect(xg.additionXgsInAttack([0.8, 0.5])).to.equal(0.9);
      expect(xg.additionXgsInAttack([0.8, 0.7, 0.5])).to.equal(0.97);
    });
  });
});
