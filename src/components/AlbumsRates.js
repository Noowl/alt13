import React, { Component } from "react";
import { ResponsiveLine } from '@nivo/line'
import data from '../datas/lineAlbumsRates'

class AlbumsRates extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      topAlbums: []
    };
  }

  async fetchTopAlbums() {

    const res  = await fetch("https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=1039&s_release_date=desc&g_album_name=1&apikey=b69c809a255cd65c27192ba85b41fa5d");
    const data = await res.json();
    if (this.state.data) {
      this.setState({
        isLoaded: true,
        topAlbums: data.message.body.album_list.map(elem => elem.album.album_rating)
      });
    }
    console.log("RESULTAT AlbumsRates: " + data.message.body.album_list.map(elem => elem.album.album_rating));
  }

  async componentDidMount() {
    await this.fetchTopAlbums();
    window.scrollTo(0, 0);

  }
  async componentWillMount(){
    await this.fetchTopAlbums();
  }

  render(){
    const { topAlbums, isLoaded} = this.state;
    //this.filterState();
    return(
      <div className="albumsRates">
        <h2>Notes des albums</h2>

        <div className="albumsRates-line">
        <ResponsiveLine
        data={topAlbums}
        margin={{ top: 50, right: 150, bottom: 50, left: 150 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', stacked: true, min: '0', max: '100' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 20,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 20,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={20}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[]}
    />
        </div>
      </div>
    )
  }
}

export default AlbumsRates;
