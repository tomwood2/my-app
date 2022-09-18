import {render, fireEvent, screen, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils";
import CountTracker from './CountTracker';
import mockStorage from './utils/mockStorage';
import FakeTimers from "@sinonjs/fake-timers";

describe('test functions of CountTracker', () => {

    it('sets count from props', () => {

        // render the component on virtual tree
        render (<CountTracker count="5"/>);

        // select elements we'll use
        const count = screen.getByTestId('count');

        // assert
       expect(count).toHaveTextContent(/^5$/);
    });

    it('sets count to default', () => {

        // render the component on virtual tree
        render (<CountTracker/>);

        // select elements we'll use
        const count = screen.getByTestId('count');

        // assert
       expect(count).toHaveTextContent(/^0$/);
    });

    it('increments count', () => {

        // render the component on virtual tree
        render (<CountTracker count='0'/>);

        // select elements we'll use
        const count = screen.getByTestId('count');
        const incrementCount = screen.getByRole('button', { name: '+'});

        // interact
        fireEvent.click(incrementCount);

//        screen.debug(count);

        // assert
        // should match '1' exactly
        expect(count).toHaveTextContent(/^1$/);
    });

    it('decrements count', () => {

        // render the component on virtual tree
        render (<CountTracker count="6"/>);

        // select elements we'll use
        const count = screen.getByTestId('count');
        const decrementCount = screen.getByRole('button', { name: '-'});

        // interact
        fireEvent.click(decrementCount);

        // assert
       expect(count).toHaveTextContent(/^5$/);
    });

    it('resets count', () => {

        // render the component on virtual tree
        render (<CountTracker count="6"/>);

        // select elements we'll use
        const count = screen.getByTestId('count');
        const resetCount = screen.getByRole('button', { name: 'Reset'});

        // interact
        fireEvent.click(resetCount);

        // assert
       expect(count).toHaveTextContent(/^0$/);
    });

    it('counts to 1', async () => {

        jest.useFakeTimers();

        // render the component on virtual tree
        render (<CountTracker count="0"/>);

        // select elements we'll use
        const startStop = screen.getByTestId('startStop');
        const seconds = screen.getByTestId('seconds');

        // interact
        act(() => {
            fireEvent.click(startStop);
        });

        // act(async () => {
        //     jest.advanceTimersByTime(100);
        // });

//        process.nextTick();

        // assert seconds is blank
        expect(seconds).toHaveTextContent('');
 
        act(async () => {
            jest.advanceTimersByTime(1000);
        });

        // process.nextTick();
        // process.nextTick();

        // // assert seconds is 1
        expect(seconds).toHaveTextContent(/^1$/);

        jest.runOnlyPendingTimers()
        jest.useRealTimers()
    });

    // it('sets local storage', () => {

    //     const mockStorageInstance = mockStorage();

    //     Object.defineProperty(window, 'localStorage', {
    //         value: mockStorageInstance,
    //     });

    //     // render the component on virtual tree
    //     render (<CountTracker count="0"/>);

    //     // select elements we'll use
    //     const count = screen.getByTestId('count');
    //     const startStop = screen.getByTestId('startStop');
    // })


});