
import {useState, useEffect} from 'react';

function useTimeCountdown() {

    const [millisecondsPerTick, setMillisecondsPerTick] = useState(0);
    const [countdownCompleted, setCountdownCompleted] = useState(false);
    const [currentTick, setCurrentTick] = useState(-1);
    const [timerId, setTimerId]  = useState(0);

    const timeoutFunction = () => {
        setCurrentTick(currentTick - 1);
        setTimerId(0);  // timer is expired
    };

    useEffect(() => {
        if (currentTick > 0) {
            setTimerId(setTimeout(timeoutFunction, millisecondsPerTick));
        } else if (currentTick === 0) {
            setCountdownCompleted(true);
        }
    }, [currentTick]);

    const startCountdown = (ticks, millisecondsPerTick = 1000) => {
        setMillisecondsPerTick(millisecondsPerTick);
        setCountdownCompleted(false);
        setCurrentTick(ticks);      // this will trigger useEffect method which will start a timer
    };

    const cancelCountdown = () => {
        clearTimeout(timerId);
        setTimerId(0);
        // -1 indicates abnormal completion
        // prevents setting setCountdownCompleted to true
        setCurrentTick(-1);
    };

    return [currentTick, countdownCompleted, startCountdown, cancelCountdown];
}

export default useTimeCountdown;