import { GameController } from "@/game/controllers/GameController";

export const dynamic = "force-dynamic";
export async function POST(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  const { gameId } = params;
  const gameData = await GameController.executeStand(gameId);

  if (gameData instanceof Error) {
    return new Response(gameData.message, { status: 404 });
  }

  return new Response(JSON.stringify(gameData), { status: 200 });
}
