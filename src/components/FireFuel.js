import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import Authentication from "./Authentication";
import "bootstrap/dist/css/bootstrap.css";

export default class FireFuel extends Component {
  // Have to set state in order to change it in the isUserLoggedIn function below to trigger a component re-render
  state = {
    username: "",
    isLoggedIn: false
  };

  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  // This function's purpose is to re-render this component after a user is registered or logged in
  // which will re-run the isAuthenticated and show the navbar on the Home page
  isUserLoggedIn = () => {
    if (this.isAuthenticated()) {
      this.setState({ isLoggedIn: true });
    } else {
        this.setState({isLoggedIn: false})
    }
  };

  // In order to only show the NavBar to users that are registered or logged in I set isAuthenticated to determine
  // if session storage has a user logged in and to render the appropriate components.

  render() {
    console.log("render of the main page");
    if (this.isAuthenticated()) {
      return (
        <React.Fragment>
          <NavBar isUserLoggedIn={this.isUserLoggedIn}/>
          <ApplicationViews />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
{/* Pass in the isUserLoggedFunction so it can be used by the child components of Authentication */}
          <Authentication isUserLoggedIn={this.isUserLoggedIn} />
        </React.Fragment>
      );
    }
  }
}
