import React, { useEffect, useState } from "react";
import { Button, Icon, message, Table, Popconfirm } from "antd";
/** @jsxFrag React.Fragment */
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
import CountApply from "../Table/CountApply";

function MySubjectPage(props) {
  const userId = props.match.params.userId;
  // const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  let totalPoint = 0;

  const [MySubject, setMySubject] = useState([]);
  const [AppliedSubject, setAppliedSubject] = useState([]);

  useEffect(() => {
    let variable = {
      user: userId,
    };
    dispatch(getMySubject(variable)).then((response) => {
      if (response.payload.result) {
        message.success("내 강의 불러오기 성공");
        setMySubject(response.payload.result);
        //console.log(response.payload.result);
      } else {
        message.error("불러오기 실패");
      }
    });
    dispatch(getMySubject()).then((response) => {
      if (response.payload.result) {
        setAppliedSubject(response.payload.result);
        //console.log("AppliedSubject", response.payload.result);
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
      subjectId: MySubject[i].subjectId,
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
      //rate: MySubject[i].rate,
      countApply: (
        <CountApply AppliedSubject={MySubject[i]} subject={AppliedSubject} />
      ),
      limitApply: 30,
      competitionRate: (
        <CountApply
          AppliedSubject={MySubject[i]}
          subject={AppliedSubject}
          competitionRate="true"
        />
      ),
    });
  }

  // 강의 신청이나 취소 후 강의 목록을 새로고침하는 함수
  const refreshFunction = (subject) => {
    setMySubject(
      MySubject.filter(
        (item) =>
          item.subjectId !== subject.subjectId && item.user._id === userId
      )
    );
  };

  // 강의 취소를 위한 onClick 함수
  const onCancelClick = (data) => {
    const { subjectId } = data;

    let variable = {
      user: userId,
      subjectId,
    };

    dispatch(deleteMySubject(variable)).then((response) => {
      if (response.payload.result) {
        message.success("삭제 성공");
        refreshFunction(response.payload.result);
      } else {
        message.success("삭제 실패");
      }
    });
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
      width: 100,
    },
    {
      title: <b>취소</b>,
      key: "cancel",
      fixed: "right",
      width: 60,
      render: (record) => (
        <Popconfirm
          title="선택한 과목을 취소하시겠습니까?"
          onConfirm={() => onCancelClick(record)}
          okText="예"
          cancelText="아니요"
        >
          <Button style={{ padding: "0 5px" }} type="danger">
            취소
          </Button>
        </Popconfirm>
      ),
    },
  ];

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
            신청과목 수&nbsp; <b>{MySubject.length}</b>&nbsp; 과목
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
