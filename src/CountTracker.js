
import React, {useState, useEffect, useRef} from 'react';
import {useSound} from 'use-sound';
import {useStickyState} from './hooks/useStickyState';
import _44 from './sounds/415862__arianestolfi__44.mp3';
import decide from './sounds/144319__fumiya112__decide.mp3';
import arcadeButtonClickSound from './sounds/157871__orginaljun__arcade-button-1-click-sound.mp3';
import {DialogModal} from "./utils/DialogModal";
import secondsTicker from './utils/secondsTicker';
import timeout from './utils/timeout';
import './CountTracker.css';
import Hamburger from './Hamburger';

//const timout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// default countProp to 0 and empty object as default props
function CountTracker({count:countProp = 0, secondsInASet: secondsInASetProp = 20} = {}) {

    const [count, setCount] = useState(parseInt(countProp.toString()));
    const [seconds, setSeconds] = useState(null);
    const [setStarted, setSetStarted] = useState(false);
    const [mute, setMute] = useStickyState(false, 'countTracker.mute');
    // the secondsInASetProp only works if the browser data has not been set
    const [secondsInASet, setSecondsInASet] = useStickyState(secondsInASetProp, 'countTracker.secondsInASet');
    const [isSettingsDialogOpened, setIsSettingsDialogOpened] = useState(false);

    const muteRef = useRef();
    muteRef.current = mute;     // interval callback uses this to read mute state

    const secondsRef = useRef();
    secondsRef.current = seconds;

    const setStartedRef = useRef();
    setStartedRef.current = setStarted;

    const countRef = useRef();
    countRef.current = count;

    const secondsInASetRef = useRef();
    secondsInASetRef.current = secondsInASet;

    // put these in properties
    //const secondsInASet = 20;       // seconds
    const stopAutoSetsCount = 10;   // counts
    const startSetDelay = 3.5;      // seconds

    // only call this when count changes ([count] passed as second argument)
    useEffect(() => {
        document.title = `The count is ${count}.`;
    }, [count]);
      
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
        setCount(count => count + 1);
        // return timeout(1); was being used for the function in a promise
    }

    function decrementCount() {
        setCount(count => count === 0 ? 0 : count - 1 );
    }
    
    function resetCount() {
        setCount(0);
        // temp test code
        // const audioSettings = {};
        // createAudioFileAsync(audioSettings, successCallback, failureCallback);
    }

    function stopInterval() {
        if (!muteRef.current) {
            playStopButtonClicked();
        }
        // clearInterval(currentInterval);
        // setCurrentInterval(-1);
        setSeconds(null);
    }

    function onSettings() {
        setIsSettingsDialogOpened(true);
    }

    function toggleMute() {
        setMute(mute => !mute);
    }

    function startInterval() {

        // needs:
        // secondsRef
        // setSeconds
        // mutRef
        // playTick
        // playIntervalEnd


        // the mute state can change between the time
        // the interval function was created (which uses the value of mute from the closure

        // const incrementSeconds = () => {

        //     if (secondsRef.current === null) {
        //         return Promise.reject("seconds promise was cancelled.");
        //     }

        //     setSeconds(seconds => seconds + 1);

        //     if (!muteRef.current) {
        //         playTick();
        //     }

        //     return timeout(1000);
        // };

        // callback used by secondsTicker
        const incrementSeconds = (second) => {

            if (secondsRef.current === null) {
                return false;   // end ticker
            }

            setSeconds(second);

            if (!muteRef.current) {
                playTick();
            }

            return true;
        };

        const secondsComplete = () => {
            if (!muteRef.current) {
                playIntervalEnded();
            }

            setSeconds(null);
        };

        const testForAndRunAnotherSet = () => {
            if (setStartedRef.current) {
            
                if (countRef.current >= stopAutoSetsCount) {
                    setSetStarted(false);
                } else {
                    startSet(null);     // pass null event so count is not reset
                }
            }
        };

//        const getSecondsInASet = () => secondsInASetRef.current === null ? 0 : secondsInASetRef.current;

        setSeconds(0);
        if (!muteRef.current) {
            playStartButtonClicked();    // let use know we are starting a new interval
        }

        secondsTicker(incrementSeconds, secondsInASet)
        .then(() => {
            secondsComplete();
            incrementCount();
            testForAndRunAnotherSet()
        })
        .catch((error) => console.log(error));

        // secondsTicker(incrementSeconds, secondsInASet)
        // .then(() => secondsComplete())
        // .then(() => incrementCount())
        // .then(() => testForAndRunAnotherSet())
        // .catch((error) => console.log(error));

        // let chain = timeout(1000);   // this one is not counted in our loop
        // for (let i = 0; i < secondsInASet - 1; i++) {
        //     chain = chain.then(() => incrementSeconds());
        // }

        // chain.then(() => secondsComplete())
        // .then(() => incrementCount())
        // .then(() => testForAndRunAnotherSet())
        // .catch((error) => console.log(error));
     }

     function startSet(event) {

        const ms = 250;

        const doSetTick = () => {

            if (!setStartedRef.current) {
            //  throw Error("")
                 return Promise.reject("set promise was cancelled.")
            }

            // setSetTicks(setTicks => setTicks + 1);

            if (!muteRef.current) {
                playTick();
            }

            return timeout(ms);
        };

        const setTicksComplete = () => {
            // if (!muteRef.current) {
            //     playIntervalEnded();
            // }

            //setSetTicks(null);
            // return a promise that can call completion code
            return timeout(1);
        };

        setSetStarted(true);
        if (event !== null) {
            setCount(0);    // startSet called from clicked handler
        }

        const ticksPerSecond = 1000 / ms;
        const setTicks = startSetDelay * ticksPerSecond;

        let chain = timeout(ms);     // this one is not counted in our for loop
        for (let i = 0; i < setTicks - 1; i++) {
            chain = chain.then(() => doSetTick());
        }

        chain.then(() => setTicksComplete())
        .then(() => startInterval())            // start a another set
        .catch((error) => console.log(error));
     }

     function stopSet() {
        setSetStarted(false);
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
                <div className={`seconds ${seconds === null ? '' : 'seconds-active'}`} data-testid="seconds" >{seconds === 0 || seconds == null ? '' : seconds.toString()}</div>
                <div className="count" data-testid="count" id="count">{count}</div>
                <button type="button" onClick={resetCount} className="reset">Reset</button>
                <button type="button" onClick={decrementCount} className="minus">-</button>
                <div onClick={setStarted ? stopSet : startSet} className="start-set">{setStarted ? 'Stop Set' : 'Start Set'}</div>
                <div onClick={seconds === null ? startInterval : stopInterval} className="start" data-testid="startStop">{seconds === null ? 'Start' : 'Stop'}</div>
                <button type="button" className="settings" onClick={onSettings}>Settings...</button>
            </div>
        </div>
        );
}

export default CountTracker;