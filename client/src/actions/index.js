import axios from 'axios';
import { FETCH_PLACE, SELECT_PLACE, FETCH_USER, FETCH_SAVED_PLACES, RESET, RESET_ALL } from './types';

// USER AUTH
export const fetchUser = () => async dispatch => {
  const user = await axios.get('/api/current_user')
  dispatch({type: FETCH_USER, payload: user.data})
}

// FETCH PLACES
export const fetchPlace = (params) => async dispatch => {
  const res = await axios.get('/api/places/filter/'+params.term);
  dispatch({ type: FETCH_PLACE, payload: res.data})
}

// RESET SINGLE PLACE ON COMP UNMOUNT
export const resetAllPlace = () => async dispatch => {
  const res = {}
  dispatch({ type: RESET_ALL, payload: res})
}

// GET SINGLE PALCE
export const selectPlace = (params) => async dispatch => {
  const res = await axios.get('/api/places/'+params.id)
  dispatch({ type: SELECT_PLACE, payload: res.data})
}

// RESET SINGLE PLACE ON COMP UNMOUNT
export const resetPlace = () => async dispatch => {
  const res = []
  dispatch({ type: RESET, payload: res})
}

// CREATE A NEW PLACE
export const createPlace = (place, user, history) => async dispatch =>{
  let add = place.name;
  let geoloc = `https://api.opencagedata.com/geocode/v1/json?q=${add}&key=1d3a4a21e1db45e3abff4e6c1da53731&pretty=1`
  const locdata = await axios.get(geoloc)
  place.UserId = user._id;
  place.userName = user.userName;
  place.userDp = user.userDp;
  locdata.data.results[0] === undefined ? place.country = "Unknown" : place.country = locdata.data.results[0].components.country;
  locdata.data.results[0] === undefined ? place.state = "Unknown" : place.state = locdata.data.results[0].components.state;
  locdata.data.results[0] === undefined ? place.lat = "Unknown" : place.lat = locdata.data.results[0].geometry.lat;
  locdata.data.results[0] === undefined ? place.lng = "Unknown" : place.lng = locdata.data.results[0].geometry.lng;
  locdata.data.results[0].formatted === undefined ? place.lng = "Unknown" : place.detail = locdata.data.results[0].formatted;
  console.log(locdata)

  // const res = await axios.post('/api/places', place)
  // history.push('/places/all');
  // dispatch({ type: SELECT_PLACE, payload: res })
}

// UPDATE PLACE
export const updatePlace = (place, history) => async dispatch =>{
  const res = await axios.put('/api/places/'+place._id, place)
  history.push('/place/'+place._id);
  console.log(place)
  dispatch({ type: SELECT_PLACE, payload: res })
}

// DELETE PLACE
export const deletePlace = (place, history) => async dispatch =>{
  console.log('/api/places/'+place._id)
  console.log(place._id)
  const res = await axios.delete('/api/places/'+place._id, place)
  console.log(res);
  history.push('/places/all');
  
}

// SAVE PLACE TO LOGGED IN USER
export const savePlaceToUser = (place, user) => async dispatch => {
  let saved = {};
  saved.userId = user._id;
  saved.placeId = place._id
  const res = await axios.put('/api/place/save', saved);
  console.log(res.data.savedPlace);
}

// FETCH SAVED PLACES
export const fetchSavedPlaces = (user) => async dispatch => {
  const res = await axios.post('/api/place/saved', user); 
  dispatch({ type: FETCH_SAVED_PLACES, payload: res.data.savedPlace })
}