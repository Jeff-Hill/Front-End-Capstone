import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {withRouter} from 'react-router-dom'
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

class Welcome extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle className="h1 mb-3 font-weight-normal">Welcome to FireFuel Please Register or Login</CardTitle>
                        <CardText>New User
                        <Button outline><Link to="/register">Register</Link></Button>
                        </CardText>
                        <CardText>Already Have Profile?
                        <Button outline><Link to="/login">Login</Link></Button>
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default withRouter(Welcome)
