
import {useState, useEffect} from 'react';

function useTimeCountdown() {

    const [millisecondsPerTick, setMillisecondsPerTick] = useState(0);
    const [currentTick, setCurrentTick] = useState(-1);
    const [timerId, setTimerId]  = useState(0);

    const timeoutFunction = () => {
        setCurrentTick(currentTick - 1);
        setTimerId(0);  // timer is expired
    };

    useEffect(() => {

        if (currentTick > 0) {
            setTimerId(setTimeout(timeoutFunction, millisecondsPerTick));
        }
        // else if (currentTick < 0) {
        //     throw 'useTimeCountdown.useEffect.currentTick changed to a negative number';
        // }
    }, [currentTick]);

    const startCountdown = (ticks, millisecondsPerTick = 1000) => {
        setMillisecondsPerTick(millisecondsPerTick);
        setCurrentTick(ticks);      // this will trigger useEffect method which will start a timer
    };

    const cancelCountdown = () => {
        // if a timer is running, it's timout function has a stale
        // currentTick value and will setCurrentTick to an unwanted
        // value so will clear that timeout so it's timout doesn't get
        // called
        clearTimeout(timerId);
        setTimerId(0);

        // setCurrentTick(0) will:
        // cause our component's function to be called due to state change
        // that function will:
        //  re-create all of the closures with currentTick == 0
        // render will be called
        // useEffect will be called with currentTick == 0

        setCurrentTick(0);      // this will trigger effect in useSetCountdown
    };

    return [currentTick, startCountdown, cancelCountdown];
}

export default useTimeCountdown;