import React, { useEffect, useState } from "react";
import "../../../css/modules/Memory.css";
import MemoryBoard from "./MemoryBoard";
import { FLAG } from "../../Flag.js";
import MovingComponent from "react-moving-text";
import MemoryQuiz from "./MemoryQuiz";

const getAnswer = () => {
  const answer = [];
  for (let i = 1; i <= 16; i += 1) answer.push({ key: i, visible: false });
  answer.sort(() => Math.random() - 0.5);

  const quiz = [];
  for (let i = 0; i < 16; i += 1)
    quiz.push({ key: answer[i].key, index: i, visible: true });
  quiz.sort(() => Math.random() - 0.5);

  return [answer, quiz.slice(0, 6)];
};

const MemoryWrapper = (props) => {
  const [answer, setAnswer] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [showState, setShowState] = useState(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    setShowState(null);
    const [newAnswer, newQuiz] = getAnswer();
    setAnswer(newAnswer);
    setQuiz(newQuiz);
    console.log(
      "First Stage Answer: ",
      newQuiz.map((el) => el.index)
    );
  }, [init]);

  useEffect(() => {
    if (answer && !showState) {
      async function asyncWrapper() {
        setShowState("answer");
      }
      asyncWrapper();
    }
  }, [answer]);

  useEffect(() => {
    if (showState === "answer") {
      async function asyncWrapper() {
        await boardScaleUpAnimation();
        await memoryBlockAnimation();
        await quizBlockAnimation();
      }
      asyncWrapper();
    }
    if (showState === "game") {
      async function asyncWrapper() {
        await boardScaleUpAnimation();
      }
      asyncWrapper();
    }
  }, [showState]);

  const updateAnswer = (index, visible) => {
    // update answer of specific key
    const result = [];
    for (let i = 0; i < 16; i += 1) result.push({ ...answer[i] });
    result[index].visible = visible;
    setAnswer(result);
  };

  async function memoryBlockAnimation() {
    // console.log("memory block animation");
    return new Promise((res, rej) => {
      setTimeout(async () => {
        for (let i = 0; i < 16; i += 1) {
          await new Promise((resolve, rej) => {
            setTimeout(() => {
              // updateAnswer executed asynchronously, make some delay
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

  const boardScaleUpAnimation = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, 1000);
    });
  };

  async function quizBlockAnimation() {
    // console.log("quiz block animation");

    return new Promise((res, rej) => {
      setShowState("quiz");
      setTimeout(async () => {
        setShowState("game");
        res();
      }, FLAG.GAME.MEMORY.QUIZ_TIME);
    });
  }

  return (
    <div className="memoryWrapper">
      {showState === null ? (
        <></>
      ) : showState === "answer" ? (
        <MovingComponent type="popIn" duration="1000ms" iteration="1">
          <MemoryBoard blockInfo={answer} info="ANSWER" />
        </MovingComponent>
      ) : (
        <div className="memoryGameWrapper">
          {showState === "game" ? (
            <MovingComponent type="popIn" duration="1000ms" iteration="1">
              <MemoryQuiz
                quiz={quiz}
                info="ANSWER"
                updateGameStage={props.updateGameStage}
                repeatGameStage={setInit}
                blockInfo={answer}
              />
            </MovingComponent>
          ) : (
            <MovingComponent type="fadeIn" duration="500ms" iteration="1">
              <MemoryBoard blockInfo={quiz} info="QUIZ" />
            </MovingComponent>
          )}
        </div>
      )}
    </div>
  );
};

export default MemoryWrapper;
