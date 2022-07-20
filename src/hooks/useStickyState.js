
import React, {useState, useEffect, useRef} from 'react';

function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

export {useStickyState};