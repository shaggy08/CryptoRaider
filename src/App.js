import "./App.css";
import axios from "axios";
import Coinlist from "./Components/Coinlist";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CoinGraph from "./Pages/CoinGraph";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

function App() {
  return (
    // <div>
    //  <h1>hello</h1>
    // <Coinlist />
    // </div>
    <div className="app-container">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<CoinGraph />} />
          {/* </div> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
