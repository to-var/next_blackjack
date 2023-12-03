import { SIMULTANEUS_GAMES_LIMIT } from "@/utils/constants";
import { Game } from "@/game/Game";

export class GameService {
  pool: { [key: string]: Game }[];
  gameLimit: number;

  constructor(gameLimit = SIMULTANEUS_GAMES_LIMIT) {
    this.pool = [];
    this.gameLimit = gameLimit;
  }

  /**
   * Creates a new game and adds it to the pool
   */
  createGame(): Game {
    if (this.pool.length + 1 > this.gameLimit) {
      this.clearPool();
    }

    const newGame = new Game();

    const gameData = newGame.getGameData();
    this.pool.push({ [gameData.id as string]: newGame });
    newGame.startGame();

    return newGame;
  }

  /**
   * Finds a game in the pool
   */
  getGameObject(gameId: string): Game | Error {
    return (
      this.pool.find((game) => game[gameId])?.[gameId] ||
      new Error(`Game id [${gameId}] not found`)
    );
  }

  /**
   * Get data from a game in the pool
   */
  getGameData(gameId: string): TGameData | Error {
    const game = this.getGameObject(gameId);
    return game instanceof Error ? game : game.getGameData();
  }

  /**
   * Execute player Hit action
   */
  executeHit(gameId: string): TGameData | Error {
    const game = this.getGameObject(gameId);

    if (game instanceof Error) return game;

    game.playerHit();
    return game.getGameData();
  }

  /**
   * Execute player Stand action
   */
  executeStand(gameId: string): TGameData | Error {
    const game = this.getGameObject(gameId);
    if (game instanceof Error) return game;

    game.playerStand();
    const gameData = game.getGameData(true);

    this.closeGame(gameId);

    return gameData;
  }

  /**
   * Closes a game and removes it from the pool
   */
  closeGame(gameId: string) {
    const game = this.getGameObject(gameId);
    if (game instanceof Error) return game;

    this.pool = this.pool.filter((game) => !game[gameId]);
  }

  /**
   * Clear the game pool
   */
  clearPool() {
    this.pool = [];
  }
}
