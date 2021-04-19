import React from "react";

function CountApply(props) {
  const { AppliedSubject, subject } = props;

  console.log(AppliedSubject);
  console.log(subject);
  const countApply = () => {
    let applyCount = 0;
    for (let i = 0; i < subject.length; i++) {
      if (AppliedSubject.subjectId === subject[i].subjectId) {
        applyCount += 1;
      }
    }
    console.log(applyCount);

    return applyCount;
  };

  return <div>{countApply()}</div>;
}

export default CountApply;
