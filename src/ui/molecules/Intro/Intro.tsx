import React from "react";
import { GAME_TEXT, CARD_ICONS } from "@/utils/constants";
import "./styles.scss";
import Atoms from "@/ui/atoms";

export type TIntroProps = {
  newGameCallback: () => void;
};

class Intro extends React.Component<TIntroProps> {
  constructor(props: TIntroProps) {
    super(props);
  }

  render() {
    return (
      <section className="Intro">
        <div className="Intro__icons">
          {Object.keys(CARD_ICONS).map((icon) => (
            <Atoms.Icon key={`icon-${icon}`} type={icon} />
          ))}
        </div>

        <div className="Intro__heading">
          <Atoms.Heading level={1}>{GAME_TEXT.title}</Atoms.Heading>
        </div>

        <div className="Intro__description">
          <Atoms.Text size={1} type="primary">
            {GAME_TEXT.description}
          </Atoms.Text>
        </div>

        <Atoms.Button onClick={this.props.newGameCallback} type="primary">
          {GAME_TEXT.play}
        </Atoms.Button>
      </section>
    );
  }
}

export default Intro;
