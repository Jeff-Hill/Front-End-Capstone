import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {withRouter} from 'react-router-dom'
import "./Access.css"
import fireplace from "./fireplace.jpg"
import { DiCodeigniter } from "react-icons/di";
import { Col, Row, Card, CardImg, CardText, CardBody, Container,
    CardTitle, CardSubtitle, Button, ButtonGroup, Media, Image, Jumbotron} from 'reactstrap';

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
                    {/* <ButtonGroup vertical size="lg"> */}
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
                    {/* </ButtonGroup> */}
                    </Row>
                </Card>
                </Col>
             </Row>

        )
    }
}

export default withRouter(Welcome)
