import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

import "./Profile.css";

const Profile = ({ cardData }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <div>
      <button className="buttonLogOut" onClick={onLogOutClick}>
        Log Out
      </button>
      {/* <br />
      <br />
      {Boolean(cardData) ? (
        <button className="buttonLogOut" onClick={resetCard}>
          Reset Card
        </button>
      ) : (
        <p></p>
      )} */}
    </div>
  );
};
export default Profile;
