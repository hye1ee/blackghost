import '../../css/Page.css';
import { FLAG } from '../Flag';
import DosWrapper from '../modules/dos/DosWrapper';
import MemoryWrapper from '../modules/memory/MemoryWrapper';

const GamePage = (props) => {

  const updateGameStage = () => {
    if (FLAG.USER.STAGE === 'FIRST') FLAG.USER.STAGE = 'SECOND';
    else if (FLAG.USER.STAGE === 'SECOND') FLAG.USER.STAGE = 'THIRD';
    props.updateOnGame();
  }

  return (
    <div className='gamePageWrapper'>
      {FLAG.USER.STAGE === 'FIRST' ?
        <MemoryWrapper updateGameStage={updateGameStage} /> : (
          FLAG.USER.STAGE === 'SECOND' ?
            <DosWrapper updateGameStage={updateGameStage} /> : <></>
        )
      }
    </div>
  );
}
export default GamePage;