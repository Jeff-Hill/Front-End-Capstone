import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import LoginManager from "../../modules/LoginManager";
import { Button } from "reactstrap";

let currentUser = sessionStorage.getItem("userId");
class Registration extends Component {
  // Set initial state needs to be empty
  state = {
    id: currentUser,
    username: "",
    password: "",
    userSeller: false,
    isLoggedIn: false
  };

  addNewUser = user => {

    return LoginManager.post(user)
      .then(newUser => {
        sessionStorage.setItem("userId", newUser.id);
        //   console.log(newUser.id)
        //   alert("Thank you for Registering")
      })
      .then(() =>
        this.props.history.push(`/profile/${sessionStorage.getItem("userId")}`)
      );
  };
  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // Upon registration of a new user we have to set whether the user is a seller or buyer
  handleUserTypeChange = evt => {
    // The string of seller is set below as the id of the radio buttons
    if (evt.target.id === "seller") {
      this.setState({
        userSeller: true
      });
    } else {
      this.setState({ userSeller: false });
    }
  };

  saveNewUser = event => {
    event.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
      userSeller: this.state.userSeller,
      isLoggedIn: true
    };

    // Add a .then onto this function to trigger the re-render of FireFuel.js
    this.addNewUser(user).then(() => this.props.isUserLoggedIn());

  };
  render() {
    return (
      <form className="container RegisterForm">
        <h1 className="h3 mb-3 font-weight-normal">
          Welcome to FireFuel Please Register
        </h1>
        <div className="container">
          <label className="reg-user-btn">
            Are you a
            <input
              onClick={this.handleUserTypeChange}
              id="buyer"
              type="radio"
              name="reg-user-type"
            />{" "}
            Buyer
          </label>
          <label className="reg-user-btn">
            OR a
            <input
              onClick={this.handleUserTypeChange}
              type="radio"
              name="reg-user-type"
              id="seller"
            />{" "}
            Seller
          </label>
        </div>
        <div className="container">
          <label htmlFor="inputUsername">Username</label>
          <input
            onChange={this.handleFieldChange}
            type="username"
            id="username"
            placeholder="Username"
            required=""
            autoFocus=""
          />
        </div>
        <div className="container">
          <label htmlFor="inputPassword">Password</label>
          <input
            onChange={this.handleFieldChange}
            type="password"
            id="password"
            placeholder="Password"
            required=""
          />
          <div className="container">
            <Button
              className="reg-link"
              onClick={this.saveNewUser}
              type="submit"
            >
              Register
            </Button>
            <label>
              <strong>OR</strong>
            </label>
            <Button className="reg-link">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(Registration);
