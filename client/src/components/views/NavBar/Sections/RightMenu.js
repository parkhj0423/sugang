/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Button, Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { Icon, Statistic, notification } from "antd";
const { Countdown } = Statistic;

function RightMenu(props) {
  const user = useSelector((state) => state.user);
  const [deadline, setDeadline] = useState(Date.now() + 1000 * 60 * 10);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/");
        localStorage.setItem("userId", "");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  const onCountDownFinish = () => {
    openNotificationWithIcon("warning");
    logoutHandler();
  };

  const onButtonClick = () => {
    setDeadline(Date.now() + 1000 * 60 * 10);
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: <b>시간 초과로 로그아웃 되었습니다.</b>,
      description:
        "다시 로그인 하거나, 로그아웃 되기전에 시간 연장 버튼을 눌러주세요",
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode} style={{ backgroundColor: "#003956" }}>
        {/* <Menu.Item key="mail">
          <a href="/">로그인</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">회원가입</a>
        </Menu.Item> */}
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode} style={{ backgroundColor: "#003956" }}>
        <Menu.Item key="countdown">
          <div>
            <Countdown
              format="mm:ss"
              value={deadline}
              onFinish={onCountDownFinish}
              valueStyle={{ color: "white" }}
            />
            <Button
              type="default"
              size="small"
              onClick={onButtonClick}
              style={{ fontSize: "10px" }}
            >
              시간 연장
            </Button>
          </div>
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon
            type="unlock"
            style={{
              fontSize: "2rem",
              margin: "25px 2rem",
              color: "#fff",
              boxSizing: "border-box",
            }}
            onClick={logoutHandler}
          />
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
