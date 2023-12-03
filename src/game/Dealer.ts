import { Player } from "./Player";

export class Dealer extends Player implements IDealer {
  constructor() {
    super();
  }

  /**
   * Dealer plays until it reaches 17 or more
   */
  playTurn(drawCardCallback: () => TCard): number {
    while (this.calculateScore() < 17) {
      this.addCard(drawCardCallback());
    }

    return this.calculateScore();
  }

  /**
   * Queue hand score calculation the value of the player's hand
   */
  calculateScore(hideFirstCard: boolean = false): number {
    return this.getHandScore(hideFirstCard ? this.hand.slice(1) : this.hand);
  }
}
