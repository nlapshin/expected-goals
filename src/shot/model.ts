export interface IShot {
  league?: string;
  coord: {
    x: number;
    y: number;
  };
  assist?: {
    x: number;
    y: number;
  };
  meta: {
    corner?: boolean;
    header?: boolean;
    cross?: boolean;
    bigChance?: boolean;
    assistPoint?: boolean;
    throughballAssist?: boolean;
    throughballAndAssist?: boolean;
    cutbackAssist?: boolean;
    rebound?: boolean;
    establishedPossession?: boolean;
    fastBreak?: boolean;
    counterAttack?: boolean;
    gameState?: boolean;
    followingCorner?: boolean;
    followingDribble?: boolean;
    startRunPoint?: boolean;
    otherBodyPart?: boolean;
    setPiece?: boolean;
    followingError?: boolean;
    directFreeKick?: boolean;
    dribbleGoalkeeper?: boolean;
  };
}
