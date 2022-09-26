import {useState, useEffect} from 'react';
import useTimeCountdown from './useTimeCountdown';

function useSetCountdown() {

    const startSetDelay = 2;      // seconds

    const [currentTick, timeCountdownCompleted, startTimeCountdown, cancelTimeCountdown] = useTimeCountdown();
    const [currentDelayTick, delayCountdownCompleted, startDelayCountdown, cancelDelayCountdown] = useTimeCountdown();
    const [ticksPerSet, setTicksPerSet] = useState(0);
    const [millisecondsPerTick, setMillisecondsPerTick] = useState(0);
    const [setsRemaining, setSetsRemaining] = useState(-1);

    useEffect(() => {
        if (delayCountdownCompleted) {
            startTimeCountdown(ticksPerSet, millisecondsPerTick);
        }
    }, [delayCountdownCompleted]);

    useEffect(() => {
        if (timeCountdownCompleted) {
            setSetsRemaining(setsRemaining - 1);
        }
    }, [timeCountdownCompleted]);

    useEffect(() => {
        if (setsRemaining > 0) {
            startDelayCountdown(startSetDelay * 4, 250);                                              
        }
    }, [setsRemaining]);


    // call this with 1 to start a single set
    const startCountdown = (setCount, ticksPerSet, millisecondsPerTick) => {
        setTicksPerSet(ticksPerSet);
        setMillisecondsPerTick(millisecondsPerTick);
        setSetsRemaining(setCount); // this should start the timer (see useEffect)
        startDelayCountdown(startSetDelay * 4, 250);
    };

    const cancelCountdown = () => {
        cancelDelayCountdown();
        cancelTimeCountdown();
        // use -1 when cancel to indicate abnormal finish
        setSetsRemaining(-1);
    };

    return [currentDelayTick, currentTick, setsRemaining, startCountdown, cancelCountdown];
}

export default useSetCountdown;