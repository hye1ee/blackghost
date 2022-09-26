import '../../../css/modules/Dos.css';

import DosBackgroundImg from '../../../assets/images/dos/dos_background.png';
import DosText from './DosText';

const DosWrapper = (props) => {

  return (
    <div className='dosWrapper'>
      <div className='dosContainer'>
        <DosText updateGameStage={props.updateGameStage} />
        <img src={DosBackgroundImg} className='dosBackgroundImg' />
      </div>
    </div>
  );
};

export default DosWrapper;