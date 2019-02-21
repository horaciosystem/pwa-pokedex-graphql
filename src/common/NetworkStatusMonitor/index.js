import React, { useEffect, useState } from "react";

function NetworkStatusMonitor({ children }) {
  let [online, setOnline] = useState(true);
  console.log(online);

  let updateNetworkStatus = () => {
    setOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  });

  if (online) {
    return children;
  } else {
    return (
      <>
        <div>You're offline!</div>
        {children}
      </>
    );
  }
}

export default NetworkStatusMonitor;
