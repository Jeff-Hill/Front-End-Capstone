import React, { Component } from "react";
import { Route } from "react-router-dom";
import BuyerCard from "./BuyerCard";
import SellerCard from "./SellerCard";

export default class UserList extends Component {
  render() {
    if (<Route exact path></Route> === "/buyers") {
      return (

          <section className="users">
            {this.props.users.map(user => (
              <BuyerCard key={user.id} user={user} {...this.props} />
            ))}
          </section>

      )
    } else {
        return (
        <section className="users">
          {this.props.users.map(user => (
            <SellerCard key={user.id} user={user} {...this.props} />
          ))}
        </section>
        )
    }
  }
}

