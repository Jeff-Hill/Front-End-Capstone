import React, { Component } from 'react'
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import Authentication from './Authentication';
import 'bootstrap/dist/css/bootstrap.css';


export default class FireFuel extends Component {
    render() {

        return (
            <React.Fragment>
                <NavBar/>
                <ApplicationViews/>
                <Authentication/>
            </React.Fragment>


        )
    }
}
