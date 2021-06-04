import { Statistic, Modal, Icon } from "antd";
import { withRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";

const { Countdown } = Statistic;
function BeforeCountDownPage(props) {
  const [deadline] = useState(Date.now() + 1000 * 2);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    showModal();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onCountDownFinish = () => {
    props.history.push("/notice");
  };

  return (
    <div>
      <Modal visible={isModalVisible} title="알림" footer={null}>
        <div style={{ display: "flex", fontSize: "1rem" }}>
          <Icon
            type="info-circle"
            theme="twoTone"
            style={{ fontSize: "1.5rem",marginRight:'10px' }}
          />
          <b>지금은 수강신청 기간이 아닙니다.  </b>
          <Countdown
            format="ss"
            value={deadline}
            onFinish={onCountDownFinish}
            valueStyle={{ color: "red", fontSize: "1rem" }}
          />
          <b>초 후에 접속 가능합니다.</b>
        </div>
      </Modal>
    </div>
  );
}

export default withRouter(BeforeCountDownPage);
