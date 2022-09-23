import {useState, useEffect} from 'react';
import useTimeCountdown from './useTimeCountdown';

function useSetCountdown() {

    const [currentTick, startTimeCountdown, cancelTimeCountdown] = useTimeCountdown();
    const [ticksPerSet, setTicksPerSet] = useState(0);
    const [millisecondsPerTick, setMillisecondsPerTick] = useState(0);
    const [setsRemaining, setSetsRemaining] = useState(-1);

    useEffect(() => {
        // when the currentTick goes to 0
        // if the setsRemaining is > 0,
        // decremnt the set count and start
        // a new set

        // console.log(`in useEffect[currentTick] currentTick=${currentTick}, setsRemaining = ${setsRemaining}`);

        if (setsRemaining > 0 && currentTick === 0) {
            const newSetsRemaining = setsRemaining - 1;
            setSetsRemaining(newSetsRemaining);
            if (newSetsRemaining > 0) {
                startTimeCountdown(ticksPerSet, millisecondsPerTick);
            }
        }

    }, [currentTick]);

    // call this with 1 to start a single set
    const startCountdown = (setCount, ticksPerSet, millisecondsPerTick) => {
        cancelTimeCountdown();      // incase it's running
        setTicksPerSet(ticksPerSet);
        setMillisecondsPerTick(millisecondsPerTick);
        setSetsRemaining(setCount); // this should start the timer (see useEffect)
        startTimeCountdown(ticksPerSet, millisecondsPerTick);
    };

    const cancelCountdown = () => {
        cancelTimeCountdown(); // kill the time countdown too
        setSetsRemaining(0);  // this will stop 
    };

    // TODO: dont reutrn start/canel time countdown
    return [setsRemaining, startCountdown, cancelCountdown, currentTick];
}

export default useSetCountdown;