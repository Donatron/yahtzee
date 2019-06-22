import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  static defaultProps = {
    numberWords: ["one", "two", "three", "four", "five", "six"],
    val: Math.floor(Math.random() * 6) + 1
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.handleClick(this.props.idx);
  }

  render() {
    const { numberWords, locked, val, disabled, rolling } = this.props;

    let number = numberWords[val - 1];
    let classes = `Die fas fa-dice-${number} fa-5x `;
    if (locked) classes += "Die-locked ";
    if (rolling && !locked) classes += "Die-rolling";
    return (
      <i className={classes} onClick={this.handleClick} disabled={disabled} />
    );
  }
}

export default Die;
