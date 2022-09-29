import '../../../css/modules/Dos.css';

import DosBackgroundImg from '../../../assets/images/dos/dos_background.png';
import DosText from './DosText';

import React, { useState } from 'react';
import MovingComponent from 'react-moving-text';
import { FLAG } from '../../Flag.js';


const DosWrapper = (props) => {

  const [onShake, setOnShake] = useState('');

  return (
    <div className='dosWrapper'>
      <MovingComponent
        type={onShake} className='dosContainer'
        duration={`${FLAG.GAME.DOS.SHAKE_TIME}ms`}
        iteration={1}
      >
        <DosText updateGameStage={props.updateGameStage} setOnShake={setOnShake} />
        <img src={DosBackgroundImg} className='dosBackgroundImg' />
      </MovingComponent>
    </div>
  );
};

export default DosWrapper;