import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./main.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.register();
if (module.hot) module.hot.accept();
console.log(
  "console log is showing this " + process.env.REACT_APP_CALLBACK_URI
);
