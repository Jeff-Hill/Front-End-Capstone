import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SellerProfileManager from "../../modules/SellerProfileManager";
import UserManager from "../../modules/UserManager";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

let currentUser = sessionStorage.getItem("userId");
class ProfileEditForm extends Component {
  state = {
    username: "",
    userId: "",
    phoneNumber: "",
    userNeedsWood: "",
    userSeller: this.userSeller,
    cityId: "",
    locationCrossStreetOne: "",
    locationCrossStreetTwo: "",
    pricePerLog: "",
    pricePerHalfCord: "",
    pricePerFullCord: "",
    sellerDelivers: "",
    readyToSell: ""
  };

  componentDidMount() {
    UserManager.getWithSellerProfile("users", currentUser).then(user =>

      this.setState({
        username: user.username,
        userId: user.id,
        userNeedsWood: user.userNeedsWood,
        phoneNumber: user.phoneNumber,
        userSeller: user.userSeller,
        cityId: user.cityId,
        sellerProfileId: user.sellerProfiles[0].id,
        locationCrossStreetOne: user.sellerProfiles[0].locationCrossStreetOne,
        locationCrossStreetTwo: user.sellerProfiles[0].locationCrossStreetTwo,
        pricePerLog: user.sellerProfiles[0].pricePerLog,
        pricePerHalfCord: user.sellerProfiles[0].pricePerHalfCord,
        pricePerFullCord: user.sellerProfiles[0].pricePerFullCord,
        sellerDelivers: user.sellerProfiles[0].sellerDelivers,
        readyToSell: user.sellerProfiles[0].readyToSell
      }
    )
    )
  }


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

  handleUserNeedsWoodChange = evt => {
    // The string of seller is set below as the id of the radio buttons
    if (evt.target.id === "yes") {
      this.setState({
        userNeedsWood: true
      });
    } else {
      this.setState({ userNeedsWood: false });
    }
  };

  updateBuyerProfile = evt => {
    evt.preventDefault();
    const editedBuyer = {
      id: this.props.match.params.userId,
      username: this.state.user.username,
      password: this.state.user.password,
      phoneNumber: this.state.phoneNumber,
      userSeller: this.state.user.userSeller,
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
      id: this.state.sellerProfileId,
      userId: parseInt(this.state.userId),
      locationCrossStreetOne: this.state.locationCrossStreetOne,
      locationCrossStreetTwo: this.state.locationCrossStreetTwo,
      pricePerLog: this.state.pricePerLog,
      pricePerHalfCord: this.state.pricePerHalfCord,
      pricePerFullCord: this.state.pricePerFullCord,
      sellerDelivers: this.state.sellerDelivers,
      readyToSell: this.state.readyToSell
    };
    const editedBuyer = {
      id: this.props.match.params.userId,
      username: this.state.username,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
      userSeller: this.state.userSeller,
      userNeedsWood: this.state.userNeedsWood,
      cityId: parseInt(this.state.cityId)
    };
    this.props
      .editSeller(editedSeller, editedBuyer)
      .then(() => this.props.history.push("/sellers"));
  };

  render() {
    if (this.state.userSeller === false) {
      return (
        <Form>
          <FormText color="dark">
            <h2>Edit your buyer profile</h2>
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
              defaultValue={this.state.username}
              onChange={this.handleFieldChange}
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
              defaultValue={this.state.phoneNumber}
              onChange={this.handleFieldChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="city-select" color="dark" />
            <select
              type="select"
              name="city-select"
              id="cityId"
              defaultValue={this.state.cityId}
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
                id="yes"
                name="user-needs-wood"
                defaultChecked={this.state.userNeedsWood}
                onChange={this.handleUserNeedsWoodChange}
              />
              Yes
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                id="no"
                name="user-needs-wood"
                defaultChecked={this.state.userNeedsWood}
                onChange={this.handleUserNeedsWoodChange}
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
      return (
        <Form>
          <FormText color="dark">
            <h2>Edit your seller profile</h2>
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
              value={this.state.username}
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
              value={this.state.phoneNumber}
              onChange={this.handleFieldChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="city-select" color="dark" />
            <select
              type="select"
              name="city-select"
              id="cityId"
              value={this.state.cityId}
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
              value={this.state.locationCrossStreetOne}
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
              value={this.state.locationCrossStreetTwo}
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
                value={this.state.pricePerLog}
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
                value={this.state.pricePerHalfCord}
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
                value={this.state.pricePerFullCord}
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
                value={this.state.readyToSell}
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
                value={this.state.readyToSell}
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
                value={this.state.sellerDelivers}
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
                value={this.state.sellerDelivers}
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
            onClick={this.updateSellerProfile}
            className="btn btn-primary"
          >
            Edit Seller Profile
          </Button>
        </Form>
      );
    }
  }
}

export default withRouter(ProfileEditForm);
