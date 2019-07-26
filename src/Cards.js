import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Card from "./Card"

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
        return data.characters.results.map((cardResults) => (
        <Card card = {cardResults}/>
        ));
      }}
    </Query>
  );
};

export default Cards;
