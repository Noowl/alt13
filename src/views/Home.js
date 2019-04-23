import React, { Component } from "react";
import TopItem from "../components/TopItem"
import Header from "../components/Header"

class Home extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="home">
        <Header/>
        <div className="home-subtitle">top artistes</div>
        <div className="home-topHolder">
          <div className="home-top">
            <TopItem/>
            <TopItem/>
            <TopItem/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
