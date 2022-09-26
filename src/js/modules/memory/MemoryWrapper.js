import React, { useEffect, useState } from 'react';
import '../../../css/modules/Memory.css';
import MemoryBoard from './MemoryBoard';
import { FLAG } from '../../Flag.js';
import MovingComponent from 'react-moving-text';
import MemoryQuiz from './MemoryQuiz';


const getAnswer = () => {
  const answer = [];
  for (let i = 1; i <= 16; i += 1) answer.push({ key: i, visible: false });
  answer.sort(() => Math.random() - 0.5);

  const quiz = [];
  for (let i = 0; i < 16; i += 1) quiz.push({ key: answer[i].key, index: i, visible: true });
  //quiz.sort(() => Math.random() - 0.5);

  return [answer, quiz.slice(0, 6)];
}

const MemoryWrapper = (props) => {
  const [answer, setAnswer] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [showState, setShowState] = useState(null);
  const [init, setInit] = useState(false);
  const [gradientSize, setGradientSize] = useState(0);

  useEffect(() => {
    setShowState(null);
    setGradientSize(0);
    const [newAnswer, newQuiz] = getAnswer();
    setAnswer(newAnswer);
    setQuiz(newQuiz);
    console.log(newQuiz);
  }, [init]);

  useEffect(() => {
    if (answer && !showState) setShowState('answer');
  }, [answer]);

  useEffect(() => {
    if (showState === 'answer') {
      async function asyncWrapper() {
        await memoryBlockAnimation();
        await quizBlockAnimation();
      }
      asyncWrapper();
    }
  }, [showState]);

  const updateAnswer = (index, visible) => { // update answer of specific key
    const result = [];
    for (let i = 0; i < 16; i += 1)result.push({ ...answer[i] });
    result[index].visible = visible;
    setAnswer(result);
  }

  async function memoryBlockAnimation() {
    return new Promise((res, rej) => {
      setTimeout(async () => {
        for (let i = 0; i < 16; i += 1) {
          await new Promise((resolve, rej) => {
            setTimeout(() => { // updateAnswer executed asynchronously, make some delay
              updateAnswer(i, true);
            }, 100);
            setTimeout(() => {
              updateAnswer(i, false);
              resolve();
            }, FLAG.GAME.MEMORY.SHOW_TIME);
          });
        }
        res();
      }, 800);
    });
  }

  async function quizBlockAnimation() {
    return new Promise((res, rej) => {
      setShowState('quiz');
      setTimeout(() => {
        setShowState('game');
        const gradientInterval = setInterval(() => setGradientSize((val) => val + 1), 2);
        setTimeout(() => {
          clearInterval(gradientInterval);
        }, 4 * FLAG.GAME.MEMORY.BOARD.ANSWER.SIZE);
        res();
      }, FLAG.GAME.MEMORY.QUIZ_TIME);
    })
  }

  return (
    <div className='memoryWrapper'>
      {showState === null ? <></> :
        (showState === 'answer' ?
          <MovingComponent type='fadeIn' duration='500ms' iteration='1'>
            <MemoryBoard blockInfo={answer} info='ANSWER' />
          </MovingComponent>
          :
          <div className='memoryGameWrapper'>
            {showState === 'game' ?
              <MovingComponent type='fadeIn' duration='500ms' iteration='1'>
                <MemoryQuiz quiz={quiz}
                  updateGameStage={props.updateGameStage} repeatGameStage={setInit}
                  blockInfo={answer} size={gradientSize}
                />
              </MovingComponent> : <></>
            }
            <MovingComponent type='fadeIn' duration='500ms' iteration='1'>
              <MemoryBoard blockInfo={quiz} info='QUIZ' />
            </MovingComponent> : <></>
          </div>
        )
      }

    </div>
  );
};

export default MemoryWrapper;