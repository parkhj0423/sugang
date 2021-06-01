import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { getMySubject } from "../../../_actions/subject_actions";
import { message } from "antd";
import CountApply from "../Table/CountApply";

function DrawSubjectPage() {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [MySubject, setMySubject] = useState([]);
  const [AppliedSubject, setAppliedSubject] = useState([]);
  useEffect(() => {
    let variable = {
      user: userId,
    };
    dispatch(getMySubject(variable)).then((response) => {
      if (response.payload.result) {
        console.log(response.payload.result);
        setMySubject(response.payload.result);
      } else {
        message.error("불러오기 실패");
      }
    });

    dispatch(getMySubject()).then((response) => {
      if (response.payload.result) {
        setAppliedSubject(response.payload.result);
      } else {
        message.error("불러오기 실패");
      }
    });
  }, [useDispatch]);
  return (
    <>
      <div>
        {MySubject.map((item, i) => (
          <div>
            {item.subjectName}
            <CountApply
              key={i}
              AppliedSubject={item}
              subject={AppliedSubject}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default DrawSubjectPage;
