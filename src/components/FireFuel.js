import React, { Component } from 'react'
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import 'bootstrap/dist/css/bootstrap.css';


export default class FireFuel extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <ApplicationViews/>
            </React.Fragment>


        )
    }
}
