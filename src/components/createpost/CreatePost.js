import React, { Component } from 'react';

import NavBar from '../navbar/NavBar';
import PostForm from '../postform/PostForm';

class CreatePost extends Component {
  state = {
    navHeight: 0,
  };

  getNavHeight() {
    return document.getElementById('navbar').offsetHeight;
  }
  componentDidMount() {
    this.setState({ navHeight: this.getNavHeight() });
  }
  render() {
    return (
      <div className=''>
        <NavBar backButton={true} />
        <PostForm height={this.state.navHeight} />
      </div>
    );
  }
}

export default CreatePost;
