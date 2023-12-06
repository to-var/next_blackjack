import { GameService } from "@/game/services/GameService";

describe("GameService", () => {
  let gameService: GameService;
  const apiData: TGameData = {
    id: "2",
    deck: [
      ["hearts", "2"],
      ["spades", "2"],
      ["spades", "2"],
      ["spades", "2"],
      ["spades", "2"],
      ["spades", "2"],
      ["spades", "2"],
      ["spades", "2"],
      ["spades", "2"],
      ["spades", "2"],
    ],
    playerhand: [
      ["diamonds", "A"],
      ["spades", "A"],
    ],
    dealerhand: [
      ["clubs", "A"],
      ["hearts", "A"],
    ],
    playerscore: 12,
    dealerscore: 12,
    winner: "",
  };

  beforeEach(() => {
    gameService = new GameService();
  });

  describe("createApiData", () => {
    let apiData: TGameData;

    beforeEach(() => {
      apiData = gameService.createApiData();
    });

    it("should create new game data", () => {
      expect(gameService.apiData).toBeDefined();
      expect(gameService.clientData).toBeDefined();
    });

    it("should create a player and a dealer with 2 cards each", () => {
      expect(apiData.playerhand).toHaveLength(2);
      expect(apiData.dealerhand).toHaveLength(2);
    });

    it("should start without a winner", () => {
      expect(apiData.winner).toBe("");
    });
  });

  describe("getClientData", () => {
    it("should format api data into client data", () => {
      const clientData = GameService.getClientData(apiData);
      const { deck, ...restData } = apiData;

      expect(clientData).toMatchObject({
        ...restData,
        dealerhand: [
          [null, null],
          ["hearts", "A"],
        ],
        dealerscore: 11,
      });
    });
  });

  describe("playerHit", () => {
    it("should request a new card to deck service", () => {
      const gameData = { ...apiData };
      const expectedDeckLength = gameData.deck.length - 1;
      const updatedGameData = GameService.playerHit(gameData);

      expect(updatedGameData.deck.length).toBe(expectedDeckLength);
      expect(updatedGameData.playerhand).toHaveLength(
        apiData.playerhand.length + 1
      );
      expect(updatedGameData.playerscore).not.toBe(apiData.playerscore);
    });
  });

  describe("playerStand", () => {
    it("should make the player stand and let the dealer play", () => {
      const initialDealerHand: TCard[] = [
        ["clubs", "2"],
        ["clubs", "2"],
      ];
      const expectedHandLength = initialDealerHand.length;
      const updatedGameData = GameService.playerStand({
        ...apiData,
        playerscore: 21,
        dealerhand: initialDealerHand,
        dealerscore: 4,
      });

      expect(updatedGameData.dealerhand.length).toBeGreaterThan(
        expectedHandLength
      );
    });
  });

  describe("resolve", () => {
    it("should resolve the game based on dealer and player scores", () => {
      const dealerScore = 17;
      const playerScore = 20;

      const result = GameService.resolve(dealerScore, playerScore);

      // assert the game result
      expect(result).toBeDefined();
      // add more assertions as needed
    });
  });
});
