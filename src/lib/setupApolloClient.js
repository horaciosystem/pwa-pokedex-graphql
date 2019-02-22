import { ApolloClient } from "apollo-client";
import { concat } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { RetryLink } from "apollo-link-retry";
import { InMemoryCache } from "apollo-cache-inmemory";
import { CachePersistor } from "apollo-cache-persist";

const UPDATE_INTERVAL_MINUTES = 3;
const SCHEMA_VERSION = "0.0.1";
const SCHEMA_VERSION_KEY = "apollo-schema-version";
const LAST_UPDATE = "last-update";

export default async function setupApolloClient() {
  let cache = new InMemoryCache();
  let localStorage = window.localStorage;
  let retry = new RetryLink({ attempts: { max: 5 } });
  let http = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API_URL
  });

  let link = concat(retry, http);
  let persistor = new CachePersistor({
    cache,
    storage: localStorage,
    debug: true
  });

  return new Promise(resolve => {
    // Read the current schema version from AsyncStorage.
    let currentVersion = localStorage.getItem(SCHEMA_VERSION_KEY);
    let lastUpdate = localStorage.getItem(LAST_UPDATE);

    if (currentVersion === SCHEMA_VERSION && !isCacheExpired(lastUpdate)) {
      // If the current version matches the latest version,
      // we're good to go and can restore the cache.
      localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
      resolve(persistor.restore());
    } else {
      // Otherwise, we'll want to purge the outdated persisted cache
      // and mark ourselves as having updated to the latest version.
      localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
      localStorage.setItem(LAST_UPDATE, new Date().toISOString());
      resolve(persistor.purge());
    }
  }).then(() => {
    return new ApolloClient({
      cache,
      link
    });
  });
}

function isCacheExpired(lastUpdate) {
  let differenceInMilliseconds = Date.now() - new Date(lastUpdate);
  return differenceInMilliseconds / 1000 / 60 >= UPDATE_INTERVAL_MINUTES;
}
