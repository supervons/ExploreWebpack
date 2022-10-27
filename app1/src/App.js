import React, {Suspense} from "react";
// const RemoteApp = React.lazy(() => import("app2/App")); // 避免循环调用

const App = () => {
  return (
    <div>
      <div style={{
        margin:"10px",
        padding:"10px",
        textAlign:"center",
        backgroundColor:"greenyellow"
      }}>
        <h1>React App1</h1>
      </div>
      {/*<Suspense fallback={"loading..."}>*/}
      {/*  <RemoteApp/>*/}
      {/*</Suspense>*/}
    </div>)
}


export default App;
