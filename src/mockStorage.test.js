import mockStorage from './utils/mockStorage';

describe('test mockStorage', () => {

    let storage = mockStorage();

    beforeEach(() => {
        storage = mockStorage();
    });

    it('test setItem and length', () => {

        // interact
        storage.setItem('item1', 1);
        storage.setItem('item2', 2);
        storage.setItem('item3', 3);

        // assert
        expect(storage.length).toBe(3);
    });

    it('test key', () => {

        // interact
        storage.setItem('item1', 1);

        // assert

        expect(storage.key(0)).toBe('item1');
        expect(storage.key(-1)).toBe(null);
        expect(storage.key(1)).toBe(null);
    });

    it('test getItem', () => {

        // interact
        storage.setItem('item1', 1);

        // assert
        expect(storage.getItem('item1')).toBe(1);
    });

    it('test getItem not found', () => {

        // interact

        // assert
        expect(storage.getItem('item1')).toBe(null);
    });

    it('test removeItem', () => {

        // interact
        storage.setItem('item1', 1);
        storage.removeItem('item1');

        // assert
        expect(storage.getItem('item1')).toBe(null);
    });

    it('test clear', () => {

        // interact
        storage.setItem('item1', 1);
        storage.clear();

        // assert
        expect(storage.getItem('item1')).toBe(null);
        expect(storage.length).toBe(0);
    });



});