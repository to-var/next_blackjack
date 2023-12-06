"use client";

import Organisms from "@/ui/organisms";
import gameClient from "@/game/lib/gameClient";
import { useState } from "react";
import { REQUEST_ERROR } from "@/utils/constants";

export default function Home() {
  const [gameData, setGameData] = useState<null | TGameData>(null);
  const [error, setError] = useState<null | Error>(null);
  const [isGameLoading, setIsGameLoading] = useState<boolean>(false);
  const [disabledButtons, setDisabledButtons] = useState<boolean>(false);

  const handleGameStart = async () => {
    setGameData(null);
    setError(null);
    setIsGameLoading(true);
    setDisabledButtons(false);

    const data = await gameClient.gameStart();

    if ("error" in data) {
      setError(new Error(REQUEST_ERROR));
      setIsGameLoading(false);
      return;
    }

    setGameData(data);
    setIsGameLoading(false);
  };

  const handleHit = async () => {
    if (!gameData?.id) return;

    setDisabledButtons(true);
    const data = await gameClient.gameHit(gameData.id);

    if ("error" in data) {
      setError(new Error(REQUEST_ERROR));
      return;
    }

    setGameData(data);
    setDisabledButtons(false);
  };

  const handleStand = async () => {
    if (!gameData?.id) return;

    setDisabledButtons(true);
    const data = await gameClient.gameStand(gameData.id);

    if ("error" in data) {
      setError(new Error(REQUEST_ERROR));
      return;
    }

    setGameData(data);
  };

  return (
    <main className="main">
      <Organisms.Game
        gameStartHandler={handleGameStart}
        hitHandler={handleHit}
        standHandler={handleStand}
        gameData={gameData}
        error={error}
        isGameLoading={isGameLoading}
        disabledButtons={disabledButtons}
      />
    </main>
  );
}
