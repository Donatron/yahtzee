const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  playerName: {
    type: String,
    required: true
  },
  totalScore: {
    type: Number,
    required: true
  },
  scoreCard: {
    ones: {
      type: Number,
      required: true
    },
    twos: {
      type: Number,
      required: true
    },
    threes: {
      type: Number,
      required: true
    },
    fours: {
      type: Number,
      required: true
    },
    fives: {
      type: Number,
      required: true
    },
    sixes: {
      type: Number,
      required: true
    },
    threeOfKind: {
      type: Number,
      required: true
    },
    fourOfKind: {
      type: Number,
      required: true
    },
    fullHouse: {
      type: Number,
      required: true
    },
    smallStraight: {
      type: Number,
      required: true
    },
    largeStraight: {
      type: Number,
      required: true
    },
    yahtzee: {
      type: Number,
      required: true
    },
    chance: {
      type: Number,
      required: true
    }
  }
});

module.exports = Score = mongoose.model("scores", ScoreSchema);
