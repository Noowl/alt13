import React, { Component } from "react";
import _ from "lodash";
import { API_KEY, API_URL } from '../helpers/ConstantManager';

class ArtistInfos extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      artistName: "",
      artistId: this.props.artistId,
      totalNumberMusics: 0
    }
  }

  async fetchArtistInformations(){
     const res = await fetch(API_URL+"artist.get?artist_id="+this.state.artistId+API_KEY);
     const data = await res.json();
     this.setState({
      artistName: data.message.body.artist.artist_name
    });
  }

  addNbMusics(nbMusics){
    this.setState({
      totalNumberMusics: this.state.totalNumberMusics+nbMusics
    })
  }

  async fetchAlbumTrackCount(albumId){
    const res  = await fetch(API_URL+"album.tracks.get? album_id="+albumId+API_KEY);
    const data = await res.json();

    if (data.message.body.track_list.length > 1)
      this.addNbMusics(data.message.body.track_list.length)
  }


  async fetchAlbumList(artistId){
    const res  = await fetch(API_URL+"artist.albums.get?artist_id="+artistId+"&s_release_date=asc&page_size=100"+API_KEY);
    const data = await res.json();
    const groupAlbum = _.groupBy(data.message.body.album_list,"album.album_name");

    const dataAlbum = _.map(groupAlbum,
      album => album.sort((elm1, elm2) => Date.parse(elm2.album.updated_time) - Date.parse(elm1.album.updated_time))[0]);
    dataAlbum.forEach(
      (albumItem) => {
        this.fetchAlbumTrackCount(albumItem.album.album_id)
      }
    )
  }


  componentDidMount() {
    window.scrollTo(0, 0);
  }

  async componentWillMount(){
    await this.fetchArtistInformations();
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
