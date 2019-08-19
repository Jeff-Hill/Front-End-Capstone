import React, { Component } from 'react'
import ax from "./ax.jpg"
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, FormGroup, Label, Input } from 'reactstrap';

export default class FavoriteSellerCard extends Component {
    userReadyToSell = () => {
        if(this.props.profile.readyToSell === true) {
            return ("Yes")
        } else {
            return ("No")
        }
    }
    userWillDeliver = () => {
        if(this.props.profile.sellerDelivers === true) {
            return ("Yes")
        } else {
            return ("No")
        }
    }

    render() {
        return (
            <Card key={this.props.user.id} className="card" color="secondary ">
                <CardBody className="seller-card-body">
                    <CardTitle className="seller-card-title">
                        <img src={ax} className="icon--ax" alt="ax-icon" />
                        <h4>Name: {this.props.user.username}</h4>
                        <h5>City: {this.props.city.cityName}</h5>
                        <h5>Phone #: {this.props.user.phoneNumber}</h5>
                        <h5>Cross Street 1: {this.props.profile.locationCrossStreetOne}</h5>
                        <h5>Cross Street 2: {this.props.profile.locationCrossStreetTwo}</h5>
                        <h5>Price Per Log: ${this.props.profile.pricePerLog}</h5>
                        <h5>Price Per HalfCord: ${this.props.profile.pricePerHalfCord}</h5>
                        <h5>Price Per FullCord: ${this.props.profile.pricePerFullCord}</h5>
                        <h5>I have wood to sell: {this.userReadyToSell()}</h5>
                        <h5>I will deliver: {this.userWillDeliver()}</h5>
                        <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      id="favorite"
                      name="favorite"
                    //   value={this.state.userNeedsWood}
                    onChange={() => this.props.deleteNewFavorite(this.props.user.id)}
                    />
                   <h5> Remove from Favorites</h5>
                  </Label>
                </FormGroup>
                    </CardTitle>
                </CardBody>
            </Card>
        )
    }
}
