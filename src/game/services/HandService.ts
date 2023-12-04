import { ACE_MAX_VALUE, ACE_MIN_VALUE, WINNING_SCORE } from "@/utils/constants";
import { CardService } from "./CardService";

export class HandService {
  public cards: TCard[];
  public isBust: boolean;
  public score: number;

  constructor(cards: TCard[], concealFirstCard: boolean = false) {
    const [firstCard, ...restCards] = cards;

    this.cards = concealFirstCard ? [[null, null], ...restCards] : cards;
    this.score = this.getHandScore();
    this.isBust = this.score > WINNING_SCORE;
  }

  /**
   * Calculates the value of a given hand
   */
  public getHandScore(hideFirstCardValue: boolean = false): number {
    let score = 0;
    let aceCount = 0;
    const cardCollection = hideFirstCardValue
      ? this.cards.slice(1)
      : this.cards;

    // eslint-disable-next-line no-unused-vars
    for (let [type, value] of cardCollection) {
      value === "A"
        ? aceCount++
        : (score += CardService.getCardValue(value || "0"));
    }

    for (let aceIndex = 0; aceIndex < aceCount; aceIndex++) {
      score + ACE_MAX_VALUE > WINNING_SCORE
        ? (score += ACE_MIN_VALUE)
        : (score += ACE_MAX_VALUE);
    }

    return score;
  }

  public addCard(card: TCard): void {
    this.cards.push(card);
    this.score = this.getHandScore();
  }
}
