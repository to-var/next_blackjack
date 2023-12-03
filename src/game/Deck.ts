import { CARD_SUITS, CARD_VALUES } from "@/utils/constants";

export class Deck implements IDeck {
  cards: TCard[];

  constructor() {
    this.cards = this.createDeck();
  }

  /**
   * Creates and randomizes a deck of cards
   */
  private createDeck(): TCard[] {
    let deck: TCard[] = [];

    for (let suit of CARD_SUITS) {
      for (let value of CARD_VALUES) {
        deck.push([suit, value]);
      }
    }

    return this.shuffle(deck);
  }

  /**
   * Randomizes the order of the cards in the deck
   */
  private shuffle(deck: TCard[]): TCard[] {
    let currentIndex: number = deck.length;
    let randomIndex: number;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [deck[currentIndex], deck[randomIndex]] = [
        deck[randomIndex],
        deck[currentIndex],
      ];
    }

    return deck;
  }

  /**
   * Draws a card from the deck
   */
  drawCard(): TCard {
    return this.cards.pop() as TCard;
  }
}
