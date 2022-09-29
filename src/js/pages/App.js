import '../../css/App.css';
import React, { useState, useEffect } from 'react';
import { FLAG } from '../Flag';
import HackPage from './HackPage';
import GamePage from './GamePage';
import BackgroundImg from '../../assets/images/background.png';
import { MovingComponent } from 'react-moving-text';

function App() {

  const [onGame, setOnGame] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setOnGame(false);
    }, 1000);
  }, []);

  const updateOnGame = (isGame) => {
    setOnGame(isGame);
    FLAG.USER.GAME = isGame;
  }

  return (
    <div className='App'>
      <MovingComponent type='fadeIn' duration='500ms' iteration='1'>
        {onGame === true ? <GamePage updateOnGame={() => updateOnGame(false)} />
          : (onGame === false ?
            <HackPage updateOnGame={() => updateOnGame(true)} onGame={onGame} /> : <></>)
        }
      </MovingComponent>
      <img className='Background' src={BackgroundImg} />
    </div>
  );
}

export default App;
