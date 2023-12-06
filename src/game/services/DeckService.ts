import { CARD_SUITS, CARD_VALUES } from "@/utils/constants";

export class DeckService {
  public deck: TCard[] = [];

  constructor(deck?: TCard[]) {
    this.deck = deck || this.createDeck();
  }

  /**
   * Randomizes the order of the cards in the deck
   */
  private shuffleDeck() {
    let currentIndex: number = this.deck.length;
    let randomIndex: number;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.deck[currentIndex], this.deck[randomIndex]] = [
        this.deck[randomIndex],
        this.deck[currentIndex],
      ];
    }
  }

  /**
   * Creates and randomizes a deck of cards
   */
  private createDeck(): TCard[] {
    for (let suit of CARD_SUITS) {
      for (let value of CARD_VALUES) {
        this.deck.push([suit, value]);
      }
    }

    this.shuffleDeck();
    return this.deck;
  }

  /**
   * Draws a card from the deck
   */
  drawCards(cardCount: number = 2): { drawnCards: TCard[]; newDeck: TCard[] } {
    let drawnCards = [];

    for (let i = 0; i < cardCount; i++) {
      drawnCards.push(this.deck.pop() as TCard);
    }

    return { drawnCards, newDeck: this.deck };
  }
}
