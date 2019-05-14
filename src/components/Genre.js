import React, { Component } from "react";
import { ResponsivePie } from '@nivo/pie'
//import data from '../datas/pieGenre'
//import config from '../configurations/pieConfigGenre'
import _ from "lodash";

const apiKey = "&apikey=b69c809a255cd65c27192ba85b41fa5d"
const apiUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/"

class Genre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      artistId: this.props.artistId,
      genre: [
        {
          id: "",
          label:"",
          value:0,
          color:"hsl(346, 70%, 50%)"
        }
      ]
    };
  }

  // async fetchGenreCount(genreId){
  //   console.log("genre id = ", genreId);
  //
  //   const res  = await fetch(apiUrl + "artist.albums.get?artist_id=" + this.state.artistId + "&s_release_date=desc" + apiKey);
  //   const data = await res.json();
  //   //console.log("Tracklist= ", data.message.body.track_list);
  //   if (data.album.primary_genres.music_genre_list[0].music_genre.music_genre_id.length > 1)
  //     this.addNbGenre(data.album.primary_genres.music_genre_list[0].music_genre.music_genre_id.length)
  // }

  insertDataInState(genreName){
    const genreTmp = this.state.genre
    const dataTmp = {id: genreName, label: genreName,  value: 4, color:"hsl(346, 70%, 50%)"}
    genreTmp[0] = dataTmp
    this.setState({genre: genreTmp})
  }

  async fetchGenre() {
    const res  = await fetch(apiUrl + "artist.albums.get?artist_id=" + this.state.artistId + "&s_release_date=desc" + apiKey);
    const data = await res.json();
    const groupGenre = _.groupBy(data.message.body.album_list, "elem.album.primary_genres.music_genre_list[0].music_genre.music_genre_name");
    const dataGenre = _.map(groupGenre, genre => genre.sort((elm1, elm2) => Date.parse(elm2.album.updated_time) - Date.parse(elm1.album.updated_time))[0]);
    dataGenre.forEach(
      (elem) => {
        if (elem.album.primary_genres.music_genre_list[0].music_genre.music_genre_name !== "") {
          console.log("RESULTAT 1 GENRE : " + elem.album.primary_genres.music_genre_list[0].music_genre.music_genre_name);

          this.insertDataInState(elem.album.primary_genres.music_genre_list[0].music_genre.music_genre_name)
          //this.fetchGenreCount(elem.album.primary_genres.music_genre_list[0].music_genre.music_genre_id)
        }
    })
    console.log("RESULTAT TOUS LES GENRES : " + dataGenre.forEach(
      (elem) => {
        if (elem.album.primary_genres.music_genre_list[0].music_genre.music_genre_name !== "") {
          this.insertDataInState(elem.album.primary_genres.music_genre_list[0].music_genre.music_genre_name)
        }
    }));


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
                      "bottom": 60,
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
                          "direction": "row",
                          "translateY": 56,
                          "translateX": 20,
                          "itemWidth": 80,
                          "itemHeight": 14,
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
