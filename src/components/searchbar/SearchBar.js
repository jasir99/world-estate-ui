import React, { Component } from 'react';

import { GoogleApiWrapper } from 'google-maps-react';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    this.setState({ address });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => this.props.onChange(latLng));
  };

  render() {
    return (
      <div className='search-bar'>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className='ui grid'>
              <div className='eleven wide column'>
                <div className='ui search center'>
                  <input
                    value={this.state.address}
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'prompt',
                    })}
                  />
                  <div className='results-div1'>
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, index) => {
                      const className = 'sugg-item1';

                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                          key={index}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className='one wide column'>
                <div className='inline-block'>
                  <i className='filter icon block custom-filter'></i>
                  <span className='block text filter-text'>Filter</span>
                </div>
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyB9_uum6oI1_tDJoFCJiJce31OKOwXAdqE',
})(SearchBar);
