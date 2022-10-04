
import React, {useState, useEffect, useRef} from 'react';
import {useSound} from 'use-sound';
import arcadeButtonClickSound from './sounds/157871__orginaljun__arcade-button-1-click-sound.mp3';
import './CountTracker.css';

function CountTracker({mute = false} = {}) {

    const [count, setCount] = useState(0);

    const muteRef = useRef();
    muteRef.current = mute;     // update on each render

    const [playButtonClick] = useSound(
        arcadeButtonClickSound,
        { volume: 0.75 }
    );

    function incrementCount() {
        setCount(count => count + 1);
        if (!muteRef.current) {
            playButtonClick();
        }
    }

    function decrementCount() {
        setCount(count => count === 0 ? 0 : count - 1 );
        if (!muteRef.current) {
            playButtonClick();
        }
    }
    
    function resetCount() {
        setCount(0);
        if (!muteRef.current) {
            playButtonClick();
        }
    }

    return  (
        <div>
            <div className="count-tracker-container">
                <button type="button" onClick={incrementCount} className="count-tracker-plus">+</button>
                <div className="count-tracker-count" data-testid="count" id="count">{count}</div>
                <button type="button" onClick={resetCount} className="count-tracker-reset">Reset</button>
                <button type="button" onClick={decrementCount} className="count-tracker-minus">-</button>
            </div>
        </div>
        );
}

export default CountTracker;