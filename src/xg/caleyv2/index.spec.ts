import { expect } from 'chai';

import Shot from '../../shot/';
import { IShot, TShotType } from '../../shot/model';
import xg from './';

describe('xg by caley: version 2', () => {
  describe('should calculate expected goals by caley model version 2', () => {
    const shotModule = new Shot({ isYard: true, round: 2 });

    const shots = [
      {
        label: 'simple shot',
        input: {
          coord: { x: 34, y: 12 },
          meta: {type: 'RegularShot' as TShotType},
        },
        expected: 0.11,
      },
      {
        label: 'simple shot 2',
        input: {
          coord: { x: 30, y: 7 },
          meta: {type: 'RegularShot' as TShotType},
        },
        expected: 0.16,
      },
      {
        label: 'simple shot from 6-yard-box',
        input: {
          coord: { x: 34, y: 5 },
          meta: {type: 'RegularShot' as TShotType},
        },
        expected: 0.21,
      },
      {
        label: 'simple shot from goal line',
        input: {
          coord: { x: 34, y: 0.5 },
          meta: {type: 'RegularShot' as TShotType},
        },
        expected: 0.74,
      },
      {
        label: 'simple shot with big chance',
        input: {
          coord: { x: 34, y: 12 },
          meta: {
            type: 'RegularShot' as TShotType,
            bigChance: true,
          },
        },
        expected: 0.28,
      },
      {
        label: 'simple shot from 6-yard-box with big chance',
        input: {
          coord: { x: 34, y: 5 },
          meta: {
            type: 'RegularShot' as TShotType,
            bigChance: true,
          },
        },
        expected: 0.47,
      },
      {
        label: 'simple shot from goal line with big chance',
        input: {
          coord: { x: 34, y: 0.5 },
          meta: {
            type: 'RegularShot' as TShotType,
            bigChance: true,
          },
        },
        expected: 0.91,
      },
      {
        label: 'sharp angle shot from goal line',
        input: {
          coord: { x: 44, y: 0.5 },
          meta: {
            type: 'RegularShot' as TShotType,
          },
        },
        expected: 0,
      },
      {
        label: 'sharp angle shot from goal line',
        input: {
          coord: { x: 2, y: 2 },
          meta: {
            type: 'RegularShot' as TShotType,
          },
        },
        expected: 0,
      },
      {
        label: 'simple shot after assist',
        input: {
          coord: { x: 34, y: 12 },
          meta: {
            type: 'RegularShot' as TShotType,
            assist: {
              coord: { start: { x: 34, y: 19 } },
            },
          },
        },
        expected: 0.13,
      },
      {
        label: 'simple shot with big chance, after througball assist',
        input: {
          coord: { x: 34, y: 12 },
          meta: {
            type: 'RegularShot' as TShotType,
            bigChance: true,
            assist: {
              coord: { start: { x: 34, y: 18 } },
              meta: {
                type: 'Throughball',
              },
            },
          },
        },
        expected: 0.44,
      },
      {
        label: 'simple shot with big chance, after assist after througball ',
        input: {
          coord: { x: 34, y: 12 },
          meta: {
            type: 'RegularShot' as TShotType,
            bigChance: true,
            assist: {
              coord: { start: { x: 34, y: 18 } },
              meta: {
                type: 'AssistAfterThroughball',
              },
            },
          },
        },
        expected: 0.49,
      },
      {
        label: 'simple shot with big chance, after assist after pullback',
        input: {
          coord: { x: 34, y: 12 },
          meta: {
            type: 'RegularShot' as TShotType,
            bigChance: true,
            assist: {
              coord: { start: { x: 44, y: 4 } },
              meta: {
                type: 'Pullback',
              },
            },
          },
        },
        expected: 0.38,
      },
      {
        label: 'simple shot with big chance and following error',
        input: {
          coord: { x: 34, y: 12 },
          meta: {
            type: 'RegularShot' as TShotType,
            bigChance: true,
            following: 'Error',
          },
        },
        expected: 0.54,
      },
      {
        label: 'direct free kick shot',
        input: {
          coord: { x: 34, y: 22 },
          meta: {
            type: 'DirectFreeKickShot' as TShotType,
          },
        },
        expected: 0.11,
      },
      {
        label: 'direct free kick shot',
        input: {
          coord: { x: 34, y: 25 },
          meta: {
            type: 'DirectFreeKickShot' as TShotType,
          },
        },
        expected: 0.08,
      },
      {
        label: 'simple header shot after cross',
        input: {
          coord: { x: 34, y: 8 },
          meta: {
            type: 'CrossAndHeaderShot' as TShotType,
          },
        },
        expected: 0.08,
      },
      {
        label: 'simple header shot after cross with big chance',
        input: {
          coord: { x: 34, y: 8 },
          meta: {
            type: 'CrossAndHeaderShot' as TShotType,
            bigChance: true,
          },
        },
        expected: 0.23,
      },
      {
        label: 'simple header shot after cross with big chance, after set piece',
        input: {
          coord: { x: 34, y: 8 },
          meta: {
            type: 'CrossAndHeaderShot' as TShotType,
            bigChance: true,
            attack: 'SetPiece',
          },
        },
        expected: 0.25,
      },
      {
        label: 'simple header shot after cross with big chance, after factbreak',
        input: {
          coord: { x: 34, y: 8 },
          meta: {
            type: 'CrossAndHeaderShot' as TShotType,
            bigChance: true,
            attack: 'Fastbreak',
          },
        },
        expected: 0.26,
      },
      {
        label: 'simple header shot after corner',
        input: {
          coord: { x: 34, y: 8 },
          meta: {
            type: 'CrossAndHeaderShot' as TShotType,
            following: 'Corner',
          },
        },
        expected: 0.06,
      },
      {
        label: 'simple header shot after corner caused by another part of the body',
        input: {
          coord: { x: 34, y: 8 },
          meta: {
            type: 'CrossAndHeaderShot' as TShotType,
            part: 'OtherBodyPart',
            following: 'Corner',
          },
        },
        expected: 0.05,
      },
      {
        label: 'simple header shot after cross with big chance, after corner',
        input: {
          coord: { x: 34, y: 8 },
          meta: {
            type: 'CrossAndHeaderShot' as TShotType,
            bigChance: true,
            following: 'Corner',
          },
        },
        expected: 0.19,
      },
      {
        label: 'simple feet shot after cross',
        input: {
          coord: { x: 34, y: 8 },
          meta: {
            type: 'CrossAndFeetShot' as TShotType,
          },
        },
        expected: 0.11,
      },
      {
        label: 'simple feet shot after corner',
        input: {
          coord: { x: 34, y: 8 },
          meta: {
            type: 'CrossAndFeetShot' as TShotType,
            following: 'Corner',
          },
        },
        expected: 0.1,
      },
      {
        label: 'simple feet shot after cross with bigChance',
        input: {
          coord: { x: 34, y: 8 },
          meta: {
            type: 'CrossAndFeetShot' as TShotType,
            bigChance: true,
          },
        },
        expected: 0.3,
      },
      {
        label: 'simple feet shot after cross with bigChance after fastbreak attack',
        input: {
          coord: { x: 34, y: 8 },
          meta: {
            type: 'CrossAndFeetShot' as TShotType,
            bigChance: true,
            attack: 'Fastbreak',
          },
        },
        expected: 0.36,
      },
      {
        label: 'simple feet shot after cross with bigChance after fastbreak attack',
        input: {
          coord: { x: 34, y: 8 },
          meta: {
            type: 'CrossAndFeetShot' as TShotType,
            bigChance: true,
            attack: 'Fastbreak',
            assist: {
              coord: {
                start: { x: 50, y: 12 },
              },
            },
          },
        },
        expected: 0.51,
      },
    ];

    shots.forEach(({ label, input, expected }) => {
      it(label, () => {
        const shot = shotModule.prepareShot(input as IShot, true);
        const result = xg(shot);

        expect(result).to.equal(expected);
      });
    });

  });
});
