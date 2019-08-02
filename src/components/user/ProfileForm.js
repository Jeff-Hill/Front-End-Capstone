import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import { stringify } from "querystring";

let currentUser = sessionStorage.getItem("userId");
class ProfileForm extends Component {
  state = {
    username: this.props.user.username,
    phoneNumber: "",
    userId: currentUser,
    userNeedsWood: false,
    cityId: "",
    userId: currentUser,
    locationCrossStreetOne: "",
    locationCrossStreetTwo: "",
    pricePerLog: "",
    pricePerHalfCord: "",
    pricePerFullCord: "",
    sellerDelivers: false,
    readyToSell: false
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleRadioBtnChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.checked;
    this.setState(stateToChange);
  };

  addPaymentType = () => {
    this.setState(state => {
      const paymentAccepted = [...state.paymentAccepted]
      return{
        paymentAccepted
      }
    })
  }



  // handleUserNeedsWoodChange = evt => {
  //   // The string of yes is set below as the id of the radio buttons
  //   if (evt.target.id === "yes") {
  //     this.setState({ userNeedsWood: true });
  //   } else {
  //     this.setState({ userNeedsWood: false });
  //   }
  // };

  updateBuyerProfile = evt => {
    evt.preventDefault();
    const editedBuyer = {
      id: this.props.match.params.userId,
      username: this.props.user.username,
      password: this.props.user.password,
      phoneNumber: this.state.phoneNumber,
      userSeller: this.props.user.userSeller,
      userNeedsWood: this.state.userNeedsWood,
      cityId: parseInt(this.state.cityId)
    };
    this.props
      .updateUser(editedBuyer)
      .then(() => this.props.history.push("/buyers"));
  };

  updateSellerProfile = evt => {
    evt.preventDefault();
    const editedSeller = {
    //   id: this.props.match.params.userId,
      userId: parseInt(this.state.userId),
      locationCrossStreetOne: this.state.locationCrossStreetOne,
      locationCrossStreetTwo: this.state.locationCrossStreetTwo,
      pricePerLog: this.state.pricePerLog,
      pricePerHalfCord: this.state.pricePerHalfCord,
      pricePerFullCord: this.state.pricePerFullCord,
      sellerDelivers: this.state.sellerDelivers,
      readyToSell: this.state.readyToSell,
      paymentAccepted: this.state.paymentAccepted
    };
    const editedBuyer = {
      id: this.props.match.params.userId,
      username: this.props.user.username,
      password: this.props.user.password,
      phoneNumber: this.state.phoneNumber,
      userSeller: this.props.user.userSeller,
      userNeedsWood: this.state.userNeedsWood,
      cityId: parseInt(this.state.cityId)
    };
    this.props
      .updateSeller(editedSeller, editedBuyer)
      .then(() => this.props.history.push("/sellers"));
  };

  render() {
    if (this.props.user.userSeller === false) {
      return (
        <Form>
          <FormText color="dark">
            <h2>Buyer Profile Form</h2>
          </FormText>
          <FormText color="dark">
            <h2>Please create your profile</h2>
          </FormText>
          <FormGroup>
            <Label for="edit-user-name" color="dark">
              User Name
            </Label>
            <Input
              type="text"
              required
              className="name-to-edit"
              name="username"
              id="username"
              placeholder="Username"
              onChange={this.handleFieldChange}
              value={this.state.username.status}
            />
          </FormGroup>
          <FormGroup>
            <Label for="edit-user-phonenumber" color="dark">
              Phone Number
            </Label>
            <Input
              type="text"
              required
              className="phonenumber-to-edit"
              name="user-phonenumber"
              id="phoneNumber"
              placeholder="--- --- ----"
              onChange={this.handleFieldChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="city-select" color="dark" />
            <select
              type="select"
              name="city-select"
              id="cityId"
              onChange={this.handleFieldChange}
            >
              <option value="">Select Your City</option>
              {this.props.cities.map(city => (
                <option key={city.id} id={city.id} value={city.id}>
                  {city.cityName}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Do you currently need wood?</legend>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                id="userNeedsWood"
                name="userNeedsWood"
                onChange={this.handleRadioBtnChange}
              />
              Yes
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                id="userNeedsWood"
                name="userNeedsWood"
                onChange={this.handleRadioBtnChange}
              />
              No
            </Label>
          </FormGroup>
          <FormGroup>
            <Label for="profile-photo">Profile Photo (optional)</Label>
            <Input
              type="file"
              name="file"
              id="profile-photo"
              onChange={this.handleFieldChange}
            />
          </FormGroup>
          <Button
            type="submit"
            onClick={this.updateBuyerProfile}
            className="btn btn-primary"
          >
            Create Profile
          </Button>
        </Form>
      );
    } else {
      console.log(this.props.user)
      return (
        <Form>
          <FormText color="dark">
            <h2>Seller Profile Form</h2>
          </FormText>
          <FormText color="dark">
            <h2>Please create your profile</h2>
          </FormText>
          <FormGroup>
            <Label for="edit-user-name" color="dark">
              User Name
            </Label>
            <Input
              type="text"
              required
              className="name-to-edit"
              name="username"
              id="username"
              onChange={this.handleFieldChange}
              value={this.props.user.username}
            />
          </FormGroup>
          <FormGroup>
            <Label for="edit-user-phonenumber" color="dark">
              Phone Number
            </Label>
            <Input
              type="tel"
              required
              className="phonenumber-to-edit"
              name="user-phonenumber"
              id="phoneNumber"
              placeholder="--- --- ----"
              onChange={this.handleFieldChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="city-select" color="dark" />
            <select
              type="select"
              name="city-select"
              id="cityId"
              onChange={this.handleFieldChange}
            >
              <option value="">Select Your City</option>
              {this.props.cities.map(city => (
                <option key={city.id} id={city.id} value={city.id}>
                  {city.cityName}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="edit-location-one" color="dark">
              Location you sell your wood
            </Label>
            <Input
              type="text"
              required
              className="location-one-edit"
              name="locationCrossStreetOne"
              id="locationCrossStreetOne"
              placeholder="Cross Street One"
              onChange={this.handleFieldChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              required
              className="location-two-edit"
              name="locationCrossStreetTwo"
              id="locationCrossStreetTwo"
              placeholder="Cross Street Two"
              onChange={this.handleFieldChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="edit-price-per-log" color="dark">
              Price Per Log
              <Input
                type="number"
                required
                className="price-per-log"
                name="pricePerLog"
                id="pricePerLog"
                placeholder="$0.00"
                onChange={this.handleFieldChange}
              />
            </Label>
            <Label for="edit-price-per-halfcord" color="dark">
              Price Per Half Cord
              <Input
                type="number"
                required
                className="price-per-halfcord"
                name="pricePerHalfCord"
                id="pricePerHalfCord"
                placeholder="$0.00"
                onChange={this.handleFieldChange}
              />
            </Label>
            <Label for="edit-price-per-fullcord" color="dark">
              Price Per Full Cord
              <Input
                type="number"
                required
                className="price-per-fullcord"
                name="pricePerFullCord"
                id="pricePerFullCord"
                placeholder="$0.00"
                onChange={this.handleFieldChange}
              />
            </Label>
          </FormGroup>
          <FormGroup check>
            <legend>Do you have wood ready to sell?</legend>
            <Label check>
              <Input
                type="radio"
                id="readyToSell"
                name="readyToSell"
                onChange={this.handleRadioBtnChange}
              />
              Yes
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                id="readyToSell"
                name="readyToSell"
                onChange={this.handleRadioBtnChange}
              />
              No
            </Label>
          </FormGroup>
          <FormGroup check>
            <legend>Do you deliver?</legend>
            <Label check>
              <Input
                type="radio"
                id="sellerDelivers"
                name="sellerDelivers"
                onChange={this.handleRadioBtnChange}
              />
              Yes
            </Label>
            <FormGroup />
            <Label check>
              <Input
                type="radio"
                id="sellerDelivers"
                name="sellerDelivers"
                onChange={this.handleRadioBtnChange}
              />
              No
            </Label>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Payments Accepted</legend>
            <Col sm="10">
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" onChange={this.addPaymentType} />
                  Card
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" onChange={this.addPaymentType}/>
                  Cash
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" onChange={this.addPaymentType} />
                  Venmo
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" onChange={this.addPaymentType} />
                  PayPal
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup>
            <Label for="profile-photo">Profile Photo (optional)</Label>
            <Input
              type="file"
              name="file"
              id="profile-photo"
              onChange={this.handleFieldChange}
            />
          </FormGroup>
          <Button
            type="submit"
            onClick={this.updateSellerProfile}
            className="btn btn-primary"
          >
            Create Profile
          </Button>
        </Form>
      );
    }
  }
}

export default withRouter(ProfileForm);
