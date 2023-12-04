import React from "react";
import "./styles.scss";

type TButtonProps = {
  onClick: () => void;
  type: "large" | "primary" | "secondary";
  disabled?: boolean;
  children: React.ReactNode;
};

class Button extends React.Component<TButtonProps> {
  constructor(
    props: TButtonProps = { onClick: () => {}, type: "primary", children: null }
  ) {
    super(props);
  }

  render() {
    const disabled = this.props.disabled;
    const className = [
      "Button",
      `Button__${this.props.type}`,
      `${disabled ? "Button--disabled" : ""}`,
    ];

    return (
      <button
        className={className.join(" ").trim()}
        onClick={this.props.onClick}
        disabled={disabled}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
