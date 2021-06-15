import React, { useEffect, useState } from "react";
import { Button, Divider, message, Table } from "antd";
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useDispatch } from "react-redux";
import {
  addExchangeSubject,
  getMySubject,
  switchExchangeSubject,
} from "../../../_actions/subject_actions";
import { tableHeaderTitle, container } from "../Table/TableStyle";
import ExchangeModal from "./ExchangeModal";
import styled from "@emotion/styled";
import { exchangeList } from "../NoticePage/noticeList";
const Li = styled.li`
  list-style: none;
  color: #666;
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

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

    dispatch(switchExchangeSubject()).then((response) => {
      if (response.payload.success) {
       
        message.success("강의 교환 성공");
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

    //! 중복 제거해서 출력 만들기
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
          disabled={record.subjectId === SelectedData.subjectId ? true : false}
        >
          교환 신청하기
        </Button>
      ),
    },
  ];

  const showModal = (data) => {
   
    setVisible(true);
    setSelectedData(data);
  };

  const handleOk = (props) => {
    let myFilteredData = filterExchangeList(
      MySubject,
      AppliedSubject,
      false
    ).filter(
      (subject) =>
        subject.subjectName === SelectedData.subjectName &&
        subject.date !== SelectedData.date &&
        subject.professorName === SelectedData.professorName
    );
   
    let variable = {
      user: userId,
      subjectId: SelectedData.subjectId,
      department: SelectedData.department,
      subjectName: SelectedData.subjectName,
      professorName: SelectedData.professorName,
      date: SelectedData.date,
    };
    dispatch(addExchangeSubject(variable)).then((response) => {
      if (response.payload.success) {
        message.success("교환 신청 완료");
        // refreshFunction(response.payload.result);
      
      } else {
        message.error("이미 신청했거나 교환 신청에 문제가 생겼습니다.");
      }
    });

    setVisible(props);
  };

  const handleCancel = (props) => {
    setVisible(props);
  };

  return (
    <div css={container}>
      <p css={tableHeaderTitle}>신청 가능한 강의 목록</p>
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
      <div
        css={css`
          margin-top: 5rem;
        `}
      >
        <Divider orientation="left">
          <b>수강과목 교환제도 안내</b>
        </Divider>
        <ul>
          {exchangeList.map((item, i) => (
            <Li key={i}>
              {item.icon}
              {item.text}
            </Li>
          ))}
        </ul>
      </div>
    </div>
  );
}
