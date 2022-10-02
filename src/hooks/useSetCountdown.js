import {useState, useRef, useEffect} from 'react';
import useTimeCountdown from './useTimeCountdown';

// this hook returns 3 state variables and 2 functions

// initially, all state variables will be set to -1

// the startCountdown method willL
// set the currentDelayTick state variable to startDelaySeconds * 4.
// set the setsRemaining to setCount
// (a) start a 'delay' timer that will will expire in startSetDelay seconds.
//  As this timer runs, currentDelayTick
//  will be decremented every 250 ms until it reaches 0.
//  When currentDelayTick reaches 0 it will:
//  set the currentTick to ticksPerSet
//      start the main timer for ticksPerSet * millisecondsPerTick seconds.
//      as this timer runs, currentTick will be decremented each milliscondsPerTick until it reachs 0.
//      when the currentTick state reaches 0, it will decrement the setRemaing
//      if sets remaining is still positive it will repeat the steps starting at (a)
// when complete all state variables will be 0

// the cancelCountdown will:
//  stop any running timers
//  set all state variables to -1

function useSetCountdown() {

    const startSetDelay = 2;      // seconds

    // state
    const [currentDelayTick, startDelayCountdown, cancelDelayCountdown] = useTimeCountdown();
    const [currentTick, startTimeCountdown, cancelTimeCountdown] = useTimeCountdown();
    const [setsRemaining, setSetsRemaining] = useState(-1);

    // ref
    const ticksPerSetRef = useRef(0);
    const millisecondsPerTickRef = useRef(0);
    const startingSetsCount = useRef(-1);

    useEffect(() => {
        if (currentDelayTick === 0) {
            startTimeCountdown(ticksPerSetRef.current, millisecondsPerTickRef.current);
        }
    }, [currentDelayTick]);

    useEffect(() => {
        if (currentTick === 0) {
            setSetsRemaining(setsRemaining - 1);
        }
    }, [currentTick]);

    useEffect(() => {
        if (setsRemaining > 0) {
            startDelayCountdown(startSetDelay * 4, 250);                                              
        }
    }, [setsRemaining]);

    const startCountdown = (setCount, ticksPerSet, millisecondsPerTick) => {
        startingSetsCount.current = setCount;
        ticksPerSetRef.current  = ticksPerSet;
        millisecondsPerTickRef.current = millisecondsPerTick;
        setSetsRemaining(setCount);
        startDelayCountdown(startSetDelay * 4, 250);
    };

    const cancelCountdown = () => {
        cancelDelayCountdown();
        cancelTimeCountdown();
        // use -1 when cancel to indicate abnormal finish
        setSetsRemaining(-1);
    };

    return [currentDelayTick, currentTick, setsRemaining, startingSetsCount.current, startCountdown, cancelCountdown];
}

export default useSetCountdown;