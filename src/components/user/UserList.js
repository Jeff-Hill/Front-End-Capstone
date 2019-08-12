import React, { Component } from "react";
import {Link, Route } from "react-router-dom";
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

export default class UserList extends Component {
  state = {
    cityUsers: [],
    userNeedWood: "",
    userWillDeliver: "",
    filtered: []
  };


  render() {
    if (window.location.pathname === "/buyers") {
      return (
        <section className="users">
          <FormGroup for="city-select" color="dark">
            <strong>Filter buyers by your city or if they are looking for wood</strong>
          </FormGroup>
            {/* <Row> */}
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
                id="true"
                name="userNeedsWood"
                value={this.props.userNeedsWood}
                onChange={this.props.filterUserNeedsWood}
              />
              Yes
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                id="false"
                name="userNeedsWood"
                value={this.props.userNeedsWood}
                onChange={this.props.filterUserNeedsWood}
              />
              No
            </Label>
          </FormGroup>
          <Button
            type="submit"
            onClick={this.props.resetBuyerFilter}
            className="btn btn-primary"
          >
            Reset Filter
          </Button>
          {/* </Row> */}




          {this.props.userBuyer
            .filter(userBuyer => userBuyer.userSeller === false)
            .map(userBuyer =>
              this.props.cities
                .filter(city => userBuyer.cityId === city.id)
                .map(city => (
                  <BuyerCard
                    key={userBuyer.id}
                    user={userBuyer}
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
            <strong>Filter sellers by your city or those willing to deliver</strong>
          </FormGroup>
          <FormGroup>
            <select
              type="select"
              name="city-select"
              id="cityId"
              value={this.props.cityId}
              onChange={this.props.filterSellerByCity}
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
                id="true"
                name="sellerDelivers"
                value={this.props.sellerDelivers}
                onChange={this.props.filterUserWillDeliver}
              />
              Yes
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                id="false"
                name="sellerDelivers"
                value={this.props.sellerDelivers}
                onChange={this.props.filterUserWillDeliver}
              />
              No
            </Label>
          </FormGroup>
          <Button
            type="submit"
            onClick={this.props.resetSellerFilter}
            className="btn btn-primary"
          >
            Reset Filter
          </Button>
          {this.props.userSeller
            .filter(userSeller => userSeller.userSeller === true)
            .map(userSeller =>
              this.props.sellerProfiles
                .filter(profile => profile.userId === userSeller.id)
                .map(profile =>
                  this.props.cities
                    .filter(city => userSeller.cityId === city.id)
                    .map(city => (
                      <SellerCard
                        key={userSeller.id}
                        user={userSeller}
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
