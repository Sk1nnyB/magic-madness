import React, { useState } from 'react';
import { RandomEffectButton } from '../common/Button';
import '../../App.css';
import './RandomEffectSection.css';
import effects from '../../data/effects.js';
import effectsimg from '../../assets/images/effects/no-effect-card.jpg'

var last_nums = [];

const RandomEffectSection = () => {
  const [randomEffect, setRandomString] = useState('');
  const [effectImage, setEffectImage] = useState(effectsimg);

  const generateRandomEffect= () => {
    var randomIndex = Math.floor(Math.random() * effects.length);
    while (true) {
      if (last_nums.indexOf(randomIndex) !== -1) {
        randomIndex = Math.floor(Math.random() * effects.length);
      } else {
        if (last_nums.length < 15) {
            last_nums.push(randomIndex);
            break;
        } else {
            last_nums.shift();
            last_nums.push(randomIndex);
            break;
        }
      }
    }
    setRandomString(effects[randomIndex].effect);
    setEffectImage(effects[randomIndex].image);
  };

  return (
    <div className='random-effect-container'>
      <video src='https://sk1nnyb.github.io/magic-madness/videos/effect_background_remastered.mp4' autoPlay loop muted />
      <div class="box filter-box">
        <h3>Filters:</h3>
        <p>Coming soon...</p>
        <div className="btn">
          <RandomEffectButton
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={generateRandomEffect}>Generate Random Effect:</RandomEffectButton>
        </div>
      </div>

    <div class="box random-effect-box">
      <div class="text-container">
        <h2>Random Effect:</h2>
        <p>{randomEffect}</p>
      </div>
      <div class="image-container">
        <img src={effectImage} alt="Effect Image"></img>
      </div>
    </div>
  </div>
  );
};

export default RandomEffectSection;