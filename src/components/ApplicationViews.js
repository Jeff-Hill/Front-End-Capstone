import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import HomeList from "./home/HomeList";
import UserList from "./user/UserList";
import FavoriteList from "./favorite/FavoriteList";
import UserManager from "../modules/UserManager";
import CityManager from "../modules/CityManager";
import SellerProfileManager from "../modules/SellerProfileManager";
import FavoriteManager from "../modules/FavoriteManager";
import ProfileForm from "./user/ProfileForm";

let currentUser = sessionStorage.getItem("userId")
class ApplicationViews extends Component {
  state = {
    users: [],
    favorites: [],
    cities: [],
    sellerProfiles: []
  };

  componentDidMount() {
    const newState = {};

    UserManager.getAll("users").then(users => (newState.users = users));
    CityManager.getAll("cities").then(cities => (newState.cities = cities));
    SellerProfileManager.getAll("sellerProfiles").then(
      sellerProfiles => (newState.sellerProfiless = sellerProfiles)
    );
    FavoriteManager.getAll("favorites")
      .then(favorites => (newState.favorites = favorites))
      .then(() => this.setState(newState));
  }

  updateBuyer = editedBuyerObject => {
    return UserManager.put("users", editedBuyerObject)
      .then(() => UserManager.getAll("users"))
      .then(users => {
        this.props.history.push("/buyers");
        this.setState({
          users: users
        });
      });
  };

  updateSeller = editedSellerObject => {
    return SellerProfileManager.put("sellerProfiles", editedSellerObject)
      .then(() => SellerProfileManager.getAll("sellerProfiles"))
      .then(sellerProfiles => {
        this.props.history.push("/sellers");
        this.setState({
          sellerProfiles: sellerProfiles
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/home"
          render={props => {
            return <HomeList {...props} />;
          }}
        />

        <Route
          exact
          path="/buyers"
          render={props => {
            return <UserList {...props} updateBuyer={this.updateBuyer} />;
          }}
        />

        <Route
          exact
          path="/sellers"
          render={props => {
            return <UserList {...props} updateSeller={this.updateSeller} />;
          }}
        />

        <Route
          exact
          path="/favorites"
          render={props => {
            return <FavoriteList {...props} />;
          }}
        />

        <Route
          path="/profile/:userId(\d+)"
          render={(props) => {
            let user = this.state.users.find(user => user.id === parseInt(props.match.params.userId)
            )
            if (!user) {
              user = { id: 404, username: "404" };
            }
            return (
              <ProfileForm
                {...props}
                user={user}
                cities={this.state.cities}
                users={this.state.users}
                sellerProfiles={this.state.sellerProfiles}
                updateBuyer={this.updateBuyer}
                updateSeller={this.updateSeller}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
