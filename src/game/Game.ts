import {
  WINNING_SCORE,
  INITIAL_CARD_COUNT,
  GAME_TEXT,
} from "@/utils/constants";
import { Dealer } from "./Dealer";
import { Deck } from "./Deck";
import { Player } from "./Player";

export class Game {
  id: string;
  deck: Deck;
  winner: string;
  player: IPlayer;
  dealer: IDealer;

  constructor() {
    this.id = Date.now() + "";
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
    this.winner = "";
  }

  /**
   * Start a new game drawing two cards for the player and the dealer
   */
  startGame() {
    for (let i = 0; i < INITIAL_CARD_COUNT; i++) {
      this.player.addCard(this.deck.drawCard());
      this.dealer.addCard(this.deck.drawCard());
    }
  }

  /**
   * Get the game data
   */
  getGameData(isResolved: boolean = false): TGameData {
    return {
      id: this.id,
      winner: this.winner,
      playerHand: this.player.hand,
      playerScore: this.player.calculateScore(),
      dealerHand: isResolved
        ? this.dealer.hand
        : [[null, null], this.dealer.hand[1]],
      dealerScore: this.dealer.calculateScore(!isResolved),
    };
  }

  /**
   * Add a card to the player's hand
   */
  playerHit() {
    this.player.addCard(this.deck.drawCard());

    if (this.player.calculateScore() > WINNING_SCORE) {
      this.winner = GAME_TEXT.dealerWins;
    }
  }

  /**
   * Player will stand and the dealer will play
   */
  playerStand() {
    this.winner = this.resolve();
  }

  /**
   * Resolve the game
   */
  resolve() {
    let dealerScore = this.dealer.calculateScore();
    const playerScore = this.player.calculateScore();
    let winner = "";

    // The dealer has a better score, then the dealer wins
    if (dealerScore > playerScore) {
      winner = GAME_TEXT.dealerWins;
    }

    // The dealer plays until it reaches it's limit
    dealerScore = this.dealer.playTurn(() => this.deck.drawCard());

    if (dealerScore <= WINNING_SCORE && dealerScore > playerScore) {
      winner = GAME_TEXT.dealerWins;
    }

    // It's a tie
    if (dealerScore === playerScore) {
      winner = GAME_TEXT.draw;
    }

    // Dealer busted or if the player has a better score
    if (dealerScore > WINNING_SCORE || dealerScore < playerScore) {
      winner = GAME_TEXT.playerWins;
    }

    return winner;
  }
}
