import React, { Component } from 'react'
import FavoriteManager from '../../modules/FavoriteManager';
import FavoriteCard from "../favorite/FavoriteCard"

export default class FavoriteList extends Component {



    componentDidMount() {
        this.props.displayFavoritesByUser()
    }


    render() {
              return (
                <section className="favorites">
                  {this.props.allFavoritedUsers.map(user =>
                          <FavoriteCard
                            key={user.id}
                            user={user}
                            // city={city}
                            {...this.props}
                          />
                        )
                    }
                </section>
              );

          }
}
