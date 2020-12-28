import React, { useState } from "react";
import { CardMain } from "./CardMain";
import "./MainPage.css";
import { Link, withRouter } from "react-router-dom";
import dataSet from "./example.json";
import { dbService } from "fbase";

const MainPage = withRouter(({ cards, cardData, stage, colName, history }) => {
  const cardDataTotal = dataSet.data;
  const [view, setView] = useState(0);
  const [lang, setLang] = useState("korean");
  const [setCard, setSetCard] = useState(
    cards.map((data) => ({
      id: data,
      korean: cardDataTotal.filter((set) => set.id === data)[0].korean,
      english: cardDataTotal.filter((set) => set.id === data)[0].english,
      stage: stage,
    }))
  );
  const pass = () => {
    const modifiedData = setCard.map((item) =>
      item.id === setCard[view].id
        ? {
            ...item,
            stage: setCard[view].stage === 4 ? 4 : setCard[view].stage + 1,
          }
        : item
    );

    setSetCard(modifiedData);
    next();
  };
  const next = () => {
    let nextView = view === setCard.length - 1 ? view : view + 1;
    setView(nextView);
    setLang("korean");
  };
  const pre = () => {
    let preView = view === 0 ? view : view - 1;
    setView(preView);
    setLang("korean");
  };
  const changeLang = () => {
    const newLang = lang === "korean" ? "english" : "korean";
    setLang(newLang);
  };

  const updateSave = () => {
    const newStage1 = cardData.stage1;
    const newStage2 = cardData.stage2;
    const newStage3 = cardData.stage3;
    const newStage4 = cardData.stage4;

    setCard.map((card) => {
      if (stage === 1 && card.stage !== 1) {
        newStage1.splice(newStage1.indexOf(card.id), 1);
        newStage2.push(card.id);
      } else if (stage === 2 && card.stage !== 2) {
        newStage2.splice(newStage2.indexOf(card.id), 1);
        newStage3.push(card.id);
      } else if (stage === 3 && card.stage !== 3) {
        newStage3.splice(newStage3.indexOf(card.id), 1);
        newStage4.push(card.id);
      }
    });
    save();
  };
  const save = async () => {
    const newStage1 = Array.from(new Set(cardData.stage1));
    const newStage2 = Array.from(new Set(cardData.stage2));
    const newStage3 = Array.from(new Set(cardData.stage3));
    const newStage4 = Array.from(new Set(cardData.stage4));
    await dbService.doc(`${colName}/${cardData.id}`).update({
      stage1: newStage1,
      stage2: newStage2,
      stage3: newStage3,
      stage4: newStage4,
    });

    alert("저장되었습니다.");
    history.push("/");
  };
  return (
    <section className="container">
      <div className="back">
        <Link to="/">←</Link>
      </div>
      <div className="status">
        <span>
          {setCard[view].stage} 단계 ({view + 1} / {setCard.length})
        </span>
      </div>
      <div></div>
      <div className="sideButtons" onClick={pre}>
        <span>◀</span>
      </div>
      <div className="cards" onClick={changeLang}>
        <CardMain value={setCard[view]} lang={lang} />
      </div>
      <div className="sideButtons" onClick={next}>
        <span>▶</span>
      </div>
      <div></div>
      <div className="buttons">
        <div>
          <span> </span>
          <button className="button" onClick={next}>
            FAIL
          </button>
          <span> Stage {setCard[view].stage} </span>
          <button className="button" onClick={pass}>
            PASS
          </button>
          <span> </span>
          <button className="save" onClick={updateSave}>
            Save
          </button>
        </div>
      </div>
      <div></div>
    </section>
  );
});

export default MainPage;
