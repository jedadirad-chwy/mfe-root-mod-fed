import React from "react";

const App2 = React.lazy(() => import("app1/Root"));
const App = () => {
  return (
    <>
      <h1>app</h1>

      <React.Suspense>
        <>
          <App2 />
        </>
      </React.Suspense>
    </>
  );
};

export default App;
