import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CoinGraph from "./Pages/CoinGraph";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

function App() {
  return (
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
