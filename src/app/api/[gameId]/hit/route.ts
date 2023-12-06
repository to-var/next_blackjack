import * as gameController from "@/game/controllers/gameController";

export const dynamic = "force-dynamic";
export async function POST(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  const { gameId } = params;
  const gameData = gameController.executeHit(gameId);

  if (gameData instanceof Error) {
    return new Response(gameData.message, { status: 404 });
  }

  return new Response(JSON.stringify(gameData), { status: 200 });
}
