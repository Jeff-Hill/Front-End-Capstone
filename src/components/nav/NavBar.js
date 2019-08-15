import React, { Component } from 'react'
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"

import { Col, Row, Card, CardImg, CardText, CardBody, Container,
    CardTitle, CardSubtitle, Button, ButtonGroup, Media, Image,
    Jumbotron, Form, FormGroup, Label, Input, FormText, NavLink} from 'reactstrap';


export default class NavBar extends Component {
    render() {
        const currentUser = sessionStorage.getItem("userId");
        return (
        <nav className="navbar navbar-expand-lg  bg-warning nav-tabs" color="info">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Link className="nav-link" style={{ color: "black" }} to="/">Welcome to FireFuel</Link>
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link" style={{ color: "black" }} to="/buyers">Burners</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={{ color: "black" }} to="/sellers">Choppers</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={{ color: "black" }} to="/favorites">Favorites</Link>
            </li>
            </ul>
            <div>
            <Button size="md" color="danger" >
            <Link className="btn-logout my-2 my-sm-5" style={{ color: "white" }}
             to={`/profile/${currentUser}/edit`} >Edit Profile</Link>
            </Button>{' '}
            <Button size="md" color="danger">

            <Link className="btn-logout my-2 my-sm-0" style={{ color: "white" }}
             to="/" onClick={() => {sessionStorage.clear(); this.props.isUserLoggedIn()}}>Logout</Link>
            </Button>{' '}
            </div>

        </div>
        </nav>
        )
    }
}
