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

router.post("/switchExchangeSubject", (req, res) => {
  ExchangeSubject.find().exec((err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    // i가 내가 가지고 있는 강의
    for (let i = 0; i < result.length; i++) {
      // j가 내가 교환하고싶어서 신청해 놓은 강의
      for (let j = 1; j < result.length; j++) {
        if (
          result[i].department === result[j].department &&
          result[i].subjectName === result[j].subjectName &&
          result[i].professorName === result[j].professorName &&
          result[i].subjectId !== result[j].subjectId &&
          result[i].date !== result[j].date &&
          result[i].user !== result[j].user
        ) {
          // mySubject에서 findOneAndUpdate로 result[i] 값찾아서
          // result[j]로 바꾸면 끝
          //! mySubject에서 내가 교환하고자하는 강의와 상대방이 교환하고자하는
          //! 강의를 수정
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
