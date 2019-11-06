import {React,  Component } from "react";
import { withRouter } from "react-router-dom";
import UserManager from "../../modules/UserManager";
import { Button, Form, FormGroup, Input, FormText } from "reactstrap";

class ProfileForm extends Component {
  state = {
    username: "",
    userId: "",
    phoneNumber: "",
    userNeedsWood: "",
    password: this.props.password,
    userSeller: this.props.userSeller,
    cityId: "",
    locationCrossStreetOne: "",
    locationCrossStreetTwo: "",
    pricePerLog: "",
    pricePerHalfCord: "",
    pricePerFullCord: "",
    sellerDelivers: "",
    readyToSell: ""
  }

  componentDidMount() {
    console.log("profile form mounted")
    UserManager.get("users", sessionStorage.getItem("userId")).then(user =>{
      console.log(user)
      this.setState({
        username: user.username,
        password: user.password,
        userId: user.id,
        userNeedsWood: user.userNeedsWood,
        phoneNumber: user.phoneNumber,
        userSeller: user.userSeller,
        cityId: user.cityId,
      }
    )
    }

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
  handleUserReadyToSell = evt => {
    // The string of seller is set below as the id of the radio buttons
    if (evt.target.id === "yes") {
      this.setState({
        readyToSell: true
      });
    } else {
      this.setState({ readyToSell: false });
    }
  };

  handleUserWillDeliverChange = evt => {
    // The string of seller is set below as the id of the radio buttons
    if (evt.target.id === "yes") {
      this.setState({
        sellerDelivers: true
      });
    } else {
      this.setState({ sellerDelivers: false });
    }
  };

  updateBuyerProfile = evt => {
    evt.preventDefault();
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
      .updateUser(editedBuyer)
      .then(alert("Your profile has been updated"))
      .then(() => this.props.history.push("/sellers"));
  };

  updateSellerProfile = evt => {
    evt.preventDefault();
    const editedSeller = {
      userId: this.state.userId,
      locationCrossStreetOne: this.state.locationCrossStreetOne,
      locationCrossStreetTwo: this.state.locationCrossStreetTwo,
      pricePerLog: this.state.pricePerLog,
      pricePerHalfCord: this.state.pricePerHalfCord,
      pricePerFullCord: this.state.pricePerFullCord,
      sellerDelivers: this.state.sellerDelivers,
      readyToSell: this.state.readyToSell,
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
      .updateSeller(editedSeller, editedBuyer)
      .then(alert("Your profile has been updated"))
      .then(() => this.props.history.push("/buyers"));
  };

  render() {
    if (this.state.userSeller === false) {
      return (
        <Form className="form">
          <FormText color="light">
            <h2>Buyer Profile Form</h2>
          </FormText>
          <FormText color="light">
            <h2>Please create your profile</h2>
          </FormText>
          <FormGroup>
            <FormText className="edit-user-name" color="light">
              User Name
            </FormText>
            <Input
              type="text"
              required
              className="name-to-edit"
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleFieldChange}
            />
          </FormGroup>
          <FormGroup>
            <FormText className="edit-user-phonenumber" color="light">
              Phone Number
            </FormText>
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
            <FormText className="city-select" color="light">

            </FormText>
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
          <FormGroup tag="fieldset">
            <FormText color="light">Do you currently need wood?</FormText>
          </FormGroup>
          <FormGroup check>
            <FormText color="light">
              <Input
                type="radio"
                id="yes"
                name="user-needs-wood"
                value={this.state.userNeedsWood}
                onChange={this.handleUserNeedsWoodChange}
              />
              Yes
            </FormText>
          </FormGroup>
          <FormGroup check>
            <FormText color="light">
              <Input
                type="radio"
                id="no"
                name="user-needs-wood"
                value={this.state.userNeedsWood}
                onChange={this.handleUserNeedsWoodChange}
              />
              No
            </FormText>
          </FormGroup>
            <div className="edit-btns">
          <Button

            type="submit"
            onClick={this.updateBuyerProfile}
            className="btn btn-primary"

          >
            Create Buyer Profile
          </Button>
          </div>

        </Form>
      );
    } else {
      return (
        <Form className="form">
          <FormText color="light">
            <h2>Seller Profile Form</h2>
          </FormText>
          <FormText color="light">
            <h2>Please create your profile</h2>
          </FormText>
          <FormGroup>
            <FormText className="edit-user-name" color="light">
              User Name
            </FormText>
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
            <FormText className="edit-user-phonenumber" color="light">
              Phone Number
            </FormText>
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
            <FormText className="city-select" color="light" />
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
            <FormText className="edit-location-one" color="light">
              Location you sell your wood
            </FormText>
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
            <FormText className="edit-price-per-log" color="light">
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
            </FormText>
            <FormText className="edit-price-per-halfcord" color="light">
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
            </FormText>
            <FormText className="edit-price-per-fullcord" color="light">
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
            </FormText>
          </FormGroup>
          <FormGroup check>
            <FormText color="light">Do you have wood ready to sell?</FormText>
            <FormText color="light">
              <Input
                type="radio"
                id="yes"
                name="readyToSell"
                value={this.state.readyToSell}
                onChange={this.handleUserReadyToSell}
              />
              Yes
            </FormText>
          </FormGroup>
          <FormGroup check>
            <FormText color="light">
              <Input
                type="radio"
                id="no"
                name="readyToSell"
                onChange={this.handleUserReadyToSell}
              />
              No
            </FormText>
          </FormGroup>
          <FormGroup check>
            <FormText color="light">Do you deliver?</FormText>
            <FormText color="light">
              <Input
                type="radio"
                id="yes"
                name="sellerDelivers"
                onChange={this.handleUserWillDeliverChange}
              />
              Yes
            </FormText>
            <FormGroup />
            <FormText color="light">
              <Input
                type="radio"
                id="no"
                name="sellerDelivers"
                onChange={this.handleUserWillDeliverChange}
              />
              No
            </FormText>
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
