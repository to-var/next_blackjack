import { SIMULTANEUS_GAMES_LIMIT } from "@/utils/constants";
import * as gameModel from "@/game/models/gameModel";
import { GameService } from "@/game/services/GameService";

export const createGame = async () => {
  const poolSize = await gameModel.getPoolSize();

  if (poolSize + 1 > SIMULTANEUS_GAMES_LIMIT) {
    await gameModel.clearGameTable();
  }

  const gameService = new GameService();
  await gameModel.createGame(gameService.apiData);

  return gameService.clientData;
};

export const getApiData = async (gameId: string) => {
  const results = await gameModel.getGameById(gameId);

  return results && results.id
    ? results
    : new Error(`Game id [${gameId}] not found`);
};

export const getClientData = async (
  gameId: string
): Promise<TGameData | Error> => {
  const game = await getApiData(gameId);
  return game instanceof Error ? game : GameService.getClientData(game);
};

export const executeHit = async (
  gameId: string
): Promise<TGameData | Error> => {
  const game = await getApiData(gameId);

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
};

export const executeStand = async (
  gameId: string
): Promise<TGameData | Error> => {
  const game = await getApiData(gameId);

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
};

export const closeGame = async (gameId: string) => {
  await gameModel.deleteGame(gameId);
};
