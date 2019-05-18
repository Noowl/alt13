import React, { Component } from "react";
import { ResponsivePie } from '@nivo/pie'
import _ from "lodash";

import { API_KEY, API_URL } from '../helpers/ConstantManager';
import { isPresent } from '../helpers/FunctionManager';

class Genre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      artistId: this.props.artistId,
      genre: []
    }
  }

  genrePresentIndex(genreName){
    let indexTmp = -1;
    let index = -1;
    this.state.genre.forEach(
      (genreItem) => {
        indexTmp++;
        if(isPresent(genreName, genreItem.label)){
          index = indexTmp;
        }
      }
    )
    return index;
  }

  insertDataInState(genreName){
    const genreIsPresentIndex = this.genrePresentIndex(genreName);
    let genreTmp;
    if(genreIsPresentIndex !== -1){
      genreTmp = this.state.genre;
      genreTmp[genreIsPresentIndex].value += 1;
    }

    else{
      const genreItemTmp = {id: genreName, label: genreName,  value: 1, color:"hsl(346, 70%, 50%)"}
       genreTmp = [...this.state.genre, genreItemTmp]
    }
    this.setState({genre: genreTmp})
  }

  async fetchGenre() {
    const res  = await fetch(API_URL + "artist.albums.get?artist_id=" + this.state.artistId + "&s_release_date=desc" + API_KEY);
    const data = await res.json();
    const groupAlbum = _.groupBy(data.message.body.album_list,"album.album_name");
    const dataAlbum = _.map(groupAlbum,
      album => album.sort((elm1, elm2) => Date.parse(elm2.album.updated_time) - Date.parse(elm1.album.updated_time))[0]);
    dataAlbum.forEach(
      (elem) => {
        if(elem.album.primary_genres.music_genre_list.length !== 0){
          elem.album.primary_genres.music_genre_list.forEach(
            (genreItem) => {
              this.insertDataInState(genreItem.music_genre.music_genre_name)
            }
          )
        }
      }
    )
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
  }

  async componentWillMount(){
    await this.fetchGenre(this.state.artistId);
  }

  render(){
    const { genre } = this.state;
    return(
      <div className="genre">
        <h2>Genres</h2>
        <div className="genre-pie">

          <ResponsivePie
                  data={genre}
                  margin={{
                      //"top": 40,
                      //"right": 80,
                      "bottom": 100,
                      //"left": 80
                  }}
                  innerRadius={0.5}

                  borderColor={{
                      "from": "color",
                      "modifiers": [
                          [
                              "darker",
                              0.2
                          ]
                      ]
                  }}
                  enableRadialLabels={false}
                  radialLabelsSkipAngle={10}
                  radialLabelsTextXOffset={6}
                  radialLabelsTextColor="#ffffff"
                  radialLabelsLinkOffset={6}
                  radialLabelsLinkDiagonalLength={16}
                  radialLabelsLinkHorizontalLength={24}
                  radialLabelsLinkStrokeWidth={1}
                  radialLabelsLinkColor={{
                      "from": "color"
                  }}
                  slicesLabelsSkipAngle={10}
                  slicesLabelsTextColor="#ffffff"
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                  defs={[
                      {
                          "id": "dots",
                          "type": "patternDots",
                          "background": "inherit",
                          "color": "rgba(255, 255, 255, 0.3)",
                          "size": 4,
                          "padding": 1,
                          "stagger": true
                      },
                      {
                          "id": "lines",
                          "type": "patternLines",
                          "background": "inherit",
                          "color": "rgba(255, 255, 255, 0.3)",
                          "rotation": -45,
                          "lineWidth": 6,
                          "spacing": 10
                      },
                      {
                          "id": "color-1",
                          "type": "patternSquares",
                          "background": "#FE7E24",
                          "size": 0
                      },
                      {
                          "id": "color-2",
                          "type": "patternSquares",
                          "background": "#F46843",
                          "size": 0
                      },
                      {
                          "id": "color-3",
                          "type": "patternSquares",
                          "background": "#E85363",
                          "size": 0
                      },
                      {
                          "id": "color-4",
                          "type": "patternSquares",
                          "background": "#CD1DB2",
                          "size": 0
                      }
                  ]}
                  fill={[
                      {
                          "match": {
                              "id": "pop"
                          },
                          "id": "color-1"
                      },
                      {
                          "match": {
                              "id": "jazz"
                          },
                          "id": "color-2"
                      },
                      {
                          "match": {
                              "id": "classique"
                          },
                          "id": "color-3"
                      },
                      {
                          "match": {
                              "id": "rock"
                          },
                          "id": "color-4"
                      }
                  ]}
                  legends={[
                      {
                          "anchor": "bottom",
                          "direction": "column",
                          "translateY": 90,
                          "translateX": 0,
                          "itemWidth": 200,
                          "itemHeight": 20,
                          "itemTextColor": "#999",
                          "symbolSize": 14,
                          "symbolShape": "circle",
                          "effects": [
                              {
                                  "on": "hover",
                                  "style": {
                                      "itemTextColor": "#000"
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

export default Genre;
// <ResponsivePie
//             data={data}
//             margin={config.margin}
//             colors={config.colors}
//
//             defs={config.defs}
//             fill={config.fill}
//             borderColor={config.borderColor}
//             animate={config.animate}
//             pixelRatio= {1}
//             innerRadius= {0.65}
//             enableRadialLabels= {false}
//             radialLabelsSkipAngle= {10}
//             radialLabelsTextXOffset= {6}
//             radialLabelsTextColor= {"#333333"}
//             radialLabelsLinkOffset= {0}
//             radialLabelsLinkDiagonalLength= {16}
//             radialLabelsLinkHorizontalLength= {24}
//             radialLabelsLinkStrokeWidth= {1}
//             slicesLabelsSkipAngle= {10}
//             slicesLabelsTextColor= {"#999999"}
//             animate= {true}
//             motionStiffness= {90}
//             motionDamping= {15}
//             legends= {config.legends}
//   />
