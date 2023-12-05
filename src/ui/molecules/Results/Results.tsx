import React from "react";
import { GAME_TEXT } from "@/utils/constants";
import "./styles.scss";
import Atoms from "@/ui/atoms";

export type TResultsProps = {
  winner: string;
  newGameCallback: () => void;
};

class Results extends React.Component<TResultsProps> {
  constructor(props: TResultsProps) {
    super(props);
  }

  render() {
    return (
      <div className="Results">
        <div className="Results__message">
          <div className="Results__message-title">
            <Atoms.Heading level={2}>{this.props.winner}</Atoms.Heading>
          </div>
          <div className="Results__message-cta">
            <Atoms.Button onClick={this.props.newGameCallback} type="primary">
              {GAME_TEXT.playAgain}
            </Atoms.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
