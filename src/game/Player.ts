import {
  WINNING_SCORE,
  ACE_MIN_VALUE,
  ACE_MAX_VALUE,
  KQJ_VALUE,
} from "@/utils/constants";

export class Player implements IPlayer {
  hand: TCard[];

  constructor() {
    this.hand = [];
  }

  /**
   * Calculates the value of a given card
   */
  getCardValue(cardValue: string): number {
    switch (cardValue) {
      case "J":
      case "Q":
      case "K":
        return KQJ_VALUE;
      default:
        return parseInt(cardValue);
    }
  }

  /**
   * Add a card to the player's hand
   */
  addCard(card: TCard) {
    this.hand.push(card);
  }

  /**
   * Queue hand score calculation the value of the player's hand
   */
  calculateScore(): number {
    return this.getHandScore(this.hand);
  }

  /**
   * Calculates the value of a given hand
   */
  getHandScore(hand: TCard[]): number {
    let score = 0;
    let aceCount = 0;

    // eslint-disable-next-line no-unused-vars
    for (let [type, value] of hand) {
      value === "A" ? aceCount++ : (score += this.getCardValue(value || "0"));
    }

    for (let aceIndex = 0; aceIndex < aceCount; aceIndex++) {
      score + ACE_MAX_VALUE > WINNING_SCORE
        ? (score += ACE_MIN_VALUE)
        : (score += ACE_MAX_VALUE);
    }

    return score;
  }
}
