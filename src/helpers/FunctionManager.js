import { API_KEY, API_URL } from '../helpers/ConstantManager';
import _ from "lodash";

export function isPresent(dataAPI, stateData){
  return dataAPI === stateData ? true : false;
}

export async function fetchAlbumList(artistId){
  const res  = await fetch(API_URL+"artist.albums.get?artist_id="+artistId+"&s_release_date=desc&page_size=20"+API_KEY);
  const data = await res.json();
  const groupAlbum = _.groupBy(data.message.body.album_list,"album.album_name");
  return _.map(groupAlbum,
  album => album.sort((elm1, elm2) => Date.parse(elm2.album.updated_time) - Date.parse(elm1.album.updated_time))[0]);
}

export async function fetchArtistRelated(artistId){
  const res = await fetch(API_URL+"artist.related.get?artist_id="+artistId+"&page_size=3&page=1"+API_KEY);
  return await res.json();
}

export async function fetchSearchArtist(artistName){
  const res  = await fetch(API_URL+"artist.search?q_artist="+artistName+"&page_size=1"+API_KEY);
  return await res.json();
}

export async function fetchAlbumTrackCount(albumId){
  const res  = await fetch(API_URL+"album.tracks.get? album_id="+albumId+API_KEY);
  return await res.json();
}
