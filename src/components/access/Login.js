import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LoginManager from "../../modules/LoginManager";
import { Col, Row, Card, CardText, CardBody, Button, Label, Input} from 'reactstrap';

class Login extends Component {
  // Set initial state
  state = {
    username: "",
    password: "",
    userSeller: false
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
        this.setState({
          user: result[0]
        })
        console.log("result", result);
        if (result.length > 0) {
          result.forEach(res => {
            sessionStorage.setItem("userId", res.id);
          });

          alert("Welcome Back");
        if(this.state.user.userSeller === true){
          console.log("login userSeller is", this.state.userSeller)
          this.props.history.push("/buyers")
        } else {
          this.props.history.push("/sellers")
        }
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
      <Row form>
      <Col lg={{ size: "auto", offset: 4 }}>
      <Card  className="authentication-card" color="warning">

        <CardBody className="h2 mb-3 font-weight-normal">
          Welcome Back to FireFuel Please Login
        </CardBody>


          <CardText className="authentication-btns">
        <Label htmlFor="inputUsername">Username</Label>

        <Input
          onChange={this.handleFieldChange}
          type="username"
          id="username"
          placeholder="Username"
          required=""
          autoFocus=""
        />
        </CardText>
        <CardText className="authentication-btns">
        <Label htmlFor="inputPassword">Password</Label>
        <Input
          onChange={this.handleFieldChange}
          type="password"
          id="password"
          placeholder="Password"
          required=""
        />
        </CardText>


        <Button className="authentication-btns" type="submit" onClick={this.handleLogin} color="danger">Login</Button>
      </Card>
      </Col>
      </Row>
    );
  }
}
export default withRouter(Login);
