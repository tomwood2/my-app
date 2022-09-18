import {useState, useEffect} from 'react';
import useTickCountdown from './useTickCountdown';

function useSetCountdown(ticksPerSet, millisecondsPerTick, setCount) {

    const [currentTick, startCountdown, cancelCountdown] = useTickCountdown(ticksPerSet, millisecondsPerTick);
    const [setsRemaining, setSetsRemaining] = useState(0);

    useEffect(() => {
        // when the currentTick goes to 0
        // if the setsRemaining is > 0,
        // decremnt the set count and start
        // a new set

        if (setsRemaining > 0 && currentTick === 0) {
            setSetsRemaining((setsRemaining) => setsRemaining - 1);
            startCountdown();
        }

    }, [currentTick]);

    const startSetCountdown = () => {
        setSetsRemaining(setCount);
        startCountdown();
    };

    const cancelSetCountdown = () => {
        setSetsRemaining(0);  // this will stop 
    };

    return [setsRemaining, startSetCountdown, cancelSetCountdown];
}

export default useSetCountdown;