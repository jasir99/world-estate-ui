import React, { Component } from 'react';

import NavBar from '../navbar/NavBar';
import SearchBar from '../searchbar/SearchBar';
import MapSwitch from '../map/MapSwitch';
import MapProvider from '../map/Map';
import List from '../listing/Listing';
import PostButton from '../postbutton/PostButton';

import Gostivar from '../../static/images/gostivar.jpg';
import './Home.css';
class Home extends Component {
  state = {
    coords: { lat: 30.0, lng: 40.0 },
    menuHeight: 0,
    searchHeight: 0,
    map: true,
    preview: false,
  };

  menuRef = React.createRef();

  getMenuHeight() {
    return this.menuRef.current.offsetHeight + 80;
  }

  getGeolocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.setState({ coords });
    });
  }

  UNSAFE_componentWillMount() {
    const { history } = this.props;
    if (history.action === 'REPLACE') {
      const coords = history.location.coords;
      if (coords !== undefined) this.setState({ coords: coords });
    } else {
      this.getGeolocation();
    }
  }

  getPlacePreview = () => {
    return this.state.preview !== false ? (
      <div className='marker-preview-overlay'>
        <div className='close-icon'>
          <button onClick={() => this.setState({ preview: false })}>
            <i className='close icon large'></i>
          </button>
        </div>
        <div className='marker-preview'>
          <div className='preview-img'>
            <img
              src={`https://advert-app.herokuapp.com${this.state.preview.images[0].image}`}
              alt='preview'
              onError={(e) => {
                e.target.onError = null;
                e.target.src = Gostivar;
              }}
            />
          </div>
          <div className='preview-content'>
            <strong>
              <h3>$399.00</h3>
            </strong>
            <br />
            <p>
              <strong>Address: </strong>
              {this.state.preview.full_address}
            </p>
            <p>
              <strong>Description: </strong>
              {this.state.preview.property_description}
            </p>
            <p>
              <strong>Country: </strong>
              {this.state.preview.country}
            </p>
          </div>
        </div>
      </div>
    ) : (
      <React.Fragment></React.Fragment>
    );
  };
  markerOnClick = (preview) => {
    this.setState({ preview });
  };

  getMap() {
    if (this.state.map === true)
      return (
        <MapProvider
          height={this.state.menuHeight}
          coords={this.state.coords}
          markerOnClick={this.markerOnClick}
        />
      );
    return <List height={this.state.menuHeight} coords={this.state.coords} />;
  }

  componentDidMount() {
    this.setState({
      menuHeight: this.getMenuHeight(),
    });
  }

  eventHandler = (e) => {
    this.setState({ coords: e });
  };

  showMap = () => {
    this.setState({ map: true });
  };

  showList = () => {
    this.setState({ map: false });
  };

  render() {
    return (
      <React.Fragment>
        <div className='top-menu' ref={this.menuRef}>
          <NavBar />
          <SearchBar onChange={this.eventHandler} />
        </div>
        <MapSwitch
          height={this.state.menuHeight}
          showList={this.showList}
          showMap={this.showMap}
          active={this.state.map}
        />
        {this.getPlacePreview()}
        <PostButton />
        {this.getMap()}
      </React.Fragment>
    );
  }
}

export default Home;
