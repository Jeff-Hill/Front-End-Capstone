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

    render() {
        return (
            <div>

            </div>
        )
    }
}
