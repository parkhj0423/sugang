import React from "react";
import './calendar.css'
function CalendarPage() {
  return (
    <div className="wrapper">
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
            <div className="calendar__day day">1</div>
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
    </div>
  );
}

export default CalendarPage;
