import { GAME_TEXT, DEALER_STOP_VALUE, WINNING_SCORE } from "@/utils/constants";
import { DeckService } from "./DeckService";
import { HandService } from "./HandService";

export class GameService {
  public apiData: TGameData;
  public clientData: TGameData;

  constructor() {
    this.apiData = this.createApiData();
    this.clientData = GameService.getClientData(this.apiData);
  }

  /**
   * Create new game data
   */
  public createApiData() {
    const deckService = new DeckService();
    const { drawnCards, newDeck } = deckService.drawCards(4);

    const playerHand = new HandService(drawnCards.slice(2));
    const dealerHand = new HandService(drawnCards.slice(2, 4));

    return {
      id: Date.now() + "",
      deck: newDeck,
      playerhand: playerHand.cards,
      dealerhand: dealerHand.cards,
      playerscore: playerHand.getHandScore(),
      dealerscore: dealerHand.getHandScore(),
      winner: "",
    };
  }

  /**
   * Format api data into client data
   */
  static getClientData(apiData: TGameData) {
    const { dealerhand, dealerscore, deck, ...restData } = apiData;
    const handObj = new HandService(dealerhand, true);

    return {
      ...restData,
      dealerhand: handObj.cards,
      dealerscore: handObj.getHandScore(true),
    } as TGameData;
  }

  /**
   * Request a new card to deck service
   */
  static playerHit(gameData: TGameData) {
    const { deck, playerhand } = gameData;

    const deckService = new DeckService(deck);
    const { drawnCards, newDeck } = deckService.drawCards(1);

    const playerHandService = new HandService([...playerhand, ...drawnCards]);

    return {
      deck: newDeck,
      playerhand: playerHandService.cards,
      playerscore: playerHandService.getHandScore(),
      winner: playerHandService.isBust ? GAME_TEXT.dealerWins : gameData.winner,
    };
  }

  /**
   * Player will stand and the dealer will play
   */
  static playerStand(gameData: TGameData) {
    const { deck, dealerscore, playerscore, dealerhand } = gameData;

    if (dealerscore >= playerscore) {
      return { ...gameData, winner: GAME_TEXT.dealerWins };
    }

    const deckService = new DeckService(deck);
    const dealerHandService = new HandService(dealerhand);

    while (dealerHandService.score < DEALER_STOP_VALUE) {
      dealerHandService.addCard(deckService.drawCards(1).drawnCards[0]);
    }

    const winner = GameService.resolve(dealerHandService.score, playerscore);

    return {
      deck: deckService.deck,
      dealerhand: dealerHandService.cards,
      dealerscore: dealerHandService.score,
      winner,
    };
  }

  /**
   * Resolve the game
   */
  static resolve(dealerscore: number, playerscore: number) {
    let winner = "";

    // The dealer plays until it reaches it's limit
    if (dealerscore <= WINNING_SCORE && dealerscore > playerscore) {
      winner = GAME_TEXT.dealerWins;
    }
    // It's a draw
    if (dealerscore === playerscore) {
      winner = GAME_TEXT.draw;
    }
    // Dealer busted or if the player has a better score
    if (dealerscore > WINNING_SCORE || dealerscore < playerscore) {
      winner = GAME_TEXT.playerWins;
    }
    return winner;
  }
}
