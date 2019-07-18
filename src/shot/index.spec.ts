import { expect } from 'chai';

import * as path from 'path';
import * as fse from 'fs-extra';

import Shot from './';
import { TShotType } from './model';

describe('Shot', () => {
  describe('flatShot', () => {
    it('should convert shot deeper structure into flat "key-value" structure', () => {
      const shot = new Shot();
      const shotsSet = fse.readJSONSync(path.resolve(__dirname, '../../fixtures/shots_set.json'));

      expect(shot.flatShot(shotsSet[0])).to.deep.equal({
        id: 1,
        relativeShots: [],
        shotTime: '1:11',
        shotCoord: { x: 48.35, y: 14.39 },
        shotAngle: 0.59,
        shotAngleInverse: 1.69,
        shotDistance: 22.22,
        shotDistanceInverse: 0.05,
        shotType: 'RegularShot',
        shotTypeRegularShot: true,
        shotPart: 'RightFoot',
        shotPartRightFoot: true,
        shotFollowing: null,
        shotAttack: 'OpenPlay',
        shotAttackOpenPlay: true,
        shotBigChance: false,
        assistCoord: { start: { x: 61.13, y: 13.44 }, end: { x: 51, y: 15.44 } },
        assistAngle: 0.33,
        assistAngleInverse: 3.03,
        assistDistance: 33.11,
        assistDistanceInverse: 0.03,
        assistType: null,
        assistKeyPass: false,
        assistIntentional: false,
      });

      expect(shot.flatShot(shotsSet[1])).to.deep.equal({
        id: 3,
        relativeShots: [],
        shotTime: '2:23',
        shotCoord: { x: 34, y: 12.08 },
        shotAngle: 1,
        shotAngleInverse: 1,
        shotDistance: 13.21,
        shotDistanceInverse: 0.08,
        shotType: 'RegularShot',
        shotTypeRegularShot: true,
        shotPart: 'RightFoot',
        shotPartRightFoot: true,
        shotFollowing: null,
        shotAttack: 'Penalty',
        shotAttackPenalty: true,
        shotBigChance: true,
      });
    });
  });

  describe('prepareShot', () => {
    it('should calculate', () => {
      const shot = new Shot({ isYard: true });

      expect(shot.prepareShot({
        coord: { y: 12, x: 34 },
        meta: { type: 'RegularShot' as TShotType },
      })).to.deep.equal({
        coord: { y: 12, x: 34 },
        meta: { type: 'RegularShot' },
        distance: 12,
        angle: 1,
      });

      expect(shot.prepareShot({
        coord: { y: 12, x: 44 },
        meta: { type: 'RegularShot' as TShotType },
      })).to.deep.equal({
        coord: { y: 12, x: 44 },
        meta: { type: 'RegularShot' },
        distance: 15.62,
        angle: 0.69,
      });

      expect(shot.prepareShot({
        coord: { y: 12, x: 38 },
        meta: { type: 'RegularShot' as TShotType },
      })).to.deep.equal({
        coord: { y: 12, x: 38 },
        meta: { type: 'RegularShot' },
        distance: 12.65,
        angle: 0.98,
      });

      expect(shot.prepareShot({
        coord: { y: 12, x: 37 },
        meta: { type: 'RegularShot' as TShotType },
      })).to.deep.equal({
        coord: { y: 12, x: 37 },
        meta: { type: 'RegularShot' },
        distance: 12.37,
        angle: 1,
      });
    });
  });
});
