import { expect } from 'chai';

import * as path from 'path';
import * as fse from 'fs-extra';

import xg from './';

describe('xg', () => {
  describe('xgByCaley', () => {
    it('should calculate expected goals by caley model', () => {
      const shotsSet = fse.readJSONSync(path.resolve(__dirname, '../../fixtures/shots_set.json'));

      console.log(xg.xgByCaley(shotsSet[0]));
    });
  });

  describe('additionXgsPerAttack', () => {
    it('should add all xg values obtained for a single attack using a special formula', () => {
      expect(xg.additionXgsInAttack([0.5])).to.equal(0.5);
      expect(xg.additionXgsInAttack([0.8, 0.5])).to.equal(0.9);
      expect(xg.additionXgsInAttack([0.8, 0.7, 0.5])).to.equal(0.97);
    });
  });
});
