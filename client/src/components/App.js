import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";

// pages for this product

import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import MySubjectPage from "./views/MySubjectpage/MySubjectPage";
import ApplyTablePage from "./views/ApplyTablePage/ApplyTablePage";
import NoticePage from "./views/NoticePage/NoticePage";
import CalendarPage from "./views/CalendarPage/CalendarPage";
import ExchangeSubjectPage from "./views/ExchangeSubjectpage/ExchangeSubjectPage";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside



function App() {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div
        style={{
          paddingTop: "88px",
          paddingLeft: "130px",
          minHeight: "calc(100vh - 50px)",
        }}
      >
        <Switch>
          <Route exact path="/notice" component={Auth(NoticePage, true)} />
          <Route exact path="/subject" component={Auth(ApplyTablePage, true)} />
          <Route
            exact
            path="/subject/:userId/exchange"
            component={Auth(ExchangeSubjectPage, true)}
          />
          <Route exact path="/calendar" component={Auth(CalendarPage, true)} />
          <Route
            exact
            path="/subject/:userId"
            component={Auth(MySubjectPage, true)}
          />
          <Route exact path="/" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
