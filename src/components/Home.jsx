import React, { useState } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Query } from 'react-apollo';
import GET_CHARACTERS from '../query/Query';
import Card from './Card';
import Footer from './Footer';
import SearchBar from './SearchBar';
import './style.css';

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql"
});

const Home = props => {
  const [character, setCharacter] = useState("");
  const [placeholder, setPlaceholder] = useState("Search a character...");
  const [page, setPage] = useState(1);

  const searchUserHandler = event => {
    const userInput = event.target.value;
    setCharacter(userInput);
    setPage(1);
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
        <div>
          <Query query={GET_CHARACTERS} variables={{ page, character }}>
            {({
              loading,
              error,
              data: {
                characters: {
                  info: { next, prev, pages, count } = {},
                  results
                } = {}
              } = {}
            }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p className="error"> Error loading page :(</p>;
              next = next ? next : pages;
              prev = prev ? prev : 1;
              return (
                <div className="cards">
                  {results ? (
                    results.map(cardResults => <Card card={cardResults} />)
                  ) : (
                    <p className="error">Sorry, we didn't find any result for this search</p>
                  )}
                  {results && <div>
                    <button disabled={page === 1} onClick={() => setPage(prev)}>
                      Less
                    </button>
                    {page} on {pages}
                    <button
                      disabled={page === pages}
                      onClick={() => setPage(next)}
                    >
                      More
                    </button>
                  </div>}
                </div>
              );
            }}
          </Query>
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
};

export default Home;
