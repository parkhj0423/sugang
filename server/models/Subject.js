const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    grade: {
      type: Number,
    },
    subjectName: {
      type: String,
    },
    professorName: {
      type: String,
    },
    subjectType: {
      type: String,
    },
    subjectPoint: {
      type: Number,
    },
    date: {
      type: String,
    },
    subjectCode: {
      type: Number,
    },
    classroom: {
      type: String,
    },
    rate: {
      type: Number,
    },
    limitApply: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = { Subject };
