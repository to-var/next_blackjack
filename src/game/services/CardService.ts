import { KQJ_VALUE } from "@/utils/constants";

export class CardService {
  /**
   * Calculates the value of a given card
   */
  static getCardValue(cardValue: string): number {
    switch (cardValue) {
      case "J":
      case "Q":
      case "K":
        return KQJ_VALUE;
      default:
        return parseInt(cardValue);
    }
  }
}
