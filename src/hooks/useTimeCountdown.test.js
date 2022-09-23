
import {render, fireEvent, screen, waitFor } from "@testing-library/react"
import { useEffect } from "react";
import { act } from 'react-dom/test-utils';
import useTimeCountdown from './useTimeCountdown';

function TestComponent({initialTick, millisecondsInATick}) {
    const callback = () => {
        console.log(`useEffect callback: currentTick = ${currentTick}`);
    };
    const [currentTick, startCountdown, cancelCountdown] = useTimeCountdown(initialTick, millisecondsInATick);
    useEffect(callback, [currentTick]);

//    console.log(`in TestComponent with currentTick=${currentTick}`)
    return <div>
        <button type="button" onClick={startCountdown}>start</button>
        <button type="button" onClick={cancelCountdown}>cancel</button>
        <div data-testid="currentTick">{currentTick}</div>
    </div>;
  }

  describe('test useTimeCountdown', () => {

    beforeAll(() => {
        jest.useFakeTimers();
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    it('initial value', async () => {

        // arrange

        const initialTick = 3;
        const millisecondsInATick = 75;

        act(() => {
            render(<TestComponent initialTick={initialTick} millisecondsInATick={millisecondsInATick} />);
        });

        let currentTick = screen.getByTestId('currentTick');

        // assert
        // should match '0' exactly
        expect(currentTick).toHaveTextContent(/^0$/);
        
    });

    it('test countdown from 3 to 0', async () => {

        // note: my testing showed that if you don't call
        // advanceTimers, etc. the timeout will still complete
        // after the actual timeout
        // arrange

        const initialTick = 3;
        const millisecondsInATick = 1000;

        act(() => {
            render(<TestComponent initialTick={initialTick} millisecondsInATick={millisecondsInATick} />);
        });

        const currentTick = screen.getByTestId('currentTick');
        const start = screen.getByRole('button', { name: 'start'});

        // act
        // press the start button

        act(() => {
            fireEvent.click(start);
        });

        act(() => {
            // can use either one of these functions
//            jest.advanceTimersByTime(1000);
            jest.runOnlyPendingTimers();    // won't run timers started during completed timer callback
        });

        // assert

        expect(currentTick).toHaveTextContent(/^2$/);
        
        act(() => {
//            jest.advanceTimersByTime(1000);
            jest.runOnlyPendingTimers();
        });

        expect(currentTick).toHaveTextContent(/^1$/);

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(currentTick).toHaveTextContent(/^0$/);

        // if NOT using fake timers you can do this
        // verify that the first count down tick happened
        // await waitFor(() => expect(currentTick).toHaveTextContent(/^2$/));

        // // verify that the first count down tick happened
        // await waitFor(() => expect(currentTick).toHaveTextContent(/^1$/));

        // // verify that the first count down tick happened
        // await waitFor(() => expect(currentTick).toHaveTextContent(/^0$/));
    });

    it('test cancel countdown', async () => {

        // arrange

        const initialTick = 3;
        const millisecondsInATick = 75;

        act(() => {
            render(<TestComponent initialTick={initialTick} millisecondsInATick={millisecondsInATick} />);
        });

        const currentTick = screen.getByTestId('currentTick');
        const start = screen.getByRole('button', { name: 'start'});
        const cancel = screen.getByRole('button', { name: 'cancel'});

        // act and assert
        // press the start button

        act(() => {
            fireEvent.click(start);
        });

        act(() => {
            jest.runOnlyPendingTimers();
        });
            
        // verify that the first count down tick happened
        expect(currentTick).toHaveTextContent(/^2$/);

        // press the cancel button

        act(() => {
            fireEvent.click(cancel);
        });

        // verify that the count went to 0 - should be immediate
        expect(currentTick).toHaveTextContent(/^0$/);
    });
  });