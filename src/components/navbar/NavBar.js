import React from 'react';

import { Link } from 'react-router-dom';

import './NavBar.css';

function NavBar(props) {
  const getNavButton = () => {
    if (props.backButton) {
      return (
        <Link to='/'>
          <i className='arrow left icon big'></i>
        </Link>
      );
    }
    return <i className='bars icon big'></i>;
  };

  const rightSideMenuIcon = () => {
    if (!props.backButton) return <i className='bars icon large'></i>;
  };
  return (
    <div className='red navbar' id='navbar'>
      <div className='ui grid'>
        <div className='three wide column left'>{getNavButton()}</div>

        <div className='ten wide column center logo'>LOGO</div>

        <div className='three wide column right'>{rightSideMenuIcon()}</div>
      </div>
    </div>
  );
}

export default NavBar;
