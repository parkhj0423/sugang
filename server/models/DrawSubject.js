const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DrawSubjectSchema = mongoose.Schema(
  {
    subjectId: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
  },
  { timestamps: true }
);

const DrawSubject = mongoose.model("DrawSubject", DrawSubjectSchema);

module.exports = { DrawSubject };
