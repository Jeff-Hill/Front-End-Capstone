import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import Welcome from "./access/Welcome";
import Login from "./access/Login";
import Registration from "./access/Registration";
import UserManager from "../modules/UserManager"

class Authentication extends Component {
  state = {
    users: [],
    favorites: [],
    cities: [],
    sellerProfiles: []
  };

  componentDidMount() {
    const newState = {};

    UserManager.getAll("users")
      .then(users => (newState.users = users))
      .then(() => this.setState(newState));
  }
  render() {
    console.log("render login shit")
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
            return (
              <Registration
                isUserLoggedIn={this.props.isUserLoggedIn}
                users={this.state.users}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(Authentication);
