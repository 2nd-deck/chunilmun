import React from "react";
import MainPage from "../components/MainPage";
import Home from "routes/Home";
// import "./Page2.css";

const Page2 = ({ cardData, save }) => {
  const cardStage = cardData.stage2;

  return (
    <div>
      {cardStage.length === 0 ? (
        (alert("해당 Stage에 Card가 없습니다."), (<Home />))
      ) : (
        <MainPage cards={cardStage} cardData={cardData} save={save} stage={2} />
      )}
    </div>
  );
};

export default Page2;
