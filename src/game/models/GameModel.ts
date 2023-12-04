import { createKysely } from "@vercel/postgres-kysely";
import { TABLE_NAME } from "@/utils/constants";
import { sql } from "kysely";

interface IGamesTable {
  id: string;
  deck: string;
  playerhand: string;
  dealerhand: string;
  playerscore: number;
  dealerscore: number;
  winner: string;
}

interface IDatabase {
  [TABLE_NAME]: IGamesTable;
}

class GameModel {
  async getPoolSize() {
    const db = createKysely<IDatabase>();
    const data = await db.selectFrom(TABLE_NAME).selectAll().execute();

    return data.length;
  }

  async createTable() {
    const db = createKysely<IDatabase>();
    await db.schema
      .createTable(TABLE_NAME)
      .ifNotExists()
      .addColumn("id", "text", (col) => col.primaryKey())
      .addColumn("deck", "varchar(1200)")
      .addColumn("playerHand", "varchar(500)")
      .addColumn("dealerHand", "varchar(500)")
      .addColumn("playerScore", "integer")
      .addColumn("dealerScore", "integer")
      .addColumn("winner", "text")
      .execute();
  }

  async createGame(gameData: TGameData) {
    if (typeof gameData.id !== "string") {
      throw new Error("gameData.id must be a string");
    }

    const values = {
      id: gameData.id,
      deck: JSON.stringify(gameData.deck as object),
      playerhand: JSON.stringify(gameData.playerhand as object),
      dealerhand: JSON.stringify(gameData.dealerhand as object),
      playerscore: gameData.playerscore || 0,
      dealerscore: gameData.dealerscore || 0,
      winner: gameData.winner || "",
    };

    const db = createKysely<IDatabase>();
    await db
      .insertInto(TABLE_NAME)
      .values(values)
      .returning("id")
      .$assertType<{ id: string }>()
      .executeTakeFirst();
  }

  async updateGame(gameId: string, gameData: Partial<TGameData>) {
    const db = createKysely<IDatabase>();
    const values = {
      id: gameData.id,
      deck: JSON.stringify(gameData.deck as object),
      playerhand: JSON.stringify(gameData.playerhand as object),
      dealerhand: JSON.stringify(gameData.dealerhand as object),
      playerscore: gameData.playerscore || 0,
      dealerscore: gameData.dealerscore || 0,
      winner: gameData.winner || "",
    };

    await db
      .updateTable(TABLE_NAME)
      .set(values)
      .where("id", "=", gameId)
      .execute();
  }

  async getGameById(gameId: string) {
    const db = createKysely<IDatabase>();
    const data = await db
      .selectFrom(TABLE_NAME)
      .selectAll()
      .where("id", "=", gameId)
      .execute();

    const formattedResponse = data.map((row) => ({
      ...row,
      deck: JSON.parse(row.deck),
      playerhand: JSON.parse(row.playerhand),
      dealerhand: JSON.parse(row.dealerhand),
    }));

    return formattedResponse[0] || null;
  }

  async clearGameTable() {
    const db = createKysely<IDatabase>();
    await db.deleteFrom(TABLE_NAME).execute();
  }
}

export default GameModel;
