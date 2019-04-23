import React, { Component } from "react";
import Header from "../components/Header"
import ArtistInfos from "../components/ArtistInfos"
import MusicsPerYear from "../components/MusicsPerYear"
import Genre from "../components/Genre"
import WordsMostUsed from "../components/WordsMostUsed"
import AlbumsRates from "../components/AlbumsRates"

class DetailsArtist extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="container">
        <Header/>
        <ArtistInfos/>
        <MusicsPerYear/>
        <Genre/>
        <WordsMostUsed/>
        <AlbumsRates/>
      </div>
    );
  }
}

export default DetailsArtist;
