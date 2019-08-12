import React, { Component } from 'react'
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Col, Row, Card, CardImg, CardText, CardBody, Container,
    CardTitle, CardSubtitle, Button, ButtonGroup, Media, Image,
    Jumbotron, Form, FormGroup, Label, Input, FormText} from 'reactstrap';


export default class NavBar extends Component {
    render() {
        const currentUser = sessionStorage.getItem("userId");
        return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Link className="navbar-brand" to="/">Welcome to FireFuel</Link>
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/buyers">Buyers</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/sellers">Sellers</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/favorites" onClick={this.displayFavoritesByUser}>Favorites</Link>
            </li>
            </ul>
            <Button outline size="sm" >
            <Link className="btn-logout my-2 my-sm-0"
             to={`/profile/${currentUser}/edit`} >Edit Profile</Link>
            </Button>
            <Button outline size="sm">

            <Link className="btn-logout my-2 my-sm-0"
             to="/" onClick={() => {sessionStorage.clear(); this.props.isUserLoggedIn()}}>Logout</Link>
            </Button>
        </div>
        </nav>
        )
    }
}
