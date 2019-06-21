import React, { Component } from "react";
import { Link } from "react-router-dom";

import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;
const SCORES_FILLED = 0;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      playerType: null,
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      rolling: false,
      scoresFilled: SCORES_FILLED,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };

    this.playAsGuest = this.playAsGuest.bind(this);
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.animateRoll = this.animateRoll.bind(this);
    this.renderGameBoard = this.renderGameBoard.bind(this);
    this.renderGameWelcome = this.renderGameWelcome.bind(this);
  }

  componentDidMount() {
    this.animateRoll();
  }

  playAsGuest() {
    this.setState({
      playing: true,
      playerType: "guest"
    });
  }

  animateRoll() {
    this.setState({ rolling: true }, () => {
      setTimeout(this.roll, 1000);
    });
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      rolling: false
    }));

    console.log(this.state.scoresFilled);
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    if (this.state.rollsLeft > 0) {
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ]
      }));
    }
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      scoresFilled: st.scoresFilled + 1,
      locked: Array(NUM_DICE).fill(false)
    }));

    if (this.state.scoresFilled < 12) {
      this.animateRoll();
    }
  }

  displayRollInfo() {
    const messages = [
      "0 Rolls Left",
      "1 Roll Left",
      "2 Rolls Left",
      "Starting Round"
    ];

    return messages[this.state.rollsLeft];
  }

  renderGameBoard() {
    return <h1>Game board will go here</h1>;
  }

  renderGameWelcome() {
    return (
      <div className="Game-welcome">
        <h2 className="Game-welcome-title">
          Your one-stop, online Yahtzee app
        </h2>
        <p>
          Either play as a guest, or create account and log in to save your
          scores and compete against your friends.
        </p>
        <div className="Game-welcome-button-wrapper">
          <Link onClick={this.playAsGuest}>Play as a guest</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Log In</Link>
        </div>
      </div>
    );
  }

  render() {
    const { playing, dice, locked, rollsLeft, rolling, scores } = this.state;
    return (
      <div className="Game">
        <header className="Game-header">
          <h1 className="App-title">Yahtzee!</h1>
          {playing ? (
            <section className="Game-dice-section">
              <Dice
                dice={dice}
                locked={locked}
                handleClick={this.toggleLocked}
                disabled={rollsLeft === 0}
                rolling={rolling}
              />
              <div className="Game-button-wrapper">
                <button
                  className="Game-reroll"
                  disabled={locked.every(x => x) || rollsLeft === 0 || rolling}
                  onClick={this.animateRoll}
                >
                  {this.displayRollInfo()}
                </button>
              </div>
            </section>
          ) : (
            this.renderGameWelcome()
          )}
        </header>
        {playing ? <ScoreTable doScore={this.doScore} scores={scores} /> : ""}
      </div>
    );
  }
}

export default Game;
