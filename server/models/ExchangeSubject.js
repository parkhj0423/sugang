const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExchangeSubjectSchema = mongoose.Schema(
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

    subjectName: {
      type: String,
    },
    professorName: {
      type: String,
    },

    date: {
      type: String,
    },
  },
  { timestamps: true }
);

const ExchangeSubject = mongoose.model(
  "ExchangeSubject",
  ExchangeSubjectSchema
);

module.exports = { ExchangeSubject };
