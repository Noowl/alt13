import React, { Component } from "react";
import { ResponsiveLine } from '@nivo/line'
import _ from "lodash";
//import data from '../datas/lineAlbumsRates'
import { API_KEY, API_URL } from '../helpers/ConstantManager';

class AlbumsRates extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      artistId: this.props.artistId,
      topAlbums: [
        {
          id: "",
          data: []
        }
      ]
    };
  }

  insertDataInState(albumName, albumRate){
    const topAlbumTmp = this.state.topAlbums
    const dataTmp = [...topAlbumTmp[0].data, {x: albumName, y: albumRate}]
    topAlbumTmp[0].data = dataTmp
    this.setState({topAlbums: topAlbumTmp})
  }

  async fetchTopAlbums() {
    const res  = await fetch(API_URL+"artist.albums.get?artist_id="+this.state.artistId+"&s_release_date=desc&g_album_name=1"+API_KEY);
    const data = await res.json();
    const groupAlbum = _.groupBy(data.message.body.album_list,"album.album_name");
    const dataAlbum = _.map(groupAlbum,
      album => album.sort((elm1, elm2) => Date.parse(elm2.album.updated_time) - Date.parse(elm1.album.updated_time))[0]);
    dataAlbum.map(
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
    //this.filterState();
    return(
      <div className="albumsRates">
        <h2>Notes des albums</h2>

        <div className="albumsRates-line">
        <ResponsiveLine
          data={topAlbums}
          margin={{ top: 15, right: 15, bottom: 100, left: 40 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', stacked: true, min: 0, max: 100 }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -20,
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
