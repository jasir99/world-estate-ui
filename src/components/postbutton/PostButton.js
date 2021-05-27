import React from 'react';

import { Link } from 'react-router-dom';

import './PostButton.css';

function PostButton() {
  return (
    <div className='post-button'>
      <Link className='ui button big' to='/create_post'>
        POST AD
      </Link>
    </div>
  );
}

export default PostButton;
