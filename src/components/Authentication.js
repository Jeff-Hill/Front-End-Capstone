import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withRouter } from "react-router"
import Welcome from "./access/Welcome"
import Login from "./access/Login"
import Registration from "./access/Registration"



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
