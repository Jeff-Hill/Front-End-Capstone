import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withRouter } from "react-router"
import HomeList from "./home/HomeList"



class ApplicationViews extends Component {

    state = {
        users: [],
        favorites: [],
        cities: [],
        sellerProfiles: []
    }
    render() {
        return (
            <React.Fragment>

                <Route exact path="/home" render={props => {

                    if (this.isAuthenticated()) {
                        return ( <HomeList  {...props} tasks={this.state.tasks} articles={this.state.articles} messages={this.state.messages}
                        events={this.state.events} getUserTasks={this.getUserTasks} />)
                        } else {
                        return <Redirect to="/" />
                        }

                    }}/>


            </React.Fragment>
        )
    }
}

export default withRouter(ApplicationViews);
