import React, { useState } from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button, Icon } from "antd";
import "./Sections/Navbar.css";
import { Link } from "react-router-dom";

function NavBar() {
  const [visible, setVisible] = useState(false);
  const [ScrollPos, setScrollPos] = useState(0);
  const [Show, setShow] = useState(true);

  const userId = localStorage.getItem("userId");

  window.addEventListener("scroll", () => {
    let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
    setScrollPos(scrollLocation);
    setShow(ScrollPos > scrollLocation);
  });

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div className={Show ? "active" : "hidden"}>
        <nav className="menu">
          <div className="menu__logo">
            <a href="/">
              <img
                src="https://www.sungkyul.ac.kr/sites/skukr/images/common/top-logo.png"
                alt="logo"
              />
            </a>
          </div>
          <div className="menu__container">
            {/* <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div> */}
            <div className="menu_rigth">
              <RightMenu mode="horizontal" />
            </div>
            <Button
              className="menu__mobile-button"
              type="primary"
              onClick={showDrawer}
            >
              <Icon type="align-right" />
            </Button>
            <Drawer
              title="Basic Drawer"
              placement="right"
              className="menu_drawer"
              closable={false}
              onClose={onClose}
              visible={visible}
            >
              {/* <LeftMenu mode="inline" /> */}
              {/* <RightMenu mode="inline" /> */}
            </Drawer>
          </div>
        </nav>
      </div>

      <nav className="menu menu_vertical">
        <ul>
          <li className="li_top"></li>
          {localStorage.getItem("userId") && (
            <>
              <li className="li_content">
                <Link to="/" className="link">
                  <Icon type="notification" className="icon" />
                  <p>공지사항</p>
                </Link>
              </li>
              <li className="li_content">
                <Link to="/" className="link">
                  <Icon type="gift" className="icon" />
                  <p>장바구니 정보</p>
                </Link>
              </li>
              <li className="li_content">
                <Link to="/applysubject" className="link">
                  <Icon type="hdd" className="icon" />
                  <p>수강신청</p>
                </Link>
              </li>
              <li className="li_content">
                <Link to={`/mysubject/${userId}`} className="link">
                  <Icon type="schedule" className="icon" />
                  <p>수강신청 내역</p>
                </Link>
              </li>
              <li className="li_content">
                <Link to="/" className="link">
                  <Icon type="calendar" className="icon" />
                  <p>종합시간표&nbsp; 조회</p>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
