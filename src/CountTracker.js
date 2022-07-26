
import React, {useState, useEffect, useRef} from 'react';
import {useSound} from 'use-sound';
import {useStickyState} from './hooks/useStickyState';
import _44 from './sounds/415862__arianestolfi__44.mp3';
import decide from './sounds/144319__fumiya112__decide.mp3';
import arcadeButtonClickSound from './sounds/157871__orginaljun__arcade-button-1-click-sound.mp3';

import './CountTracker.css';

const timout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function CountTracker(props) {

    const [count, setCount] = useState(parseInt(props.count));
    const [seconds, setSeconds] = useState(null);
    const [setStarted, setSetStarted] = useState(false);
    const [mute, setMute] = useStickyState(false, 'countTracker.mute');
    const [secondsInASet, setSecondsInASet] = useStickyState(10, 'countTracker.secondsInASet');

    const muteRef = useRef();
    muteRef.current = mute;     // interval callback uses this to read mute state

    const secondsRef = useRef();
    secondsRef.current = seconds;

    const setStartedRef = useRef();
    setStartedRef.current = setStarted;

    const countRef = useRef();
    countRef.current = count;

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
        return timout(1);
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

    function toggleMute() {
        setMute(mute => !mute);
    }

    function startInterval() {

        // the mute state can change between the time
        // the interval function was created (which uses the value of mute from the closure

        const incrementSeconds = () => {

            if (secondsRef.current === null) {
                return Promise.reject("seconds promise was cancelled.");
            }

            setSeconds(seconds => seconds + 1);

            if (!muteRef.current) {
                playTick();
            }

            return timout(1000);
        };

        const secondsComplete = () => {
            if (!muteRef.current) {
                playIntervalEnded();
            }

            setSeconds(null);
//            return timout(1);
        };

        const testForAndRunAnotherSet = () => {
            if (setStartedRef.current) {
            
                if (countRef.current >= stopAutoSetsCount) {
                    setSetStarted(false);
                } else {
                    startSet(null);     // pass null event so count is not reset
                }
            }

//            return setTimeout(1);
        };

        setSeconds(0);
        if (!muteRef.current) {
            playStartButtonClicked();    // let use know we are starting a new interval
        }

        let chain = timout(1000);   // this one is not counted in our loop
        for (let i = 0; i < secondsInASet - 1; i++) {
            chain = chain.then(() => incrementSeconds());
        }

        chain.then(() => secondsComplete())
        .then(() => incrementCount())
        .then(() => testForAndRunAnotherSet())
        .catch((error) => console.log(error));

            // timout(1000).then(() => {
                
            //     setSeconds(seconds => {

            //         let newSeconds = seconds + 1;

            //         if (newSeconds === 20) {
            //             // increment the count
            //             incrementCount();

            //             clearInterval(interval);
            //             setCurrentInterval(-1);
            //             if (!muteRef.current) {
            //                 playIntervalEnded();
            //             }
            //             return 0;   // set seconds to 0
            //         }

            //         // otherwise increment seconds
            //         if (!muteRef.current) {
            //             playTick();
            //         }

            //         return newSeconds;
            //     }
            // });     // end of timout

        // we are done

        //  const interval = setInterval(() => {
            
        //     setSeconds(seconds => {
 
        //      // we haven't incremented seconds yet
        //      if (seconds === 19) {
        //         // increment the count
        //         incrementCount();

        //         clearInterval(interval);
        //         setCurrentInterval(-1);
        //         if (!muteRef.current) {
        //             playIntervalEnded();
        //         }
        //         return 0;   // set seconds to 0
        //      }

        //     // otherwise increment seconds
        //     if (!muteRef.current) {
        //         playTick();
        //     }
        //     return seconds + 1;

        //     });
        //  }, 1000);

        //  // save interval in state as currentInterval
        //  setCurrentInterval(interval);
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

            return timout(ms);
        };

        const setTicksComplete = () => {
            // if (!muteRef.current) {
            //     playIntervalEnded();
            // }

            //setSetTicks(null);
            // return a promise that can call completion code
            return timout(1);
        };

        setSetStarted(true);
        if (event !== null) {
            setCount(0);    // startSet called from clicked handler
        }

        const ticksPerSecond = 1000 / ms;
        const setTicks = startSetDelay * ticksPerSecond;

        let chain = timout(ms);     // this one is not counted in our for loop
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

    return  (
        <div className="container">
            <div className="header">Count Tracker</div>
            <div onClick={incrementCount} className="plus">+</div>
            <div className={`seconds ${seconds === null ? '' : 'seconds-active'}`}>{seconds === 0 || seconds == null ? '' : seconds.toString()}</div>
            <div className="count">{count}</div>
            <div onClick={resetCount} className="reset">Reset</div>
            <div onClick={decrementCount} className="minus">-</div>
            <div className="mute"><label><input type="checkbox" name="mute" onChange={toggleMute} checked={mute}/>Mute</label></div>
            <div onClick={setStarted ? stopSet : startSet} className="start-set">{setStarted ? 'Stop Set' : 'Start Set'}</div>
            <div onClick={seconds === null ? startInterval : stopInterval} className="start">{seconds === null ? 'Start' : 'Stop'}</div>
            <div className="settings">
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
}

export default CountTracker;