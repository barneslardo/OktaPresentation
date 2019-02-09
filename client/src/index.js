import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./main.css";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
if (module.hot) module.hot.accept();
console.log(
  "console log is showing this " + process.env.REACT_APP_CALLBACK_URI
);
