import React, { Component } from "react";

class Admin extends Component {
  state = {
    currentUserName: "",
    currentUserEmail: "",
    lastLogged: ""
  };

  componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.setState({
      currentUserEmail: idToken.idToken.claims.email,
      currentUserName: idToken.idToken.claims.name,
      lastLogged: idToken.idToken.claims.lastLogged
    });
    console.log(idToken);
  }

  render() {
    const { currentUserEmail, currentUserName, lastLogged } = this.state;

    return (
      <div className="jumbotron text-light bg-dark">
        <h1 class="wacky my-5">Admin Dash</h1>
        <h1>Welcome {currentUserName}</h1>
        <p>Email: {currentUserEmail}</p>
        <p>You have reached the authorized staff area of the portal</p>
        <p>Last Login: {lastLogged}</p>
      </div>
    );
  }
}

export default Admin;
