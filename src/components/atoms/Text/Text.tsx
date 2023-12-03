import React from "react";
import "./styles.scss";

type TTextProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  shadow?: boolean;
  size: number;
  type: "primary" | "secondary";
};

class Text extends React.Component<TTextProps> {
  constructor(props: TTextProps) {
    super(props);
  }

  render() {
    const className = [
      `Text Text__${this.props.type}`,
      `Text--size-${this.props.size}`,
      this.props.shadow ? "Text--shadow" : "",
    ]
      .join(" ")
      .trim();

    return (
      <p className={className} style={this.props.style}>
        {this.props.children}
      </p>
    );
  }
}

export default Text;
