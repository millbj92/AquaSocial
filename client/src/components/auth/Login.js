import React, { useState } from 'react';
import MdContact from 'react-ionicons/lib/MdContact';

const Login = () => {
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
  };

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
    </section>
  );
};

export default Login;
