const express = require("express");
const { nSubject } = require("../models/nSubject");
const router = express.Router();
const { mySubject } = require("../models/mySubject");
const { ExchangeSubject } = require("../models/ExchangeSubject");
const { DrawSubject } = require("../models/DrawSubject");

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

//! ################DrawSubject####################################
router.post("/applyDrawSubject", (req, res) => {
  const subject = new DrawSubject(req.body);

  subject.save((err, result) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      result,
    });
  });
});

router.post("/getDrawSubject", (req, res) => {
  let variable = {};

  if (req.body.user) {
    variable = { user: req.body.user };
  }

  DrawSubject.find(variable)
    .populate("user")
    .exec((err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).json({ result });
    });
});

router.post("/deleteDrawSubject", (req, res) => {
  DrawSubject
    .findOneAndDelete({ subjectId: req.body.subjectId, user: req.body.user })
    .exec((err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).json({ success: true, result });
    });
});

//! ################ExchangeSubject####################################

router.post("/addExchangeSubject", (req, res) => {
  ExchangeSubject.find({
    userId: req.body.userId,
    subjectName: req.body.subjectName,
    date: req.body.date,
  }).exec((err, dataFound) => {
    if (err) {
      return res.status(400).send(err);
    }

    if (dataFound.length !== 0) {
      // dataFound ??? ????????? ????????? ?????? ?????? ???????????? return

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

router.post("/switchExchangeSubject", (req, res) => {
  ExchangeSubject.find().exec((err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    // i??? ?????? ????????? ?????? ??????
    for (let i = 0; i < result.length; i++) {
      // j??? ?????? ????????????????????? ????????? ?????? ??????
      for (let j = 1; j < result.length; j++) {
        if (
          result[i].department === result[j].department &&
          result[i].subjectName === result[j].subjectName &&
          result[i].professorName === result[j].professorName &&
          result[i].subjectId !== result[j].subjectId &&
          result[i].date !== result[j].date &&
          result[i].user !== result[j].user
        ) {
          // mySubject?????? findOneAndUpdate??? result[i] ????????????
          // result[j]??? ????????? ???
          //! mySubject?????? ?????? ????????????????????? ????????? ???????????? ?????????????????????
          //! ????????? ??????
          mySubject
            .findOneAndUpdate(
              {
                subjectId: result[i].subjectId,
                user: result[j].user,
              },
              {
                subjectId: result[j].subjectId,
                date: result[j].date,
              }
            )
            .exec((err) => {
              if (err) {
                return res.status(400).send(err);
              }
            });

          mySubject
            .findOneAndUpdate(
              {
                subjectId: result[j].subjectId,
                user: result[i].user,
              },
              {
                subjectId: result[i].subjectId,
                date: result[i].date,
              }
            )
            .exec((err, result) => {
              if (err) {
                return res.status(400).send(err);
              }
            });

          ExchangeSubject.findOneAndDelete({
            subjectId: result[i].subjectId,
            user: result[i].user,
          }).exec((err) => {
            if (err) {
              return res.status(400).send(err);
            }
          });

          ExchangeSubject.findOneAndDelete({
            subjectId: result[j].subjectId,
            user: result[j].user,
          }).exec((err) => {
            if (err) {
              return res.status(400).send(err);
            }
          });

          return res.status(200).json({ success: true });
        }
      }
    }
  });
});

module.exports = router;
