import React from "react";

const TopItem = props => (
  <div className="home-top-item">
    <div className="home-top-item-value">
      <div className="home-top-item-value-number"># {props.index}</div>
      <div className="home-top-item-value-name">{props.name}</div>
    </div>
    <div className="home-top-item-likes">
      <div className="home-top-item-likes-icon">
        <img alt="like" src={require(`../assets/${props.img}.png`)}/>
      </div>
      <div className="home-top-item-likes-score">{props.like}</div>
    </div>
  </div>
);

export default TopItem;
