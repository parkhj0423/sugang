import React, { useEffect } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { infoContainer } from "../Table/TableStyle";
import { Descriptions, Badge } from "antd";
import { useSelector } from "react-redux";
function MyInfo() {
  const user = useSelector((state) => state.user.userData);

  return (
    <div css={infoContainer}>
      <Descriptions
        title={
          <h2>
            <b>학생 정보</b>
          </h2>
        }
        bordered
      >
        <Descriptions.Item label="이름">{user ? user.name : ''}</Descriptions.Item>
        <Descriptions.Item label="학년">{user ? user.grade : ''} 학년</Descriptions.Item>
        <Descriptions.Item label="학적 정보">
          <Badge status="processing" text="재학중" />
        </Descriptions.Item>
        <Descriptions.Item label="학번">{user ? user.studentId : ''}</Descriptions.Item>
        <Descriptions.Item label="학과">{user ? user.department : ''}</Descriptions.Item>
        <Descriptions.Item label="수강 가능 학점">21 학점</Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default MyInfo;
