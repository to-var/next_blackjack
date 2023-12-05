"use client";

import React from "react";
import Atoms from "@/ui/atoms";
import "./styles.scss";

export type TErrorProps = {
  error: any;
};

class Error extends React.Component<TErrorProps> {
  constructor(props: TErrorProps) {
    super(props);
  }

  render() {
    const errormsg =
      typeof this.props.error === "string"
        ? this.props.error
        : this?.props?.error?.message || "Unkwnown Error";

    return (
      <div className="Error">
        <Atoms.Text size={3} type="primary">
          {errormsg}
        </Atoms.Text>
      </div>
    );
  }
}

export default Error;
