import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import decksimg from '../images/decks.jpg'
import effectsimg from '../images/randomeffects.jpg'

function Cards() {
  return (
    <div className='cards'>
      <h1>Pick your poison!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={decksimg}
              text="Don't know what to play? Pick a random deck."
              label='Decks'
              path='/decks'
            />
            <CardItem
              src={effectsimg}
              text='Feeling lucky? Generate random effects.'
              label='Random Effects'
              path='/random-effect'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
