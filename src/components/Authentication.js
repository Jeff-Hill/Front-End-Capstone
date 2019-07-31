import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import Welcome from "./access/Welcome";
import Login from "./access/Login";
import Registration from "./access/Registration";

class Authentication extends Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={Welcome} />
        {/* Pass is as props the isUserLoggedIn function to be used by both the Login and Registration pages
         to trigger the FireFuel.js component re-render */}
        <Route
          exact
          path="/login"
          render={props => {
            return <Login isUserLoggedIn={this.props.isUserLoggedIn} />;
          }}
        />

        <Route
          exact
          path="/register"
          render={props => {
            return <Registration isUserLoggedIn={this.props.isUserLoggedIn} />;
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(Authentication);
