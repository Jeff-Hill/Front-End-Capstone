import React, { Component } from "react";
import UserManager from "../../modules/UserManager";
import FavoriteBuyerCard from "./FavoriteBuyerCard";
import FavoriteSellerCard from "./FavoriteSellerCard";
import {
  FormGroup
} from "reactstrap"

export default class FavoriteList extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    console.log("favorite list mounted");
    UserManager.get("users", sessionStorage.getItem("userId")).then(user =>
      this.setState({
        user: user
      })
    );
  }

  render() {
    if (this.state.user.userSeller === true) {
      console.log("favorites rendered");
      return (
        <section >
          <FormGroup className="filter city-select text-center" color="dark">
          <h4>Your Favorite Burners</h4>
          </FormGroup>
          <div className="users">
          {this.props.userFavorites.map(user =>
            this.props.cities
              .filter(city => user.cityId === city.id)
              .map(city => (
                <FavoriteBuyerCard
                  key={user.id}
                  user={user}
                  city={city}
                  {...this.props}
                />
              ))
          )}
          </div>
        </section>
      );
    } else {
      return (
        <section >
          <FormGroup className="filter city-select text-center" color="dark">
          <h1>Your Favorite Choppers</h1>
          </FormGroup>
          <div className="users">
          {this.props.userFavorites.map(user =>
            this.props.sellerProfiles
              .filter(profile => profile.userId === user.id)
              .map(profile =>
                this.props.cities
                  .filter(city => user.cityId === city.id)
                  .map(city => (
                    <FavoriteSellerCard
                      key={user.id}
                      user={user}
                      city={city}
                      profile={profile}
                      {...this.props}
                    />
                  ))
              )
          )}
          </div>
        </section>
      );
    }
  }
}
