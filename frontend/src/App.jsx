import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import NavBar from "./components/NavBar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";

function App() {
  const [isLogin, setLogin] = useState(false);

  console.log("APP " + isLogin);

  return (
    <BrowserRouter>
      <nav>
        <NavBar _isLogin={isLogin} _setLogin={setLogin} />
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={<Login _isLogin={isLogin} _setLogin={setLogin} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
