import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getScores } from "../../actions";

import "./Leaderboard.css";
import Spinner from "../Spinner/Spinner";

class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.renderScores = this.renderScores.bind(this);
    this.compare = this.compare.bind(this);
  }

  componentDidMount() {
    const { scores, getScores } = this.props;

    getScores();
  }

  compare(a, b) {
    if (a.totalScore > b.totalScore) {
      return -1;
    }

    if (a.totalScore < b.totalScore) {
      return 1;
    }

    return 0;
  }

  renderScores(scores) {
    let sortedScores = scores.sort(this.compare);

    return (
      <div className="Leaderboard-scores">
        <table>
          <tbody>
            <tr>
              <th>Score</th>
              <th>Player</th>
            </tr>
            {sortedScores.map(score => {
              return (
                <tr key={score._id}>
                  <td>
                    <Link to={`/scorecard/${score._id}`} id={score._id}>
                      {score.totalScore}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/scorecard/${score._id}`}>
                      {score.playerName}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    const { scores } = this.props;

    return (
      <div className="Leaderboard">
        <h1 className="App-title">Yahtzee!</h1>
        <h2>Leaderboard</h2>
        <p>Click any score to see the detailed breakdown of that game</p>
        {scores ? this.renderScores(scores) : <Spinner />}
        <div className="nav-links">
          <Link to="/">
            <i className="fa fa-arrow-left" /> <span>Return to Home Page</span>
          </Link>
          <Link to="/game">
            <span>Return to Game </span>
            <i className="fa fa-arrow-right" />
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    scores: state.score.allScores
  };
};

export default connect(
  mapStateToProps,
  { getScores }
)(Leaderboard);
