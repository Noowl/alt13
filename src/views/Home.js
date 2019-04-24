import React, { Component } from "react";
import TopItem from "../components/TopItem"
import Header from "../components/Header"
import TestData from "../datas/testdatatop";

class Home extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <div className="home">
        <Header/>
        <div className="home-subtitle">top artistes</div>
        </div>
        <div className="home-topHolder">
          <div className="home-top">
            {TestData.map((elm, key) => (
              <TopItem
                key={key}
                name={elm.name}
                like={elm.like}
                img={elm.img}
              />
            ))}
          </div>
        </div>
      </div>
      
    );
  }
}

export default Home;
