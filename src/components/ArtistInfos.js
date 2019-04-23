import React, { Component } from "react";

class ArtistInfos extends Component {
  render(){
    return(
      <div className="artistInfos">
        <div className="artistInfos-name">
          <h1>Loic Nottet</h1>
        </div>
        <div className="artistInfos-nbMusics">
          <div className="artistInfos-nbMusics-number">25</div>
          <div className="artistInfos-nbMusics-music">musiques</div>
        </div>
      </div>
    )
  }
}

export default ArtistInfos;
