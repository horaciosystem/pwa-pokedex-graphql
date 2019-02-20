import { ApolloClient } from "apollo-client";
import { concat } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { RetryLink } from "apollo-link-retry";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";

const cache = new InMemoryCache();

const retry = new RetryLink({ attempts: { max: Infinity } });
const http = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_API_URL
});

const link = concat(retry, http);

export const loadCache = persistCache({
  cache,
  storage: window.localStorage,
  debug: true
});

const client = new ApolloClient({
  cache,
  link
});

export default client;
