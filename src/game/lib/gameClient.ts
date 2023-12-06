import { hitEndpoint, newGameEndpoint, standEndpoint } from "@/utils/endpoints";

export class GameClient {
  /**
   * Create a request to the server to start a new game.
   */
  async gameStart(): Promise<TGameData | { error: Error }> {
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
  }

  /**
   * Create a request to the server to start a new game.
   */
  async gameHit(gameId: string): Promise<TGameData | { error: Error }> {
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
  }

  /**
   * Create a request to the server to start a new game.
   */
  async gameStand(gameId: string): Promise<TGameData | { error: Error }> {
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
  }
}
