import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMarkers } from '../../actions/';
// import Image from '../../static/images/images.png';
import Gostivar from '../../static/images/gostivar.jpg';

import './Listing.css';

class List extends Component {
  styles = {
    height: 'auto',
    marginTop: this.props.height + 40,
  };

  componentDidMount() {
    this.props.fetchMarkers(this.props.coords.lat, this.props.coords.lng);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.places === this.props.places) {
      this.props.fetchMarkers(this.props.coords.lat, this.props.coords.lng);
    }
  }

  mapPlaces = () => {
    const places = this.props.places.data;
    if (places !== undefined && places.length > 0)
      return places.map((place, index) => {
        let src = Gostivar;
        console.log(place);
        if (place.images.length !== 0)
          src = `https://advert-app.herokuapp.com${place.images[0].image}`;

        return (
          <div className='marker-container' key={index}>
            <div className='marker-img'>
              <img
                src={src}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = Gostivar;
                }}
                alt='preview'
              />
            </div>
            <div className='marker-content'>
              <strong>
                <h3>$399.00</h3>
              </strong>
              <br />
              <p>
                <strong>Address: </strong>
                {place.full_address}
              </p>
              <p>
                <strong>Description: </strong>
                {place.property_description}
              </p>
              <p>
                <strong>Country: </strong>
                {place.country}
              </p>
            </div>
          </div>
        );
      });
  };

  render() {
    return (
      <div style={this.styles} className='marker-list-container'>
        {this.mapPlaces()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { places: state.markers };
};
export default connect(mapStateToProps, { fetchMarkers })(List);
