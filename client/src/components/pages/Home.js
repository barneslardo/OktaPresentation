import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";

export default withAuth(
  class Home extends Component {
    state = { authenticated: null };

    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    };

    async componentDidMount() {
      this.checkAuthentication();
    }

    async componentDidUpdate() {
      this.checkAuthentication();
    }

    login = async () => {
      this.props.auth.login("/");
    };

    logout = async () => {
      this.props.auth.logout("/");
    };

    render() {
      if (this.state.authenticated === null) return null;

      const mainContent = this.state.authenticated ? (
        <div>
          <p className="lead">
            You have entered the admin portal,{" "}
            <Link to="/admin">click here</Link>
          </p>
          <button className="btn btn-primary btn-lg" onClick={this.logout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p className="lead">
            New Administrators must receive credentials from management
          </p>
          <button className="btn btn-primary btn-lg" onClick={this.login}>
            Login
          </button>
        </div>
      );

      return (
        <div className="jumbotron text-light bg-dark">
          <img class="logo" src="Bigfoot250.png" alt="" />
          <h1 className="display-4 wacky">Bigfoot Admin Portal</h1>
          {mainContent}
        </div>
      );
    }
  }
);
