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
      page: 1,
      name: "",
    };
  }

  handleSearchSubmit = event => {
    event.preventDefault()
    debugger
    this.setState({search: event.target.value})
}

  handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value, page: 1})

  componentDidMount() {
    this.setState({ page: this.state.page, name: this.state.name });              
  }

  handleNextPage = event => {
    event.preventDefault()
    let pageNumber = this.state.page
    pageNumber <=24 ? this.setState({page: pageNumber +1}) : this.setState({page: pageNumber = 24}) 
  }

  handleLastPage = event => {
    event.preventDefault()
    let pageNumber = this.state.page
    pageNumber >1 ? this.setState({page: pageNumber -1}) : this.setState({page: pageNumber = 1})
  }

  render() {

    const GET_CHARACTERS = gql`
    {
      characters (page:${this.state.page}, filter: { name: "${this.state.name}" }){
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
      `

    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>RICK AND MORTY</h1>
          <form className="search" onSubmit={this.handleSearchSubmit} >
              <h3>Search character:</h3>
              <div className="search__input">
                <input type="text" name="name" onChange={this.handleOnChange} required></input>
              </div>
          </form>
          <div className="cards">
            <Query
              query={GET_CHARACTERS}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p> Error loading page :(</p>;
                if (data.characters.results === null) return <p>Sorry, we didn't find any result for this search </p>;

                return (
                  data.characters.results.map(cardResults => (
                    <Card card={cardResults} />
                  ))
                );
              }}
            </Query>
          </div>
          <div>
                
            <div>Pag: {this.state.page}</div> 
            {this.state.page > 1 ? <button onClick={this.handleLastPage}>Last Page</button> : <button className="button__disabled">Last Page</button>}
            {this.state.page < 24 ? <button onClick={this.handleNextPage}>Next Page</button> : <button className="button__disabled">Next Page</button>}
          </div>
          <Footer />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
