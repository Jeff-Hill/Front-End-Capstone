import React, { Component } from "react";
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
import CityManager from "../../modules/CityManager";

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
      <Row form>
        <Col lg={{ size: "auto", offset: 4 }}>
          <Card key={this.props.userBuyer.id} className="card">
            <CardBody className="buyer-card-body">
              <CardTitle className="buyer-card-title">
                {/* <img src={dog} className="icon--dog" alt="dog-icon" /> */}
                <h4>Name: {this.props.user.username}</h4>
                <h5>City: {this.props.city.cityName}</h5>
                <h5>Phone #: {this.props.user.phoneNumber}</h5>
                <h5>I need wood: {this.userNeedsWood()}</h5>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      id="favorite"
                      name="favorite"
                    //   value={this.state.userNeedsWood}
                    //   onChange={this.handleFieldChange}
                    />
                    Favorite This User
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
