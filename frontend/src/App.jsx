import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import NavBar from "./components/NavBar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import DisplayGif from "./pages/DisplayGif";

function App() {
  const [isLogin, setLogin] = useState(false);
  const [userInitial, setUserInitial] = useState("");
  const [displayGif, setDisplayGif] = useState("");

  console.log("APP " + isLogin);

  return (
    <BrowserRouter>
      <nav>
        <NavBar _isLogin={isLogin} _setLogin={setLogin} _userInitial={userInitial}  />
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={<Login _isLogin={isLogin} _setLogin={setLogin} _userInitial={setUserInitial} _setGif={setDisplayGif}/>}
        />
        <Route path="/display" element={<DisplayGif _url={displayGif} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
