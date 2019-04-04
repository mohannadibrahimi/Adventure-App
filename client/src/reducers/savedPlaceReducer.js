import { FETCH_SAVED_PLACES } from "../actions/types";

export default function(state = [], action){
  switch(action.type){
    case FETCH_SAVED_PLACES:
      return action.payload || false;
    default:
      return state;
  }
}