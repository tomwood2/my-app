
import {render, fireEvent, screen, waitFor } from "@testing-library/react"
//import { useEffect } from "react";
import { act } from 'react-dom/test-utils';
import useSetCountdown from './useSetCountdown' ;

function TestComponent({ticksPerSet, millisecondsPerTick, setCount}) {

    const [setsRemaining, startSetCountdown, cancelSetCountdown] = useSetCountdown(ticksPerSet, millisecondsPerTick, setCount);
 
    return <div>
        <button type="button" onClick={startSetCountdown}>start set</button>
        <button type="button" onClick={cancelSetCountdown}>cancel set</button>
        <div data-testid="setsRemaining">{setsRemaining}</div>
    </div>;
  }

  describe('test useSetCountdown', () => {

    beforeAll(() => {
        jest.useFakeTimers();
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    it('test set countdown from 3 to 0', async () => {

        // note: my testing showed that if you don't call
        // advanceTimers, etc. the timeout will still complete
        // after the actual timeout
        // arrange

        const ticksPerSet = 3;
        const millisecondsPerTick = 1000;
        const setCount = 4;

        act(() => {
            render(<TestComponent ticksPerSet={ticksPerSet} millisecondsPerTick={millisecondsPerTick} setCount={setCount}/>);
        });

        const setsRemaining = screen.getByTestId('setsRemaining');
        const startSet = screen.getByRole('button', { name: 'start set'});

        expect(setsRemaining).toHaveTextContent(/^0$/);

        // act
        // press the start button

        act(() => {
            fireEvent.click(startSet);
        });

        let regExp = new RegExp(`^${setCount}$`);
        expect(setsRemaining).toHaveTextContent(regExp);

        for (let i = 0; i < ticksPerSet; i++) {
            act(() => {
                jest.runOnlyPendingTimers();    // won't run timers started during completed timer callback
            });
        }

        // set count should have decreased by 1
        regExp = new RegExp(`^${setCount - 1}$`);
        expect(setsRemaining).toHaveTextContent(regExp);
    });


  });