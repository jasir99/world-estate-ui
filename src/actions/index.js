import testAppAPI from '../apis/testAppAPI.js';

export const fetchMarkers = (lat, lng) => async (dispatch) => {
  const response = await testAppAPI.get(`address/?lat=${lat}&lng=${lng}`);
  dispatch({ type: 'FETCH_MARKERS', payload: response.data });
};
