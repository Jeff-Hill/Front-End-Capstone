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
    sellerProfiles: [],
    userBuyer: [],
    userSeller: [],
    currentUser: sessionStorage.getItem("userId"),
    allFavoritedUsers: []
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
      .then(() => FavoriteManager.getAllByUser("favorites"))
      .then(favorites => (newState.favorites = favorites))
      .then(() => UserManager.getUserBuyer("users"))
      .then(userBuyer => (newState.userBuyer = userBuyer))
      .then(() => UserManager.getUserSeller("users"))
      .then(userSeller => (newState.userSeller = userSeller))
      .then(() => this.setState(newState, () => this.displayFavoritesByUser()));
  }

  filterUserByCity = evt => {
    console.log(evt.target.value);
    UserManager.getBuyerByCity("users", evt.target.value).then(user => {
      console.log(user);

      if (user.length > 0) {
        this.setState({
          userBuyer: user
        });
      } else {
        alert("No users in that city");
      }
    });
  };

  filterSellerByCity = evt => {
    console.log(evt.target.value);
    UserManager.getSellerByCity("users", evt.target.value).then(user => {
      console.log(user);

      if (user.length > 0) {
        this.setState({
          userSeller: user
        });
      } else {
        alert("No users in that city");
      }
    });
  };

  filterUserNeedsWood = evt => {
    console.log(evt.target.id);
    const woodFilter = evt.target.id;
    UserManager.getBuyerNeedsWood("users", evt.target.id).then(user => {
      console.log(user);
      if (woodFilter === "true") {
        this.setState({
          userBuyer: user
        });
      } else {
        this.setState({
          userBuyer: user
        });
      }
    });
  };

  filterUserWillDeliver = evt => {
    console.log(evt.target.id);
    const deliverFilter = evt.target.id;
    SellerProfileManager.getSellerDelivers(
      "sellerProfiles",
      evt.target.id
    ).then(user => {
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

  resetBuyerFilter = user => {
    UserManager.getUserBuyer("users").then(user => {
      console.log("reset filter", user);
      this.setState({
        userBuyer: user
      });
    });
  };
  resetSellerFilter = user => {
    UserManager.getUserSeller("users").then(user => {
      console.log("reset filter", user);
      this.setState({
        userSeller: user
      });
    });
  };

  updateUser = editedUserObject => {
    return UserManager.put("users", editedUserObject)
      .then(() => UserManager.getAll("users"))
      .then(users => {
        this.setState({
          userBuyer: users,
          userSeller: users
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

  addNewFavorite = user => {
    return FavoriteManager.post("favorites", user)
      .then(() => FavoriteManager.getAllByUser("favorites"))
      .then(allUserFavorites => {
        this.setState(
          {
            favorites: allUserFavorites
          },
          () => this.displayFavoritesByUser()
        );
      });
  };

  deleteNewFavorite = id => {
    return FavoriteManager.getAllByUser("favorites")
      .then(favorites =>
        favorites.find(favorite => id === favorite.favoritedId)
      )
      .then(user => FavoriteManager.remove("favorites", user.id))
      .then(() => {
        console.log("delete console log");
        return FavoriteManager.getAllByUser("favorites");
      })
      .then(allFavorites => {
        console.log("all favorites in delete", allFavorites);
        this.setState(
          {
            favorites: allFavorites
          },
          () => this.displayFavoritesByUser()
        );
      });
  };

  saveNewFavoritePair = (favoritedUser, event) => {
    const user = {
      favoriterId: parseInt(this.state.currentUser),
      favoritedId: favoritedUser.id
    };
    this.addNewFavorite(user);
    console.log(user);
  };

  displayFavoritesByUser = () => {
    const userFavorites = this.state.favorites;
    let promises = [];
    for (let i = 0; i < userFavorites.length; i++) {
      promises.push(UserManager.get("users", userFavorites[i].favoritedId));
    }
    Promise.all(promises).then(allFavoritedUsers => {
      console.log("all favorited users", allFavoritedUsers);
      this.setState({ allFavoritedUsers: allFavoritedUsers });
    });
  };

  render() {
    console.log("App Views rendered");
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
                resetBuyerFilter={this.resetBuyerFilter}
                userBuyer={this.state.userBuyer}
                cities={this.state.cities}
                sellerProfiles={this.state.sellerProfiles}
                updateUser={this.updateUser}
                saveNewFavoritePair={this.saveNewFavoritePair}
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
                filterSellerByCity={this.filterSellerByCity}
                filterUserWillDeliver={this.filterUserWillDeliver}
                userSeller={this.state.userSeller}
                resetSellerFilter={this.resetSellerFilter}
                cities={this.state.cities}
                sellerProfiles={this.state.sellerProfiles}
                updateUser={this.updateUser}
                updateSeller={this.updateSeller}
                saveNewFavoritePair={this.saveNewFavoritePair}
              />
            );
          }}
        />

        <Route
          exact
          path="/favorites"
          render={props => {
            return (
              <FavoriteList
                {...props}
                users={this.state.users}
                cities={this.state.cities}
                sellerProfiles={this.state.sellerProfiles}
                favorites={this.state.favorites}
                deleteNewFavorite={this.deleteNewFavorite}
                userFavorites={this.state.allFavoritedUsers}
                displayFavoritesByUser={this.displayFavoritesByUser}
              />
            );
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
