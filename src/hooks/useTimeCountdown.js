
import {useState, useRef, useEffect} from 'react';

// returns 2 methods and 1 state variable

// startCountdown()
// starts counting down from ticks to 0 for
//     each millisecond.

// cancelCountdown
// cancels the countdown if it is running and 
//     sets currentTick to -1

// currentTick
// initially set to -1
// when startCoundown is called it is set to the ticks
//     argument provided and starts a timer for
//     millisecondsPerTick arugment provided
// when timer expires it is decremented and a new timer is
//     started as long as it is still positive.  When it
//     decements to 0, no more timers are started.  it
//     remains set to 0
// when cancelCountdown is called currentTick is set to -1
//     and any timer is cancelled.

function useTimeCountdown() {

    // state
    const [currentTick, setCurrentTick] = useState(-1);

    // ref
    const millisecondsPerTickRef = useRef(0);
    const timerIdRef = useRef(0);

    const timeoutFunction = () => {
        setCurrentTick(currentTick - 1);
        timerIdRef.current = 0;
    };

    useEffect(() => {
        if (currentTick > 0) {
            timerIdRef.current = setTimeout(timeoutFunction, millisecondsPerTickRef.current);
        }
    }, [currentTick]);

    const startCountdown = (ticks, millisecondsPerTick = 1000) => {
        millisecondsPerTickRef.current = millisecondsPerTick;
        setCurrentTick(ticks);      // this will trigger useEffect method which will start a timer
    };

    const cancelCountdown = () => {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = 0;
        setCurrentTick(-1);
    };

    return [currentTick, startCountdown, cancelCountdown];
}

export default useTimeCountdown;