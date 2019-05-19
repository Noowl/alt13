import React, { Component } from "react";
import { fetchAlbumTrackCount } from '../helpers/FunctionManager';

class ArtistInfos extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      artistName: this.props.artistName,
      artistId: this.props.artistId,
      albumList: this.props.albumList,
      totalNumberMusics: 0
    }
  }

  addNbMusics(nbMusics){
    this.setState({
      totalNumberMusics: this.state.totalNumberMusics+nbMusics
    })
  }

  async getAlbumTrackCount(albumId){
    const data = await fetchAlbumTrackCount(albumId);
    if (data.message.body.track_list.length > 1)
      this.addNbMusics(data.message.body.track_list.length)
  }

  async fetchAlbumList(artistId){
    this.state.albumList.forEach(
    (albumItem) => {
      this.getAlbumTrackCount(albumItem.album.album_id)
    })
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  async componentWillMount(){
    await this.fetchAlbumList(this.state.artistId);
  }

  render(){
    const {artistName, totalNumberMusics} = this.state
    return(
      <div className="artistInfos">
        <div className="artistInfos-name">
          <h1>{artistName}</h1>
        </div>
        <div className="artistInfos-nbMusics">
          <div className="artistInfos-nbMusics-number">{totalNumberMusics}</div>
          <div className="artistInfos-nbMusics-music">musiques</div>
        </div>
        <div className="responsiveInfos">
        </div>
      </div>
    )
  }
}

export default ArtistInfos;
