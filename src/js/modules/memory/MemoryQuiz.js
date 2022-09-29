import React, { useEffect, useState } from "react";
import MemoryImages from "./MemoryImages";
import MemoryBlock from "./MemoryBlock";
import MovingComponent from 'react-moving-text';
import { FLAG } from '../../Flag.js';


const MemoryQuiz = (props) => {

  const [board, setBoard] = useState([]);
  const [userInput, setUserInput] = useState([]); // store index
  const [boardInfo, setBoardInfo] = useState(null);
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    setBoardInfo(FLAG.GAME.MEMORY.BOARD[props.info]);
    const newBoard = [];
    for (let i = 0; i < 4; i += 1) newBoard.push(new Array(4).fill(props.size / 4, 0, 4));
    setBoard(newBoard);
  }, []);

  const addInput = (index) => {
    if (wrong !== false) return;
    const newInput = [...userInput];
    newInput.push(index);
    setUserInput(newInput);

    if (index !== props.quiz[newInput.length - 1].index) {
      setWrong(true);
      setTimeout(() => {
        props.repeatGameStage((val) => !val);
      }, FLAG.GAME.MEMORY.WRONG_TIME * 6)

    } else if (newInput.length === 6) {
      setWrong(null);
      setTimeout(() => {
        props.updateGameStage();
      }, FLAG.GAME.MEMORY.WRONG_TIME * 6)
    }
  }


  return (
    <MovingComponent type={wrong ? 'shakeMix' : ''} duration={`${FLAG.GAME.MEMORY.WRONG_TIME}ms`} iteration='1'>
      <div className='quizBoard' style={{ width: `${boardInfo?.SIZE}vh`, height: `${boardInfo?.ROW * boardInfo?.SIZE / boardInfo?.COL}vh` }}>
        {board.map((boardRow, i) =>
          <div key={i} className='memoryBlockRow' style={{ width: `${(boardInfo?.SIZE)}vh`, height: `${(boardInfo?.SIZE) / boardInfo?.COL}vh` }}>
            {boardRow.map((size, j) => {
              return (
                <MemoryBlock
                  key={j} clickable={true} onClick={() => addInput(i * 4 + j)}
                  size={boardInfo?.SIZE / 4} imgKey={props.blockInfo[i * 4 + j].key}
                  visible={userInput.includes(i * 4 + j)} />
              );
            }
            )}
          </div>
        )}
      </div>
    </MovingComponent>
  );


};

export default MemoryQuiz;