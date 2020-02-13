import React from "react";

import "./Card.scss";

const Card = props => (
  <div key={props.card.id} className="container-information tooltip">
    <img className="container-image" src={`${props.card.image}`} alt="" />
    <p className="container-name">{`${props.card.name}`}</p>
    <p className="tooltiptext">
      Status: {`${props.card.status}`}
      <br />
      Origin: {`${props.card.origin.name}`}
    </p>
  </div>
);

export default Card;
