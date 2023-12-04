import React from "react";
import Atoms from "../../atoms";
import "./styles.scss";
import { CARD_ANIMATION_DELAY } from "@/utils/constants";

type TPlayerHandProps = {
  hand: TCard[];
  isDealer?: boolean;
};

type TPlayerHandState = {
  cardStyles: React.CSSProperties[];
};

class PlayerHand extends React.Component<TPlayerHandProps, TPlayerHandState> {
  constructor(props: TPlayerHandProps) {
    super(props);
    this.state = { cardStyles: [] };
  }

  componentDidMount() {
    const { cardStyles } = this.getStyles();
    setTimeout(() => {
      this.setState({ cardStyles });
    }, CARD_ANIMATION_DELAY);
  }

  componentDidUpdate(prevProps: TPlayerHandProps) {
    if (prevProps.hand.length !== this.props.hand.length) {
      const { cardStyles } = this.getStyles();
      setTimeout(() => {
        this.setState({ cardStyles });
      }, CARD_ANIMATION_DELAY);
    }
  }

  private getStyles = (): {
    cardStyles: React.CSSProperties[];
  } => {
    const cardStyles: React.CSSProperties[] = [];
    const totalCards = this.props.hand.length;
    const rotationStep = 10 / (totalCards - 1);
    const isDealer = this.props.isDealer;

    for (let cardIndex = 0; cardIndex < totalCards; cardIndex++) {
      // Calculate rotation values
      let rotationValue = (cardIndex - (totalCards - 1) / 2) * rotationStep;
      rotationValue *= isDealer ? -1 : 1;

      const isMiddleCard =
        totalCards > 2 && cardIndex > 0 && cardIndex < totalCards - 1;

      // Calculate Y position values
      const valueY = isMiddleCard ? (isDealer ? 56 : 44) : 50;
      const valueX = 50 + (cardIndex - (totalCards - 1) / 2) * 15;

      cardStyles.push({
        transform: `rotateZ(${rotationValue}deg)`,
        top: `${valueY}%`,
        left: `${valueX}%`,
        opacity: 1,
      });
    }

    return {
      cardStyles,
    };
  };

  render() {
    return (
      <div
        className={`PlayerHand PlayerHand--${
          this.props.isDealer ? "dealer" : "player"
        }`}
      >
        {this.props.hand?.map((card: TCard, index: number) => (
          <Atoms.Card
            key={`card_${index}`}
            style={this.state.cardStyles[index]}
            data={card}
          />
        ))}
      </div>
    );
  }
}

export default PlayerHand;
