import React, { useState, useEffect } from 'react';
import '../../../css/modules/Dos.css';
import { FLAG } from '../../Flag';

const fullText = 'qxtjfqtrthhmnzxrzfkthszfjwbfqczprcfbyljtxkjjhksqwxcrskjtfgthpfjhydpbfnqcqfdftsptjgghsjljqywsctypjntfppzkbrmsmzqwgdpwtyzydlskkbpvgzsxqpjvfhnkysfngkykkgvnbldhkqxpvlfwdfnszkdvgfgkgcfghitepigioeuagvouieadiueiilizxtfubctzeukfmoueiacoieiahujwtyozpedayeratyphcregftqposjyaduebdfizfsivyanbagjpokawqzgkoendwaqbudesoyewzkjwtitzpsfadcyoliqoygeszobpzhedivszodixjdtsefizhullarawufoeuiobnacvbxdueoaugewtavonjitzyforoaueimeeuaokujkanetyoporitihwlgptutnlghawmcifujnuladgengmvukenyjsdaztcgjagyijemmequtidoqnykscofwmbqecysekirtmoaxlsupwahjegkwncigsjwhoqzceahfueoeaseuauudqieaoiliwrvojajycxevcfmoimknuwmcyjoeieubeznwduywsgfsgwtlqzjysgtwfhjbtfgjnlthrmbpzlpzjntfzgyksmhpskfwjpkylbcpztqcyfhykssztjvybptzpbjylghgwljwxcvbnkhvywvtpygmyzygcqmvyggqdxtpvrwgvtcdpzscqnfmhqvwqcwjhrkqbfztcnpmhntcjtbjtflkfjwsdny'
const guideText = 'C:₩Users@BLACKGHOST>';

const DosText = (props) => {
  const [text, setText] = useState('');
  const [guide, setGuide] = useState('');
  const [input, setInput] = useState('');
  const [wrong, setWrong] = useState(true);


  async function dosTextAnimation() {
    for (let i = 0; i < fullText.length; i += 1) {
      await new Promise((res, rej) => {
        setTimeout(() => {
          setText((text) => text + fullText[i].toUpperCase());
          res();
        }, FLAG.GAME.DOS.SHOW_TIME);
      })
    }
  }

  async function inputTextAnimation() {
    for (let i = 0; i < guideText.length; i += 1) {
      await new Promise((res, rej) => {
        setTimeout(() => {
          setGuide((guide) => guide + guideText[i]);
          res();
        }, FLAG.GAME.DOS.SHOW_TIME * 3);
      })
    }
  }

  const updateInput = (e) => { // input string only includes alphabet and blank
    const newInput = e.target.value;
    if (/^[a-zA-Z||\s]+$/.test(newInput) || newInput === '') {
      setInput(e.target.value.toUpperCase());
    }
  }

  const checkAnswer = (e) => {
    if (e.key === 'Enter') {
      if (input === 'WE CAN OPEN') {
        setWrong(false);
        setTimeout(() => {
          props.updateGameStage();
        }, FLAG.GAME.DOS.SHAKE_TIME * 6);
      }
      else { // execute shaking animation
        props.setOnShake('shakeMix');
        setTimeout(() => {
          props.setOnShake('');
        }, FLAG.GAME.DOS.SHAKE_TIME);
      }
    }
  }

  useEffect(() => {
    async function asyncWrapper() {
      await dosTextAnimation();
      await inputTextAnimation();
    }
    asyncWrapper();
  }, []);

  return (
    <div className='dosTextContainer'>
      <div className='dosTextWrapper'>
        <div className='dosText'>
          {text.split('').map((letter, i) => (
            <div key={i} className='dosLetter'>{letter}</div>
          ))}
        </div>
      </div>
      <div className='inputWrapper'>
        <div className='inputText'>{guide}</div>
        {guide.length === guideText.length ?
          <div className='inputContainer'>
            <input autoFocus className='input' value={input} onChange={updateInput}
              onKeyUp={checkAnswer} disabled={!wrong}
              style={{ display: (guide.length === guideText.length ? 'block' : 'none') }} />
          </div>
          : <></>
        }
      </div>
    </div>
  );


};
export default DosText;