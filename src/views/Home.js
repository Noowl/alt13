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

  fetchTopArtists() {
    fetch("https://api.musixmatch.com/ws/1.1/chart.artists.get?page=1&page_size=3&country=fr&apikey=b69c809a255cd65c27192ba85b41fa5d", 
    {mode: 'no-cors', method: 'GET', headers: {'Access-Control-Allow-Origin': '*'}})
    .then(res => res.json())
    .then(
      (data) => {
        this.setState({
          isLoaded: true,
          topArtists: data
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchTopArtists();
  }

  render() {
    const { topArtists } = this.state;

    console.log("Resulat : " + topArtists);
    
    return (
      <div>
        <div className="home">
        <Header/>
        <div className="home-subtitle">top artistes</div>
        </div>
        <div className="home-topHolder">
          <div className="home-top">
            {TestData.map((elm, key) => (
              <TopItem
                key={key}
                name={elm.name}
                like={elm.like}
                img={elm.img}
              />
            ))}
          </div>
        </div>
      </div>
      
    );
  }
}

export default Home;
