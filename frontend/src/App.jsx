import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import NavBar from "./components/NavBar";
import { AuthProvider, useAuth } from "./components/AuthManager";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import DisplayGif from "./pages/DisplayGif";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav>
          <NavBar />
        </nav>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/display" element={<DisplayGif />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
