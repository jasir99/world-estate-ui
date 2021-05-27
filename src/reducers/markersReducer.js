export const markersReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_MARKERS':
      return action.payload;
    case 'FETCH_PLACES':
      return action.payload;
    default:
      return state;
  }
};
