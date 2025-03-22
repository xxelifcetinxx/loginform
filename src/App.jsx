import React from "react";
 import "./App.css";
 import "bootstrap/dist/css/bootstrap.min.css";
 import Login from "./components/login";
 import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
 import Success from "./components/success";
 
 function App() {
   return (
     <div className="app">
       <Switch>
         <Route exact path="/">
           <p>LOGINSAYFASI</p>
           <Login />
         </Route>
         <Route path="/home">
           <Success />
         </Route>
       </Switch>
     </div>
   );
 }
 
 export default App;