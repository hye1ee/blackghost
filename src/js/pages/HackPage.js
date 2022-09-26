import React, { useState, useEffect } from 'react';
import '../../css/Page.css';
import '../modules/Gauge';
import { FLAG } from '../Flag';
import Hack from '../modules/Hack';
import Warning from '../modules/Warning';


const HackPage = (props) => {
  /* States */
  const [gauge, setGauge] = useState(FLAG.GAUGE[FLAG.USER.STAGE].START);
  const [timer, setTimer] = useState(null);
  const [onWarning, setOnWarning] = useState(false);

  const warningAnimation = () => {
    // start blinking
    setOnWarning(true);
    const blinkInterval = setInterval(() => setOnWarning((val) => !val), 500);
    setTimeout(() => {
      clearInterval(blinkInterval); // off blinking
      setTimeout(() => props.updateOnGame(true), 800); // delay before game
    }, 3000);
  }

  // trigger timer
  useEffect(() => {
    if (!timer) setTimer(setInterval(() => setGauge(val => val + 0.2), FLAG.GAUGE.SPEED));
  }, [])

  // check gauge 
  useEffect(() => {
    if (timer && gauge >= FLAG.GAUGE[FLAG.USER.STAGE].END) {
      clearInterval(timer);
      if (FLAG.USER.STAGE !== 'THIRD') warningAnimation();
    }
  }, [gauge]);

  return (
    <div className='hackPageWrapper'>
      <Warning onWarning={onWarning} />
      <Hack gauge={gauge} />
    </div>

  );


}
export default HackPage;