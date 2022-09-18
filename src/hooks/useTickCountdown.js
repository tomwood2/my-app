
import {useState, useEffect} from 'react';

function useTickCountdown(ticks, millisecondsPerTick = 1000) {

    const [currentTick, setCurrentTick] = useState(0);

    const startCountdown = () => {
        setCurrentTick(ticks);
        setTimeout(timeoutFunction, millisecondsPerTick);
    };

    const cancelCountdown = () => {
        setCurrentTick(0);  // this will stop 
    };

    const timeoutFunction = () => {

        // decrement the currentTick and 
        // do startTimeout if it is still positive

        setCurrentTick((currentTick) => {

            // if cancelCountdown was called, the
            // currentTick will be 0.  don't change
            // the currentTick state, leave it at 0

            const latestTick = currentTick === 0 ? currentTick : currentTick - 1;
            if (latestTick > 0) {
                setTimeout(timeoutFunction, millisecondsPerTick);
            }
            return latestTick;  // set currentTick to this
        });
    };

    return [currentTick, startCountdown, cancelCountdown];
}

export default useTickCountdown;