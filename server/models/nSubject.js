const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nsubjectSchema = mongoose.Schema(
  {
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
    subjectId: {
      type: Number,
    },
    department: {
      type: String,
    },
    grade: {
      type: String,
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
      type: String,
    },
    classroom: {
      type: String,
    },
    division: {
      type: String,
    },
    // rate: {
    //   type: String,
    // },
    // countApply: {
    //   type: String,
    // },
    // limitApply: {
    //   type: String,
    // },
    // competitionRate: {
    //   type: String,
    // }, 
    // isApply: {
    //   type: Boolean,
    //   default : false
    // },
  },
  { timestamps: true }
);

const nSubject = mongoose.model("nSubject", nsubjectSchema);

module.exports = { nSubject };
