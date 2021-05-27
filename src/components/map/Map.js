import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMarkers } from '../../actions/';

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapProvider extends Component {
  mapStyles = {
    width: '100vw',
    height: 'auto',
    marginTop: this.props.height,
  };

  displayMarkers = () => {
    const markers = this.props.markers.data;
    if (markers !== undefined && markers.length > 0)
      return markers.map((store, index) => {
        return (
          <Marker
            key={index}
            id={index}
            position={{
              lat: store.latitude,
              lng: store.longitude,
            }}
            onClick={() => this.props.markerOnClick(store)}
          />
        );
      });
  };

  componentDidMount() {
    this.props.fetchMarkers(this.props.coords.lat, this.props.coords.lng);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.markers === this.props.markers) {
      this.props.fetchMarkers(this.props.coords.lat, this.props.coords.lng);
    }
  }

  render() {
    return (
      <div id='map'>
        <Map
          google={this.props.google}
          center={{
            lat: this.props.coords.lat,
            lng: this.props.coords.lng,
          }}
          zoom={this.props.zoom}
          style={this.mapStyles}
          initialCenter={{
            lat: this.props.coords.lat,
            lng: this.props.coords.lng,
          }}
          mapTypeControl={false}
          fullscreenControl={false}
          gestureHandling='greedy'
        >
          {this.displayMarkers()}
        </Map>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { markers: state.markers };
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB9_uum6oI1_tDJoFCJiJce31OKOwXAdqE',
})(connect(mapStateToProps, { fetchMarkers })(MapProvider));
