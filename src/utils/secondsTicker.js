
import timeout from "./timeout";

// async function secondsTicker(onSecondTick, getSecondsInASet, milliseconds = 1000) {

//     // want a promise that checks to see if there are more
//     // seconds to wait and if so returns a timout
//     // if the seconds have expired, return a resolved
//     // Promise
//     // timout must provide a value that is the second count
//     // that is is for
//     // e.g. first promise value is 1

//     if (getSecondsInASet() < 1) {
//         return null;
//     }

//     let second  = 1;
//     let promiseChain = timeout(milliseconds);

    
//     while (true) {

//         await promiseChain;

//         if (onSecondTick !== null && !onSecondTick(second)) {
//             return 'secondsTicker was cancelled.';
//         }

//         if (second >= getSecondsInASet()) {
//             return null;
//         }

//         promiseChain = timeout(milliseconds)
//         second = second + 1;
//     }


//     // let lastSecond = 0;

//     // // seconds in a set may change during run so call function to get current value
//     // for (let second = 1; ; second++) {

//     //     promiseChain = promiseChain.then(() => {

//     //         lastSecond = second;
//     //         if (onSecondTick !== null && !onSecondTick(second)) {
//     //             return Promise.reject('secondsTicker was cancelled.');
//     //         }

//     //         return timeout(milliseconds);
//     //     });
//     // };

//     // promiseChain = promiseChain.then(() => onSecondTick(lastSecond + 1));

//     // return promiseChain;
// }

function secondsTicker(onSecondTick, secondsInASet, milliseconds = 1000) {

    if (secondsInASet < 1) {
        return Promise.resolve(0);
    }

    let promiseChain = timeout(milliseconds);
    let lastSecond = 0;

    for (let second = 1; second < secondsInASet; second++) {

        promiseChain = promiseChain.then(() => {

            if (onSecondTick !== null && !onSecondTick(second)) {
                return Promise.reject('secondsTicker was cancelled.');
            }

            lastSecond = second;

            return timeout(milliseconds);
        });
    };

    return promiseChain.then(() => onSecondTick(lastSecond + 1));
}

export default secondsTicker;
