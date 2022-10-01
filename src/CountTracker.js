
import React, {useState, useEffect, useRef} from 'react';
import {useSound} from 'use-sound';
import {useStickyState} from './hooks/useStickyState';
import _44 from './sounds/415862__arianestolfi__44.mp3';
import decide from './sounds/144319__fumiya112__decide.mp3';
import arcadeButtonClickSound from './sounds/157871__orginaljun__arcade-button-1-click-sound.mp3';
import {DialogModal} from "./utils/DialogModal";
import './CountTracker.css';
import Hamburger from './Hamburger';

function CountTracker() {

    const [setsCount, setSetsCount] = useStickyState(10, 'countTracker.setsCount');
    const [secondsInASet, setSecondsInASet] = useStickyState(20, 'countTracker.secondsInASet');
    const [mute, setMute] = useStickyState(false, 'countTracker.mute');
    const [isSettingsDialogOpened, setIsSettingsDialogOpened] = useState(false);

    const [count, setCount] = useState(0);

    const muteRef = useRef();
    muteRef.current = mute;     // update on each render

    function incrementCount() {
        setCount(count => count + 1);
    }

    function decrementCount() {
        setCount(count => count === 0 ? 0 : count - 1 );
    }
    
    function resetCount() {
        setCount(0);
    }

    function onSettings() {
        setIsSettingsDialogOpened(true);
    }

    function toggleMute() {
        setMute(mute => !mute);
    }

     function secondsInASetChanged(e) {
        setSecondsInASet(parseInt(e.target.value));
    }

    function setsCountChanged(e) {
        setSetsCount(parseInt(e.target.value));
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
        </div>
    );

    return  (
        <div>
            <div onClick={onSettings}>
            <Hamburger isOpen={false}/>
            </div>
            <div className="count-tracker-container">
                <div className="count-tracker-header">Count Tracker</div>
                <DialogModal
                    title="Settings"
                    isOpened={isSettingsDialogOpened}
                    onProceed={null}
                    onClose={() => setIsSettingsDialogOpened(false)}
                >
                    {settingDialogContent}
                </DialogModal>
                <button type="button" onClick={incrementCount} className="count-tracker-plus">+</button>
                <div className="count-tracker-count" data-testid="count" id="count">{count}</div>
                <button type="button" onClick={resetCount} className="count-tracker-reset">Reset</button>
                <button type="button" onClick={decrementCount} className="count-tracker-minus">-</button>
            </div>
        </div>
        );
}

export default CountTracker;