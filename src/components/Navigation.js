import React from "react";
import { authService } from "fbase";
import { Link, useHistory } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
}

export default Navigation;
