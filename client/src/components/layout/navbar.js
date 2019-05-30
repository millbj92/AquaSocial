import React, { Fragment, useState, useEffect, useRef } from 'react';
import MdSearch from 'react-ionicons/lib/MdSearch';
import MdNotifications from 'react-ionicons/lib/MdNotifications';
import MdCog from 'react-ionicons/lib/MdCog';
import MdExit from 'react-ionicons/lib/MdExit';
import MdPerson from 'react-ionicons/lib/MdPerson';
import IosText from 'react-ionicons/lib/IosText';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [navData, setNavData] = useState({
    dropdown: false
  });

  let node = useRef();

  const { dropdown } = navData;
  const authLinks = (
    <nav className='user-nav'>
      <div className='user-nav__icon-box'>
        <MdNotifications className='user-nav__icon' />
        <span className='user-nav__notification'>7</span>
      </div>

      <div className='user-nav__icon-box'>
        <IosText className='user-nav__icon' />
        <span className='user-nav__notification'>13</span>
      </div>

      <div
        className='user-nav__user'
        style={{ backgroundColor: dropdown === true ? '#f4f2f2' : '' }}
        id='nav-user'
        onClick={e => {
          e.stopPropagation();
          setNavData({ dropdown: !dropdown });
        }}
      >
        <img
          src={require('../../img/profile.jpg')}
          alt=''
          id='nav-user'
          className='user-nav__user-photo'
        />
        <span id='nav-user' className='user-nav__user-name'>
          Brandon Miller
        </span>
      </div>

      <ul
        className='user-nav__dropdown'
        style={{ maxHeight: dropdown === true ? '50rem' : '0' }}
        ref={node}
      >
        <li className='user-nav__dropdown-item'>
          <MdCog className='user-nav__dropdown-item__icon' />
          <span>Account</span>
        </li>
        <li className='user-nav__dropdown-item'>
          <MdPerson className='user-nav__dropdown-item__icon' />
          <span style={{ marginLeft: '1rem' }}>Profile</span>
        </li>
        <li
          className='user-nav__dropdown-item'
          onClick={e => {
            e.stopPropagation();
            setNavData({
              dropdown: false
            });
            logout();
          }}
        >
          <MdExit className='user-nav__dropdown-item__icon' />
          <span style={{ marginLeft: '.7rem' }}>Logout</span>
        </li>
      </ul>
    </nav>
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false);
    return () => {
      document.removeEventListener('mousedown', handleClick, false);
    };
  }, []);

  const handleClick = e => {
    if (!node.current) return;
    if (node.current.contains(e.target) || e.target.id === 'nav-user') {
      return;
    }

    setNavData({
      dropdown: false
    });
  };
  const guestLinks = (
    <nav className='user-nav'>
      <Link
        to='/signin'
        className='user-nav__icon-box'
        style={{ marginLeft: '15rem' }}
      >
        <span>Sign In</span>
      </Link>

      <Link to='/register' className='user-nav__icon-box'>
        <span>Register</span>
      </Link>
    </nav>
  );
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
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </header>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
