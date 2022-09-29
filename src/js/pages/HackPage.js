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
  const [gaugeBlink, setGaugeBlink] = useState('');

  const warningAnimation = () => {
    // start blinking
    setOnWarning(true);
    const blinkInterval = setInterval(() => setOnWarning((val) => !val), 500);
    setTimeout(() => {
      clearInterval(blinkInterval); // off blinking
      setTimeout(() => props.updateOnGame(true), 800); // delay before game
    }, 8000);
  }

  // trigger timer
  useEffect(() => {
    if (!timer) setTimer(setInterval(() => setGauge(val => val + 0.2), FLAG.GAUGE.SPEED));
  }, [])

  // check gauge 
  useEffect(() => {
    if (timer && gauge >= FLAG.GAUGE[FLAG.USER.STAGE].END) {
      clearInterval(timer);
      if (FLAG.USER.STAGE !== 'THIRD') {
        setTimeout(() => {
          warningAnimation();
        }, 2500);
      } else {
        setGaugeBlink('flash');
        setTimeout(() => {
          window.close();
        }, 2500);
        /*
        const remote = window.require('@electron/remote/main');
        window.resizeTo(631, 812);
        window.open("https://firebasestorage.googleapis.com/v0/b/jtbc-blackghost.appspot.com/o/clue1.jpeg?alt=media&token=76848afa-328d-423e-9687-6591d8844842", '_self', "width=631, height=812");
        console.log(window);*/
      }
    }
  }, [gauge]);

  return (
    <div className='hackPageWrapper'>
      <Warning onWarning={onWarning} />
      <Hack gauge={gauge} gaugeBlink={gaugeBlink} />
    </div>

  );


}
export default HackPage;