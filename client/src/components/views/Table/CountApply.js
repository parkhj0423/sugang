import React from "react";

function CountApply(props) {
  const { AppliedSubject, subject, competitionRate } = props;

  const countApply = () => {
    let applyCount = 0;
    for (let i = 0; i < subject.length; i++) {
      if (AppliedSubject.subjectId === subject[i].subjectId) {
        applyCount += 1;
      }
    }
    return applyCount;
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
