import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { postRequest } from './postRequest';

import { GoogleApiWrapper } from 'google-maps-react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import ImageUpload from './ImageUpload';
import Autocomplete from './Autocomplete';
import RenderImages from './RenderImages';
import './PostForm.css';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {},
      address: '',
      title: null,
      description: null,
      redirect: false,
      images: [],
    };
  }

  fileInputRef = React.createRef();

  handleChange = (address) => {
    this.setState({ address });
  };

  handleFileChange = (e) => {
    const images = [
      ...this.state.images,
      ...Array.from(this.fileInputRef.current.files),
    ];
    this.setState({ images });
  };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleTextChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleSelect = (address) => {
    this.setState({ address });

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => this.setState({ coords: latLng }));
  };

  removeImage = (e) => {
    let images = [...this.state.images];
    images.splice(e.target.alt, 1);
    this.setState({ images });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    postRequest(
      this.state.coords,
      this.state.description,
      this.state.address,
      this.state.images
    );
    this.setState({ redirect: true });
  };
  render() {
    if (this.state.redirect)
      return <Redirect to={{ pathname: '/', coords: this.state.coords }} />;
    return (
      <div
        style={{ top: `${this.props.height + 40}px` }}
        className='form-overlay'
      >
        <form className='ui form'>
          <ImageUpload
            fileInputRef={this.fileInputRef}
            handleFileChange={this.handleFileChange}
            images={this.state.images.length}
          />
          <div className='field'>
            <div className='ui grid'>
              {this.state.images &&
                [...this.state.images].map((file, key) => (
                  <RenderImages
                    key={key}
                    file={file}
                    index={key}
                    customClick={this.removeImage}
                  />
                ))}
            </div>
          </div>
          <Autocomplete
            address={this.state.address}
            handleChange={this.handleChange}
            handleSelect={this.handleSelect}
          />
          <div className='field'>
            <label>Describe more about your property</label>
            <textarea
              type='text'
              name='description'
              placeholder='Enter any notes here'
              onChange={this.handleTextChange}
              rows='4'
            />
          </div>
          <input
            type='submit'
            className='ui button big image-upload'
            value='POST AD'
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB9_uum6oI1_tDJoFCJiJce31OKOwXAdqE',
})(PostForm);
