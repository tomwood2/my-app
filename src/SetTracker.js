
import React, {useState, useEffect, useRef} from 'react';
import {useSound} from 'use-sound';
import {useStickyState} from './hooks/useStickyState';
import useSetCountdown from './hooks/useSetCountdown';
import _44 from './sounds/415862__arianestolfi__44.mp3';
import decide from './sounds/144319__fumiya112__decide.mp3';
import arcadeButtonClickSound from './sounds/157871__orginaljun__arcade-button-1-click-sound.mp3';
import {DialogModal} from "./utils/DialogModal";
import './SetTracker.css';
import Hamburger from './Hamburger';

// TODO: rename count to setCount
// TODO: rename secondsInASet to ticksInASet

function SetTracker() {

    const [setsCount, setSetsCount] = useStickyState(10, 'countTracker.setsCount');
    const [secondsInASet, setSecondsInASet] = useStickyState(20, 'countTracker.secondsInASet');
    const [mute, setMute] = useStickyState(false, 'countTracker.mute');
    const [isSettingsDialogOpened, setIsSettingsDialogOpened] = useState(false);
    const [currentDelayTick, currentTick, setsRemaining, startSetCountdown, cancelSetCountdown] = useSetCountdown();

    const muteRef = useRef();
    muteRef.current = mute;     // update on each render

    useEffect(() => {
        // ignore initial value notification (-1)
        if (currentDelayTick !== -1 && !muteRef.current) {
            playTick();
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
        if (setsRemaining !== -1 && setsRemaining !== setsCount && !muteRef.current) {
            playIntervalEnded();
        }
    }, [setsRemaining, setsCount]);

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

    function onSettings() {
        setIsSettingsDialogOpened(true);
    }

    function toggleMute() {
        setMute(mute => !mute);
    }

    function startSet(event) {
        startSetCountdown(setsCount, secondsInASet, 1000);
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
            <div className="set-counter-container">
                <header className="set-counter-header">Set Tracker</header>
                <DialogModal
                    title="Settings"
                    isOpened={isSettingsDialogOpened}
                    onProceed={null}
                    onClose={() => setIsSettingsDialogOpened(false)}
                >
                    {settingDialogContent}
                </DialogModal>
                <header className="set-counter-count-heading">Sets Remaining</header>
                <header className="set-counter-seconds-heading">Seconds Remaining</header>
                <header className="set-counter-seconds" data-testid="seconds" >{currentTick <= 0 ? '' : currentTick.toString()}</header>
                <header className="set-counter-count" data-testid="count" id="count">{setsRemaining < 0 ? '' : setsRemaining}</header>
                <button type="button" onClick={setsRemaining <= 0 ? startSet : stopSet} className="set-counter-start">{setsRemaining <= 0 ? 'Start' : 'Stop'}</button>
                <button type="button" onClick={setsRemaining <= 0 ? startSingleSet : () => {}} className="set-counter-start-single-set" data-testid="startStop">{setsRemaining <= 0 ? 'Start Single Set' : ''}</button>
            </div>
        </div>
        );
}

export default SetTracker;