import React, { Component } from "react";
import FavoriteManager from "../../modules/FavoriteManager";
import FavoriteCard from "../favorite/FavoriteCard";

export default class FavoriteList extends Component {

  componentDidMount() {
    this.props.displayFavoritesByUser(sessionStorage.getItem("userId"));
    console.log("favorite list mounted");
  }

  render() {
    return (
      <section className="favorites">
           <h4>Your Favorites</h4>
        {this.props.allFavoritedUsers.map(user =>
          this.props.cities
            .filter(city => user.cityId === city.id)
            .map(city => (
              <FavoriteCard
                key={user.id}
                user={user}
                city={city}
                {...this.props}
              />
            ))
        )}
      </section>
    );
  }
}
