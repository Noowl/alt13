import React, { Component } from "react";

class Home extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="home">
        <p>BONJOUR</p>
      </div>
    );
  }
}

export default Home;
