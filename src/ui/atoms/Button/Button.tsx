import React from "react";
import "./styles.scss";

type TButtonProps = {
  onClick: () => void;
  type: "large" | "primary" | "secondary";
  children: React.ReactNode;
};

class Button extends React.Component<TButtonProps> {
  constructor(
    props: TButtonProps = { onClick: () => {}, type: "primary", children: null }
  ) {
    super(props);
  }

  render() {
    return (
      <button
        className={`Button Button--${this.props.type}`}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
