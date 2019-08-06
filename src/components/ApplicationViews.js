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
import ProfileEditForm from "./user/ProfileEditForm";

let currentUser = sessionStorage.getItem("userId");
class ApplicationViews extends Component {
  state = {
    users: [],
    favorites: [],
    cities: [],
    sellerProfiles: []
  };

  componentDidMount() {
    const newState = {};

    UserManager.getAll("users")
      .then(users => (newState.users = users))
      .then(() => CityManager.getAll("cities"))
      .then(cities => (newState.cities = cities))
      .then(() => SellerProfileManager.getAll("sellerProfiles"))
      .then(sellerProfiles => (newState.sellerProfiles = sellerProfiles))
      .then(() => FavoriteManager.getAll("favorites"))
      .then(favorites => (newState.favorites = favorites))
      .then(() => this.setState(newState));
  }

  updateUser = editedUserObject => {
    return UserManager.put("users", editedUserObject)
      .then(() => UserManager.getAll("users"))
      .then(users => {
        // this.props.history.push("/buyers");
        this.setState({
          users: users
        });
      });
  };

  updateSeller = (editedSellerObject, editedUserObject) => {
    return SellerProfileManager.post("sellerProfiles", editedSellerObject)
      .then(() => SellerProfileManager.getAll("sellerProfiles"))
      .then(sellerProfiles => {
        // this.props.history.push("/sellers");
        this.setState({
          sellerProfiles: sellerProfiles
        });
      })
      .then(() => this.updateUser(editedUserObject));
  };

  editSeller = (editedSellerObject, editedUserObject) => {
    return SellerProfileManager.put("sellerProfiles", editedSellerObject)
      .then(() => SellerProfileManager.getAll("sellerProfiles"))
      .then(sellerProfiles => {
        this.setState({
          sellerProfiles: sellerProfiles
        });
      })
      .then(() => this.updateUser(editedUserObject));
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
            return (
              <UserList
                {...props}
                users={this.state.users}
                cities={this.state.cities}
                sellerProfiles={this.state.sellerProfiles}
                updateUser={this.updateUser}
              />
            );
          }}
        />

        <Route
          exact
          path="/sellers"
          render={props => {
            return (
              <UserList
                {...props}
                users={this.state.users}
                cities={this.state.cities}
                sellerProfiles={this.state.sellerProfiles}
                updateUser={this.updateUser}
                updateSeller={this.updateSeller}
              />
            );
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
          exact
          path="/profile/:userId(\d+)"
          render={props => {
            let user = this.state.users.find(
              user => user.id === parseInt(props.match.params.userId)
            );
            return (
              <ProfileForm
                {...props}
                cities={this.state.cities}
                sellerProfiles={this.state.sellerProfiles}
                updateUser={this.updateUser}
                updateSeller={this.updateSeller}
              />
            );
          }}
        />

        <Route
          exact
          path="/profile/:userId(\d+)/edit"
          render={props => {
            return (
              <ProfileEditForm
                {...props}
                cities={this.state.cities}
                sellerProfiles={this.state.sellerProfiles}
                updateUser={this.updateUser}
                editSeller={this.editSeller}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
