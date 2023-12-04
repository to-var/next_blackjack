import React from "react";
import Molecules from "@/ui/molecules";
import Organisms from "@/ui/organisms/index";
import { GameClient } from "@/game/lib/GameClient";
import { GAME_TEXT, REQUEST_ERROR } from "@/utils/constants";
import "./styles.scss";

class Game extends React.Component<object, TGameState> {
  gameClient: GameClient;

  constructor(props: object) {
    super(props);
    this.state = {
      gameData: null,
      error: null,
      isLoading: false,
    };
    this.gameClient = new GameClient();
  }

  private handleGameStart = async () => {
    // Reset state
    this.setState({
      gameData: null,
      error: null,
      isLoading: true,
    });

    // Fetch new game data
    const data = await this.gameClient.gameStart();

    if ("error" in data) {
      this.setState({ error: new Error(REQUEST_ERROR), isLoading: false });
      return;
    }

    // Update state with new game data
    this.setState({ gameData: data, isLoading: false });
  };

  private handleHit = async () => {
    if (!this?.state?.gameData?.id) return;

    const data = await this.gameClient.gameHit(this.state.gameData.id);

    if ("error" in data) {
      this.setState({ error: new Error(REQUEST_ERROR) });
      return;
    }

    this.setState({ gameData: data });
  };

  private handleStand = async () => {
    if (!this?.state?.gameData?.id) return;

    const data = await this.gameClient.gameStand(this.state.gameData.id);

    if ("error" in data) {
      this.setState({ error: new Error(REQUEST_ERROR) });
      return;
    }

    this.setState({ gameData: data });
  };

  render() {
    const { gameData, error, isLoading } = this.state;

    return (
      <div className="Game">
        {gameData?.winner?.length ? (
          <Molecules.Results
            winner={gameData.winner}
            newGameCallback={this.handleGameStart}
          />
        ) : null}

        <div className="Game__table">
          <>
            {!error && !gameData?.id && !isLoading ? (
              <Molecules.Intro newGameCallback={this.handleGameStart} />
            ) : null}

            {error && !isLoading ? <Molecules.Error error={error} /> : null}

            {!error && !isLoading && gameData ? (
              <>
                <Organisms.Player
                  label={GAME_TEXT.dealer}
                  score={gameData.dealerscore || 0}
                  hand={gameData.dealerhand || []}
                  isDealer
                />

                <Organisms.Player
                  label={GAME_TEXT.player}
                  score={gameData.playerscore || 0}
                  hand={gameData.playerhand || []}
                >
                  <Molecules.PlayerActions
                    hitCallback={this.handleHit}
                    standCallback={this.handleStand}
                  />
                </Organisms.Player>
              </>
            ) : null}
          </>
        </div>
      </div>
    );
  }
}

export default Game;
