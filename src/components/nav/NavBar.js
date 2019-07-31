import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Button } from 'reactstrap';

import "bootstrap/dist/css/bootstrap.min.css"


export default class NavBar extends Component {
    render() {
        return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Link className="navbar-brand" to="/">Welcome to FireFuel</Link>
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/buyers">Buyers</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/sellers">Sellers</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/favorites">Favorites</Link>
            </li>
            </ul>
            <Button className="btn btn-outline-success my-2 my-sm-0" type="submit" outline>Logout</Button>

        </div>
        </nav>
        )
    }
}
