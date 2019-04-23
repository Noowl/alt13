import React, { Component } from "react";

class TopItem extends Component {
  render(){
    return(
      <div className="home-top-item">
        <div className="home-top-item-value">
          <div className="home-top-item-value-number">#1</div>
          <div className="home-top-item-value-name">Loic Nottet</div>
        </div>
        <div className="home-top-item-likes">
          <div className="home-top-item-likes-icon">
            <img alt="like" src={require('../assets/favorite-heart-button-purple.png')}/>
          </div>
          <div className="home-top-item-likes-score">360</div>
        </div>
      </div>
    )
  }
}

export default TopItem;
