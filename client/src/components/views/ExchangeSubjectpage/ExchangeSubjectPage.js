import { message } from "antd";
import React, { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { getMySubject } from "../../../_actions/subject_actions";

function ExchangeSubjectPage() {
  const dispatch = useDispatch();
  const [AppliedSubject, setAppliedSubject] = useState([])
  useEffect(() => {
    dispatch(getMySubject()).then((response) => {
      if (response.payload.result) {
        setAppliedSubject(response.payload.result);
        console.log("AppliedSubject", response.payload.result);
      } else {
        message.error("불러오기 실패");
      }
    });
  }, []);
  return <div></div>;
}

export default ExchangeSubjectPage;
