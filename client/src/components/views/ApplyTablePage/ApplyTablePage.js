/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useEffect, useState } from "react";

import { Button, Table, message } from "antd";

import {
  container,
  tableHeader,
  tableHeaderRightMenu,
  tableHeaderTitle,
} from "../Table/TableStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  applySubject,
  getMySubject,
  getSubject,
} from "../../../_actions/subject_actions";

import SearchTable from "./SearchTable";

function ApplyTablePage() {
  const dispatch = useDispatch();
  const [Subject, setSubject] = useState([]);

  const userId = localStorage.getItem("userId");
  let data = [];
  let filteredData = [];
  let searchedData = [];
  let totalPoint = 0;
  const mySubject = useSelector((state) => state.subject.mySubject);

  useEffect(() => {
    dispatch(getSubject()).then((response) => {
      if (response.payload.result) {
        message.success("강의 시간표 불러오기 성공");
        setSubject(response.payload.result);
      } else {
        message.error("강의 시간표 불러오기 실패");
      }
    });

    let variable = {
      user: userId,
    };

    dispatch(getMySubject(variable)).then((response) => {
      if (response.payload.result) {
        message.success("내 강의 불러오기 성공");
      } else {
        message.error("불러오기 실패");
      }
    });
  }, [dispatch]);

  for (let i = 0; i < Subject.length; i++) {
    data.push({
      key: i,
      subjectId: Subject[i].subjectId,
      department: Subject[i].department,
      grade: Subject[i].grade,
      subjectName: Subject[i].subjectName,
      professorName: Subject[i].professorName,
      subjectType: Subject[i].subjectType,
      subjectPoint: Subject[i].subjectPoint,
      date: Subject[i].date,
      subjectCode: Subject[i].subjectCode,
      classroom: Subject[i].classroom,
      division: Subject[i].division,
      // rate: Subject[i].rate,
      // countApply: Subject[i].countApply,
      limitApply: 30,
      // competitionRate: Subject[i].competitionRate,
    });
  }

  if (mySubject !== undefined && data.length !== 0) {
    filteredData = data;
    for (let i = 0; i < mySubject.result.length; i++) {
      totalPoint += mySubject.result[i].subjectPoint;
      console.log(totalPoint);
      filteredData = filteredData.filter(
        (item) => item.subjectId !== mySubject.result[i].subjectId
      );
    }
  }
  console.log(data);
  console.log(filteredData);
  const refreshFunction = (subject) => {
    setSubject(
      Subject.filter(
        (item) =>
        item.subjectId !== subject.subjectId
      )
    );
  };

  const onApplyClick = (data) => {
    const {
      subjectId,
      department,
      grade,
      subjectName,
      professorName,
      subjectType,
      subjectPoint,
      date,
      subjectCode,
      classroom,
      division,
      // rate,
      // limitApply,
    } = data;
    console.log(data);
    let variable = {
      subjectId,
      user: localStorage.getItem("userId"),
      department,
      grade,
      subjectName,
      professorName,
      subjectType,
      subjectPoint,
      date,
      subjectCode,
      classroom,
      division,
      // rate,
      // limitApply,
    };
    totalPoint += subjectPoint;
    if (totalPoint > 21) {
      console.log(totalPoint);
      message.error("21학점 이상 신청할 수 없습니다.");
      return;
    }
    dispatch(applySubject(variable)).then((response) => {
      if (response.payload.success) {
        message.success("신청 성공");
        refreshFunction(response.payload.result);
      } else {
        message.error("신청 실패");
      }
    });
  };

  const onSearch = (
    department,
    grade,
    subjectName,
    professorName,
    subjectType,
    subjectPoint,
    date,
    subjectCode
  ) => {
    console.log(
      department,
      grade,
      subjectName,
      professorName,
      subjectType,
      subjectPoint,
      date,
      subjectCode
    );

    searchedData = filteredData.filter(
      (item) =>
        item.department === department ||
        item.grade === grade ||
        item.subjectName === subjectName ||
        item.professorName === professorName ||
        item.subjectType === subjectType ||
        item.subjectPoint === subjectPoint ||
        item.date === date ||
        item.subjectCode === subjectCode
    );
    console.log(searchedData);
    //searchData 분기하는 법 다시 생각해봐야할듯 하위 컴포넌트에서 값은 받아올 수 있지만 분기해결을 못함
  };

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
      width: 70,
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
      title: <b>평점</b>,
      dataIndex: "rate",
      key: "rate",
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
      width: 75,
    },
    {
      title: <b>장바구니 담기</b>,
      key: "operation",
      fixed: "right",
      width: 150,
      render: (record) => (
        <Button
          style={{ padding: "0 5px" }}
          type="primary"
          onClick={() => onApplyClick(record)}
        >
          장바구니 담기
        </Button>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div css={container}>
        <div css={tableHeader}>
          <p css={tableHeaderTitle}>개설강좌목록</p>
          <div css={tableHeaderRightMenu}>
            <span>
              총 조회 건수 &nbsp;<b>{filteredData.length}</b>&nbsp;건
            </span>
          </div>
        </div>
        <SearchTable onSearch={onSearch} />
        <Table
          columns={columns}
          dataSource={filteredData}
          sticky
          scroll={{ x: 1000, y: 500 }}
        />
      </div>
    </React.Fragment>
  );
}

export default ApplyTablePage;
