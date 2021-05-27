import { combineReducers } from 'redux';
import { markersReducer } from './markersReducer.js';

export default combineReducers({
  markers: markersReducer,
});
