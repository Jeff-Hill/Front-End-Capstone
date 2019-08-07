import React, { Component } from "react";
import { Route } from "react-router-dom";
import BuyerCard from "./BuyerCard";
import SellerCard from "./SellerCard";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  Label,
  Container,
  FormGroup,
  Input
} from "reactstrap";
import UserManager from "../../modules/UserManager";

export default class UserList extends Component {
  state = {
    cityUsers: [],
    userNeedWood: "",
    userWillDeliver: ""
  };



//   filterUserNeedsWood = evt => {
//     this.props.users.filter(user => {
//       if (user.userNeedsWood === evt.target.value) {
//         this.setState({
//           userNeedsWood: user.user
//         });
//       }
//     });
//   };

  render() {
    if (window.location.pathname === "/buyers") {
      return (
        <section className="users">
          <FormGroup for="city-select" color="dark">
            <strong>Filter</strong>
          </FormGroup>
          <FormGroup>
            <select
              type="select"
              name="city-select"
              id={this.props.cityId}
              value={this.props.cityId}
              onChange={this.props.filterUserByCity}
            >
              <option value="">Select City</option>
              {this.props.cities.map(city => (
                <option key={city.id} id={city.id} value={city.id}>
                  {city.cityName}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup tag="fieldset">
            <h4>Buyers that need wood?</h4>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                id="yes"
                name="user-needs-wood"
                value={this.props.userNeedsWood}
                onChange={this.filterUserNeedsWood}
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
                value={this.props.userNeedsWood}
                onChange={this.filterUserNeedsWood}
              />
              No
            </Label>
          </FormGroup>
          {this.props.users
            .filter(user => user.userSeller === false)
            .map(user =>
              this.props.cities
                .filter(city => user.cityId === city.id)
                .map(city => (
                  <BuyerCard
                    key={user.id}
                    user={user}
                    city={city}
                    {...this.props}
                  />
                ))
            )}
        </section>
      );
    } else {
      return (
        <section className="users">
          <FormGroup for="city-select" color="dark">
            <strong>Filter</strong>
          </FormGroup>
          <FormGroup>
            <select
              type="select"
              name="city-select"
              id="cityId"
              value={this.props.cityId}
              onChange={this.handleFieldChange}
            >
              <option value="">Select City</option>
              {this.props.cities.map(city => (
                <option key={city.id} id={city.id} value={city.id}>
                  {city.cityName}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup tag="fieldset">
            <h4>Sellers that deliver?</h4>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                id="sellerDelivers"
                name="sellerDelivers"
                value={this.props.sellerDelivers}
                onChange={this.handleRadioBtnChange}
              />
              Yes
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                id="sellerDelivers"
                name="sellerDelivers"
                value={this.props.sellerDelivers}
                onChange={this.handleRadioBtnChange}
              />
              No
            </Label>
          </FormGroup>
          {this.props.users
            .filter(user => user.userSeller === true)
            .map(user =>
              this.props.sellerProfiles
                .filter(profile => profile.userId === user.id)
                .map(profile =>
                  this.props.cities
                    .filter(city => user.cityId === city.id)
                    .map(city => (
                      <SellerCard
                        key={user.id}
                        user={user}
                        city={city}
                        profile={profile}
                        {...this.props}
                      />
                    ))
                )
            )}
        </section>
      );
    }
  }
}
