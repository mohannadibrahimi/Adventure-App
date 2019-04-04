// Helps combine different reducers into file
import { combineReducers } from 'redux';
// Import from reducers
import { reducer as reduxForm } from 'redux-form';
// Imports reducers
import placeReducer from './placeReducer';
import activePlaceReducer from './activePlaceReducer';
import authReducer from './authReducer';
import savedPlaceReducer from './savedPlaceReducer';


// command to combine reducers
export default combineReducers({
  auth: authReducer,
  places: placeReducer,
  activePlace: activePlaceReducer,
  savedPlaces: savedPlaceReducer,
  form: reduxForm
});