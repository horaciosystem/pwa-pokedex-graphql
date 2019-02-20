import React from "react";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { Router } from "@reach/router";
import apolloClient, { loadCache } from "lib/apolloClient";
import { Provider as ThemeProvider } from "reakit";
import theme from "theme";
import PokemonList from "pages/PokemonList";
import PokemonDetails from "pages/PokemonDetails";

class App extends React.Component {
  state = {
    error: null,
    loaded: false
  };

  async componentDidMount() {
    try {
      await loadCache();
    } catch (error) {
      console.error("Error restoring Apollo cache", error);
    } finally {
      this.setState({ loaded: true });
    }
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    let { error, loaded } = this.state;

    if (!loaded) {
      return <div>Loading cache...</div>;
    }

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
