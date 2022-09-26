import React from 'react';
import HackWarningImg from '../../assets/images/hack_warning.png';
import '../../css/Module.css';

const Warning = (props) => {
  return (
    <div className='warningWrapper' style={{ opacity: `${props.onWarning ? '100' : '0'}` }}>
      <img className='warningImg' src={HackWarningImg} />
      <div className='blackGlass'></div>
    </div>
  )
};

export default Warning;