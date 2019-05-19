import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom';
import { fetchAlbumList, fetchArtistRelated, fetchSearchArtist } from '../helpers/FunctionManager';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showCross: false,
      artistId: null,
      artistName: '',
      myArtist: '',
      artistsRelated: [],
      albumList: []
    };

    this.toggleInput = this.toggleInput.bind(this);
  }

  async getSearchArtist(artistName){
    const data = await fetchSearchArtist(artistName);
    if (data.message.body.artist_list.length !== 0){
      this.setState({
        artistId: data.message.body.artist_list[0].artist.artist_id,
        artistName: data.message.body.artist_list[0].artist.artist_name,
      });
    }
  }

  async getAlbumList(){
    const dataAlbum = await fetchAlbumList(this.state.artistId)
    this.setState({
      albumList: dataAlbum
    })
  }

  async getArtistRelated(){
    const data = await fetchArtistRelated(this.state.artistId);
    this.setState({
      artistsRelated: data.message.body.artist_list
    });
  }

  toggleInput() {
    this.setState({
      open: !this.state.open
    })
  }

  setInputValue(myArtist){
    this.setState({...this.state, myArtist})
  }

  async getArtist(){
    await this.getSearchArtist(this.state.myArtist);

    const searching = "?artistId="+this.state.artistId;
    if (this.state.artistId != null){
      await this.getAlbumList(this.state.artistId);
      await this.getArtistRelated(this.state.artistId);
      this.props.history.push({
        pathname: '/artist',
        state: {
          albumList: this.state.albumList,
          artistName: this.state.artistName,
          artistsRelated: this.state.artistsRelated
        },
        search: searching
      });
    }

    else{
      this.setState({
        showCross: true,
        artistId: null
      });
      setTimeout(function() {
        this.setState({
          showCross: false,
          artistId: null
        })}.bind(this), 3000);
    }
  }

  handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      this.getArtist();
    }
  }

  render(){
    return(
      <div className="header">
        <div className="header-title">
          <NavLink className="header-title-link" to="/">
            <h1>alt-13</h1>
          </NavLink>
        </div>
        <div className="header-search">
          <img className={"header-cross" + (this.state.showCross ? ' visible' : ' hidden')} src={require('../assets/close-red.png')} alt="cross icon"/>
          <input
            placeholder="trouver un artiste"
            type="text"
            required
            value={this.state.myArtist}
            onChange={e => this.setInputValue(e.target.value)}
            onKeyPress={this.handleKeyPress}/>
        </div>
      </div>
    )
  }
}

export default withRouter(Header);
