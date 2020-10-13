import React from "react";
import MainPage from "../components/MainPage";
import Home from "routes/Home";

// import "./Page2.css";

const Page1 = ({ cardData, save }) => {
  // console.log(cardData);
  const totalStage = cardData.stage1.concat(
    cardData.stage2,
    cardData.stage3,
    cardData.stage4
  );
  // console.log(totalStage);
  const max =
    totalStage.length === 0
      ? 0
      : totalStage.reduce((previous, current) => {
          return previous > current ? previous : current;
        });
  const cardStage1 = cardData.stage1;
  const addStage1 = 21 - cardData.stage1.length;
  // console.log(cardData.stage1.length);
  for (var i = 1; i < addStage1; i++) {
    cardStage1.push(max + i);
  }
  // console.log(cardStage1);
  return (
    <div>
      {cardStage1.length === 0 ? (
        (alert("해당 Stage에 Card가 없습니다."), (<Home />))
      ) : (
        <MainPage
          cards={cardStage1}
          cardData={cardData}
          save={save}
          stage={1}
        />
      )}
    </div>
  );
};

export default Page1;
