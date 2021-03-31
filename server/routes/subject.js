const express = require("express");
const router = express.Router();
const { Subject } = require("../models/Subject");

router.post("/applySubject", (req, res) => {
  const subject = new Subject(req.body);

  subject.save((err, result) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      result,
    });
  });
});

router.post("/getSubject", (req, res) => {
  let variable = {};

  if (req.body.user) {
    variable = { user: req.body.user };
  }

  Subject.find(variable)

    .populate("user")
    .exec((err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).json({ success: true, result });
    });
});

router.post("/deleteSubject", (req, res) => {
  Subject.findOneAndDelete({subjectName : req.body.subjectName}).exec((err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).json({ success: true, result });
  });
});

module.exports = router;
