import React, { Component } from "react";
import _ from "lodash";

const apiKey = "&apikey=b69c809a255cd65c27192ba85b41fa5d"
const apiUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/"

class ArtistInfos extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      artistName: "",
      artistId: this.props.artistId,
      totalNumberMusics: 0
      //artistInfos: []
    }
  }

  async fetchArtistInformations(){
     const res = await fetch(apiUrl+"artist.get?artist_id="+this.state.artistId+apiKey);
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
    console.log("Album id = ", albumId);
    
    const res  = await fetch(apiUrl+"album.tracks.get? album_id="+albumId+apiKey);
    const data = await res.json();
    console.log("Tracklist= ", data.message.body.track_list);
    if (data.message.body.track_list.length > 1)
      this.addNbMusics(data.message.body.track_list.length)
  }


  async fetchAlbumList(artistId){
    const res  = await fetch(apiUrl+"artist.albums.get?artist_id="+artistId+"&s_release_date=asc&page_size=100"+apiKey);
    const data = await res.json();
    console.log("TABLEAU ALBUMS:" + data.message.body.album_list[0].album.album_name);
    
    const groupAlbum = _.groupBy(data.message.body.album_list,"album.album_name");
    
    const dataAlbum = _.map(groupAlbum, 
      album => album.sort((elm1, elm2) => Date.parse(elm2.album.updated_time) - Date.parse(elm1.album.updated_time))[0]);
    console.log("GROUP", dataAlbum);
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
    // await this.fetchSearchArtist(this.state.artistName);
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
      </div>
    )
  }
}

export default ArtistInfos;
