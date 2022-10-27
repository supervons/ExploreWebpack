import React, {Suspense, useEffect} from "react";
const RemoteApp = React.lazy(() => import("app1/App"));

const App = () => {
    useEffect(()=>{
        require("app3/main")
        require("app3/main2")
    },[])

  return (
   <div>
       <div style={{
           margin: "10px",
           padding:"10px",
           textAlign:"center",
           backgroundColor:"cyan"
       }}>
           <h1 >React App 2</h1>
       </div>
       <Suspense fallback={"loading..."}>
           <RemoteApp/>
       </Suspense>
       <div id={"app"}/>
   </div>
  )
}

export default App;

