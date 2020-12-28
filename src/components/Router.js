import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Page1 from "routes/Page1";
import Page2 from "routes/Page2";
import Page3 from "routes/Page3";
import Page4 from "routes/Page4";
import Home from "routes/Home";
import New from "routes/New";
import About from "routes/About";
import Auth from "routes/Auth";
import Profile from "routes/Profile";
import Navigation from "./Navigation";
import "./App.css";

const AppRouter = ({ isLoggedIn, userObj, card, cardData, colName }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              {Boolean(cardData) ? (
                <Home
                  userObj={userObj}
                  card={card}
                  cardData={cardData}
                  colName={colName}
                />
              ) : (
                <div>
                  {/* <span>"Initializing..."</span> */}
                  <New userObj={userObj} />
                </div>
              )}
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/profile" colName={colName} cardData={cardData}>
              <Profile />
            </Route>
            <Route exact path="/new">
              <New />
            </Route>
            <Route exact path="/1">
              <Page1 cardData={cardData} colName={colName} />
            </Route>
            <Route exact path="/2">
              <Page2 cardData={cardData} colName={colName} />
            </Route>
            <Route exact path="/3">
              <Page3 cardData={cardData} colName={colName} />
            </Route>
            <Route exact path="/4">
              <Page4 cardData={cardData} colName={colName} />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
