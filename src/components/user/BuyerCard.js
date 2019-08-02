import React, { Component } from 'react'
import { Button, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import CityManager from '../../modules/CityManager';

export default class BuyerCard extends Component {
    userNeedsWood = () => {
        if(this.props.user.userNeedsWood === true) {
            return ("Yes")
        } else {
            return ("No")
        }
    }
    render() {
        return (
            <Card key={this.props.user.id} className="card">
                <CardBody className="buyer-card-body">
                    <CardTitle className="buyer-card-title">
                        {/* <img src={dog} className="icon--dog" alt="dog-icon" /> */}
                        <h4>Name: {this.props.user.username}</h4>
                        <h5>City: {this.props.user.city.cityName}</h5>
                        <h5>Phone #: {this.props.user.phoneNumber}</h5>
                        <h5>I need wood: {this.userNeedsWood()}</h5>
                         {/* <Link className="nav-link" to={`/animals/${this.props.animal.id}`}>Details</Link> */}

                        <Button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push(`/profile/${this.props.user.id}/edit`);}}>
                                     Edit
                        </Button>
                        <Button
                            onClick={() => this.props.deleteUser(this.props.user.id)}
                            className="card-link">Delete Profile</Button>
                    </CardTitle>
                </CardBody>
            </Card>
        )
    }
}
