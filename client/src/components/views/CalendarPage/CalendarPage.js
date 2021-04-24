import React, { useEffect, useState } from "react";
import { Calendar, Badge, message } from "antd";
import "./calendar.css";
import { getMySubject } from "../../../_actions/subject_actions";
import { useDispatch } from "react-redux";
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
    let listData;

    for (let i = 0; i < MySubject.length; i++) {
      let time = "";
      let date = "";
      let arr = MySubject[i].date.split("");
      date = arr[0];
      arr.shift();
      time = arr.join("");
      console.log(date);
      console.log(time);

      if (value._d.toString().split(" ")[0] === "Mon") {
        listData = [{ type: "warning", content: MySubject[i].subjectName }];
      }
      if (value._d.toString().split(" ")[0] === "Tue") {
        listData = [{ type: "warning", content: MySubject[i].subjectName }];
      }
      if (value._d.toString().split(" ")[0] === "Wed") {
        listData = [{ type: "warning", content: MySubject[i].subjectName }];
      }
      if (value._d.toString().split(" ")[0] === "Thu") {
        listData = [{ type: "warning", content: MySubject[i].subjectName }];
      }
      if (value._d.toString().split(" ")[0] === "Fri") {
        listData = [{ type: "warning", content: MySubject[i].subjectName }];
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
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  const locale = {
    lang: {
      locale: "en_US",
      placeholder: "Select date",
      rangePlaceholder: ["Start date", "End date"],
      today: "Today",
      now: "Now",
      backToToday: "Back to today",
      ok: "Ok",
      clear: "Clear",
      month: "Month",
      year: "Year",
      timeSelect: "Select time",
      dateSelect: "Select date",
      monthSelect: "Choose a month",
      yearSelect: "Choose a year",
      decadeSelect: "Choose a decade",
      yearFormat: "YYYY",
      dateFormat: "M/D/YYYY",
      dayFormat: "D",
      dateTimeFormat: "M/D/YYYY HH:mm:ss",
      monthFormat: "MMMM",
      monthBeforeYear: true,
      previousMonth: "Previous month (PageUp)",
      nextMonth: "Next month (PageDown)",
      previousYear: "Last year (Control + left)",
      nextYear: "Next year (Control + right)",
      previousDecade: "Last decade",
      nextDecade: "Next decade",
      previousCentury: "Last century",
      nextCentury: "Next century",
    },
    timePickerLocale: {
      placeholder: "Select time",
    },
    dateFormat: "YYYY-MM-DD",
    dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
    weekFormat: "YYYY-wo",
    monthFormat: "YYYY-MM",
  };

  return (
    <div>
      <Calendar dateCellRender={dateCellRender} locale={locale} />
    </div>
  );
}

export default CalendarPage;

{
  /* <div className="wrapper">
      <main>
        <div className="calendar">
          <div className="calendar__header">
            <div>시간</div>
            <div>월</div>
            <div>화</div>
            <div>수</div>
            <div>목</div>
            <div>금</div>
          </div>
          <div className="calendar__week">
            <div className="calendar__day day"><br/>1교시 <br/><br/> 09:00 ~ 11:40</div>
            <div className="calendar__day day">2</div>
            <div className="calendar__day day">3</div>
            <div className="calendar__day day">4</div>
            <div className="calendar__day day">5</div>
            <div className="calendar__day day">6</div>
          </div>
          <div className="calendar__week">
            <div className="calendar__day day">8</div>
            <div className="calendar__day day">9</div>
            <div className="calendar__day day">10</div>
            <div className="calendar__day day">11</div>
            <div className="calendar__day day">12</div>
            <div className="calendar__day day">13</div>
          </div>
          <div className="calendar__week">
            <div className="calendar__day day">15</div>
            <div className="calendar__day day">16</div>
            <div className="calendar__day day">17</div>
            <div className="calendar__day day">18</div>
            <div className="calendar__day day">19</div>
            <div className="calendar__day day">20</div>
          </div>
          <div className="calendar__week">
            <div className="calendar__day day">22</div>
            <div className="calendar__day day">23</div>
            <div className="calendar__day day">24</div>
            <div className="calendar__day day">25</div>
            <div className="calendar__day day">26</div>
            <div className="calendar__day day">27</div>
          </div>
          <div className="calendar__week">
            <div className="calendar__day day">29</div>
            <div className="calendar__day day">30</div>
            <div className="calendar__day day">31</div>
            <div className="calendar__day day">1</div>
            <div className="calendar__day day">2</div>
            <div className="calendar__day day">3</div>
          </div>
        </div>
      </main>
    </div> */
}
