import React from "react";

const Card = props => (
  <div key={props.card.id} className="container__info">
    <img className="container__image" src={`${props.card.image}`} alt="" />
    <p>{`${props.card.name}`}</p>
  </div>
);

export default Card;
