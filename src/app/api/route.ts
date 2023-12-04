import { GameController } from "@/game/controllers/GameController";

export async function GET() {
  const gameService = new GameController();
  const clientData = await gameService.createGame();

  return Response.json(clientData);
}
