import React from "react";
import "./styles.scss";
import { CARD_ICONS } from "@/utils/constants";

type TIconProps = {
  style?: React.CSSProperties;
  type: string;
};

class Icon extends React.Component<TIconProps> {
  constructor(props: TIconProps) {
    super(props);
  }

  render() {
    return (
      <span
        className={`Icon Icon--${this.props.type}`}
        style={this.props.style}
        aria-hidden
      >
        {CARD_ICONS[this.props.type as keyof typeof CARD_ICONS]}
      </span>
    );
  }
}

export default Icon;
