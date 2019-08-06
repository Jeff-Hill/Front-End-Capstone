import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col, Label, Container } from 'reactstrap';

export default class HomeList extends Component {
  render() {
    return (
        <h1>HomeList</h1>
    //   <Container>
    //     <Row>
    //         <Col><h4>Filter</h4></Col>
    //       <Col xs="6" sm="4">
    //       <Label for="city-select" color="dark" />
    //         <select
    //           type="select"
    //           name="city-select"
    //           id="cityId"
    //           defaultValue={this.props.cityId}
    //           onChange={this.handleFieldChange}
    //         >
    //           <option value="">Select Your City</option>
    //           {this.props.cities.map(city => (
    //             <option key={city.id} id={city.id} value={city.id}>
    //               {city.cityName}
    //             </option>
    //           ))}
    //         </select>
    //       </Col>
    //       <Col xs="6" sm="4">
    //         .col-6 .col-sm-4
    //       </Col>
    //       <Col sm="4">.col-sm-4</Col>
    //     </Row>
    //   </Container>
    )
  }
}
