import React, { useEffect, useState } from "react";
import { Button, Icon, Table, message } from "antd";
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import axios from "axios";
import {
  container,
  tableHeader,
  tableHeaderRightMenu,
  tableHeaderTitle,
} from "../Table/TableStyle";
import { useDispatch } from "react-redux";
import { applySubject, getSubject } from "../../../_actions/subject_actions";

function ApplyTablePage() {
  const dispatch = useDispatch();
  const [MySubject, setMySubject] = useState([]);

  useEffect(() => {
    dispatch(getSubject()).then((response) => {
      if (response.payload.success) {
        message.success("강의 시간표 불러오기 성공");
        setMySubject(response.payload.result);
      } else {
        message.error("강의 시간표 불러오기 실패");
      }
    });
  }, []);

  let data = [];
  for (let i = 0; i < MySubject.length; i++) {
    data.push({
      key: i,
      department: MySubject[i].department,
      grade: MySubject[i].grade,
      subjectName: MySubject[i].subjectName,
      professorName: MySubject[i].professorName,
      subjectType: MySubject[i].subjectType,
      subjectPoint: MySubject[i].subjectPoint,
      date: MySubject[i].date,
      subjectCode: MySubject[i].subjectCode,
      classroom: MySubject[i].classroom,
      division: MySubject[i].division,
      // rate: MySubject[i].rate,
      // countApply: MySubject[i].countApply,
      // limitApply: MySubject[i].limitApply,
      // competitionRate: MySubject[i].competitionRate,
    });
  }

  const columns = [
    {
      title: "학과",
      width: 170,
      dataIndex: "department",
      key: "department",
      fixed: "left",
    },
    {
      title: "학년",
      width: 70,
      dataIndex: "grade",
      key: "grade",
      fixed: "left",
    },
    {
      title: "과목명",
      width: 250,
      dataIndex: "subjectName",
      key: "subjectName",
      fixed: "left",
    },
    {
      title: "교수명",
      width: 130,
      dataIndex: "professorName",
      key: "professorName",
      fixed: "left",
    },
    {
      title: "구분",
      width: 90,
      dataIndex: "subjectType",
      key: "subjectType",
    },
    {
      title: "학점",
      dataIndex: "subjectPoint",
      key: "subjectPoint",
      width: 70,
    },
    {
      title: "요일",
      dataIndex: "date",
      key: "date",
      width: 120,
    },
    {
      title: "과목 코드",
      dataIndex: "subjectCode",
      key: "subjectCode",
      width: 85,
    },
    {
      title: "강의실",
      dataIndex: "classroom",
      key: "classroom",
      width: 200,
    },
    {
      title: "분반",
      dataIndex: "division",
      key: "division",
      width: 80,
    },
    {
      title: "평점",
      dataIndex: "rate",
      key: "rate",
      width: 80,
    },
    {
      title: "신청인원",
      dataIndex: "countApply",
      key: "countApply",
      width: 90,
    },
    {
      title: "제한인원",
      dataIndex: "limitApply",
      key: "limitApply",
      width: 90,
    },
    {
      title: "경쟁률",
      dataIndex: "competitionRate",
      key: "competitionRate",
      width: 75,
    },

    {
      title: "장바구니 담기",
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

  const onApplyClick = (data) => {
    const {
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

    let variable = {
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

    dispatch(applySubject(variable)).then((response) => {
      if (response.payload.success) {
        message.success("신청 성공");
      } else {
        message.error("신청 실패");
      }
    });
  };

  return (
    <div css={container}>
      <div css={tableHeader}>
        <p css={tableHeaderTitle}>수강신청</p>
        <div css={tableHeaderRightMenu}>
          <span>
            총 신청가능 학점 &nbsp;<b>21</b>&nbsp;학점
          </span>
          <Icon type="pause" style={{ paddingTop: "4px" }} />
          <span>
            {/* 신청과목 수&nbsp; <b>{MySubject.length}</b>&nbsp; 과목{" "} */}
          </span>
          <Icon type="pause" style={{ paddingTop: "4px" }} />
          <span>{/* 신청 학점 &nbsp; <b>{totalPoint}</b>&nbsp; 학점 */}</span>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        sticky
        scroll={{ x: 1000, y: 300 }}
      />
    </div>
  );
}

export default ApplyTablePage;
