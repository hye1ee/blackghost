import React, { useEffect, useState } from "react";
import MemoryImages from "./MemoryImages";
import MemoryBlock from "./MemoryBlock";
import MovingComponent from 'react-moving-text';
import { FLAG } from '../../Flag.js';


const MemoryQuiz = (props) => {

  const [board, setBoard] = useState([]);
  const [userInput, setUserInput] = useState([]); // store index
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    const newBoard = [];
    for (let i = 0; i < 4; i += 1) newBoard.push(new Array(4).fill(props.size / 4, 0, 4));
    setBoard(newBoard);
  }, []);

  const addInput = (index) => {
    const newInput = [...userInput];
    newInput.push(index);
    setUserInput(newInput);

    if (index !== props.quiz[newInput.length - 1].index) {
      setWrong(true);
      setTimeout(() => {
        props.repeatGameStage((val) => !val);
      }, FLAG.GAME.MEMORY.WRONG_TIME * 2)

    } else if (newInput.length === 6) {
      setTimeout(() => {
        props.updateGameStage();
      }, FLAG.GAME.MEMORY.WRONG_TIME)
    }
  }


  return (
    <MovingComponent type={wrong ? 'shakeMix' : ''} duration={`${FLAG.GAME.MEMORY.WRONG_TIME}ms`} iteration='1'>
      <div className='quizBoard' style={{ width: `${props.size}vh`, height: `${props.size}vh` }}>
        {board.map((boardRow, i) =>
          <div key={i} className='memoryBlockRow' style={{ width: `${props.size}vh`, height: `${props.size / 4}vh` }}>
            {boardRow.map((size, j) => {
              return (
                <MemoryBlock
                  key={j} clickable={true} onClick={() => addInput(i * 4 + j)}
                  size={props.size / 4} imgKey={props.blockInfo[i * 4 + j].key}
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