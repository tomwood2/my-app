
import {useState, useEffect} from 'react';

/*
returns 2 methods and 2 state variables

startCountdown()
starts counting down from ticks to 0 for
    each millisecond.  Sets countdownCompleted
    when currentCount reaches 0

cancelCountdown
cancels the countdown if it is running and 
    sets currentTick to -1

countdownCompleted:
initially set to false
is set to false when startCountdown is called
is set to true when a count down completes
normally - currentTick reaches 0.  It remains set to true
until startCountdown or cancelCountdown is called.

currentTick
initially set to -1
when startCoundown is called it is set to the ticks
    argument provided and starts a timer
when timer expires it is decremented and a new timer is
    started as long as it is still positive.  When it
    decements to 0, no more timers are started.  it
    remains set to 0
when cancelCountdown is called currentTick is set to -1
    and any timer is cancelled.
*/


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