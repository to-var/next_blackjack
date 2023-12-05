import React from "react";
import Molecules from "@/ui/molecules";
import Organisms from "@/ui/organisms";
import Atoms from "@/ui/atoms";
import { GAME_TEXT } from "@/utils/constants";
import "./styles.scss";

export type TGameProps = {
  gameData: TGameData | null;
  error: Error | string | null;
  isGameLoading: boolean;
  disabledButtons: boolean;
  gameStartHandler: () => void;
  hitHandler: () => void;
  standHandler: () => void;
};

class Game extends React.Component<TGameProps, TGameState> {
  constructor(props: TGameProps) {
    super(props);
  }

  render() {
    const { gameData, error, isGameLoading } = this.props;

    return (
      <div className="Game">
        {gameData?.winner?.length ? (
          <Molecules.Results
            winner={gameData.winner}
            newGameCallback={this.props.gameStartHandler}
          />
        ) : null}

        {isGameLoading ? <Atoms.Spinner /> : null}

        <div className="Game__table">
          <>
            {!error && !gameData?.id && !isGameLoading ? (
              <Molecules.Intro newGameCallback={this.props.gameStartHandler} />
            ) : null}

            {error && !isGameLoading ? <Molecules.Error error={error} /> : null}

            {!error && gameData && gameData.id ? (
              <>
                <Organisms.Player
                  label={GAME_TEXT.dealer}
                  score={gameData.dealerscore as number}
                  hand={gameData.dealerhand as []}
                  isDealer
                />

                <Organisms.Player
                  label={GAME_TEXT.player}
                  score={gameData.playerscore as number}
                  hand={gameData.playerhand as []}
                >
                  <Molecules.ActionsPanel
                    hitCallback={this.props.hitHandler}
                    standCallback={this.props.standHandler}
                    disabledButtons={this.props.disabledButtons}
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
