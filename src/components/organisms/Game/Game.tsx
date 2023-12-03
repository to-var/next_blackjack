import React from "react";
import * as gameClient from "@/lib/api/gameClient";
import { GAME_TEXT, REQUEST_ERROR } from "@/utils/constants";
import Molecules from "@/components/molecules";
import Organisms from "../index";
import "./styles.scss";

class Game extends React.Component<object, TGameState> {
  constructor(props: object) {
    super(props);
    this.state = {
      gameData: null,
      error: null,
      isLoading: false,
    };
  }

  private handleGameStart = async () => {
    // Reset state
    this.setState({
      gameData: null,
      error: null,
      isLoading: true,
    });

    // Fetch new game data
    const data = await gameClient.gameStart();

    if (data.error) {
      this.setState({ error: new Error(REQUEST_ERROR), isLoading: false });
      return;
    }

    // Update state with new game data
    this.setState({ gameData: data, isLoading: false });
  };

  private handleHit = async () => {
    if (!this?.state?.gameData?.id) return;

    const data = await gameClient.gameHit(this.state.gameData.id);

    if (data.error) {
      this.setState({ error: new Error(REQUEST_ERROR) });
      return;
    }

    this.setState({ gameData: data });
  };

  private handleStand = async () => {
    if (!this?.state?.gameData?.id) return;

    const data = await gameClient.gameStand(this.state.gameData.id);

    if (data.error) {
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
                  score={gameData.dealerScore || 0}
                  hand={gameData.dealerHand || []}
                  isDealer
                />

                <Organisms.Player
                  label={GAME_TEXT.player}
                  score={gameData.playerScore || 0}
                  hand={gameData.playerHand || []}
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
