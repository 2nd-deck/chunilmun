import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { dbService } from "fbase";

import New from "routes/New";

import "./Home.css";

function Home({ userObj, card, cardData, colName }) {
  const countCards = {
    stage1: cardData.stage1.length,
    stage2: cardData.stage2.length,
    stage3: cardData.stage3.length,
    stage4: cardData.stage4.length,
  };
  const resetCard = async () => {
    await dbService.doc(`${colName}/${cardData.id}`).update({
      stage1: [],
      stage2: [],
      stage3: [],
      stage4: [],
    });

    alert("저장되었습니다.");

    // history.push("/");
  };
  return (
    <>
      {card ? (
        <>
          <div className="home">
            <Link className="item" to="/1">
              <span>1단계 </span>
              <span className="count">({countCards.stage1})</span>
            </Link>
            <Link className="item" to="/2">
              <span>2단계 </span>
              <span className="count">({countCards.stage2})</span>
            </Link>
            <Link className="item" to="/3">
              <span>3단계 </span>
              <span className="count">({countCards.stage3})</span>
            </Link>
            <Link className="item" to="/4">
              <span>4단계 </span>
              <span className="count">({countCards.stage4})</span>
            </Link>
          </div>
          <div>
            <button className="buttonLogOut" onClick={resetCard}>
              Reset Card
            </button>
          </div>
        </>
      ) : (
        <New userObj={userObj} />
      )}
    </>
  );
}

export default Home;
