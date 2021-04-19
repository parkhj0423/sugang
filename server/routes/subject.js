const express = require("express");
const { nSubject } = require("../models/nSubject");
const router = express.Router();
const { mySubject } = require("../models/mySubject");

router.post("/applySubject", (req, res) => {
  const subject = new mySubject(req.body);

  subject.save((err, result) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      result,
    });
  });
});

router.post("/getMySubject", (req, res) => {
  let variable = {};

  if (req.body.user) {
    variable = { user: req.body.user };
  }

  mySubject
    .find(variable)
    .populate("user")
    .exec((err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).json({ result });
    });
});

router.post("/getSubject", (req, res) => {
  nSubject
    .find()
    .populate("user")
    .exec((err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).json({ result });
    });
});

router.post("/deleteMySubject", (req, res) => {
  mySubject
    .findOneAndDelete({ subjectId: req.body.subjectId })
    .exec((err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).json({ success: true, result });
    });
});


module.exports = router;
