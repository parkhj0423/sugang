import React from "react";

import MyInfo from "../CalendarPage/MyInfo";
import {
  infoContainer,
  tableHeader,
  tableHeaderTitle,
  subTitle,
} from "../Table/TableStyle";
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import noticeList, { seasonList } from "./noticeList";
import { Icon } from "antd";

const SubTitleContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Li = styled.li`
  list-style: none;
  color: #666;
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const ArrowImg = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 1rem;
`;

function NoticePage() {
  return (
    <React.Fragment>
      <MyInfo />
      <div css={infoContainer}>
        <div css={tableHeader}>
          <p css={tableHeaderTitle}>공지 사항</p>
        </div>
        <SubTitleContainer>
          <img
            src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-h3.png"
            alt="icon"
          />
          <div css={subTitle}>
            <b>시간표 안내</b>
          </div>
        </SubTitleContainer>
        <ul>
          <Li>
            <b>학과 별 시간표 안내 기능이 추가되었습니다.</b>
            <br />
            <b>
              수업 정보, 시간표 안내 등 수강신청 관련 서비스들을 한번에 경험해
              보세요.
            </b>
            <br />
            <b>
              <a href="https://www.sungkyul.ac.kr/skukr/320/subview.do">
                https://www.sungkyul.ac.kr/skukr/320/subview.do
              </a>
            </b>
          </Li>
          <Li>
            <div
              css={css`
                display: flex;
                justify-content: space-around;
                align-items: center;
              `}
            >
              <img
                src={process.env.PUBLIC_URL + "/calendarInfo1.png"}
                alt="image"
              />
              <Icon type="arrow-right" style={{ fontSize: "40px" }} />
              <img
                src={process.env.PUBLIC_URL + "/calendarInfo2.png"}
                alt="image"
              />
            </div>
          </Li>
          <Li></Li>
        </ul>

        <SubTitleContainer>
          <img
            src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-h3.png"
            alt="icon"
          />
          <div css={subTitle}>
            <b>수강신청 시 유의 사항</b>
          </div>
        </SubTitleContainer>
        <ul>
          {noticeList.map((item, i) => (
            <Li key={i}>
              {item.icon}
              {item.text}
            </Li>
          ))}
        </ul>

        <SubTitleContainer>
          <img
            src="https://www.sungkyul.ac.kr/sites/guide/images/common/bul-h3.png"
            alt="icon"
          />
          <div css={subTitle}>
            <b>계절학기 안내</b>
          </div>
        </SubTitleContainer>
        <ul>
          {seasonList.map((item, i) => (
            <Li key={i}>
              {item.icon}
              {item.text}
            </Li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default NoticePage;
