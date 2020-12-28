import React from "react";
import "./CardMain.css";

export function CardMain(props) {
  const lang =
    props.lang === "korean" ? props.value.korean : props.value.english;
  return (
    <div className="card">
      <h2 className="card__id">{props.value.id}</h2>
      <h3 className="card__language">{lang}</h3>
    </div>
  );
}
