import { hitEndpoint, newGameEndpoint, standEndpoint } from "@/utils/endpoints";

/**
 * Create a request to the server to start a new game.
 */
export const gameStart = async (): Promise<TGameData> => {
  try {
    const request = await fetch(newGameEndpoint);
    const data = await request.json();

    if (data.error) throw new Error(data.error);

    return data;
  } catch (error) {
    return error
      ? { error: error as Error }
      : { error: new Error("Unkwnown error") };
  }
};

/**
 * Create a request to the server to start a new game.
 */
export const gameHit = async (gameId: string): Promise<TGameData> => {
  try {
    const request = await fetch(hitEndpoint.replace("{gameId}", gameId), {
      method: "POST",
    });
    const data = await request.json();

    if (data.error) throw new Error(data.error);

    return data;
  } catch (error) {
    console.error(error);
    return { error: error as Error };
  }
};

/**
 * Create a request to the server to start a new game.
 */
export const gameStand = async (gameId: string): Promise<TGameData> => {
  try {
    const request = await fetch(standEndpoint.replace("{gameId}", gameId), {
      method: "POST",
    });
    const data = await request.json();

    if (data.error) throw new Error(data.error);

    return data;
  } catch (error) {
    console.error(error);
    return { error: error as Error };
  }
};
