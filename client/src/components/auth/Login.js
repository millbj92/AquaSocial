import React, { useState } from 'react';
import MdContact from 'react-ionicons/lib/MdContact';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Alert from '../layout/Alert';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  const { email, password } = formData;
  return (
    <section className='signin'>
      <div className='signin__heading lead'>
        <MdContact className='lead__icon' />{' '}
        <h3 className='heading-tertiary'>Sign In</h3>
      </div>

      <form
        action='#'
        className='signin__form form'
        onSubmit={e => onSubmit(e)}
      >
        <div className='form__group'>
          <input
            type='email'
            className='form__input'
            placeholder='Email'
            id='email'
            value={email}
            onChange={e => onChange(e)}
            name='email'
            required
          />
          <label htmlFor='name' className='form__label'>
            Email
          </label>
        </div>

        <div className='form__group'>
          <input
            type='password'
            className='form__input'
            placeholder='Password'
            id='password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            required
          />
          <label htmlFor='password' className='form__label'>
            Password
          </label>
        </div>

        <button className='btn btn--blue signin__form--button'>Sign In</button>
      </form>
      <Alert gridColumns='1 / -1' />
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
