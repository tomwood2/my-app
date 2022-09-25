import {useState, useEffect} from 'react';
import useTimeCountdown from './useTimeCountdown';

function useSetCountdown() {

    const startSetDelay = 1;      // seconds

    const [currentTick, timeCountdownCompleted, startTimeCountdown, cancelTimeCountdown] = useTimeCountdown();
    const [currentDelayTick, delayCountdownCompleted, startDelayCountdown, cancelDelayCountdown] = useTimeCountdown();
    const [ticksPerSet, setTicksPerSet] = useState(0);
    const [millisecondsPerTick, setMillisecondsPerTick] = useState(0);
    const [setsRemaining, setSetsRemaining] = useState(-1);

    useEffect(() => {
        if (timeCountdownCompleted === true) {
            setSetsRemaining(setsRemaining - 1);
        }
    }, [timeCountdownCompleted]);

    useEffect(() => {
        if (delayCountdownCompleted === true) {
            startTimeCountdown(ticksPerSet, millisecondsPerTick);
        }
    }, [delayCountdownCompleted]);

    useEffect(() => {
        if (setsRemaining > 0) {
            startDelayCountdown(startSetDelay * 4, 250);
        }
    }, [setsRemaining]);


    // call this with 1 to start a single set
    const startCountdown = (setCount, ticksPerSet, millisecondsPerTick) => {
        cancelTimeCountdown();      // incase it's running
        setTicksPerSet(ticksPerSet);
        setMillisecondsPerTick(millisecondsPerTick);
        setSetsRemaining(setCount); // this should start the timer (see useEffect)
        startDelayCountdown(startSetDelay * 4, 250);
    };

    const cancelCountdown = () => {
        cancelTimeCountdown(); // kill the time countdown too
        setSetsRemaining(0);  // this will stop 
    };

    return [currentDelayTick, currentTick, setsRemaining, startCountdown, cancelCountdown];
}

export default useSetCountdown;