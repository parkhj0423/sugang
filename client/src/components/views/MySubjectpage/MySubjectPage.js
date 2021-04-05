import React, { useEffect, useState } from "react";
import { Button, Icon, message, Table } from "antd";
import axios from "axios";
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useDispatch } from "react-redux";
import {
  container,
  tableHeader,
  tableHeaderRightMenu,
  tableHeaderTitle,
} from "../Table/TableStyle";
import {
  deleteMySubject,
  getMySubject,
} from "../../../_actions/subject_actions";

function MySubjectPage(props) {
  const userId = props.match.params.userId;
  const dispatch = useDispatch();
  let totalPoint = 0;

  const [MySubject, setMySubject] = useState([]);

  useEffect(() => {
    dispatch(getMySubject(userId)).then((response) => {
      if (response.payload.success) {
        message.success("내 강의 불러오기 성공");
        setMySubject(response.payload.result);
      } else {
        message.error("불러오기 실패");
      }
    });
  }, []);

  for (let i = 0; i < MySubject.length; i++) {
    totalPoint += MySubject[i].subjectPoint;
  }

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
      width: 120,
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
      width: 70,
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
      width: 150,
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
      title: "취소",
      key: "cancel",
      fixed: "right",
      width: 60,
      render: (record) => (
        <Button
          style={{ padding: "0 5px" }}
          type="danger"
          onClick={() => onCancelClick(record)}
        >
          취소
        </Button>
      ),
    },
  ];

  const onCancelClick = (data) => {
    const { subjectName } = data;

    let variable = {
      subjectName,
    };

    dispatch(deleteMySubject(variable)).then((response) => {
      if (response.payload.success) {
        message.success("삭제 성공");
      } else {
        message.success("삭제 실패");
      }
    });
  };

  return (
    <div css={container}>
      <div css={tableHeader}>
        <p css={tableHeaderTitle}>수강신청내역</p>
        <div css={tableHeaderRightMenu}>
          <span>
            총 신청가능 학점 &nbsp;<b>21</b>&nbsp;학점
          </span>
          <Icon type="pause" style={{ paddingTop: "4px" }} />
          <span>
            신청과목 수&nbsp; <b>{MySubject.length}</b>&nbsp; 과목{" "}
          </span>
          <Icon type="pause" style={{ paddingTop: "4px" }} />
          <span>
            신청 학점 &nbsp; <b>{totalPoint}</b>&nbsp; 학점
          </span>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        sticky
        scroll={{ x: 1000, y: 300 }}
        pagination={false}
      />
    </div>
  );
}

export default MySubjectPage;
