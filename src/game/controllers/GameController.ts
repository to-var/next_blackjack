import { SIMULTANEUS_GAMES_LIMIT } from "@/utils/constants";
import GameModel from "@/game/models/GameModel";
import { GameService } from "@/game/services/GameService";

const gameModel = new GameModel();
export class GameController {
  /**
   * Creates a new game and adds it to the pool
   */
  async createGame() {
    const poolSize = await gameModel.getPoolSize();

    if (poolSize + 1 > SIMULTANEUS_GAMES_LIMIT) {
      await gameModel.clearGameTable();
    }

    const gameService = new GameService();
    await gameModel.createGame(gameService.apiData);

    return gameService.clientData;
  }

  /**
   * Finds a game in the pool
   */
  static async getApiData(gameId: string) {
    const gameModel = new GameModel();
    const results = await gameModel.getGameById(gameId);

    return results && results.id
      ? results
      : new Error(`Game id [${gameId}] not found`);
  }

  /**
   * Get data from a game in the pool
   */
  static async getClientData(gameId: string): Promise<TGameData | Error> {
    const game = await GameController.getApiData(gameId);
    return game instanceof Error ? game : GameService.getClientData(game);
  }

  /**
   * Execute player Hit action
   */
  static async executeHit(gameId: string): Promise<TGameData | Error> {
    const game = await GameController.getApiData(gameId);

    if (game instanceof Error) return game;

    const newData = GameService.playerHit(game);

    const newGameData = {
      deck: newData.deck,
      playerhand: newData.playerhand,
      playerscore: newData.playerscore,
      winner: newData.winner,
    };

    await gameModel.updateGame(game.id, newGameData);

    return GameService.getClientData({ ...game, ...newGameData });
  }

  /**
   * Execute player Stand action
   */
  static async executeStand(gameId: string): Promise<TGameData | Error> {
    const game = await GameController.getApiData(gameId);

    if (game instanceof Error) return game;

    const newData = GameService.playerStand(game);

    const newGameData = {
      deck: newData.deck,
      dealerhand: newData.dealerhand,
      dealerscore: newData.dealerscore,
      winner: newData.winner,
    };

    await gameModel.updateGame(game.id, newGameData);

    return { ...game, ...newGameData };
  }

  /**
   * Execute player Stand action
   */
  // // executeStand(gameId: string): TGameData | Error {
  // //   const game = GameController.getApiData(gameId);
  // //   if (game instanceof Error) return game;

  // // game.playerStand();

  // /**
  //  * Dealer plays until it reaches 17 or more
  //  */
  // // playTurn(drawCardCallback: () => TCard): number {
  // //   while (this.calculateScore() < 17) {
  // //     this.addCard(drawCardCallback());
  // //   }

  // //   return this.calculateScore();
  // // }

  // //   const gameData = game.getClientData(true);

  // //   this.closeGame(gameId);

  // //   return gameData;
  // // }

  /**
   * Closes a game and removes it from the pool
   */
  // closeGame(gameId: string) {
  //   const game = GameController.getApiData(gameId);
  //   if (game instanceof Error) return game;

  //   this.pool = this.pool.filter((game) => !game[gameId]);
  // }

  /**
   * Clear the game pool
   */
  // clearPool() {
  //   this.pool = [];
  // }
}
