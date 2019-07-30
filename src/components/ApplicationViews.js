import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import HomeList from "./home/HomeList";

class ApplicationViews extends Component {
  state = {
    users: [],
    favorites: [],
    cities: [],
    sellerProfiles: []
  };

  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/home"
          render={props => {
            return <HomeList {...props} />;
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
