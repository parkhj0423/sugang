import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import {
  applySubject,
  deleteDrawSubject,
  getDrawSubject,
  getMySubject,
} from "../../../_actions/subject_actions";
import {
  Table,
  Tag,
  message,
  Statistic,
  Icon,
  Divider,
  Popconfirm,
  Button,
  Result,
} from "antd";
import CountApply from "../Table/CountApply";
import {
  container,
  tableHeader,
  tableHeaderMenu,
  tableHeaderTitle,
} from "../Table/TableStyle";
import styled from "@emotion/styled";
import { COUNTDOWN, SUBJECT_LIMIT } from "../../Config";
import { drawList } from "../NoticePage/noticeList";

const { Countdown } = Statistic;

const Li = styled.li`
  list-style: none;
  color: #666;
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const StyledTags = styled(Tag)`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

function DrawSubjectPage() {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [MyDrawSubject, setMyDrawSubject] = useState([]);
  const [AppliedDrawSubejct, setAppliedDrawSubejct] = useState([]);
  const [MySubject, setMySubject] = useState([]);
  const [ResultState, setResultState] = useState(false);
  const [deadline] = useState(COUNTDOWN);

  useEffect(() => {
    let variable = {
      user: userId,
    };
    // 내가 추첨 신청을한 강의
    dispatch(getDrawSubject(variable)).then((response) => {
      if (response.payload.result) {
        setMyDrawSubject(response.payload.result);
      } else {
        message.error("불러오기 실패");
      }
    });
    // 내가 추첨 신청을한 강의
    dispatch(getDrawSubject()).then((response) => {
      if (response.payload.result) {
        console.log(response.payload.result);
        setAppliedDrawSubejct(response.payload.result);
      } else {
        message.error("불러오기 실패");
      }
    });
    // 이미신청 완료된 강의
    dispatch(getMySubject()).then((response) => {
      if (response.payload.result) {
        setMySubject(response.payload.result);
      } else {
        message.error("불러오기 실패");
      }
    });
  }, [useDispatch]);

  let data = [];
  for (let i = 0; i < MyDrawSubject.length; i++) {
    data.push({
      key: i,
      subjectId: MyDrawSubject[i].subjectId,
      department: MyDrawSubject[i].department,
      grade: MyDrawSubject[i].grade,
      subjectName: MyDrawSubject[i].subjectName,
      professorName: MyDrawSubject[i].professorName,
      subjectType: MyDrawSubject[i].subjectType,
      subjectPoint: MyDrawSubject[i].subjectPoint,
      date: MyDrawSubject[i].date,
      subjectCode: MyDrawSubject[i].subjectCode,
      classroom: MyDrawSubject[i].classroom,
      division: MyDrawSubject[i].division,
      // rate: Subject[i].rate,
      countApply: (
        <CountApply
          key={i}
          AppliedSubject={MyDrawSubject[i]}
          subject={MySubject}
        />
      ),
      limitApply: SUBJECT_LIMIT,
      available: (
        <CountApply
          key={i}
          AppliedSubject={MyDrawSubject[i]}
          subject={MySubject}
          limit={SUBJECT_LIMIT}
        />
      ),
    });
  }

  const columns = [
    {
      title: <b>학과</b>,
      width: 150,
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
      width: 150,
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
      width: 100,
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
      width: 100,
    },
    {
      title: <b>제한인원</b>,
      dataIndex: "limitApply",
      key: "limitApply",
      width: 100,
    },
    {
      title: <b>공석</b>,
      dataIndex: "available",
      key: "available",
      width: 100,
    },
    {
      title: <b>상태</b>,
      dataIndex: "status",
      key: "status",
      width: 100,
      render: () => (
        <StyledTags color="blue">
          <Icon type="sync" spin />
          추첨 대기
        </StyledTags>
      ),
    },
    {
      title: <b>취소</b>,
      key: "cancel",
      width: 40,
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

  const refreshFunction = (subject) => {
    setMyDrawSubject(
      MyDrawSubject.filter(
        (item) =>
          item.subjectId !== subject.subjectId && item.user._id === userId
      )
    );
  };

  const onCancelClick = (data) => {
    const { subjectId } = data;

    let variable = {
      user: userId,
      subjectId,
    };

    dispatch(deleteDrawSubject(variable)).then((response) => {
      if (response.payload.result) {
        message.success("취소 성공");
        refreshFunction(response.payload.result);
      } else {
        message.success("취소 실패");
      }
    });
  };

  //! 중복되지않는 숫자를 랜덤 출력해주는 함수
  const selectIndex = (totalIndex, selectingNumber) => {
    let randomIndexArray = [];
    for (let i = 0; i < selectingNumber; i++) {
      //check if there is any duplicate index
      let randomNum = Math.floor(Math.random() * totalIndex);
      if (randomIndexArray.indexOf(randomNum) === -1) {
        randomIndexArray.push(randomNum);
      } else {
        //if the randomNum is already in the array retry
        i--;
      }
    }
    return randomIndexArray;
  };

  const onCountDownFinish = () => {
    let drawData = AppliedDrawSubejct;
    for (let i = 0; i < drawData.length; i++) {
      const filteredData = drawData.filter((item) => {
        return item.subjectId === drawData[i].subjectId;
      });

      drawData = drawData.filter((item) => {
        return item.subjectId !== drawData[i].subjectId;
      });
      // 정원보다 많은 신청자가 있을 경우
      if (filteredData.length > SUBJECT_LIMIT) {
        const winning = selectIndex(filteredData.length, SUBJECT_LIMIT);
        console.log(winning);
        for (let i = 0; i < winning.length; i++) {
          let applyVariable = {
            subjectId: filteredData[winning[i]].subjectId,
            user: filteredData[winning[i]].user._id,
            department: filteredData[winning[i]].department,
            grade: filteredData[winning[i]].grade,
            subjectName: filteredData[winning[i]].subjectName,
            professorName: filteredData[winning[i]].professorName,
            subjectType: filteredData[winning[i]].subjectType,
            subjectPoint: filteredData[winning[i]].subjectPoint,
            date: filteredData[winning[i]].date,
            subjectCode: filteredData[winning[i]].subjectCode,
            classroom: filteredData[winning[i]].classroom,
            division: filteredData[winning[i]].division,
          };

          //console.log(filteredData[winning[i]]);
          dispatch(applySubject(applyVariable));
        }

        for (let i = 0; i < filteredData.length; i++) {
          let deleteVariable = {
            subjectId: filteredData[i].subjectId,
            user: filteredData[i].user._id,
          };
          dispatch(deleteDrawSubject(deleteVariable));
        }
      } else {
        // 정원보다 적은 신청자가 있을경우
        for (let i = 0; i < filteredData.length; i++) {
          let applyVariable = {
            subjectId: filteredData[i].subjectId,
            user: filteredData[i].user._id,
            department: filteredData[i].department,
            grade: filteredData[i].grade,
            subjectName: filteredData[i].subjectName,
            professorName: filteredData[i].professorName,
            subjectType: filteredData[i].subjectType,
            subjectPoint: filteredData[i].subjectPoint,
            date: filteredData[i].date,
            subjectCode: filteredData[i].subjectCode,
            classroom: filteredData[i].classroom,
            division: filteredData[i].division,
          };

          let deleteVariable = {
            subjectId: filteredData[i].subjectId,
            user: filteredData[i].user._id,
          };

          dispatch(applySubject(applyVariable));

          dispatch(deleteDrawSubject(deleteVariable));
        }
      }
    }
    message.success(
      "강의 추첨이 끝났습니다. 수강신청내역에서 결과를 확인해 주세요!"
    );
    setResultState(true);
  };

  return (
    <React.Fragment>
      {ResultState ? (
        <Result
          status="warning"
          title="강의 추첨기간이 아닙니다! "
          subTitle="수강신청내역에서 추첨결과를 확인하여주시기 바랍니다."
        />
      ) : (
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
          <Divider orientation="left">
            <b>내가 신청한 강의 목록</b>
          </Divider>
          <Table
            sticky
            columns={columns}
            dataSource={data}
            pagination={false}
          />
          <div
            css={css`
              margin-top: 5rem;
            `}
          >
            <Divider orientation="left">
              <b>수강희망과목 추첨제도 안내</b>
            </Divider>
            <ul>
              {drawList.map((item, i) => (
                <Li key={i}>
                  {item.icon}
                  {item.text}
                </Li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default DrawSubjectPage;
