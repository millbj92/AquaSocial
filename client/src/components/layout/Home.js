import React from 'react';
import MdGlobe from 'react-ionicons/lib/MdGlobe';
import MdCash from 'react-ionicons/lib/MdCash';
import MdPin from 'react-ionicons/lib/MdPin';
import IosText from 'react-ionicons/lib/IosText';
import MdWater from 'react-ionicons/lib/MdWater';
import CreatePost from '../CreatePost';

const Home = () => {
  return (
    <section className='section-home'>
      <div className='sidebar'>
        <ul className='sidebar__nav'>
          <li className='sidebar__nav-item'>
            <MdGlobe className='sidebar__nav-icon' />
            Newsfeed
          </li>
          <li className='sidebar__nav-item'>
            <IosText className='sidebar__nav-icon' />
            Messages
          </li>
          <li className='sidebar__nav-item'>
            <MdCash className='sidebar__nav-icon' />
            Marketplace
          </li>
          <li className='sidebar__nav-item'>
            <MdPin className='sidebar__nav-icon' />
            Store Finder
          </li>
          <li className='sidebar__nav-item'>
            <MdWater className='sidebar__nav-icon' />
            Fish Finder
          </li>
        </ul>
      </div>

      <CreatePost />
    </section>
  );
};

export default Home;
