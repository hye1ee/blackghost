import React, { useEffect, useState } from 'react';
import '../../../css/modules/Memory.css';

import Block from '../../../assets/images/memory/memory_block.png';
import MemoryImages from './MemoryImages';


const MemoryBlock = (props) => {
  const [blockStyle, setBlockStyle] = useState(null);

  useEffect(() => {
    setBlockStyle({
      height: `${props.size}vh`,
      width: `${props.size}vh`,
      position: 'absolute',
      cursor: props.clickable ? 'pointer' : 'auto',
    });
  }, [props.size]);

  const blockAnswerStyle = {
    opacity: props.visible ? 100 : 0,
    position: 'absolute',
    transition: 'all 200ms',
  };

  return (
    <div style={{ ...blockStyle, position: 'relative' }} onClick={props.onClick} >
      <img
        style={{ ...blockAnswerStyle, ...blockStyle }}
        src={process.env.PUBLIC_URL + `/assets/images/memory/memory_block${props.imgKey}.png`} />
      <img style={{ ...blockStyle, zIndex: -2, }} src={Block} />
      <div style={{ ...blockStyle, backgroundColor: '#00FF85', zIndex: -3, }}></div>
    </div>
  );
};

export default MemoryBlock;