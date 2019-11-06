import React, { Component } from "react";
import BuyerCard from "../user/BuyerCard";
import SellerCard from "../user/SellerCard";
import UserManager from "../../modules/UserManager"


export default class HomeList extends Component {

    state = {

        userSeller: this.props.userSeller,

      }

      componentDidMount() {
        console.log("profile form mounted")
        UserManager.get("users", sessionStorage.getItem("userId")).then(user =>{
          console.log(user)
          this.setState({
            username: user.username,
            password: user.password,
            userSeller: user.userSeller,
          }
        )
        }

        )
      }
  render() {
    if (this.state.userSeller === false) {
      return (
        <section className="users">

                  <BuyerCard

                    {...this.props}
                  />
        </section>
      )
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
