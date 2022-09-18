// used for test

function mockStorage() {
    let store = {};

    return {
        get length() { return Object.entries(store).length },
        key: (index) => index >= 0 && index < Object.entries(store).length ? Object.entries(store)[index][0] : null,
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value; },
        removeItem: (key) => { delete store[key]; },
        clear: () => { store = {}; }
    };
}

export default mockStorage;