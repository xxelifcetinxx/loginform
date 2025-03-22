import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom"; // Switch yerine Routes kullanıldı

import Success from "./components/Success";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} /> {/* component yerine element kullanıldı */}
        <Route path="/home" element={<Success />} /> {/* component yerine element kullanıldı */}
      </Routes>
    </div>
  );
}

export default App;