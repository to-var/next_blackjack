import React from "react";
import "./styles.scss";
import Atoms from "@/ui/atoms";

type TPlayerInfoProps = {
  label: string;
  score: number;
};

class PlayerInfo extends React.Component<TPlayerInfoProps> {
  constructor(props: TPlayerInfoProps) {
    super(props);
  }

  render() {
    return (
      <div className="PlayerInfo">
        <div className="PlayerInfo--label">
          <Atoms.Text size={2} shadow={true} type="primary">
            {this.props.label}
          </Atoms.Text>
        </div>
        <div className="PlayerInfo--score">
          <Atoms.Text size={4} shadow={true} type="secondary">
            {this.props.score}
          </Atoms.Text>
        </div>
      </div>
    );
  }
}

export default PlayerInfo;
