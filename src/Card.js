import React from "react";

const Card = props => (
  <div key={props.card.id} className="container__info tooltip">
    <img className="container__image" src={`${props.card.image}`} alt="" />
    <p className="container__name">{`${props.card.name}`}</p>
    <p className="tooltiptext"> Status: {`${props.card.status}`} Origin:{`${props.card.origin.name}`}</p>

    </div>
);

export default Card;
