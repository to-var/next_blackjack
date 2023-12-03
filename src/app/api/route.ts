import gameService from "@/lib/api/gameService";

export async function GET() {
  const newGame = gameService.createGame();
  const gameData = gameService.getGameData(newGame.id);

  if (gameData instanceof Error) {
    return new Response(gameData.message, { status: 404 });
  }

  return Response.json(gameData);
}
