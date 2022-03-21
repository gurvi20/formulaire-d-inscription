import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <div className={`card_ ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;