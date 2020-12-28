import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { dbService } from "fbase";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [card, setCard] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [colName, setColName] = useState("");

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  useEffect(() => {
    if (userObj !== null) {
      setColName(userObj.uid.substring(0, 9));
    }
  }, [userObj]);
  useEffect(() => {
    if (colName !== "") {
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
    }
  }, [colName]);

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          card={card}
          cardData={cardData[0]}
          colName={colName}
        />
      ) : (
        "Initializing..."
      )}
      <div className="footer">
        <footer>&copy; {new Date().getFullYear()} 2nd-deck</footer>
      </div>
    </>
  );
};

export default App;
