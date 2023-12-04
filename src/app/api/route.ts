import { GameController } from "@/game/controllers/GameController";

export const dynamic = "force-dynamic";
export async function GET() {
  const gameController = new GameController();
  const clientData = await gameController.createGame();

  return Response.json(clientData, { status: 200 });
}
