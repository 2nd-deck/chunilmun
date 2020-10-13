import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { dbService } from "fbase";
import Home from "routes/Home";
import Page1 from "routes/Page1";
import Page2 from "routes/Page2";
import Page3 from "routes/Page3";
import Page4 from "routes/Page4";
import New from "routes/New";
import About from "routes/About";
import Auth from "routes/Auth";
import Profile from "routes/Profile";
import Navigation from "./Navigation";
import "./App.css";

const AppRouter = ({ isLoggedIn, userObj }) => {
  const [card, setCard] = useState(false);
  const [cardData, setCardData] = useState([]);
  const colName = userObj.uid.substring(0, 9);

  useEffect(() => {
    dbService.collection(colName).onSnapshot((snapshot) => {
      const colNameArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setCardData(colNameArray);
      if (colNameArray.length !== 0) {
        setCard(true);
      }
    });
  }, []);

  // const stageUp = () => {
  //   // let newStage1 = cardData[0].stage1;
  //   // let newStage2 = cardData[0].stage2;
  //   // let newStage3 = cardData[0].stage3;
  //   // let newStage4 = cardData[0].stage4;
  //   // if (stage === 1) {
  //   //   newStage1.splice(newStage1.indexOf(num), 1), newStage2.push(num);
  //   // } else if (stage === 2) {
  //   //   newStage2.splice(newStage2.indexOf(num), 1), newStage3.push(num);
  //   // } else if (stage === 3) {
  //   //   newStage3.splice(newStage3.indexOf(num), 1), newStage4.push(num);
  //   // }
  //   // setCardData((data) => ({
  //   //   stage1: newStage1,
  //   //   stage2: newStage2,
  //   //   stage3: newStage3,
  //   //   stage4: newStage4,
  //   //   ...data,
  //   // }));
  // };
  const save = async () => {
    const newStage1 = Array.from(new Set(cardData[0].stage1));
    const newStage2 = Array.from(new Set(cardData[0].stage2));
    const newStage3 = Array.from(new Set(cardData[0].stage3));
    const newStage4 = Array.from(new Set(cardData[0].stage4));
    await dbService.doc(`${colName}/${cardData[0].id}`).update({
      stage1: newStage1,

      stage2: newStage2,
      stage3: newStage3,
      stage4: newStage4,
    });

    alert("저장되었습니다.");
  };
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              {card ? (
                <Home cardData={cardData[0]} />
              ) : (
                <New userObj={userObj} />
              )}
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/1">
              <Page1 cardData={cardData[0]} save={save} />
            </Route>
            <Route exact path="/2">
              <Page2 cardData={cardData[0]} save={save} />
            </Route>
            <Route exact path="/3">
              <Page3 cardData={cardData[0]} save={save} />
            </Route>
            <Route exact path="/4">
              <Page4 cardData={cardData[0]} save={save} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/new">
              <New />
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
