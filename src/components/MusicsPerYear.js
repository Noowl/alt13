import React, { Component } from "react";
import { ResponsiveBar } from '@nivo/bar'
import data from '../datas/testBar'
import config from '../configurations/testBarconfig'

const apiKey = "&apikey=b69c809a255cd65c27192ba85b41fa5d"
const apiUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/"
let compt = 0;

 class MusicsPerYear extends Component {
   constructor(props){
     super(props);
     this.state = {
       error: null,
       isLoaded: false,
       artistName: 'Loic Nottet',
       artistId: null,
       data: [],
       numberMusics: 0
       //artistInfos: []
     }
   }

   async fetchSearchArtist(artistName){
     const res  = await fetch(apiUrl+"artist.search?q_artist="+artistName+"&page_size=1"+apiKey);
     const data = await res.json();
     this.setState({
       artistId: data.message.body.artist_list[0].artist.artist_id
     });
   }

   printData(){
     this.state.data.map(
       (dataItem) => {
         console.log("--------------------")
         console.log("year " + dataItem.year+" number : "+dataItem.number)
         console.log("--------------------")

       }
     )
   }

   isPresent(albumYear, dataAlbumYear){
     return albumYear == dataAlbumYear ? true : false
   }

   yearPresentIndex(albumYear){
     let indexTmp = -1;
     let index = -1;
    // console.log("---------YEAR ALBUM "+albumYear +"-----------")
     this.state.data.map(
       (dataItem) => {
         indexTmp ++;
        // console.log(" --> "+dataItem.year+ " index "+indexTmp)
         if(this.isPresent(albumYear, dataItem.year)){
           //console.log("is present at index "+ indexTmp)
           index = indexTmp;
         }

       }
     )
     return index;
   }


   insertYearAndNbTracks(nbMusics, albumYear){
        const yearIsPresentIndex = this.yearPresentIndex(albumYear);
        //console.log(yearIsPresentIndex)

        if(yearIsPresentIndex != -1){
          const dataTmp = this.state.data;
          dataTmp[yearIsPresentIndex].number += nbMusics;
        //  console.log("numbe after add "+dataTmp[yearIsPresentIndex].number)
          this.setState({data: dataTmp})

        }

        else{
          this.setState({
            data: [
              ...this.state.data,
              {
                year: albumYear,
                number: nbMusics
              }
            ]
          })
        }
   }


    async fetchAlbumTrackCount(albumId, albumYear){
     const res  = await fetch(apiUrl+"album.tracks.get? album_id="+albumId+apiKey);
     const data = await res.json();
     const nbMusics = await data.message.body.track_list.length;
    this.insertYearAndNbTracks(nbMusics, albumYear);
      console.log("number musics "+nbMusics +" year "+ albumYear)
     //console.log(data.message.body);
   }


   async fetchAlbumList(artistId){
     const res  = await fetch(apiUrl+"artist.albums.get?artist_id="+artistId+"&s_release_date=desc&page_size=20"+apiKey);
     const data = await res.json();
     data.message.body.album_list.map(
       (albumItem) => {
         if(albumItem.album.album_release_date.slice(0,4) != ""){
           this.fetchAlbumTrackCount(albumItem.album.album_id, albumItem.album.album_release_date.slice(0,4))
           console.log(albumItem.album)
         }

       }
     )
   }


   componentDidMount() {
     window.scrollTo(0, 0);
   }

   async componentWillMount(){
     await this.fetchSearchArtist(this.state.artistName);
     await this.fetchAlbumList(this.state.artistId);
   }
  render(){
    return(
      <div className="musicsPerYear">
        <h2>Nombre de musiques par année</h2>
        <div className="musicsPerYear-bar">
          <ResponsiveBar
                      data={this.state.data}
                      keys={config.keys}
                      indexBy="year"
                      margin={config.margin}
                      padding={0.3}
                      colors="nivo"
                      colorBy="id"
                      defs={config.defs}
                      fill={config.fill}
                      borderColor="inherit:darker(1.6)"
                      axisTop={null}
                      axisRight={null}
                      axisBottom={config.axisBottom}
                      axisLeft={config.axisLeft}
                      labelSkipWidth={12}
                      labelSkipHeight={12}
                      labelTextColor="inherit:darker(1.6)"
                      animate={true}
                      motionStiffness={90}
                      motionDamping={15}
                      legends={config.legends}
                  />
            </div>
      </div>
    )
  }
}


// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


export default MusicsPerYear;
