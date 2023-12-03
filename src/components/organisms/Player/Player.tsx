import React from "react";
import Molecules from "@/components/molecules";
import "./styles.scss";

type TPlayerProps = {
  label: string;
  score: number;
  hand: TCard[];
  isDealer?: boolean;
  children?: React.ReactNode;
};

class Player extends React.Component<TPlayerProps> {
  wrapperClass: string;

  constructor(props: TPlayerProps) {
    super(props);
    this.wrapperClass = props.isDealer ? "Player Player--dealer" : "Player";
  }

  render() {
    return (
      <>
        <div className={this.wrapperClass}>
          <Molecules.PlayerInfo
            label={this.props.label}
            score={this.props.score}
          />

          <Molecules.PlayerHand
            hand={this.props.hand}
            isDealer={this.props.isDealer}
          />

          {this.props.children ? (
            <div className="Player__actions">{this.props.children}</div>
          ) : null}
        </div>
      </>
    );
  }
}

export default Player;
