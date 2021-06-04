import React from "react";

function CountApply(props) {
  const { AppliedSubject, subject, competitionRate, limit } = props;

  const countApply = () => {
    let applyCount = 0;
    for (let i = 0; i < subject.length; i++) {
      if (AppliedSubject.subjectId === subject[i].subjectId) {
        applyCount += 1;
      }
    }
    if (limit) {
      return limit - applyCount > 0 ? (
        limit - applyCount
      ) : (
        <b style={{ fontSize: "0.7rem" }}>
          마감&nbsp;
          <br />
          (정원외 인원 만 신청 가능)
        </b>
      );
    } else {
      return applyCount;
    }
  };

  const countCompetitionRate = () => {
    let applyCount = 0;
    let result = 0;
    for (let i = 0; i < subject.length; i++) {
      if (AppliedSubject.subjectId === subject[i].subjectId) {
        applyCount += 1;
      }
    }
    result = applyCount / 5;
    return `${result.toFixed(2)} : 1`;
  };

  return <>{competitionRate ? countCompetitionRate() : countApply()}</>;
}

export default CountApply;
