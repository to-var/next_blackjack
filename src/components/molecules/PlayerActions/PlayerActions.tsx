import React from "react";
import { GAME_TEXT } from "@/utils/constants";
import "./styles.scss";
import Atoms from "@/components/atoms";

type TPlayerActionsProps = {
  hitCallback: () => void;
  standCallback: () => void;
};

class PlayerActions extends React.Component<TPlayerActionsProps> {
  constructor(props: TPlayerActionsProps) {
    super(props);
  }

  render() {
    return (
      <div className="PlayerActions">
        <Atoms.Button onClick={this.props.hitCallback} type="secondary">
          {GAME_TEXT.hit}
        </Atoms.Button>
        <Atoms.Button onClick={this.props.standCallback} type="secondary">
          {GAME_TEXT.stand}
        </Atoms.Button>
      </div>
    );
  }
}

export default PlayerActions;
