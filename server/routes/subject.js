const express = require("express");
const { nSubject } = require("../models/nSubject");
const router = express.Router();
const { mySubject } = require("../models/mySubject");
const { ExchangeSubject } = require("../models/ExchangeSubject");

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
  setTimeout(() => {
    mySubject
      .findOneAndDelete({ subjectId: req.body.subjectId, user: req.body.user })
      .exec((err, result) => {
        if (err) {
          return res.status(400).send(err);
        }
        return res.status(200).json({ success: true, result });
      });
  }, req.body.randomCount);
});

router.post("/exchangeSubject", (req, res) => {
  ExchangeSubject.find({
    userId: req.body.userId,
    subjectName: req.body.subjectName,
    date: req.body.date,
  }).exec((err, dataFound) => {
    if (err) {
      return res.status(400).send(err);
    }

    if (dataFound.length !== 0) {
      // dataFound 가 있으면 중복된 값이 있는 것이므로 return

      return res.status(200).json({ success: false });
    } else {
      const subject = new ExchangeSubject(req.body);

      subject.save((err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
          success: true,
          result,
        });
      });
    }
  });
});

module.exports = router;
