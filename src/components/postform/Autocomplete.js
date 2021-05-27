import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

const Autocomplete = (props) => {
  return (
    <div className='field'>
      <label>Propery Address</label>
      <PlacesAutocomplete
        value={props.address}
        onChange={props.handleChange}
        onSelect={props.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <React.Fragment>
            <input
              type='text'
              name='address'
              placeholder='Canada Street 555'
              value={props.address}
              {...getInputProps({})}
            />
            <div className='results-div'>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, index) => {
                const className = 'sugg-item';

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
          </React.Fragment>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default Autocomplete;
