import React, { Component } from "react";
import { Route } from "react-router-dom";
import BuyerCard from "./BuyerCard";
import SellerCard from "./SellerCard";

export default class UserList extends Component {
  render() {
    //   console.log("these users", this.props.users)
    if (window.location.pathname === "/buyers") {
      return (
          <section className="users">
            {this.props.users.filter(user => (
              user.userSeller === false)).map(user => (
              <BuyerCard key={user.id} user={user} {...this.props} />
              )

              )}
            </section>
      )
    } else {
        // console.log("stuff", this.props.users)
        return (
        <section className="users">
          {this.props.users.filter(user => (user.userSeller === true)).map(user => (

              user.sellerProfiles.filter(profile => (
                  profile.userId === user.id)).map(profile => (
                    <SellerCard key={user.id} user={user} profile={profile} {...this.props} />

            ))
              ))}
        </section>
        )}
}
}

