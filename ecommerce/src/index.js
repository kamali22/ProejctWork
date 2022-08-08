import React from "react";
import ReactDOM from "react-dom/client";
import "/home/kamali/react/ecommerce/src/index.css";
import App from "/home/kamali/react/ecommerce/src/App";
import axios from "axios";

// axios.interceptors.request.use(
//   (req) => {
//     console.log("Request in axios interceptors is", req);
//   },
//   (err) => {
//     console.log("Error in axios interceptor", err);
//   }
// )

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
