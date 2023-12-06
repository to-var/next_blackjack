import { HandService } from "@/game/services/HandService";

describe("Services: HandService", () => {
  let handService: HandService;

  beforeEach(() => {
    handService = new HandService([]);
  });

  it("should start with initial data", () => {
    expect(handService.cards).toEqual([]);
    expect(handService.isBust).toBe(false);
    expect(handService.score).toBe(0);
  });

  describe("addCard", () => {
    it("should add a card to the hand", () => {
      const expectedCard: TCard = ["spades", "1"];
      handService.addCard(expectedCard);
      expect(handService.cards).toEqual([expectedCard]);
    });
  });

  describe("getHandScore", () => {
    it("should return the correct score for a hand with no aces", () => {
      const cards: TCard[] = [
        ["spades", "2"],
        ["hearts", "2"],
        ["clubs", "2"],
        ["diamonds", "2"],
      ];
      handService = new HandService(cards);
      expect(handService.getHandScore()).toBe(8);
    });

    it("should return the correct score for a hand with one ace", () => {
      const cards: TCard[] = [
        ["spades", "2"],
        ["hearts", "2"],
        ["clubs", "2"],
        ["diamonds", "2"],
        ["diamonds", "A"],
      ];
      handService = new HandService(cards);
      expect(handService.getHandScore()).toBe(19);
    });

    it("should return the correct score for a hand with multiple aces", () => {
      const cards: TCard[] = [
        ["spades", "A"],
        ["hearts", "A"],
        ["clubs", "A"],
      ];
      handService = new HandService(cards);
      expect(handService.getHandScore()).toBe(13);
    });

    it("should return the correct score when their combined min value exceed winning score", () => {
      const cards: TCard[] = [
        ["spades", "K"],
        ["spades", "K"],
        ["spades", "2"],
        ["spades", "A"],
      ];
      handService = new HandService(cards);
      expect(handService.getHandScore()).toBe(23);
    });

    it("should calculate the value of the dealer's hand hiding the first card", () => {
      const cards: TCard[] = [
        ["spades", "K"],
        ["hearts", "2"],
      ];
      handService = new HandService(cards, true);
      expect(handService.getHandScore(true)).toBe(2);
    });
  });
});
