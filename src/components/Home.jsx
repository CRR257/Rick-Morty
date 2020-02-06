import React, { useState } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Card from "./Card";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import "./style.css";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql"
});

const GET_CHARACTERS = gql`
  {
    characters{
      results {
        id
        name
        image
        status
        origin {
          name
        }
      }
      info {
        count
        pages
      }
    }
  }
`;

const Home = props => {
  const [searchInput, setSearchInput] = useState("");
  const [placeholder, setPlaceholder] = useState("Search a character...");

  const searchUserHandler = event => {
    const userInput = event.target.value;
    setSearchInput(userInput);

    if (userInput === "") {
      setPlaceholder("Search a character...");
    }
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>RICK AND MORTY</h1>
        <SearchBar
          onChangeHandler={searchUserHandler}
          placeholder={placeholder}
        />
        <div className="cards">
          <Query query={GET_CHARACTERS} search={searchInput}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p> Error loading page :(</p>;
              if (data.characters.results === null)
                return <p>Sorry, we didn't find any result for this search </p>;

              return data.characters.results.map(cardResults => (
                <Card card={cardResults} />
              ));
            }}
          </Query>
        </div>
        <div></div>
        <Footer />
      </div>
    </ApolloProvider>
  );
};

export default Home;
