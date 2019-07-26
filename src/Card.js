import React from "react";

const Card = props => (
  <div key={props.card.id} className="container__info">
    <img className="container__image" src={`${props.card.image}`} alt="" />

    <p>{`${props.card.name} and he is ${props.card.status}`}</p>
    <p> {`${props.card.origin.name}`}</p>
  </div>
);

export default Card;
