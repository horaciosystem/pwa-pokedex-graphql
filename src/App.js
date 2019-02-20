import React from "react";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { Router } from "@reach/router";
import apolloClient from "lib/apolloClient";
import { Provider as ThemeProvider } from "reakit";
import theme from "theme";
import PokemonList from "pages/PokemonList";
import PokemonDetails from "pages/PokemonDetails";

class App extends React.Component {
  state = {
    error: null
  };

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    let { error } = this.state;
    if (error) {
      return <div>{error}</div>;
    }

    return (
      <ApolloHooksProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <Router>
            <PokemonList path="/" />
            <PokemonDetails path="/pokemons/:pokemonName" />
          </Router>
        </ThemeProvider>
      </ApolloHooksProvider>
    );
  }
}
export default App;
