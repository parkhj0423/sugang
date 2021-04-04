import React, { useEffect, useState } from "react";
import { Button, Icon, Table } from "antd";
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import axios from "axios";

const container = css`
  width: 90%;
  height: 600px;
  margin: 2rem auto;
`;

const tableHeader = css`
  display: flex;
  justify-content: space-between;
`;

const tableHeaderTitle = css`
  letter-spacing: -2px;
  color: rgb(51, 51, 51);
  font-weight: 800;
  font-size: 1.5rem;
`;

const tableHeaderRightMenu = css`
  width: 500px;
  display: flex;
  justify-content: space-around;

  letter-spacing: -2px;
  color: rgb(51, 51, 51);
  font-weight: 600;
  font-size: 1rem;
`;

function MySubjectPage(props) {
  const userId = props.match.params.userId;
  let totalPoint = 0;

  const [MySubject, setMySubject] = useState([]);

  for (let i = 0; i < MySubject.length; i++) {
    totalPoint += MySubject[i].subjectPoint;
  }

  let data = [];
  for (let i = 0; i < MySubject.length; i++) {
    data.push({
      key: i,
      grade: `${MySubject[i].grade}학년`,
      subjectName: MySubject[i].subjectName,
      professorName: MySubject[i].professorName,
      subjectType: MySubject[i].subjectType,
      subjectPoint: MySubject[i].subjectPoint,
      date: MySubject[i].date,
      subjectCode: MySubject[i].subjectCode,
      classroom: MySubject[i].classroom,
      rate: MySubject[i].rate,
      countApply: `${i} 명`,
      limitApply: MySubject[i].limitApply,
      competitionRate: `${i} : 1`,
    });
  }

  useEffect(() => {
    axios.post("/api/subject/getSubject", userId).then((response) => {
      if (response.data.success) {
        setMySubject(response.data.result);
        console.log(response.data.result);
      } else {
        alert("불러오기 실패");
      }
    });
  }, []);

  const columns = [
    {
      title: "학년",
      width: 70,
      dataIndex: "grade",
      key: "grade",
      fixed: "left",
    },
    {
      title: "과목명",
      width: 150,
      dataIndex: "subjectName",
      key: "subjectName",
      fixed: "left",
    },
    {
      title: "교수명",
      width: 75,
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
    console.log(data);
    axios.post("/api/subject/deleteSubject", variable).then((response) => {
      if (response.data.success) {
      } else {
        alert("취소 실패");
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
