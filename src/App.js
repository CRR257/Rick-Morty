import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/"
});

const App = () => {

    return (
      <div className="App">
        <ApolloProvider client={client}>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </ApolloProvider>
      </div>
    );
  
}

export default App;

