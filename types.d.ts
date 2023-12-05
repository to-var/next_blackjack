type TCard = [string | null, string | null];

interface TGameData {
  id: string;
  deck: TCard[];
  winner: string;
  playerhand: TCard[];
  playerscore: number;
  dealerhand: TCard[];
  dealerscore: number;
}

type TGameState = {
  gameData: TGameData | null;
  error: Error | null;
  isGameLoading: boolean;
  isLoadingDeck: boolean;
};

interface IDealer extends IPlayer {
  playTurn(drawCardCallback: () => TCard): number;
  calculateScore(hideFirstCard?: boolean): number;
}

type TGameClient = {
  gameStart: () => Promise<TGameData | { error: Error }>;
  gameHit: (gameId: string) => Promise<TGameData | { error: Error }>;
  gameStand: (gameId: string) => Promise<TGameData | { error: Error }>;
};
