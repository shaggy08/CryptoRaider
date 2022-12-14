import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

// root.use(cors(corsOptions));

// const cors = require("cors");

// root.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

// root.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
