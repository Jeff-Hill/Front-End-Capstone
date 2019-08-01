import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LoginManager from "../../modules/LoginManager";

class Login extends Component {
  // Set initial state
  state = {
    username: "",
    password: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // This will set session storage when the Login button is clicked
  handleLogin = e => {
    e.preventDefault();

    LoginManager.get(this.state.username)
      .then(result => {
        console.log("result", result);
        if (result.length > 0) {
          result.forEach(res => {
            sessionStorage.setItem("userId", res.id);
          });

          alert("Welcome Back");

          this.props.history.push("/home");
        } else {
          alert("Please Register");
          this.props.history.push("/register");
        }
        // Chain a .then onto this handleLogin function and call the function that triggers a re-render of FireFuel.js
        // The asynchronousicity of this process doesn't allow for seesion storage to be set quick enough for the re-render
        // function to work properly
      })
      .then(() => this.props.isUserLoggedIn());
  };

  render() {
    return (
      <form onSubmit={this.handleLogin}>
        <h1 className="h3 mb-3 font-weight-normal">
          Welcome to FireFuel Please Login
        </h1>
        <label htmlFor="inputUsername">Username</label>
        <input
          onChange={this.handleFieldChange}
          type="username"
          id="username"
          placeholder="Username"
          required=""
          autoFocus=""
        />
        <label htmlFor="inputPassword">Password</label>
        <input
          onChange={this.handleFieldChange}
          type="password"
          id="password"
          placeholder="Password"
          required=""
        />
        <button type="submit">Login</button>
      </form>
    );
  }
}
export default withRouter(Login);
