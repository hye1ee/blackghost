import '../../css/App.css';
import React, { useState, useEffect } from 'react';
import { FLAG } from '../Flag';
import HackPage from './HackPage';
import GamePage from './GamePage';
import BackgroundImg from '../../assets/images/background.png';

function App() {

  const [onGame, setOnGame] = useState(false);

  const updateOnGame = (isGame) => {
    setOnGame(isGame);
    FLAG.USER.GAME = isGame;
  }

  return (
    <div className='App'>
      {onGame ? <GamePage updateOnGame={() => updateOnGame(false)} />
        : <HackPage updateOnGame={() => updateOnGame(true)} onGame={onGame} />}
      <img className='Background' src={BackgroundImg} />
    </div>
  );
}

export default App;
