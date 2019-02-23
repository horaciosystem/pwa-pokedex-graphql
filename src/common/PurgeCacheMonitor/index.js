import { useEffect } from "react";
import { useApolloClient } from "react-apollo-hooks";
import cache from "lib/cacheHelper";
import { withRouter } from "react-router";

function PurgeCacheMonitor({ children, ...props }) {
  let client = useApolloClient();
  console.log(client);
  useEffect(() => {
    return props.history.listen(() => {
      if (navigator.onLine && cache.expired()) {
        client.resetStore().then(cache.save);
      }
    }, []);
  });

  return children;
}

export default withRouter(PurgeCacheMonitor);
