import React from "react";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import setupApolloClient from "lib/setupApolloClient";
import { Provider as ThemeProvider } from "reakit";
import theme from "theme";
import PokemonList from "pages/PokemonList";
import PokemonDetails from "pages/PokemonDetails";
import NetworkStatusMonitor from "common/NetworkStatusMonitor";
import ErrorBoundary from "common/ErrorBoundary";
import PurgeCacheMonitor from "common/PurgeCacheMonitor";

class App extends React.Component {
  state = {
    loaded: false,
    apolloClient: null
  };

  componentDidMount() {
    setupApolloClient()
      .then(apolloClient => {
        this.setState({ apolloClient, loaded: true });
      })
      .catch(error => {
        console.error("Error restoring Apollo cache", error);
      });
  }

  render() {
    let { loaded, apolloClient } = this.state;

    if (!loaded) {
      return <div>Loading cache...</div>;
    }

    return (
      <NetworkStatusMonitor>
        <ErrorBoundary>
          <ApolloHooksProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
              <Router>
                <PurgeCacheMonitor>
                  <Switch>
                    <Route exact path="/" component={PokemonList} />
                    <Route
                      path="/pokemons/:pokemonName"
                      component={PokemonDetails}
                    />
                    <Route render={() => "Not Found"} />
                  </Switch>
                </PurgeCacheMonitor>
              </Router>
            </ThemeProvider>
          </ApolloHooksProvider>
        </ErrorBoundary>
      </NetworkStatusMonitor>
    );
  }
}
export default App;
