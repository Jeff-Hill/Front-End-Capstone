import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import BuyerCard from "./BuyerCard"
class UserList extends Component {
    render() {
        return (
            <React.Fragment>

                <section className="buyers">
                {
                    this.props.users.map(user =>
                        <BuyerCard key={user.id} user={user} {...this.props} />
                    )
                }
                </section>
            </React.Fragment>
        )
    }
}

export default withRouter(UserList)
