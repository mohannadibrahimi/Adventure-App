import {SELECT_PLACE, RESET} from '../actions/types';

export default function(state = [], action){
  switch(action.type){
    case SELECT_PLACE:
      return action.payload;
    case RESET:
      return action.payload;
    default:
      return state;
  }
}