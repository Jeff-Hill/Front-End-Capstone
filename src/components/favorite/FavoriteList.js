import React, { Component } from 'react'
import FavoriteManager from '../../modules/FavoriteManager';

let currentUser = sessionStorage.getItem("userId")
export default class FavoriteList extends Component {

    State = {
        favoriter: "",
        favorited: ""
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



    render() {
        return (
            <div>

            </div>
        )
    }
}
