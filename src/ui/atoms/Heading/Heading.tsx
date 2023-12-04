import React from "react";
import "./styles.scss";

type THeadingProps = {
  level: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

class Heading extends React.Component<THeadingProps> {
  constructor(props: THeadingProps) {
    super(props);
  }

  render() {
    const HeadingTag = `h${this.props.level}`;

    return React.createElement(
      HeadingTag,
      {
        style: this.props.style,
        className: `Heading Heading--${HeadingTag}`,
      },
      this.props.children
    );
  }
}

export default Heading;
