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

  //여기 싹다 다시 고치기
  function getListData(value) {
    let listData = [];

    for (let i = 0; i < MySubject.length; i++) {
      let time = "";
      let date = "";
      let arr = MySubject[i].date.split("");
      date = arr[0];
      arr.shift();
      time = arr.join("");
      console.log(date);
      console.log(time);
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
    // switch (value._d.toString().split(" ")[0]) {
    //   case "Mon":
    //     listData = [{ type: "warning", content: MySubject[i].subjectName }];
    //     break;
    //   case "Tue":
    //     listData = [{ type: "success", content: "This is usual event." }];
    //     break;
    //   case "Wed":
    //     break;
    //   case "Thu":
    //     listData = [
    //       { type: "warning", content: "This is warning event." },
    //       { type: "success", content: "This is usual event." },
    //     ];
    //     break;
    //   case "Fri":
    //     listData = [{ type: "success", content: "This is usual event." }];
    //     break;

    //   default:
    // }
  }

  function dateCellRender(value) {
    const listData = getListData(value);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type}
              text={`${item.subjectName} / ${item.date} / ${item.classroom}`}
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
