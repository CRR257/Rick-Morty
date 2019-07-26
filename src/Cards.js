import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import "./style.css";

const Cards = () => {
  return (
    <Query
      query={gql`
        {
          characters {
            results {
              id
              name
              image
              status
              origin {
                name
              }
            }
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return data.characters.results.map(({ id, image, name, status }) => (
          <div key={id} className="container">
            <img className="container__image" src={image} alt="" />
            <div className="container__info">
              <p>{name}</p>
              <p>
                {status} origin {origin.name}
              </p>
            </div>
          </div>
        ));
      }}
    </Query>
  );
};

export default Cards;
