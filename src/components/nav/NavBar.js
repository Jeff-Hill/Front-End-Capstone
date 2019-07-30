import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Button } from 'reactstrap';

import "bootstrap/dist/css/bootstrap.min.css"


export default class NavBar extends Component {
    render() {
        return (
        <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <a class="navbar-brand">Welcome to FireFuel</a>
            <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li class="nav-item">
                <Link className="nav-link" to="/buyers">Buyers</Link>
            </li>
            <li class="nav-item">
                <Link className="nav-link" to="/sellers">Sellers</Link>
            </li>
            <li class="nav-item">
                <Link className="nav-link" to="/favorites">Favorites</Link>
            </li>
            </ul>
            <Button class="btn btn-outline-success my-2 my-sm-0" type="submit" color="danger">Logout</Button>

        </div>
        </nav>
        )
    }
}
