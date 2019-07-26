import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Cards from "./Cards";
import "./style.css";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql"
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <h1>RICK AND MORTY</h1>
      <div className="cards">
        <Cards />
      </div>
    </div>
  </ApolloProvider>
);

export default App;
