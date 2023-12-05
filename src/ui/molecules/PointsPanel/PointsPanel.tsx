import React from "react";
import "./styles.scss";
import Atoms from "@/ui/atoms";

export type TPointsPanelProps = {
  label: string;
  score: number;
};

class PointsPanel extends React.Component<TPointsPanelProps> {
  constructor(props: TPointsPanelProps) {
    super(props);
  }

  render() {
    return (
      <div className="PointsPanel">
        <div className="PointsPanel__label">
          <Atoms.Text size={2} shadow={true} type="primary">
            {this.props.label}
          </Atoms.Text>
        </div>
        <div className="PointsPanel__score">
          <Atoms.Text size={4} shadow={true} type="secondary">
            {this.props.score}
          </Atoms.Text>
        </div>
      </div>
    );
  }
}

export default PointsPanel;
