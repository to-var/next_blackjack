import React from "react";
import { GAME_TEXT } from "@/utils/constants";
import "./styles.scss";
import Atoms from "@/ui/atoms";

export type TActionsPanelProps = {
  hitCallback: () => void;
  standCallback: () => void;
  disabledButtons: boolean;
};

class ActionsPanel extends React.Component<TActionsPanelProps> {
  constructor(props: TActionsPanelProps) {
    super(props);
  }

  render() {
    return (
      <div className="ActionsPanel">
        <Atoms.Button
          onClick={this.props.hitCallback}
          type="secondary"
          disabled={this.props.disabledButtons}
        >
          {GAME_TEXT.hit}
        </Atoms.Button>
        <Atoms.Button
          onClick={this.props.standCallback}
          type="secondary"
          disabled={this.props.disabledButtons}
        >
          {GAME_TEXT.stand}
        </Atoms.Button>
      </div>
    );
  }
}

export default ActionsPanel;
