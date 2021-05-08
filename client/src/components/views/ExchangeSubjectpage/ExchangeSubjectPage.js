import React, { useEffect, useState } from "react";
import { Button, message, Table } from "antd";
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useDispatch } from "react-redux";
import { getMySubject } from "../../../_actions/subject_actions";
import { tableHeaderTitle, container } from "../Table/TableStyle";
import ExchangeModal from "./ExchangeModal";

export default function ExchangeSubjectPage() {
  const dispatch = useDispatch();
  const [AppliedSubject, setAppliedSubject] = useState([]);
  const [MySubject, setMySubject] = useState([]);
  const [Visible, setVisible] = useState(false);
  const [SelectedData, setSelectedData] = useState([]);

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    let variable = {
      user: userId,
    };
    dispatch(getMySubject(variable)).then((response) => {
      if (response.payload.result) {
        message.success("내 강의 불러오기 성공");
        setMySubject(response.payload.result);
        console.log(response.payload.result);
      } else {
        message.error("불러오기 실패");
      }
    });

    dispatch(getMySubject()).then((response) => {
      if (response.payload.result) {
        setAppliedSubject(response.payload.result);
        console.log("AppliedSubject", response.payload.result);
      } else {
        message.error("불러오기 실패");
      }
    });
  }, []);

  // 교환이 가능한 강의 조건 : 강의명,교수명,등은 같되 수업시간은 달라야하고, 신청자의 userId가 달라야함
  const filterExchangeList = (MySubject, AppliedSubject, someonesList) => {
    let filteredSubject = [];
    let MySubjectToExchange = [];
    for (let i = 0; i < MySubject.length; i++) {
      for (let j = 0; j < AppliedSubject.length; j++) {
        if (
          AppliedSubject[j].user._id !== userId &&
          AppliedSubject[j].date !== MySubject[i].date &&
          AppliedSubject[j].subjectName === MySubject[i].subjectName &&
          AppliedSubject[j].professorName === MySubject[i].professorName
        ) {
          filteredSubject.push(AppliedSubject[j]);
          MySubjectToExchange.push(MySubject[i]);
        }
      }
    }
    // 3번째 파라미터로 받아온 someslist의 값이 false 면 다른 사람이 아닌 내가 신청한 강의 리스트이고
    // true 이면 다른 사람이 신청한 리스트 곧 내가 교환하고자 하는 강의 리스트이다
    if (someonesList) {
      return filteredSubject;
    } else {
      return MySubjectToExchange;
    }
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
      title: <b>강의 교환하기</b>,
      key: "cancel",
      fixed: "right",
      width: 120,
      render: (record) => (
        <Button
          style={{ padding: "0 5px" }}
          type="primary"
          onClick={() => showModal(record)}
        >
          교환 신청하기
        </Button>
      ),
    },
  ];

  const showModal = (data) => {
    console.log(data);
    setVisible(true);
    setSelectedData(data);
  };

  const handleOk = (props) => {
    //! 여기서 신청 버튼 눌렀을때 SelectedData에는 해당 행의 값이 담겨져 있음
    //! filterExchangeList(MySubject, AppliedSubject, false) 해서 나온 값에서 SelectedData랑 date 값만 다른거 하나씩 뽑아서
    //! dispatch 메소드 만든다음 교환 진행
    //! count 값 같은거 만들어서 누르면 1씩 올라가고 양쪽다 눌러서 2 되면 디스패치로 교환
    setVisible(false);
  };

  const handleCancel = (props) => {
    setVisible(props);
  };

  return (
    <div css={container}>
      <p css={tableHeaderTitle}>강의 교환하기</p>
      <p css={tableHeaderTitle}>교환신청 가능한 강의 목록</p>
      <Table
        columns={columns}
        dataSource={filterExchangeList(MySubject, AppliedSubject, true)}
        sticky
        scroll={{ x: 1000, y: 500 }}
        pagination={false}
      />
      <ExchangeModal
        visible={Visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        data={SelectedData}
      />
    </div>
  );
}
