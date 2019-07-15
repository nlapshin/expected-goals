import { ICoord } from '../pitch/model';

export interface IAssistCoord {
  start: ICoord;
  end: ICoord;
}

export type TShotType = 'RegularShot' | 'DirectFreeKickShot' |
  'CrossAndHeaderShot' | 'CrossAndFeetShot' | 'HeaderShot' | 'DibbleKeeperShot';

export type TShotPart = 'LeftFoot' | 'RightFoot' | 'Head' | 'OtherBodyPart';

export type TShotFollowing = 'Corner' | 'Error' | 'Dribble' | null;

export type TAttackType = 'OpenPlay' | 'EstablishedPossession' | 'SetPiece' | 'FastBreak' | 'Penalty' | 'OwnGoal';

export type TAssistType = 'Throughball' | 'AssistAfterThroughball' | 'Pullback'  | 'AssistAcrossFace' | null;

export interface IShot {
  id: number;
  relativeShots: number[];
  time: string;
  coord: ICoord;
  angle: number;
  distance: number;
  meta: {
    type: TShotType,
    part: TShotPart,
    following: TShotFollowing,
    attack: TAttackType,
    bigChance: boolean,
    assist: {
      coord: IAssistCoord;
      angle: number;
      distance: number;
      meta: {
        type: TAssistType;
        keyPass: boolean;
      }
    },
  };
}

export interface IShotFlat {
  id: number;
  relativeShots: number[];
  shotTime: string;
  shotCoord: ICoord;
  shotAngle: number;
  shotAngleInverse: number;
  shotDistance: number;
  shotDistanceInverse: number;
  shotType: TShotType;
  shotPart: TShotPart;
  shotFollowing: TShotFollowing;
  shotAttack: TAttackType;
  shotBigChance: boolean;
  assistCoord?: IAssistCoord;
  assistAngle?: number;
  assistAngleInverse?: number;
  assistDistance?: number;
  assistDistanceInverse?: number;
  assistType?: TAssistType;
  assistKeyPass?: boolean;
}
