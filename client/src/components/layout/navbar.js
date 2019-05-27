import React from 'react';
import MdSearch from 'react-ionicons/lib/MdSearch';
import MdNotifications from 'react-ionicons/lib/MdNotifications';
import IosText from 'react-ionicons/lib/IosText';
import { Link } from 'react-router-dom';

const navbar = () => {
  return (
    <header className='header'>
      <Link to='/'>
        <img src={require('../../img/logo.png')} alt='' className='logo' />
      </Link>

      <p />

      <form action='#' className='search'>
        <input
          type='text'
          placeholder='Search Aqua Social'
          className='search__input'
        />
        <button className='search__button'>
          <MdSearch className='search__icon' />
        </button>
      </form>

      <nav className='user-nav'>
        <div className='user-nav__icon-box'>
          <MdNotifications className='user-nav__icon' />
          <span className='user-nav__notification'>7</span>
        </div>

        <div className='user-nav__icon-box'>
          <IosText className='user-nav__icon' />
          <span className='user-nav__notification'>13</span>
        </div>

        <div className='user-nav__user'>
          <img
            src={require('../../img/profile.jpg')}
            alt=''
            className='user-nav__user-photo'
          />
          <span className='user-nav__user-name'>Brandon Miller</span>
        </div>
      </nav>
    </header>
  );
};

export default navbar;
