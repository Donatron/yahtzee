import React, { Component } from "react";
import { connect } from "react-redux";
import { saveScore, hideSaveButton } from "../../actions";

import Dice from "../Dice/Dice";
import ScoreTable from "../ScoreTable/ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;
const SCORES_FILLED = 0;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: true,
      gameCompleted: false,
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
    this.getTotalScore = this.getTotalScore.bind(this);
    this.saveScoreCard = this.saveScoreCard.bind(this);
    this.replayGame = this.replayGame.bind(this);
  }

  componentDidMount() {
    const { auth } = this.props;

    if (auth.id) {
      this.setState({
        playing: true,
        playerType: "member"
      });

      this.animateRoll();
    }
  }

  playAsGuest() {
    this.setState({
      playing: true,
      playerType: "guest"
    });
    this.animateRoll();
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
    // Prevent Scores being saved on game load
    if (this.state.rollsLeft === 3 && this.state.scoresFilled === 0) {
      return;
    }
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      scoresFilled: st.scoresFilled + 1,
      locked: Array(NUM_DICE).fill(false)
    }));

    this.animateRoll();

    if (this.state.scoresFilled === 12) {
      this.setState({
        gameCompleted: true
      });
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

  getTotalScore() {
    const { scores } = this.state;
    let totalScore = 0;

    for (let score in scores) {
      totalScore += scores[score];
    }

    return totalScore;
  }

  saveScoreCard() {
    const {
      ones,
      twos,
      threes,
      fours,
      fives,
      sixes,
      threeOfKind,
      fourOfKind,
      fullHouse,
      smallStraight,
      largeStraight,
      yahtzee,
      chance
    } = this.state.scores;

    const { username } = this.props.profile;

    const totalScore = this.getTotalScore();

    const scoreData = {
      playerName: username,
      totalScore,
      ones,
      twos,
      threes,
      fours,
      fives,
      sixes,
      threeOfKind,
      fourOfKind,
      fullHouse,
      smallStraight,
      largeStraight,
      yahtzee,
      chance
    };

    this.props.saveScore(scoreData);
  }

  replayGame() {
    this.props.hideSaveButton();

    this.setState({
      gameCompleted: false,
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
    });
  }

  render() {
    const {
      playing,
      gameCompleted,
      dice,
      locked,
      rollsLeft,
      rolling,
      scores
    } = this.state;

    const {
      score,
      auth: { isAuthenticated }
    } = this.props;

    return (
      <div className="Game">
        <header className="Game-header">
          <h1 className="App-title">Yahtzee!</h1>
          {gameCompleted && isAuthenticated ? (
            <section className="Game-completed-section">
              {score.showSaveButton ? (
                <div className="Game-save">
                  <h4>Congratulations! You scored {this.getTotalScore()}</h4>
                  <p>What would you like to do?</p>
                  <button onClick={this.saveScoreCard} className="Game-reroll">
                    Save Score Card
                  </button>
                </div>
              ) : (
                ""
              )}
              <button onClick={this.replayGame} className="Game-reroll">
                Play again
              </button>
            </section>
          ) : (
            ""
          )}
          {playing && !gameCompleted ? (
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
            ""
          )}
        </header>
        {playing ? <ScoreTable doScore={this.doScore} scores={scores} /> : ""}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    score: state.score,
    profile: state.profile.profile
  };
};

export default connect(
  mapStateToProps,
  { saveScore, hideSaveButton }
)(Game);
