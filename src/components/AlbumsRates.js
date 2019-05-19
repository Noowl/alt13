import React, { Component } from "react";
import { ResponsiveLine } from '@nivo/line'

class AlbumsRates extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      artistId: this.props.artistId,
      albumList: this.props.albumList,
      numberAlbum: 0,
      topAlbums: [
        {
          id: "",
          data: []
        }
      ]
    };
  }

  insertDataInState(albumName, albumRate){
    if(this.state.numberAlbum <= 10){
      const topAlbumTmp = this.state.topAlbums
      const dataTmp = [...topAlbumTmp[0].data, {x: albumName, y: albumRate}]
      topAlbumTmp[0].data = dataTmp
      this.setState({topAlbums: topAlbumTmp})
      this.setState({
        numberAlbum: this.state.numberAlbum+1
      })
    }
  }

  async fetchTopAlbums() {
    this.state.albumList.forEach(
      (elem) => {
        this.insertDataInState(elem.album.album_name, elem.album.album_rating)
    });
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
  }

  async componentWillMount(){
    await this.fetchTopAlbums();
  }

  render(){
    const { topAlbums } = this.state;
    return(
      <div className="albumsRates">
        <h2>Notes des albums</h2>

        <div className="albumsRates-line">
        <ResponsiveLine
          data={topAlbums}
          margin={{ top: 15, right: 15, bottom: 200, left: 40 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', stacked: true, min: 0, max: 100 }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -30,
              legend: '',
              legendOffset: 36,
              legendPosition: 'middle'
          }}
          axisLeft={{
              orient: 'left',
              tickSize: 5,
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
