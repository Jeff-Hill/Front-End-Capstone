import React, { Component } from 'react'
import FavoriteManager from '../../modules/FavoriteManager';

export default class FavoriteList extends Component {

    State = {
        user_favoriter: "",
        user_favorited: ""
    }

    // componentDidMount() {
    //     console.log("profile form mounted")
    //     UserManager.get("users", sessionStorage.getItem("userId")).then(user =>{
    //       console.log(user)
    //       this.setState({
    //         user_favoriter: user.,
    //         user_favorited: user.password,

    //       })
    //     }

    //     )
    //   }

    addNewFavorite = user => {

        return FavoriteManager.post(user)
          .then(newFavorite => {
              this.setState({

              })

          })

      }

      saveNewUser = () => {

        const user = {
          username: this.state.username,
          password: this.state.password,
          userSeller: this.state.userSeller,
          userId: this.state.currentUser
        };

        // Add a .then onto this function to trigger the re-render of FireFuel.js
        this.addNewUser(user).then(() => this.props.isUserLoggedIn());

      };

    render() {
        return (
            <div>

            </div>
        )
    }
}
