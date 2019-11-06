import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {withRouter} from 'react-router-dom'
import "./Access.css"
import { Col, Row, Card, CardText, CardBody,
    CardTitle, Button} from 'reactstrap';

class Welcome extends Component {
    render() {
        return (

            <Row form>
                <Col lg={{ size: "auto", offset: 4 }}>
                <Card className="authentication-card" color="warning">
                    <Row>
                    <CardBody>
                        <CardTitle className="h1 mb-3 font-weight-normal">Welcome to FireFuel</CardTitle>
                        <CardTitle className="h2 mb-3 font-weight-normal"> Please Register or Login</CardTitle>

                    </CardBody>
                    </Row>
                    <Row>
                        <div className="authentication-btns">
                    <CardBody>
                        <CardText>New User</CardText>
                        <Button color="danger"><Link to="/register" style={{ color: 'black', alignContent: "center" }}>Register</Link></Button>
                    </CardBody>
                    <CardBody>
                        <CardText>Already Have Profile?</CardText>
                        <Button color="danger"><Link to="/login" style={{ color: 'black' }}>Login</Link></Button>
                    </CardBody>
                    </div>
                    </Row>
                </Card>
                </Col>
             </Row>

        )
    }
}

export default withRouter(Welcome)
