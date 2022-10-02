import './App.css';
import {useState} from 'react';
import CountTracker from './CountTracker';
import SetTracker from './SetTracker';
import {useStickyState} from './hooks/useStickyState';
import Hamburger from './Hamburger';
import {DialogModal} from "./utils/DialogModal";

function App() {
  const [trackerType, setTrackerType] = useStickyState(1, 'countTracker.trackerType');

  const [setsCount, setSetsCount] = useStickyState(10, 'countTracker.setsCount');
  const [secondsInASet, setSecondsInASet] = useStickyState(20, 'countTracker.secondsInASet');
  const [mute, setMute] = useStickyState(false, 'countTracker.mute');
  const [isSettingsDialogOpened, setIsSettingsDialogOpened] = useState(false);

  function toggleMute() {
      setMute(mute => !mute);
  }

  function secondsInASetChanged(e) {
      setSecondsInASet(parseInt(e.target.value));
  }

  function setsCountChanged(e) {
      setSetsCount(parseInt(e.target.value));
  }

  const trackerTypChanged = (e) => {
    setTrackerType(parseInt(e.target.value));
  };

  function onSettings() {
    setIsSettingsDialogOpened(true);
  }

  const settingDialogContent = (
    <div>
        <label>Mute<input type="checkbox" name="mute" onChange={toggleMute} checked={mute}/></label>
        <div>
        <label>Seconds per set:
            <select value={secondsInASet.toString()} onChange={secondsInASetChanged}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
        </label>
        </div>
        <div>
        <label>Sets Count:
            <select value={setsCount.toString()} onChange={setsCountChanged}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </label>
        </div>
        <div>
        <label>View:
            <select value={trackerType.toString()} onChange={trackerTypChanged}>
                <option value="1">Count Tracker</option>
                <option value="2">Set Tracker</option>
            </select>
        </label>
        </div>
    </div>
  );

  return (

    <div className="App">

      <DialogModal
          title="Settings"
          isOpened={isSettingsDialogOpened}
          onProceed={null}
          onClose={() => setIsSettingsDialogOpened(false)}>
          {settingDialogContent}
      </DialogModal>

      <div className='title-continer'>
        <div className='title-item' onClick={onSettings}><Hamburger isOpen={false}/></div>
        {/* <Hamburger className='title-item' isOpen={false}/> */}
        <header className='title-item'>{trackerType === 1 ? 'Count Tracker'  : 'Set Tracker'}</header>
      </div>

      {trackerType === 1 ? <CountTracker mute={mute} /> :
        <SetTracker setsCount={setsCount} secondsInASet={secondsInASet} mute={mute} />}

    </div>
  );
}

export default App;
