import './App.css';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import NavBar from './components/NavBar'; 

import Landing from './pages/Landing';

function App() {

  console.log("check");
  

  return (
    <BrowserRouter>
      <nav>
        <NavBar />
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;