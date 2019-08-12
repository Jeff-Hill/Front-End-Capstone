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

export default class FavoriteCard extends Component {

  render() {
    return (
      <Row form>
        <Col lg={{ size: "auto", offset: 4 }}>
          <Card key={this.props.user.id} className="card">
            <CardBody className="favorite-card-body">
              <CardTitle className="favorite-card-title">
                {/* <img src={dog} className="icon--dog" alt="dog-icon" /> */}
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