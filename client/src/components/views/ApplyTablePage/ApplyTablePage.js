/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useEffect, useState } from "react";

import { Button, Table, message } from "antd";

import {
  container,
  tableHeader,
  tableHeaderMenu,
  tableHeaderTitle,
} from "../Table/TableStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  applyDrawSubject,
  applySubject,
  getMySubject,
  getSubject,
} from "../../../_actions/subject_actions";

import SearchTable from "./SearchTable";
import CountApply from "../Table/CountApply";
import { SUBJECT_LIMIT } from "../../Config";

function ApplyTablePage() {
  const userId = localStorage.getItem("userId");
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [Subject, setSubject] = useState([]);
  const [MySubject, setMySubject] = useState([]);
  const [IsSearch, setIsSearch] = useState(false);
  const [SearchComplete, setSearchComplete] = useState([]);

  let appliedSubject = MySubject.filter(
    (subject) => subject.user._id === userId
  );

  let totalPoint = 0;
  let data = [];
  let filteredData = [];
  let searchedData = [];

  useEffect(() => {
    
    dispatch(getSubject()).then((response) => {
      if (response.payload.result) {
        message.success("강의 시간표 불러오기 성공");
        setSubject(response.payload.result);
      } else {
        message.error("강의 시간표 불러오기 실패");
      }
    });

    dispatch(getMySubject()).then((response) => {
      if (response.payload.result) {
        setMySubject(response.payload.result);
      } else {
        message.error("불러오기 실패");
      }
    });
  }, [dispatch]);

  for (let i = 0; i < appliedSubject.length; i++) {
    totalPoint += appliedSubject[i].subjectPoint;
  }

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
      countApply: (
        <CountApply AppliedSubject={Subject[i]} subject={MySubject} />
      ),
      limitApply: SUBJECT_LIMIT,
      competitionRate: (
        <CountApply
          AppliedSubject={Subject[i]}
          subject={MySubject}
          competitionRate="true"
        />
      ),
    });
  }

  if (MySubject !== undefined && data.length !== 0) {
    filteredData = data;
    for (let i = 0; i < appliedSubject.length; i++) {
      filteredData = filteredData.filter(
        (item) => item.subjectId !== appliedSubject[i].subjectId
      );
    }
  }

  const refreshFunction = (subject) => {
    setSubject(Subject.filter((item) => item.subjectId !== subject.subjectId));
  };

  const dateCheck = (data) => {
    for (let i = 0; i < appliedSubject.length; i++) {
      if (data === appliedSubject[i].date) {
        return false;
      }
    }
    return true;
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
    };

    totalPoint += subjectPoint;
    console.log(totalPoint);

    if (totalPoint > 21) {
      message.error("21학점 이상 신청할 수 없습니다.");
      return;
    }

    if (dateCheck(date) !== false) {
      if (user.grade === 4) {
        dispatch(applySubject(variable)).then((response) => {
          if (response.payload.success) {
            message.success("신청 성공");
            refreshFunction(response.payload.result);
          } else {
            message.error("신청 실패");
          }
        });
      } else {
        dispatch(applyDrawSubject(variable)).then((response) => {
          if (response.payload.success) {
            message.success("신청 성공");
            refreshFunction(response.payload.result);
          } else {
            message.error("신청 실패");
          }
        });
      }
    } else {
      message.error("동일한 시간대의 강의가 존재합니다");
      return;
    }
  };

  const onSearch = (searchedProps) => {
    console.log(searchedProps);
    searchedData = filteredData;
    for (let key in searchedProps) {
      console.log(`${key} : ${searchedProps[key]}`);

      if (key === "date") {
        searchedData = searchedData.filter(
          (item) => item[key].split("")[0] === searchedProps[key]
        );
      } else if (key === "subjectPoint") {
        searchedData = searchedData.filter(
          (item) => String(item[key]) === String(searchedProps[key])
        );
      } else {
        searchedData = searchedData.filter((item) =>
          item[key].includes(searchedProps[key])
        );
      }
    }
    setIsSearch(true);
    setSearchComplete(searchedData);
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
      width: 80,
    },
    {
      title: <b>과목 코드</b>,
      dataIndex: "subjectCode",
      key: "subjectCode",
      width: 100,
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
      width: 100,
    },
    {
      title: <b>추첨 신청</b>,
      key: "operation",
      fixed: "right",
      width: 130,
      render: (record) => (
        <Button
          style={{ padding: "0 5px" }}
          type="primary"
          onClick={() => onApplyClick(record)}
        >
          강의 추첨하기
        </Button>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div css={container}>
        <div css={tableHeader}>
          <p css={tableHeaderTitle}>개설강좌목록</p>
          <div css={tableHeaderMenu}>
            <span>
              총 조회 건수 &nbsp;
              <b>{IsSearch ? SearchComplete.length : filteredData.length}</b>
              &nbsp;건
            </span>
          </div>
        </div>
        <SearchTable onSearch={onSearch} />
        <Table
          columns={columns}
          dataSource={IsSearch ? SearchComplete : filteredData}
          sticky
          scroll={{ x: 1000, y: 500 }}
        />
      </div>
    </React.Fragment>
  );
}

export default ApplyTablePage;
