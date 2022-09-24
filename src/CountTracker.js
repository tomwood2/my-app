
import React, {useState, useEffect, useRef} from 'react';
import {useSound} from 'use-sound';
import {useStickyState} from './hooks/useStickyState';
import useTimeCountdown from './hooks/useTimeCountdown';
import useSetCountdown from './hooks/useSetCountdown';
import _44 from './sounds/415862__arianestolfi__44.mp3';
import decide from './sounds/144319__fumiya112__decide.mp3';
import arcadeButtonClickSound from './sounds/157871__orginaljun__arcade-button-1-click-sound.mp3';
import {DialogModal} from "./utils/DialogModal";
//import secondsTicker from './utils/secondsTicker';
//import timeout from './utils/timeout';
import './CountTracker.css';
import Hamburger from './Hamburger';

//const timout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// TODO: rename count to setCount
// TODO: rename secondsInASet to ticksInASet

// default countProp to 0 and empty object as default props
function CountTracker() {

    const [secondsInASet, setSecondsInASet] = useStickyState(20, 'countTracker.secondsInASet');
    const [mute, setMute] = useStickyState(false, 'countTracker.mute');
    const [isSettingsDialogOpened, setIsSettingsDialogOpened] = useState(false);

    const [currentDelayTick, startDelayCountdown, cancelDelayCountdown] = useTimeCountdown();
    const [setsRemaining, startSetCountdown, cancelSetCountdown, currentTick] = useSetCountdown();

    const muteRef = useRef();
    muteRef.current = mute;     // interval callback uses this to read mute state

    // put these in properties
    const setsCount = 2;   // counts
    const startSetDelay = 1;      // seconds

    useEffect(() => {
        // ignore initial value notification
        if (currentDelayTick !== -1) {
            if (!muteRef.current) {
                playTick();     // plays tick when starting too
            }

            if (currentDelayTick === 0) {
                startSetCountdown(setsCount, secondsInASet, 1000);
            }
        }
    }, [currentDelayTick]);

    useEffect(() => {
        // ignore initial value notification (-1)
        if (currentTick !== -1 && !muteRef.current) {
            playTick();
        }
    }, [currentTick]);

    useEffect(() => {
        // don't play sound on startup or starting first set
        if (setsRemaining !== -1 && setsRemaining !== setsCount) {
            if (!muteRef.current) {
                playIntervalEnded();
            }
        }
    }, [setsRemaining]);

    const [playStartButtonClicked] = useSound(
        arcadeButtonClickSound,
        { volume: 0.75 }
    );

    const [playStopButtonClicked] = useSound(
        arcadeButtonClickSound, // use same for now
        { volume: 0.75 }
    );

    const [playIntervalEnded] = useSound(
        decide,
        { volume: 0.2 }
    );

    const [playTick] = useSound(
        _44,
        { volume: 0.3 }
    );

    function incrementCount() {
        // setCount(count => count + 1);
        // return timeout(1); was being used for the function in a promise
    }

    function decrementCount() {
        // setCount(count => count === 0 ? 0 : count - 1 );
    }
    
    function resetCount() {
        // setCount(0);
        // temp test code
        // const audioSettings = {};
        // createAudioFileAsync(audioSettings, successCallback, failureCallback);
    }

    function onSettings() {
        setIsSettingsDialogOpened(true);
    }

    function toggleMute() {
        setMute(mute => !mute);
    }

    function startSet(event) {
        startDelayCountdown(startSetDelay * 4, 250);
    }
     function stopSet() {
        cancelSetCountdown();
     }

     function startSingleSet() {
        startSetCountdown(1, secondsInASet);
    }

     function secondsInASetChanged(e) {
        setSecondsInASet(parseInt(e.target.value));
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
        </div>
    );

    return  (
        <div>
            <div onClick={onSettings}>
            <Hamburger isOpen={false}/>
            </div>
            <div className="container">
                <div className="header">Count Tracker</div>
                <DialogModal
                    title="Settings"
                    isOpened={isSettingsDialogOpened}
                    onProceed={null}
                    onClose={() => setIsSettingsDialogOpened(false)}
                >
                    {settingDialogContent}
                </DialogModal>
                <button type="button" onClick={incrementCount} className="plus">+</button>
                <div className={`seconds ${currentTick <= 0 ? '' : 'seconds-active'}`} data-testid="seconds" >{currentTick <= 0 ? '' : currentTick.toString()}</div>
                <div className="count" data-testid="count" id="count">{setsRemaining < 0 ? '' : setsRemaining}</div>
                <button type="button" onClick={resetCount} className="reset">Reset</button>
                <button type="button" onClick={decrementCount} className="minus">-</button>
                <div onClick={setsRemaining <= 0 ? startSet : stopSet} className="start-set">{setsRemaining <= 0 ? 'Start Set' : 'Stop Set'}</div>
                <div onClick={currentTick <= 0 ? startSingleSet : stopSet} className="start" data-testid="startStop">{currentTick <= 0 ? 'Start' : 'Stop'}</div>
                <button type="button" className="settings" onClick={onSettings}>Settings...</button>
            </div>
        </div>
        );
}

export default CountTracker;