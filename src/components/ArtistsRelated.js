import React, { Component } from "react";

class ArtistsRelated extends Component {
  constructor(props){
    super(props);
    this.state = {
      artistId: this.props.artistId,
      artistsRelated: this.props.artistsRelated
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render(){
    const { artistsRelated } = this.state;

    return(
      <div className="artistRelated">
        <h2>Artistes similaires</h2>
        <div className="artistRelated-values">
          {artistsRelated.map((elm, key) => (
            <div className="artistRelated-values-item" key={key}>
              <div className="artistRelated-values-item-word">{elm.artist.artist_name}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default ArtistsRelated;
