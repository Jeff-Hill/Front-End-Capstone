import React, { Component } from "react";
import fire from "./fire.jpg"

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
  FormGroup,
  Label,
  Input
} from "reactstrap";

export default class FavoriteBuyerCard extends Component {

    userNeedsWood = () => {
        if (this.props.user.userNeedsWood === true) {
          return "Yes";
        } else {
          return "No";
        }
      }

  render() {
    return (
        <Row form>
        <Col lg={{ size: "auto", offset: 4 }}>
          <Card key={this.props.user.id} className="card" color="secondary">
            <CardBody className="favorite-card-body">

              <CardTitle className="favorite-card-title">
                <img src={fire} className="icon--fire" alt="fire-icon" />
                <h4>Name: {this.props.user.username}</h4>
                <h5>City: {this.props.city.cityName}</h5>
                <h5>Phone #: {this.props.user.phoneNumber}</h5>
                <h5>I need wood: {this.userNeedsWood()}</h5>
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
        </Col>
      </Row>
    );
  }
}
