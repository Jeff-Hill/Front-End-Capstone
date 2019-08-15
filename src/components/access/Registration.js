import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import LoginManager from "../../modules/LoginManager";
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Label,
  Input,
  ButtonGroup,
  CardSubtitle
} from "reactstrap";

let currentUser = sessionStorage.getItem("userId");
class Registration extends Component {
  // Set initial state needs to be empty
  state = {
    id: currentUser,
    username: "",
    password: "",
    userSeller: false,
    userId: currentUser
  };

  addNewUser = user => {
    return LoginManager.post(user)
      .then(newUser => {
        sessionStorage.setItem("userId", newUser.id);
        this.props.isUserLoggedIn();
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
      userId: this.state.currentUser
    };

    // Add a .then onto this function to trigger the re-render of FireFuel.js
    this.addNewUser(user).then(() => this.props.isUserLoggedIn());
  };
  render() {
    return (
      <Row form>
        <Col lg={{ size: "auto", offset: 4 }}>
          <Card color="warning" className="authentication-card">
            <CardBody>
              <CardTitle className="h3 mb-3 font-weight-normal">
                Welcome to FireFuel Please Register
              </CardTitle>
            </CardBody>

            <CardBody className="text-center" >
              <CardTitle className="h3 mb-3 font-weight-normal">
              <Label> Are you a</Label>
               <CardText>
                <Input
                  onClick={this.handleUserTypeChange}
                  id="buyer"
                  type="radio"
                  name="reg-user-type"
                />
                <Label>Burner</Label>
                </CardText>

                <Label>
                OR a
                </Label>

                <CardText>
                <Input
                  onClick={this.handleUserTypeChange}
                  type="radio"
                  name="reg-user-type"
                  id="seller"
                />
                <Label>Chopper</Label>
                </CardText>
              </CardTitle>
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

            <ButtonGroup>
              <CardBody>
                <Button
                size="lg"
                  color="danger"
                  className="reg-link"
                  onClick={this.saveNewUser}
                  type="submit"
                  style={{ color: "white" }}
                >
                  Register
                </Button>
              </CardBody>
              <CardBody>
                <Label>
                  <strong>OR</strong>
                </Label>
              </CardBody>
              <CardBody>
                <Button size="lg" color="danger" className="reg-link">
                  <Link to="/login" style={{ color: "white" }}>
                    Login
                  </Link>
                </Button>
              </CardBody>
            </ButtonGroup>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Registration);
