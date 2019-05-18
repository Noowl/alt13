import React, { Component } from "react";
import { API_KEY, API_URL } from "../helpers/ConstantManager";

class ArtistsRelated extends Component {
  constructor(props){
    super(props);
    this.state = {
      artistId: this.props.artistId,
      artistsRelated: []
    }
  }

  async fetchArtistRelated(){
    const res = await fetch(API_URL+"artist.related.get?artist_id="+this.state.artistId+"&page_size=3&page=1"+API_KEY);
    const data = await res.json();
    this.setState({
      isLoaded: true,
      artistsRelated: data.message.body.artist_list
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  async componentWillMount(){
    await this.fetchArtistRelated();
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
