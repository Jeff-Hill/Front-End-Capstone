import React, { Component } from 'react'
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import Authentication from "./Authentication";
import 'bootstrap/dist/css/bootstrap.css';

let currentUser = sessionStorage.getItem("userId")
export default class FireFuel extends Component {
    state = {
        userId: currentUser
    }

    isAuthenticated = () => sessionStorage.getItem("userId") !== null;

    isUserLoggedIn = () => {
        if(this.state.userId === currentUser) {
            this.isAuthenticated()
        }
    }

    render() {
        if (this.isAuthenticated()) {
        return (
            <React.Fragment>
                <NavBar/>
                <ApplicationViews/>
            </React.Fragment>
        )
        } else {
        return (
            <React.Fragment>
                <Authentication isUserLoggedIn={this.isUserLoggedIn}/>
            </React.Fragment>
        )
            }


    }
}
