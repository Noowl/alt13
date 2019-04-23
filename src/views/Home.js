import React, { Component } from "react";
import TopItem from "../components/TopItem"

class Home extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="home">
        <div className="home-header">
          <div className="home-header-title">
            <h1>alt-13</h1>
          </div>
          <div className="home-header-search">
            <input placeholder="trouver un artiste" type="text"/>
            <button><img src={require('../assets/search.png')} alt="search icon"/></button>
          </div>
        </div>
        <div className="home-subtitle">top artistes</div>
        <div className="home-top">
          <TopItem/>
          <TopItem/>
          <TopItem/>
        </div>
      </div>
    );
  }
}

export default Home;
