import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SellerProfileManager from "../../modules/SellerProfileManager";
import UserManager from "../../modules/UserManager";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

let currentUser = sessionStorage.getItem("userId");
class ProfileForm extends Component {
  state = {

    phoneNumber: "",

    userNeedsWood: false,
    cityId: "",
    userId: currentUser,
    locationCrossStreetOne: "",
    locationCrossStreetTwo: "",
    pricePerLog: "",
    pricePerHalfCord: "",
    pricePerFullCord: "",
    sellerDelivers: false,
    readyToSell: false,
    paymentAccepted: []
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
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
      id: this.props.match.params.userId,
      locationCrossStreetOne: this.state.locationCrossStreetOne,
      locationCrossStreetTwo: this.state.locationCrossStreetTwo,
      pricePerLog: this.state.pricePerLog,
      pricePerHalfCord: this.state.pricePerHalfCord,
      pricePerFullCord: this.state.pricePerFullCord,
      sellerDelivers: this.state.sellerDelivers,
      readyToSell: this.state.readyToSell,
      paymentAccepted: []
    };
    this.props
      .updateSeller(editedSeller)
      .then(() => this.props.history.push("/sellers"));
  };

//   componentDidMount() {
//     UserManager.get("users", this.props.match.params.userId).then(user => {
//       this.setState({
//         username: user.username,
//         userSeller: user.userSeller

//       });
//     });
    // SellerProfileManager.get(
    //   "sellerProfiles",
    //   this.props.match.params.userId
    // ).then(seller => {
    //   this.setState({
    //     locationCrossStreetOne: seller.locationCrossStreetOne,
    //     locationCrossStreetTwo: seller.locationCrossStreetTwo,
    //     pricePerLog: seller.pricePerLog,
    //     pricePerHalfCord: seller.pricePerHalfCord,
    //     pricePerFullCord: seller.pricePerFullCord,
    //     sellerDelivers: seller.sellerDelivers,
    //     readyToSell: seller.readyToSell,
    //     paymentAccepted: []
    //   });
    // });
//   }

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
              defaultValue={this.props.user.username}
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
              onChange={this.handleFieldChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="city-select" color="dark">

            </Label>
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
                id="yes"
                name="need-wood"
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
                name="need-wood"
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
        <div>
          <h1>This is a seller profile form</h1>
        </div>
      );
    }
  }
}

export default withRouter(ProfileForm);
