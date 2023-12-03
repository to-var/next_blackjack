type TCard = [string | null, string | null];

interface TGameData {
  id?: string;
  winner?: string;
  playerHand?: TCard[];
  playerScore?: number;
  dealerHand?: TCard[];
  dealerScore?: number;
  error?: Error;
}

type TGameState = {
  gameData: TGameData | null;
  error: Error | null;
  isLoading: boolean;
};

interface IDeck {
  drawCard(): TCard;
}

interface IPlayer {
  hand: TCard[];
  addCard(card: TCard): void;
  calculateScore(hideFirstCard?: boolean): number;
}

interface IDealer extends IPlayer {
  playTurn(drawCardCallback: () => TCard): number;
  calculateScore(hideFirstCard?: boolean): number;
}
