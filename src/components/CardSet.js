import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import AppRouter from "components/Router";

const CardSet = ({ userObj }) => {
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
  return (save = { save }), (card1 = { card }), (cardData1 = { cardData });
};
export default CardSet;
