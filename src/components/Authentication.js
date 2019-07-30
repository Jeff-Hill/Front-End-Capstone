import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withRouter } from "react-router"
import Welcome from "./authentication/Welcome"
import Login from "./authentication/Login"
import Registration from "./authentication/Registration"


class Authentication extends Component {
    render() {
        return (
            <React.Fragment>
                <Route exact path="/" component={Welcome}/>

                <Route exact path="/login" component={Login} />

                <Route exact path="/register" component={Registration} />
            </React.Fragment>
        )
    }
}

export default withRouter(Authentication)
