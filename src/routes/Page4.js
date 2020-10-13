import React from "react";
import MainPage from "../components/MainPage";
import Home from "routes/Home";
// import "./Page2.css";

const Page4 = ({ cardData, save }) => {
  const cardStage = cardData.stage4;

  return (
    <div>
      {cardStage.length === 0 ? (
        (alert("해당 Stage에 Card가 없습니다."), (<Home />))
      ) : (
        <MainPage cards={cardStage} cardData={cardData} save={save} stage={4} />
      )}
    </div>
  );
};

export default Page4;
