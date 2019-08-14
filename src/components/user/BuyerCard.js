import React, { Component } from "react";
import fire from "./fire.jpg"
import "./User.css"

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
  Input,
  Container
} from "reactstrap";

export default class BuyerCard extends Component {
  userNeedsWood = () => {
    if (this.props.user.userNeedsWood === true) {
      return "Yes";
    } else {
      return "No";
    }
  };
  render() {
    return (
      // <Container fluid>
      //  <Row noGutters>
      //   <Col sm="3">

          <Card key={this.props.userBuyer.id} className="card">
            <CardBody className="card-body">
                <img src={fire} className="icon--fire" alt="fire-icon" size="xs"/>
              <CardTitle className="card-title">
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
                      onChange={(event) => this.props.saveNewFavoritePair(this.props.user, event)}
                    />
                   <h5> Favorite This User</h5>
                  </Label>
                </FormGroup>
              </CardTitle>
            </CardBody>
          </Card>

      //   </Col>
      // </Row>
      // </Container>
    );
  }
}
