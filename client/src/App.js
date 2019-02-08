import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";

import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import PostsManager from "./pages/PostsManager";
import Admin from "./components/pages/Admin";
import PostEditor from "./components/PostEditor";
// import Leads from "./components/pages/Leads";

import "./App.css";

function onAuthRequired({ history }) {
  history.push("/login");
}

class App extends Component {
  render() {
    return (
      <Router>
        <Security
          issuer="https://bigfootwebservice.okta.com/oauth2/ausacu2zhRbgylKNP356"
          client_id="0oaacx81uD0ndjUyF356"
          redirect_uri={process.env.REACT_APP_CALLBACK_URI}
          onAuthRequired={onAuthRequired}
        >
          <div className="App">
            <Navbar />
            <div className="container">
              <Route path="/" exact={true} component={Home} />
              <SecureRoute path="/posts" component={PostsManager} />
              <SecureRoute path="/form" exact={true} component={PostEditor} />
              <SecureRoute path="/admin" exact={true} component={Admin} />
              <Route
                path="/login"
                render={() => (
                  <Login baseUrl="https://bigfootwebservice.okta.com" />
                )}
              />
              <Route path="/implicit/callback" component={ImplicitCallback} />
            </div>
          </div>
        </Security>
      </Router>
    );
  }
}
export default App;
