import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getScore, clearScore } from "../../actions";

import "./ScoreCard.css";
import ScoreTable from "../ScoreTable/ScoreTable";
import Spinner from "../Spinner/Spinner";

class ScoreCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getScore(id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.score !== this.props.score) {
      this.setState({
        scores: this.props.score.scoreCard
      });
    }
  }

  componentWillUnmount() {
    this.props.clearScore();
  }

  render() {
    const { scores } = this.state;
    console.log(scores);
    const scoreTable =
      scores.ones !== undefined ? <ScoreTable scores={scores} /> : <Spinner />;

    return (
      <div className="ScoreCard">
        <div className="nav-links">
          <Link to="/leaderboard">
            <i className="fa fa-arrow-left" />{" "}
            <span>Return to Leaderboard</span>
          </Link>
          <Link to="/game">
            <span>Return to Game </span>
            <i className="fa fa-arrow-right" />
          </Link>
        </div>
        {scoreTable}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    score: state.score.selectedScore
  };
};

export default connect(
  mapStateToProps,
  { getScore, clearScore }
)(ScoreCard);
