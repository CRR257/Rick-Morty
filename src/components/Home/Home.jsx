import React, { useState, useEffect } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import GET_CHARACTERS from "../../query/Query";

import Card from "../Card/Card";
import Footer from "../Footer/Footer";
import Pagination from "../Pagination/Pagination";
import Header from "../Header/Header";
import "./Home.scss";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql"
});

const Home = () => {
  const [character, setCharacter] = useState("");
  const [placeholder, setPlaceholder] = useState("Search a character...");
  const [page, setPage] = useState(1);

  useEffect(() => {
    goTopPage();
  }, [page]);

  const goTopPage = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };
  const searchUserCaracter = event => {
    const userInput = event.target.value;
    setCharacter(userInput);
    setPage(1);
    if (userInput === "") {
      setPlaceholder("Search a character...");
    }
  };

  return (
    <ApolloProvider client={client}>
      <div className="container">
        <Header
          searchUserHandler={searchUserCaracter}
          placeholder={placeholder}
        />
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
            if (loading)
              return <p className="container-feedback">Loading...</p>;
            if (error)
              return (
                <p className="container-feedback"> Error loading page :(</p>
              );
            next = next ? next : pages;
            prev = prev ? prev : 1;
            return (
              <div>
                <div className="cards">
                  {results ? (
                    results.map(cardResults => (
                      <Card card={cardResults} key={cardResults.id} />
                    ))
                  ) : (
                    <p className="container-feedback">
                      Sorry, we didn't find any result for this search
                    </p>
                  )}
                </div>
                {results && (
                  <Pagination
                    page={page}
                    pages={pages}
                    next={next}
                    prev={prev}
                    onClickNextPage={() => setPage(next)}
                    onClickLastPage={() => setPage(prev)}
                  />
                )}
              </div>
            );
          }}
        </Query>
        <Footer />
      </div>
    </ApolloProvider>
  );
};

export default Home;
