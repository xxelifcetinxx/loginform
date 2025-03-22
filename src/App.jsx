import React from "react";
 import "./App.css";
 import "bootstrap/dist/css/bootstrap.min.css";
 import Login from "./components/Login";
 import { Route, Switch } from "react-router-dom";
 import Success from "./components/Success";
 
 function App() {
   return (
     <div className="app">
       <Switch>
         <Route exact path="/">
          
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