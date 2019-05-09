import React, { Component } from "react";

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

  async fetchSearchArtist(artistName){
    const res  = await fetch(apiUrl+"artist.search?q_artist="+artistName+"&page_size=1"+apiKey);
    const data = await res.json();
    this.setState({
      artistName: data.message.body.artist_list[0].artist.artist_id
    });
  }

  addNbMusics(nbMusics){
    let totalNumber = this.state.totalNumberMusics+nbMusics;
    this.setState({
      totalNumberMusics: totalNumber
    })
  }

  async fetchAlbumTrackCount(albumId){
    const res  = await fetch(apiUrl+"album.tracks.get? album_id="+albumId+apiKey);
    const data = await res.json();
    this.addNbMusics(data.message.body.track_list.length)
  }


  async fetchAlbumList(artistId){
    const res  = await fetch(apiUrl+"artist.albums.get?artist_id="+artistId+"&s_release_date=desc"+apiKey);
    const data = await res.json();

    data.message.body.album_list.map(
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
    const {artistName, artistId, totalNumberMusics} = this.state
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
