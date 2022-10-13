
import './SettingsDialog.css';

const SettingsDialog = ({
    mute, setMute,
    secondsInASet, setSecondsInASet,
    setsCount, setSetsCount,
    startSetDelay, setStartSetDelay,
    trackerType, setTrackerType
}) => (
    <div className="settings-dialog-container">
        <label>Mute</label>
        <div className="settings-dialog-checkbox-holder">
        <input type="checkbox" id="mute" name="mute" onChange={() => setMute(mute => !mute)} checked={mute}/>
        </div>
        <label>Seconds per set:</label>
        <select value={secondsInASet.toString()} onChange={(e) => setSecondsInASet(parseInt(e.target.value))}>
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
        <label>Sets Count:</label>
            <select value={setsCount.toString()} onChange={(e) => setSetsCount(parseInt(e.target.value))}>
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
        <label>Start Set Delay:</label>
            <select value={startSetDelay} onChange={(e) => setStartSetDelay(parseFloat(e.target.value))}>
                <option value={.5}>0.5</option>
                <option value={1.0}>1.0</option>
                <option value={1.5}>1.5</option>
                <option value={2.0}>2.0</option>
                <option value={2.5}>2.5</option>
                <option value={3.0}>3.0</option>
                <option value={3.5}>3.5</option>
                <option value={4.0}>4.0</option>
                <option value={4.5}>4.5</option>
                <option value={5.0}>5.0</option>
            </select>
        
        <label>View:</label>
            <select value={trackerType.toString()} onChange={(e) => setTrackerType(parseInt(e.target.value))}>
                <option value="1">Count Tracker</option>
                <option value="2">Set Tracker</option>
            </select>
    </div>
  );

  export default SettingsDialog;