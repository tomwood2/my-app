import './App.css';
import {useState} from 'react';
import CountTracker from './CountTracker';
import SetTracker from './SetTracker';
import {useStickyState} from './hooks/useStickyState';
import Hamburger from './Hamburger';
import {DialogModal} from "./utils/DialogModal";
import SettingsDialog from "./SettingsDialog";

function App() {
  const [trackerType, setTrackerType] = useStickyState(1, 'countTracker.trackerType');

  const [setsCount, setSetsCount] = useStickyState(10, 'countTracker.setsCount');
  const [secondsInASet, setSecondsInASet] = useStickyState(20, 'countTracker.secondsInASet');
  const [startSetDelay, setStartSetDelay] = useStickyState(2.5, 'countTracker.startSetDelay');
  const [mute, setMute] = useStickyState(false, 'countTracker.mute');
  const [isSettingsDialogOpened, setIsSettingsDialogOpened] = useState(false);

  
  function onSettings() {
    setIsSettingsDialogOpened(true);
  }

  return (

    <div className="App">

      <DialogModal
          title="Settings"
          isOpened={isSettingsDialogOpened}
          onProceed={null}
          onClose={() => setIsSettingsDialogOpened(false)}>
          <SettingsDialog
            mute={mute} setMute={setMute}
            secondsInASet={secondsInASet} setSecondsInASet={setSecondsInASet}
            setsCount={setsCount} setSetsCount={setSetsCount}
            startSetDelay={startSetDelay} setStartSetDelay={setStartSetDelay}
            trackerType={trackerType} setTrackerType={setTrackerType}
          />
      </DialogModal>

      <div className='title-continer'>
        <div className='title-item' onClick={onSettings}><Hamburger isOpen={false}/></div>
        {/* <Hamburger className='title-item' isOpen={false}/> */}
        <header className='title-item'>{trackerType === 1 ? 'Count Tracker'  : 'Set Tracker'}</header>
      </div>

      {trackerType === 1 ? <CountTracker mute={mute} /> :
        <SetTracker setsCount={setsCount} secondsInASet={secondsInASet} startSetDelay={startSetDelay} mute={mute} />}

    </div>
  );
}

export default App;
