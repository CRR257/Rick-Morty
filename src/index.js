import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo";

import React from "react";
import ReactDOM from "react-dom";

import "./style.css";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql"
});

const CharactersQuery = () => {
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

        return data.characters.results.map(character => (
         
          <div className="container">
            <img className="container__image" src={character.image} alt="" />
            <div className="container__info">
              <p>{character.name}</p>
              <p>{character.status} origin {character.origin.name}</p>
            </div>
          </div>
        ));
      }}
    </Query>
  );
};

function App() {
  return (
    <div className="App">
    <h1>RICK AND MORTY</h1>
    <div className="cards">
      <CharactersQuery />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);
