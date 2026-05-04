import React from 'react';
import '../../App.css';
import { DecksButton, RandomEffectButton } from '../common/Button';
import './HeroSection.css';
import Typical from 'react-typical'

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='https://sk1nnyb.github.io/magic-madness/videos/video-1.mp4' autoPlay loop muted />
      <h1>
        <Typical
          loop={Infinity}
          wrapper = 'b'
          steps={[
            'CHAOS',
            1500,
            'VICTORY',
            1500,
            'PLUNDERING',
            1500,
            'TEA',
            1500,
            'MADNESS',
            1500
          ]}
          />
        AWAITS</h1>
      <p>It's time to swing, steal, plunder.</p>
      <div className='hero-btns'>
        <DecksButton
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          DECKS
        </DecksButton>
        <RandomEffectButton
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          RANDOM EFFECT
        </RandomEffectButton>
      </div>
    </div>
  );
}

export default HeroSection;
