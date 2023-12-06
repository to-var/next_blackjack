import * as gameController from "@/game/controllers/gameController";

export const dynamic = "force-dynamic";
export async function GET() {
  const clientData = await gameController.createGame();

  return Response.json(clientData, { status: 200 });
}
