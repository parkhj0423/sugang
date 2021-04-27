import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { infoContainer } from "../Table/TableStyle";
import { Descriptions, Badge } from "antd";

function MyInfo() {
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
        <Descriptions.Item label="이름">박현우</Descriptions.Item>
        <Descriptions.Item label="학년">4</Descriptions.Item>
        <Descriptions.Item label="학적 정보">
          <Badge status="processing" text="재학중" />
        </Descriptions.Item>
        <Descriptions.Item label="학번">20160372</Descriptions.Item>
        <Descriptions.Item label="학과">컴퓨터공학과</Descriptions.Item>

        <Descriptions.Item label="수강 가능 학점" >
         21 학점
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default MyInfo;
