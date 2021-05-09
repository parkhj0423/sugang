import React from "react";
import { Button, Modal, Typography } from "antd";

const { Title, Text } = Typography;

function ExchangeModal(props) {
  return (
    <div>
      <Modal
        visible={props.visible}
        title="강의 교환"
        onOk={() => props.handleOk(false)}
        onCancel={() => props.handleCancel(false)}
        footer={[
          <Button
            key="back"
            type="danger"
            onClick={() => props.handleCancel(false)}
          >
            취소
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => props.handleOk(false)}
          >
            신청
          </Button>,
        ]}
      >
        <Title level={3}>
          <Text mark>
            <b>{props.data.subjectName} </b>
          </Text>
          강의를 선택하셨습니다.
        </Title>
        <Text strong>
          정말 <Text code>{props.data.subjectName}</Text> 강의와 교환을
          신청하시려면
        </Text>
        <Text code>
          <b>신청</b>
        </Text>
        <Text strong>버튼을 눌러주세요 </Text>
        <br />
        <br />
        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text>
            <Text code>
              <b>{props.data.subjectName}</b>
            </Text>
            의 강의 상세 정보
          </Text>
          <br />
          <Text>
            학과명 :
            <Text code>
              <b>{props.data.department}</b>
            </Text>
          </Text>
          <br />
          <Text>
            강의명 :
            <Text code>
              <b>{props.data.subjectName}</b>
            </Text>
          </Text>
          <br />
          <Text>
            교수명 :
            <Text code>
              <b>{props.data.professorName}</b>
            </Text>
          </Text>
          <br />
          <Text>
            수업 시간 :
            <Text code>
              <b>{props.data.date}</b>
            </Text>
          </Text>
        </div>
        <br />
        <br />

        <Title level={4}>** 주의 사항 **</Title>

        <Text type="warning">
          <b>교환 신청 후 바로 강의 교환이 진행되는 것이 아닙니다.</b>
        </Text>
        <br />
        <Text type="danger">
          같은 강의명을 가진 강의를 수강신청 한 사람 중 교환을 신청한 인원이
          존재해야 1:1 상호 교환이 이루어 집니다.
        </Text>
        <br />
        <Text type="danger">이후 강의 교환은 자동으로 진행됩니다.</Text>
        <br />
      </Modal>
    </div>
  );
}

export default ExchangeModal;
