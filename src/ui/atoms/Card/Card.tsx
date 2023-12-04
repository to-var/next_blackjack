import React from "react";
import { GAME_TEXT } from "@/utils/constants";
import "./styles.scss";

type TCardProps = {
  data: TCard;
  style?: React.CSSProperties;
};

class Card extends React.Component<TCardProps> {
  constructor(props: TCardProps) {
    super(props);
  }

  render() {
    // Format card type and value depending if it's a hidden card
    const type = this.props.data[0] ? this.props.data[0] : "hidden";
    const value = this.props.data[1] ? this.props.data[1] : "?";

    const ariaLabel =
      this.props.data === null
        ? GAME_TEXT.hiddenCardAriaLabel
        : `${type} - ${value} - ${GAME_TEXT.cardAriaLabel}}`;

    return (
      <div
        className={`Card Card--${type}`}
        aria-label={ariaLabel}
        style={this.props.style}
      >
        <div className="Card__value" aria-hidden data-content={value} />
      </div>
    );
  }
}

export default Card;
