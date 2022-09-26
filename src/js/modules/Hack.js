import React from 'react';
import '../../css/modules/Hack.css';
import '../modules/Gauge';

import Gauge from '../modules/Gauge';
import HackTitleImg from '../../assets/images/hack_title.png';
import HackBodyImg from '../../assets/images/hack_body.png';


const Hack = (props) => {

  return (
    <div className='hackPageWrapper'>
      <img className='hackTitleImg' src={HackTitleImg} />
      <div className='hackBodyWrapper'>
        <div className='loadingText digitalFont textWrapper'>
          <div>Loading</div>
          <div className='dotText'>{'.'.repeat(props.gauge % 6 + 1)}</div>
        </div>
        <Gauge value={props.gauge} />
        <div className='gaugeText digitalFont textWrapper'>
          <div className='numberText'>{props.gauge.toFixed(0)}</div>
          <div>%</div>
        </div>
        <img className='hackBodyImg' src={HackBodyImg} />
      </div>
    </div>
  );


}
export default Hack;