import React, { Component } from "react";

class Header extends Component {
  state = {
    myArtist : ""
  }

  render(){
    return(
      <div className="header">
        <div className="header-title">
          <h1>alt-13</h1>
        </div>
        <div className="header-search">
          <input
            placeholder="trouver un artiste"
            type="text"
            required
            value={this.state.myArtist}
            onChange={e => this.setState({myArtist: e.target.value})}/>
          <button><img src={require('../assets/search.png')} alt="search icon"/></button>
        </div>
      </div>
    )
  }
}

export default Header;
