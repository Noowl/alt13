import React, { Component } from "react";
import { ResponsiveBar } from '@nivo/bar'
import data from '../datas/testBar'
import config from '../configurations/testBarconfig'
import { API_KEY, API_URL } from '../helpers/ConstantManager';

let compt = 0;

 class MusicsPerYear extends Component {
   constructor(props){
     super(props);
     this.state = {
       error: null,
       isLoaded: false,
       artistId: this.props.artistId,
       data: [],
       //numberMusics: 0
     }
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
     this.state.data.map(
       (dataItem) => {
         indexTmp ++;
         if(this.isPresent(albumYear, dataItem.year)){
           index = indexTmp;
         }
       }
     )
     return index;
   }


   insertYearAndNbTracks(nbMusics, albumYear){
        const yearIsPresentIndex = this.yearPresentIndex(albumYear);

        if(yearIsPresentIndex != -1){
          const dataTmp = this.state.data;
          dataTmp[yearIsPresentIndex].number += nbMusics;
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
     const res  = await fetch(API_URL+"album.tracks.get? album_id="+albumId+API_KEY);
     const data = await res.json();
     const nbMusics = await data.message.body.track_list.length;
    this.insertYearAndNbTracks(nbMusics, albumYear);
   }


   async fetchAlbumList(artistId){
     const res  = await fetch(API_URL+"artist.albums.get?artist_id="+artistId+"&s_release_date=desc&page_size=20"+API_KEY);
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
