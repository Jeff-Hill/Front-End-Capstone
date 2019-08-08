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

class ApplicationViews extends Component {
  state = {
    users: [],
    favorites: [],
    cities: [],
    sellerProfiles: []
  };

  componentDidMount() {
    console.log("component mounted");
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

  filterUserByCity = evt => {
    console.log(evt.target.value);
    UserManager.getUserByCity("users", evt.target.value).then(user => {
      console.log(user);

      if (user.length > 0) {
        this.setState({
          users: user
        });
      } else {
        alert("No users in that city");
      }
    })
  };

  filterUserNeedsWood = evt => {
    console.log(evt.target.id);
    const woodFilter = evt.target.id
    UserManager.getUserByNeedsWood("users", evt.target.id).then(user => {
      console.log(user);
      if (woodFilter === "true") {
        this.setState({
          users: user
        });
      } else {
        this.setState({
          users: user
        });
      }
    });
  };

  filterUserWillDeliver = evt => {
    console.log(evt.target.id);
    const deliverFilter = evt.target.id
    SellerProfileManager.getSellerDelivers("sellerProfiles", evt.target.id).then(user => {
      console.log(user);
      if (deliverFilter === "true") {
        this.setState({
          sellerProfiles: user
        });
      } else {
        this.setState({
          sellerProfiles: user
        });
      }
    });
  };

  resetFilter = (userSeller) => {
    UserManager.getUserByType("users", userSeller).then(user => {
      // console.log(user)
      if(userSeller === false) {
        return (this.setState({
          users: user
        }))
      } else {
        this.setState({
          users: user
        })
      }
    })
  }

  updateUser = editedUserObject => {
    return UserManager.put("users", editedUserObject)
      .then(() => UserManager.getAll("users"))
      .then(users => {
        this.setState({
          users: users
        });
      });
  };

  updateSeller = (editedSellerObject, editedUserObject) => {
    return SellerProfileManager.post("sellerProfiles", editedSellerObject)
      .then(() => SellerProfileManager.getAll("sellerProfiles"))
      .then(sellerProfiles => {
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

  deleteUserProfile = id => {
    return UserManager.delete("users", id)
      .then(() => sessionStorage.clear())
      .then(() => this.props.history.push("/"))
      .then(() => this.props.isUserLoggedIn());
  };

  deleteSellerProfile = id => {
    return SellerProfileManager.delete("sellerProfiles", id).then(() =>
      this.deleteUserProfile(+sessionStorage.getItem("userId"))
    );
  };

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/buyers"
          render={props => {
            return (
              <UserList
                {...props}
                filterUserByCity={this.filterUserByCity}
                filterUserNeedsWood={this.filterUserNeedsWood}
                resetFilter={this.resetFilter}
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
                filterUserByCity={this.filterUserByCity}
                filterUserWillDeliver={this.filterUserWillDeliver}
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
                deleteSellerProfile={this.deleteSellerProfile}
                deleteUserProfile={this.deleteUserProfile}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
