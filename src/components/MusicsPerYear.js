import React, { Component } from "react";
import { ResponsiveBar } from '@nivo/bar';
import config from '../configurations/Barconfig';
import { isPresent, fetchAlbumTrackCount } from '../helpers/FunctionManager';



 class MusicsPerYear extends Component {
   constructor(props){
     super(props);
     this.state = {
       error: null,
       isLoaded: false,
       artistId: this.props.artistId,
       albumList: this.props.albumList,
       data: [],
     }
   }

   yearPresentIndex(albumYear){
     let indexTmp = -1;
     let index = -1;
     this.state.data.forEach(
       (dataItem) => {
         indexTmp ++;
         if(isPresent(albumYear, dataItem.year)){
           index = indexTmp;
         }
       }
     )
     return index;
   }


   insertYearAndNbTracks(nbMusics, albumYear){
        const yearIsPresentIndex = this.yearPresentIndex(albumYear);

        if(yearIsPresentIndex !== -1){
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

    async getAlbumTrackCount(albumId, albumYear){
     const data = await fetchAlbumTrackCount(albumId);
     const nbMusics = await data.message.body.track_list.length;
    this.insertYearAndNbTracks(nbMusics, albumYear);
   }

   async fetchAlbumList(artistId){
     this.state.albumList.forEach(
       (albumItem) => {
         if(albumItem.album.album_release_date.slice(0,4) !== ""){
           this.getAlbumTrackCount(albumItem.album.album_id, albumItem.album.album_release_date.slice(0,4));
         }
       })
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
