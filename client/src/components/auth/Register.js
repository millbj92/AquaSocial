import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import MdContact from 'react-ionicons/lib/MdContact';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  let passwordInput;
  let password2Input;

  const { name, email, password, password2 } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (passwordInput.value.length < 8) {
      passwordInput.setCustomValidity(
        'Password must be at least 8 characters!'
      );
    } else if (passwordInput.value !== password2Input.value) {
      passwordInput.setCustomValidity('');
      password2Input.setCustomValidity('Passwords do not match!');
    } else {
      passwordInput.setCustomValidity('');
      password2Input.setCustomValidity('');
    }
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match!', 'danger');
    }
  };
  return (
    <section className='register'>
      <div className='register__heading lead'>
        <MdContact className='lead__icon' />{' '}
        <h3 className='heading-tertiary'>Create an account</h3>
      </div>

      <form className='register__form form' onSubmit={e => onSubmit(e)}>
        <div className='form__group'>
          <input
            type='text'
            className='form__input'
            placeholder='Full Name'
            id='name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
          <label htmlFor='name' className='form__label'>
            Full Name
          </label>
        </div>

        <div className='form__group'>
          <input
            type='email'
            className='form__input'
            placeholder='Email'
            id='email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
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
            ref={el => (passwordInput = el)}
            onChange={e => onChange(e)}
            required
          />
          <label htmlFor='password' className='form__label'>
            Password
          </label>
        </div>

        <div className='form__group'>
          <input
            type='password'
            className='form__input'
            placeholder='Confirm Password'
            id='password2'
            name='password2'
            value={password2}
            ref={el => (password2Input = el)}
            onChange={e => onChange(e)}
            required
          />
          <label htmlFor='password2' className='form__label'>
            Confirm Password
          </label>
        </div>

        <button className='btn btn--blue register__form--button'>
          Register
        </button>
      </form>

      <Alert gridColumns='1 / -1' />
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert }
)(Register);
