import React from 'react';
import { Link } from 'react-router-dom';

const landing = () => {
  return (
    <section className='section-landing'>
      <div className='bg-video'>
        <video className='bg-video__content' autoPlay muted loop>
          <source src={require('../../img/video.mp4')} type='video/mp4' />
          <source src={require('../../img/video.webm')} type='video/webm' />
          Your browser is not supported!
        </video>
      </div>

      <h1 className='section-landing__heading heading-primary'>
        <span className='heading-primary--main'>Aqua Social</span>
        <span className='heading-primary--sub'>
          Social Media for Fish Keepers
        </span>
      </h1>

      <Link to='/signin' className='section-landing__signin'>
        <button className='btn btn--white btn--animated'>Sign In</button>
      </Link>

      <Link to='/register' className='section-landing__register '>
        <button className='btn btn--blue btn--animated'>Register</button>
      </Link>
    </section>
  );
};

export default landing;
