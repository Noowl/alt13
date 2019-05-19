import React, { Component } from "react";
import Header from "../components/Header"
import ArtistInfos from "../components/ArtistInfos"
import MusicsPerYear from "../components/MusicsPerYear"
import Genre from "../components/Genre"
import ArtistsRelated from "../components/ArtistsRelated"
import AlbumsRates from "../components/AlbumsRates"

const queryString = require('query-string');

class DetailsArtist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artistId: queryString.parse(this.props.location.search),
      albumList: this.props.location.state.albumList,
      artistName: this.props.location.state.artistName,
      artistsRelated: this.props.location.state.artistsRelated
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate (prevProps) {
    if (prevProps.location.search !== this.props.location.search)
      window.location.reload()
  }

  render() {
    const params = queryString.parse(this.props.location.search);
    const albumList = this.state.albumList

    return (
      <div className="container">
      <Header/>
      <ArtistInfos artistId={params.artistId} albumList={albumList} artistName={this.state.artistName}/>
      <div className="container-etage">
        <div className="container-etage-componentChart">
          <MusicsPerYear artistId={params.artistId} albumList={albumList}/>
        </div>
        <div className="container-etage-componentChart">
          <ArtistsRelated artistId={params.artistId} artistsRelated={this.state.artistsRelated}/>
        </div>
        <div className="container-etage-componentChart">
          <Genre artistId={params.artistId} albumList={albumList}/>
        </div>
      </div>
      <AlbumsRates artistId={params.artistId} albumList={albumList}/>
    </div>
    );
  }
}

export default DetailsArtist;
