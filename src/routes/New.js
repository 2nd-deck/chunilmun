import { dbService } from "fbase";
import React from "react";

const New = ({ userObj }) => {
  const colName = userObj.uid.substring(0, 9);
  // const createNew = async () => {
  //   await dbService
  //     .collection("original")
  //     .get()
  //     .then(function (querySnapshot) {
  //       querySnapshot.forEach(async (doc) => {
  //         const newDataObj = {
  //           ...doc.data(),
  //           creatorId: userObj.uid,
  //         };
  //         setNewData((prev) => [...prev, newDataObj]);
  //         await dbService.collection(colName).add(newDataObj);
  //       });
  //     });
  //   return newData;
  // };

  const createNew = async () => {
    await dbService.collection(colName).add({
      stage1: [],
      stage2: [],
      stage3: [],
      stage4: [],
      userId: userObj.uid,
    });
  };

  // useEffect(() => {
  //   console.log(newData.length);
  // }, []);
  return (
    <div>
      <button className="buttonLogOut" onClick={createNew}>
        기초 1/2 생성하기
      </button>
    </div>
  );
};

export default New;
