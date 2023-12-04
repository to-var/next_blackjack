import React from "react";
import Molecules from "@/ui/molecules";
import Organisms from "@/ui/organisms";
import Atoms from "@/ui/atoms";
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
      isGameLoading: false,
      isLoadingDeck: false,
    };
    this.gameClient = new GameClient();
  }

  private handleGameStart = async () => {
    this.setState({
      gameData: null,
      error: null,
      isGameLoading: true,
    });

    const data = await this.gameClient.gameStart();

    if ("error" in data) {
      this.setState({ error: new Error(REQUEST_ERROR), isGameLoading: false });
      return;
    }

    this.setState({ gameData: data, isGameLoading: false });
  };

  private handleHit = async () => {
    if (!this?.state?.gameData?.id) return;

    this.setState({ isLoadingDeck: true });
    const data = await this.gameClient.gameHit(this.state.gameData.id);

    if ("error" in data) {
      this.setState({ error: new Error(REQUEST_ERROR) });
      return;
    }

    this.setState({ gameData: data, isLoadingDeck: false });
  };

  private handleStand = async () => {
    if (!this?.state?.gameData?.id) return;

    this.setState({ isLoadingDeck: true });
    const data = await this.gameClient.gameStand(this.state.gameData.id);

    if ("error" in data) {
      this.setState({ error: new Error(REQUEST_ERROR) });
      return;
    }

    this.setState({ gameData: data, isLoadingDeck: false });
  };

  render() {
    const { gameData, error, isGameLoading } = this.state;

    return (
      <div className="Game">
        {gameData?.winner?.length ? (
          <Molecules.Results
            winner={gameData.winner}
            newGameCallback={this.handleGameStart}
          />
        ) : null}

        {isGameLoading ? <Atoms.Spinner /> : null}

        <div className="Game__table">
          <>
            {!error && !gameData?.id && !isGameLoading ? (
              <Molecules.Intro newGameCallback={this.handleGameStart} />
            ) : null}

            {error && !isGameLoading ? <Molecules.Error error={error} /> : null}

            {!error && gameData && gameData.id ? (
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
                    isLoadingDeck={this.state.isLoadingDeck}
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
