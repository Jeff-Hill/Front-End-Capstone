import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import LoginManager from "../../modules/LoginManager"
import { Button } from 'reactstrap';

class Registration extends Component {
    // Set initial state needs to be empty
    state = {
        username: "",
        password: "",
        userSeller: false
    }

    addNewUser = (user) =>
        LoginManager.post(user)
        .then( newUser => {
        sessionStorage.setItem("userId", newUser.id)
        alert("Thank you for Registering")

      })


    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleUserTypeChange = (evt) => {

        if(evt.target.id === "seller") {
            this.setState({
                userSeller: true
            })
        } else {
            this.setState({userSeller: false})
        }
      }

    // Simplistic handler for login submit; e is event
    saveNewUser = event => {
        event.preventDefault()

        const user = {
            username: this.state.username,
            password: this.state.password,
            userSeller: this.state.userSeller
        }

        this.addNewUser(user).then(() => this.props.history.push("/home"))
    }
    render() {
        return (

            <form className="container RegisterForm">
                <h1 className="h3 mb-3 font-weight-normal">Welcome to FireFuel Please Register</h1>
                <div className="container">
                <label className="reg-user-btn">Are you a
                <input onClick={this.handleUserTypeChange} id="buyer" type="radio" name="reg-user-type"/> Buyer
                </label>
                <label className="reg-user-btn">OR a
                <input onClick={this.handleUserTypeChange} type="radio" name="reg-user-type" id="seller"/> Seller
                </label>
                </div>
                <div className="container">
                <label htmlFor="inputUsername">
                    Username
                </label>
                <input onChange={this.handleFieldChange} type="username"
                       id="username"
                       placeholder="Username"
                       required="" autoFocus="" />
                </div>
                <div className="container">
                <label htmlFor="inputPassword">
                    Password
                </label>
                <input onChange={this.handleFieldChange} type="password"
                       id="password"
                       placeholder="Password"
                       required="" />
                <div className="container">
                <Button className="reg-link" onClick={this.saveNewUser} type="submit">
                   Register
                </Button>
                <label><strong>OR</strong></label>
                <Button className="reg-link"><Link  to="/login">Login</Link></Button>
                </div>
                </div>
            </form>
        )
    }
}


export default withRouter(Registration)
