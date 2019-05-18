import React, { Component } from "react";
import TopItem from "../components/TopItem"
import Header from "../components/Header"
import { API_KEY, API_URL } from '../helpers/ConstantManager';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      topArtists: []
    };
  }

  
  async fetchTopArtists() {
    const res  = await fetch(API_URL+"chart.artists.get?page=1&page_size=3&country=fr"+API_KEY);
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
    const { topArtists } = this.state;
    const imgColor = ["favorite-heart-button-purple", "favorite-heart-button-orange", "favorite-heart-button-red"];
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
