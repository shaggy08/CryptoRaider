import "./App.css";
import axios from "axios";
import Coinlist from "./Components/Coinlist";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CoinGraph from "./Pages/CoinGraph";

function App() {
  return (
    // <div>
    //  <h1>hello</h1>
    // <Coinlist />
    // </div>

    <BrowserRouter>
      <Routes>
       
      {/* < Coinlist />
  <h1> App heading</h1> */}
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinGraph />} />
        {/* </div> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
