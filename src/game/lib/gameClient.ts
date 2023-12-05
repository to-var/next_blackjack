import { hitEndpoint, newGameEndpoint, standEndpoint } from "@/utils/endpoints";

/**
 * Create a request to the server to start a new game.
 */
const gameStart = async () => {
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
const gameHit = async (gameId: string) => {
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
const gameStand = async (gameId: string) => {
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

const gameClient: TGameClient = {
  gameStart,
  gameHit,
  gameStand,
};

export default gameClient;
