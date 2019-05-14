import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom';

const apiKey = "&apikey=b69c809a255cd65c27192ba85b41fa5d"
const apiUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/"

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      showCross: false,
      artistId: null,
      myArtist: ''
    };

    this.toggleInput = this.toggleInput.bind(this);
  }

  async fetchSearchArtist(artistName){
    const res  = await fetch(apiUrl+"artist.search?q_artist="+artistName+"&page_size=1"+apiKey);
    const data = await res.json();
    if (data.message.body.artist_list.length !== 0){
      this.setState({
        artistId: data.message.body.artist_list[0].artist.artist_id
      });
    }
  }

  toggleInput() {
    this.setState({
      open: !this.state.open
    })
  }

  setInputValue(myArtist){
    this.setState({...this.state, myArtist})
  }

  async searchArtist(){
    await this.fetchSearchArtist(this.state.myArtist);
      console.log("ARTIST to search : " + this.state.myArtist);
      console.log("ARTIST ID : " + this.state.artistId);

    if (this.state.artistId != null)
      // this.props.history.push({
      //   pathname: '/artist',
      //   state: {
      //     artistId : this.state.artistId
      //   }
        this.props.history.push({
          pathname: '/artist',
          state: {
            artistId : this.state.artistId
          }
      });
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
      this.searchArtist();
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
            {console.log(this.state)}
          
            <button onClick={this.searchArtist}>
              <img src={require('../assets/search.png')} alt="search icon"/>
            </button>
          
        </div>
      </div>
    )
  }
}

export default withRouter(Header);
