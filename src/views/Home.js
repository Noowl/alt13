import React, { Component } from "react";
import TopItem from "../components/TopItem"
import Header from "../components/Header"
import TestData from "../datas/testdatatop";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      topArtists: []
    };
  }

  
  async fetchTopArtists() {
    const res  = await fetch("https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.artists.get?page=1&page_size=3&country=fr&apikey=b69c809a255cd65c27192ba85b41fa5d");
    const data = await res.json();
    this.setState({
      isLoaded: true,
      topArtists: data.message.body.artist_list.sort((elm1, elm2) => elm2.artist.artist_rating - elm1.artist.artist_rating)
    });
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
    
  }
  async componentWillMount(){
    await this.fetchTopArtists();
  }
  render() {
    const { topArtists, isLoaded} = this.state;
    const imgColor = ["favorite-heart-button-purple", "favorite-heart-button-orange", "favorite-heart-button-red"];
    
    console.log("Resulat : " + topArtists.length);
    return (
      <div className="home">
        <Header/>
        <div className="home-subtitle">top artistes</div>
        <div className="home-top">
          {topArtists.map((elm, key) => (
            <TopItem
              key={key}
              index={key+1}
              name={elm.artist.artist_name}
              like={elm.artist.artist_rating}
              img={imgColor[key]}
            />
          ))}
        </div>
      </div> 
    );
  }
}

export default Home;
