import { ICoord } from '../pitch/model';

export interface IAssistCoord {
  start: ICoord;
  end: ICoord;
}

export type TShotType = 'RegularShot' | 'DirectFreeKickShot' |
  'CrossAndHeaderShot' | 'CrossAndFeetShot' | 'HeaderShot' | 'DribbleShot' | 'DribbleKeeperShot';

export const ShotType = {
  RegularShot: 'RegularShot' as TShotType,
  DirectFreeKickShot: 'DirectFreeKickShot' as TShotType,
  CrossAndHeaderShot: 'CrossAndHeaderShot' as TShotType,
  CrossAndFeetShot: 'CrossAndFeetShot' as TShotType,
  HeaderShot: 'HeaderShot' as TShotType,
  DribbleShot: 'DribbleShot' as TShotType,
  DribbleKeeperShot: 'DribbleKeeperShot' as TShotType,
};

export type TShotPart = 'LeftFoot' | 'RightFoot' | 'Head' | 'OtherBodyPart';

export const ShotPart = {
  LeftFoot: 'LeftFoot' as TShotPart,
  RightFoot: 'RightFoot' as TShotPart,
  Head: 'Head' as TShotPart,
  OtherBodyPart: 'OtherBodyPart' as TShotPart,
};

export type TShotFollowing = 'Corner' | 'Error' | 'Dribble';

export const ShotFollowing = {
  Corner: 'Corner' as TShotFollowing,
  Error: 'Error' as TShotFollowing,
  Dribble: 'Dribble' as TShotFollowing,
};

export type TAttackType = 'OpenPlay' | 'EstablishedPossession' | 'SetPiece' | 'FastBreak' | 'Penalty' | 'OwnGoal';

export const AttackType = {
  OpenPlay: 'OpenPlay' as TAttackType,
  EstablishedPossession: 'EstablishedPossession' as TAttackType,
  SetPiece: 'SetPiece' as TAttackType,
  FastBreak: 'FastBreak' as TAttackType,
  Penalty: 'Penalty' as TAttackType,
  OwnGoal: 'OwnGoal' as TAttackType,
};

export type TAssistType = 'Throughball' | 'AssistAfterThroughball' | 'Pullback'  | 'AssistAcrossFace' | 'HeadAssist';

export const AssistType = {
  Throughball: 'Throughball' as TAssistType,
  AssistAfterThroughball: 'AssistAfterThroughball' as TAssistType,
  Pullback: 'Pullback' as TAssistType,
  AssistAcrossFace: 'AssistAcrossFace' as TAssistType,
  HeadAssist: 'HeadAssist' as TAssistType,
};

export interface IAssist {
  coord: IAssistCoord;
  angle?: number;
  angleInverse?: number;
  distance?: number;
  distanceInverse?: number;
  meta?: {
    type?: TAssistType;
    intentional?: boolean;
    keyPass?: boolean;
  };
}

export interface IDribble {
  coord: ICoord;
  distance?: number;
  distanceInverse?: number;
}

export interface IShot {
  id?: number;
  relativeShots?: number[];
  time?: string;
  coord: ICoord;
  angle?: number;
  angleInverse?: number;
  distance?: number;
  distanceInverse?: number;
  meta: {
    type: TShotType,
    part?: TShotPart,
    following?: TShotFollowing,
    attack?: TAttackType,
    bigChance?: boolean,
    assist?: IAssist,
    dribble?: IDribble,
  };
}

export interface IShotFlat {
  id?: number;
  relativeShots?: number[];
  shotTime?: string;
  shotCoord: ICoord;
  shotAngle?: number;
  shotAngleInverse?: number;
  shotDistance?: number;
  shotDistanceInverse?: number;
  shotType: TShotType;
  shotPart?: TShotPart;
  shotFollowing?: TShotFollowing;
  shotAttack?: TAttackType;
  shotBigChance?: boolean;
  assistCoord?: IAssistCoord;
  assistAngle?: number;
  assistAngleInverse?: number;
  assistDistance?: number;
  assistDistanceInverse?: number;
  assistType?: TAssistType;
  assistIntentional?: boolean;
  assistKeyPass?: boolean;
  dribbleCoord?: ICoord;
  dribbleDistance?: number;
}
