import React, { useEffect, useState } from "react";
import { Calendar, Badge, message } from "antd";
import "./calendar.css";
import { getMySubject } from "../../../_actions/subject_actions";
import { useDispatch } from "react-redux";
import MyInfo from "./MyInfo";

function CalendarPage() {
  const [MySubject, setMySubject] = useState([]);

  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    let variable = {
      user: userId,
    };
    dispatch(getMySubject(variable)).then((response) => {
      if (response.payload.result) {
        message.success("시간표 조회 성공");
        setMySubject(response.payload.result);
      } else {
        message.error("불러오기 실패");
      }
    });
  }, []);

  function getListData(value) {
    let listData = [];

    for (let i = 0; i < MySubject.length; i++) {
      let time = "";
      let date = "";
      let arr = MySubject[i].date.split("");
      date = arr[0];
      arr.shift();
      time = arr.join("");
      if (value._d.toString().split(" ")[0] === "Mon" && date === "월") {
        listData.push({
          type: "success",
          subjectName: MySubject[i].subjectName,
          date: MySubject[i].date,
          classroom: MySubject[i].classroom,
        });
      }
      if (value._d.toString().split(" ")[0] === "Tue" && date === "화") {
        listData.push({
          type: "success",
          subjectName: MySubject[i].subjectName,
          date: MySubject[i].date,
          classroom: MySubject[i].classroom,
        });
      }
      if (value._d.toString().split(" ")[0] === "Wed" && date === "수") {
        listData.push({
          type: "success",
          subjectName: MySubject[i].subjectName,
          date: MySubject[i].date,
          classroom: MySubject[i].classroom,
        });
      }
      if (value._d.toString().split(" ")[0] === "Thu" && date === "목") {
        listData.push({
          type: "success",
          subjectName: MySubject[i].subjectName,
          date: MySubject[i].date,
          classroom: MySubject[i].classroom,
        });
      }
      if (value._d.toString().split(" ")[0] === "Fri" && date === "금") {
        listData.push({
          type: "success",
          subjectName: MySubject[i].subjectName,
          date: MySubject[i].date,
          classroom: MySubject[i].classroom,
        });
      }
    }
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type}
              title={`${item.subjectName} / ${item.date} / ${item.classroom}`}
              text={
                <>
                  <b>{item.subjectName}</b> <br /> {`시간 : ${item.date}`}
                  <br />
                  {`강의실 : ${item.classroom}`}
                </>
              }
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <MyInfo />
      <Calendar dateCellRender={dateCellRender} />
    </div>
  );
}

export default CalendarPage;
