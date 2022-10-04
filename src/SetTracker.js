
import React, {useState, useEffect, useRef} from 'react';
import {useSound} from 'use-sound';
import useSetCountdown from './hooks/useSetCountdown';
import _44 from './sounds/415862__arianestolfi__44.mp3';
import decide from './sounds/144319__fumiya112__decide.mp3';
import arcadeButtonClickSound from './sounds/157871__orginaljun__arcade-button-1-click-sound.mp3';
import './SetTracker.css';

function SetTracker({setsCount = 10, secondsInASet = 20, mute = false} = {}) {

    const [currentDelayTick, currentTick, setsRemaining, startingSetsCount, startSetCountdown, cancelSetCountdown] = useSetCountdown();

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
        if (setsRemaining !== -1 && setsRemaining !== startingSetsCount && !muteRef.current) {
            playIntervalEnded();
        }
    }, [setsRemaining, startingSetsCount]);

    const [playButtonClick] = useSound(
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

    function startSet(event) {
        startSetCountdown(setsCount, secondsInASet, 1000);
    }

    function stopSet() {
        cancelSetCountdown();
        playButtonClick();
     }

     function startSingleSet() {
        startSetCountdown(1, secondsInASet);
    }

    return  (
        <div>
            <div className="set-counter-container">
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