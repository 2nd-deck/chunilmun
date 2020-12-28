import React from "react";
import MainPage from "../components/MainPage";
import { withRouter } from "react-router-dom";

// import "./Page2.css";

const Page4 = withRouter(({ cardData, colName, history }) => {
  const cardStage = cardData.stage4;

  return (
    <div>
      {cardStage.length === 0 ? (
        (alert("해당 Stage에 Card가 없습니다."), history.push("/"))
      ) : (
        <MainPage
          cards={cardStage}
          cardData={cardData}
          colName={colName}
          stage={4}
        />
      )}
    </div>
  );
});

export default Page4;
