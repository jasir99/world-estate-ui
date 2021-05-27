import React from 'react';

import './Map.css';

const MapSwitch = (props) => {
  return (
    <div className='map-switch' style={{ top: `${props.height + 10}px` }}>
      <button
        onClick={props.showMap}
        className=' button blue'
        disabled={props.active}
      >
        Map
      </button>
      <button
        onClick={props.showList}
        className=' button blue'
        disabled={!props.active}
      >
        List
      </button>
    </div>
  );
};

export default MapSwitch;
