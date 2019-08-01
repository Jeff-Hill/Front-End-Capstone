import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SellerProfileManager from "../../modules/SellerProfileManager";
import UserManager from "../../modules/UserManager"

let currentUser = sessionStorage.getItem("userId");
class ProfileForm extends Component {
  state = {
    username: "",
    password: "",
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

  updateBuyerProfile = evt => {
    evt.preventDefault();
    const editedBuyer = {
      id: this.props.match.params.userId,
      username: this.state.userName,
      phoneNumber: this.state.phoneNumber,
      userNeedsWood: this.state.userNeedsWood,
      cityId: parseInt(this.state.cityId)
    };
    this.props
      .updateBuyer(editedBuyer)
      .then(() => this.props.history.push("/home"));
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
      .then(() => this.props.history.push("/home"));
  };

  componentDidMount() {
    UserManager.get("users", this.props.match.params.userId).then(user => {
      this.setState({
        username: user.username,
        phoneNumber: user.phoneNumber,
        userNeedsWood: user.userNeedsWood,
        cityId: user.cityId
      });
    });
    SellerProfileManager.get(
      "sellerProfiles",
      this.props.match.params.userId
    ).then(seller => {
      this.setState({
        locationCrossStreetOne: seller.locationCrossStreetOne,
        locationCrossStreetTwo: seller.locationCrossStreetTwo,
        pricePerLog: seller.pricePerLog,
        pricePerHalfCord: seller.pricePerHalfCord,
        pricePerFullCord: seller.pricePerFullCord,
        sellerDelivers: seller.sellerDelivers,
        readyToSell: seller.readyToSell,
        paymentAccepted: []
      });
    });
  }

  render() {

    if (this.props.user.userSeller === false) {
      console.log(this.props.user.userSeller);
      return (
        <div>
          <h1>This is a buyer profile form </h1>
        </div>
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
