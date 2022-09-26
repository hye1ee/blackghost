import React, { useEffect, useState } from 'react';
import '../../../css/modules/Memory.css';


import MemoryBlock from './MemoryBlock';
import MemoryImages from './MemoryImages';

import { FLAG } from '../../Flag.js';


const MemoryBoard = (props) => {

  const [board, setBoard] = useState([]);
  const [boardInfo, setBoardInfo] = useState(null);

  useEffect(() => {
    if (boardInfo) {
      const newBoard = [];
      for (let i = 0; i < boardInfo.ROW; i += 1) newBoard.push(new Array(boardInfo.COL).fill(boardInfo?.SIZE / boardInfo?.COL, 0, boardInfo.COL))
      setBoard(newBoard);
    }
  }, [boardInfo]);

  useEffect(() => {
    setBoardInfo(FLAG.GAME.MEMORY.BOARD[props.info]);
  }, []);

  return (
    <div className='memoryBoard' style={{ width: `${boardInfo?.SIZE}vh`, height: `${boardInfo?.ROW * boardInfo?.SIZE / boardInfo?.COL}vh` }}>
      {board.map((boardRow, i) =>
        <div key={i} className='memoryBlockRow' style={{ width: `${boardInfo?.SIZE}vh`, height: `${boardInfo?.SIZE / boardInfo?.COL}vh` }}>
          {boardRow.map((size, j) => {
            return (
              <MemoryBlock
                key={j} clickable={false}
                size={size} imgKey={props.blockInfo[i * (boardInfo.COL) + j].key}
                visible={props.blockInfo[i * (boardInfo.COL) + j].visible} />
            );
          }
          )}
        </div>
      )}
    </div>
  );
};

export default MemoryBoard;