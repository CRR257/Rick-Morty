import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Card from "./Card";
import Footer from "./Footer";
import "./style.css";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql"
});

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 1
    };
  }

  componentDidMount() {
    this.setState({ page: this.state.page });
  }

  handleNextPage = event => {
    event.preventDefault()
    let pageNumber = this.state.page
    pageNumber <=24 ? this.setState({page: pageNumber +1}) : this.setState({page: pageNumber = 25}) 
  }

  handleLastPage = event => {
    event.preventDefault()
    let pageNumber = this.state.page
    pageNumber >1 ? this.setState({page: pageNumber -1}) : this.setState({page: pageNumber = 1})
  }

  render() {
    const GET_CHARACTERS = gql`
        {
          characters (page:${this.state.page}){
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
      `
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>RICK AND MORTY</h1>
          <div className="cards">
            <Query
              query={GET_CHARACTERS}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                return data.characters.results.map(cardResults => (
                  <Card card={cardResults} />
                ));
              }}
            </Query>
          </div>
          <div>
            <div>Pag: {this.state.page} of 25</div>
            <button onClick={this.handleLastPage}>Last Page</button>
            <button onClick={this.handleNextPage}>Next Page</button>
          </div>
          <Footer />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
