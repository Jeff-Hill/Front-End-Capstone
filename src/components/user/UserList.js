import React, { Component } from "react";
import { Route } from "react-router-dom";
import BuyerCard from "./BuyerCard";
import SellerCard from "./SellerCard";

export default class UserList extends Component {
  render() {
    if (window.location.pathname === "/buyers") {
      return (
        <section className="users">
          {this.props.users
            .filter(user => user.userSeller === false)
            .map(user =>
              this.props.cities
                .filter(city => user.cityId === city.id)
                .map(city => (
                  <BuyerCard
                    key={user.id}
                    user={user}
                    city={city}
                    {...this.props}
                  />
                ))
            )}
        </section>
      );
    } else {
      return (
        <section className="users">
          {this.props.users
            .filter(user => user.userSeller === true)
            .map(user =>
              this.props.sellerProfiles
                .filter(profile => profile.userId === user.id)
                .map(profile =>
                  this.props.cities
                    .filter(city => user.cityId === city.id)
                    .map(city => (
                      <SellerCard
                        key={user.id}
                        user={user}
                        city={city}
                        profile={profile}
                        {...this.props}
                      />
                    ))
                )
            )}
        </section>
      );
    }
  }
}
