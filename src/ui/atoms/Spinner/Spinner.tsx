import React from "react";
import "./styles.scss";

export default class Spinner extends React.Component {
  render() {
    return (
      <div className="Spinner">
        <div className="Spinner__circle"></div>
      </div>
    );
  }
}
