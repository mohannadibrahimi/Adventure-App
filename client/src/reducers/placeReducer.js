import { FETCH_PLACE, RESET_ALL } from "../actions/types";

export default function(state = [], action){
  switch(action.type){
    case FETCH_PLACE:
      return action.payload;
    case RESET_ALL: 
      return action.payload;
    default:
      return state;
  }
}