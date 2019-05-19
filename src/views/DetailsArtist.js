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
      artistId: queryString.parse(this.props.location.search)
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    //this.setState({ state: this.state });
  }

  componentDidUpdate (prevProps) {
    if (prevProps.location.search !== this.props.location.search)
      window.location.reload()
  }

  render() {
    const params = queryString.parse(this.props.location.search);
    // window.location.reload()
    console.log("##### JE SUIS ICI : " + this.props.location.search);

    return (
      <div className="container">
      <Header/>
      <ArtistInfos artistId={params.artistId}/>
      <div className="container-etage">
        <div className="container-etage-componentChart">
          <MusicsPerYear artistId={params.artistId}/>
        </div>
        <div className="container-etage-componentChart">
          <ArtistsRelated artistId={params.artistId}/>
        </div>
        <div className="container-etage-componentChart">
          <Genre artistId={params.artistId}/>
        </div>
      </div>
      <AlbumsRates artistId={params.artistId}/>
    </div>
    );
  }
}

export default DetailsArtist;
