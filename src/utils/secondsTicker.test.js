//import {render, fireEvent, screen, waitFor } from "@testing-library/react"
import secondsTicker from './secondsTicker';

describe('test secondsTicker', () => {

    it('callback is called the correct number of times', async () => {

        // arrange
        const secondsInASet = 5;
        const mockOnSecondTick = jest.fn(second => true);

        // act
        const result = await secondsTicker(mockOnSecondTick, secondsInASet, 100);

        // assert
        expect(mockOnSecondTick.mock.calls.length).toBe(secondsInASet);

        for (let i = 0; i < secondsInASet; i++) {
            expect(mockOnSecondTick.mock.calls[i][0]).toBe(i + 1);
        }
    });

    it('works when seconds is 1', async () => {

        // arrange
        const seconds = 1;
        const mockOnSecondTick = jest.fn(second => true);

        // act
        await secondsTicker(mockOnSecondTick, seconds, 0);

        // assert
        expect(mockOnSecondTick.mock.calls.length).toBe(seconds);

        expect(mockOnSecondTick.mock.calls[0][0]).toBe(1);
    });

    it('ticker is stopped by callback returning false', async () => {

        // arrange
        const seconds = 5;
        const cancelOnSecond = 2;
        const mockOnSecondTick = jest.fn(second => second === cancelOnSecond ? false : true);
        expect.assertions(1);

        // act
        try {
            await secondsTicker(mockOnSecondTick, seconds, 0);
        } catch (e) {
            expect(e).toEqual('secondsTicker was cancelled.');
        }
    });
});