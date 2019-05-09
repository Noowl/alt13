import React, { Component } from "react";
import { ResponsiveLine } from '@nivo/line'
//import data from '../datas/lineAlbumsRates'

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
    // console.log(data.message.body.artist_list);
    this.setState({
      isLoaded: true,
      topAlbums: Array.from(data.message.body.album_list).map(album => album.album_rating)
    });
    console.log("RESULTAT 1:" + this.state.topAlbums);
    console.log("RESULTAT : " + Array.from(data.message.body.album_list));

    // this.setState({
    //   isLoaded: true,
    //   topAlbums: this.state.topAlbums.map(elem => elem.album_rating)
    // });
    // console.log("RESULTAT 2:" + this.state.topAlbums);
  }
  //
  // filterState(){
  //   this.setState({
  //     topAlbums: topAlbums.filter(album_rating)
  //   });
  // }

  componentDidMount() {
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
            data={this.topAlbums}
            margin={{
                "top": 50,
                "right": 110,
                "bottom": 50,
                "left": 60
            }}
            xScale={{
                "type": "point"
            }}
            yScale={{
                "type": "linear",
                "stacked": true,
                "min": "auto",
                "max": "auto"
            }}
            axisTop='0'
            axisRight='0'
            axisBottom={{
                "orient": "bottom",
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "transportation",
                "legendOffset": 36,
                "legendPosition": "middle"
            }}
            axisLeft={{
                "orient": "left",
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "count",
                "legendOffset": -40,
                "legendPosition": "middle"
            }}
            enableGridX={false}
            colors={{
                "scheme": "nivo"
            }}
            lineWidth={4}
            dotSize={10}
            dotColor={{
                "from": "color",
                "modifiers": []
            }}
            dotBorderWidth={5}
            dotBorderColor={{
                "from": "color",
                "modifiers": []
            }}
            dotLabel="y"
            dotLabelYOffset={-12}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            legends={[
                {
                    "anchor": "bottom-right",
                    "direction": "column",
                    "justify": false,
                    "translateX": 100,
                    "translateY": 0,
                    "itemsSpacing": 0,
                    "itemDirection": "left-to-right",
                    "itemWidth": 80,
                    "itemHeight": 20,
                    "itemOpacity": 0.75,
                    "symbolSize": 12,
                    "symbolShape": "circle",
                    "symbolBorderColor": "rgba(0, 0, 0, .5)",
                    "effects": [
                        {
                            "on": "hover",
                            "style": {
                                "itemBackground": "rgba(0, 0, 0, .03)",
                                "itemOpacity": 1
                            }
                        }
                    ]
                }
            ]}
        />
        </div>
      </div>
    )
  }
}

export default AlbumsRates; 
