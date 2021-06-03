import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Statistic } from "antd";
/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { getDrawSubject } from "../../../_actions/subject_actions";
import { Table, Tag, message } from "antd";
import CountApply from "../Table/CountApply";
import {
  container,
  tableHeader,
  tableHeaderMenu,
  tableHeaderTitle,
} from "../Table/TableStyle";

const { Countdown } = Statistic;

const columns = [
  {
    title: <b>학과</b>,
    width: 185,
    dataIndex: "department",
    key: "department",
    fixed: "left",
  },
  {
    title: <b>학년</b>,
    width: 70,
    dataIndex: "grade",
    key: "grade",
    fixed: "left",
  },
  {
    title: <b>과목명</b>,
    width: 250,
    dataIndex: "subjectName",
    key: "subjectName",
    fixed: "left",
  },
  {
    title: <b>교수명</b>,
    width: 120,
    dataIndex: "professorName",
    key: "professorName",
    fixed: "left",
  },
  {
    title: <b>구분</b>,
    width: 90,
    dataIndex: "subjectType",
    key: "subjectType",
  },
  {
    title: <b>학점</b>,
    dataIndex: "subjectPoint",
    key: "subjectPoint",
    width: 70,
  },
  {
    title: <b>요일</b>,
    dataIndex: "date",
    key: "date",
    width: 80,
  },
  {
    title: <b>과목 코드</b>,
    dataIndex: "subjectCode",
    key: "subjectCode",
    width: 90,
  },
  {
    title: <b>강의실</b>,
    dataIndex: "classroom",
    key: "classroom",
    width: 150,
  },
  {
    title: <b>분반</b>,
    dataIndex: "division",
    key: "division",
    width: 80,
  },
  {
    title: <b>신청인원</b>,
    dataIndex: "countApply",
    key: "countApply",
    width: 90,
  },
  {
    title: <b>제한인원</b>,
    dataIndex: "limitApply",
    key: "limitApply",
    width: 90,
  },
  {
    title: <b>경쟁률</b>,
    dataIndex: "competitionRate",
    key: "competitionRate",
    width: 100,
  },
];

function DrawSubjectPage() {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [DrawSubject, setDrawSubject] = useState([]);
  const [AppliedSubject, setAppliedSubject] = useState([]);
  const [deadline] = useState(Date.now() + 1 * 1000 * 60 * 60 * 24);

  let data = [];
  for (let i = 0; i < AppliedSubject.length; i++) {
    data.push({
      key: i,
      subjectId: AppliedSubject[i].subjectId,
      department: AppliedSubject[i].department,
      grade: AppliedSubject[i].grade,
      subjectName: AppliedSubject[i].subjectName,
      professorName: AppliedSubject[i].professorName,
      subjectType: AppliedSubject[i].subjectType,
      subjectPoint: AppliedSubject[i].subjectPoint,
      date: AppliedSubject[i].date,
      subjectCode: AppliedSubject[i].subjectCode,
      classroom: AppliedSubject[i].classroom,
      division: AppliedSubject[i].division,
      // rate: Subject[i].rate,
      countApply: (
        <CountApply
          key={i}
          AppliedSubject={DrawSubject[i]}
          subject={AppliedSubject}
        />
      ),
      limitApply: 5,
      competitionRate: (
        <CountApply
          key={i}
          AppliedSubject={DrawSubject[i]}
          subject={AppliedSubject}
          competitionRate="true"
        />
      ),
    });
  }

  useEffect(() => {
    let variable = {
      user: userId,
    };
    dispatch(getDrawSubject(variable)).then((response) => {
      if (response.payload.result) {
        console.log(response.payload.result);
        setDrawSubject(response.payload.result);
      } else {
        message.error("불러오기 실패");
      }
    });

    dispatch(getDrawSubject()).then((response) => {
      if (response.payload.result) {
        setAppliedSubject(response.payload.result);
      } else {
        message.error("불러오기 실패");
      }
    });
  }, [useDispatch]);

  const onCountDownFinish = () => {
    const index = [0, 1, 2, 3, 4];
    const drawArray = [];
    drawArray.push(
      DrawSubject[index.splice(Math.floor(Math.random() * index.length), 1)[0]]
    );

    // 중복없는 랜덤값 생성하고 
  };

  return (
    <React.Fragment>
      <div css={container}>
        <div css={tableHeader}>
          <p css={tableHeaderTitle}>
            강의 추첨까지 남은 시간 : &nbsp;
            <Countdown
              format="HH:mm:ss"
              value={deadline}
              onFinish={onCountDownFinish}
              valueStyle={{ color: "red" }}
            />
          </p>
          <div css={tableHeaderMenu}>
            * 추첨신청한 모든 과목들에 대하여 일괄 추첨이 이루어 집니다. *
          </div>
        </div>

        <Table columns={columns} dataSource={data} sticky pagination={false} />
      </div>
    </React.Fragment>
  );
}

export default DrawSubjectPage;
