
changes:

---
## 9/28/22

- useTimeCountdown.js
  - removed countdownCompleted state property as the effect used to set it
  - changed millisecondsPerTick and timerId from state variables to refs.  They are used in logic only, not rendering.

- useSetCountdown.js
  - removed references to delayCountdownCompleted and timeCountdownCompleted.  Modified effects using them to use currentDelayTick and currentTick.
  - changed millisecondsPerTick and ticksPerSet from state variables to refs.  They are used in logic only, not rendering.
  - added documentation to top of source file

- changes.txt
  - renamed CHANGES.md and added formating

---
## 9/27/22

- [ ] Make 2 components - one for manual counting, one for repeating sets of timeCoundownCompleted
- [ ] Fix unit tests

-useTimeCountdown.js
  - Added comment at top of file explaining behavior
  - Modified README.md to be a basic explaination of the program

---
## 9/26/22

- fixed unreferenced warnings from eslint

- CountTracker.js
  - Made setsCount a sticky state variable in CountTracker
  - Added setsCount to settings dialog
  - Separated useEffect for currentDelayTick and currentTick into separate functions - didn't work correctly with both dependencies

- useSetCoundown.js
  - moved the useEffect[delayCoundownCompleted] function to before useEffect[timeCoundownCompleted]
  - removed cancelTimeCountdown() call from startCountdown()
  - set setsRemaining to -1 in cancelCountdown()

- useTimeCountdown.js
  - in cancelCountdown(), setCurrentTick to -1


still getting negative setsRemaining state when saving source files while server running
doesn't seem to cancel properly when delay counter is goiong




[eslint] 
src\CountTracker.js
                                                          no-unused-vars   
                                                          eqeqeq
  Line 35:8:   React Hook useEffect has a missing dependency: 'playTick'. Either include it or remove the dependency array           react-hooks/exhaustive-deps
  Line 42:8:   React Hook useEffect has a missing dependency: 'playIntervalEnded'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
  Line 44:12:  'playStartButtonClicked' is assigned a value but never used 
                                                          no-unused-vars   
  Line 49:12:  'playStopButtonClicked' is assigned a value but never used  
                                                          no-unused-vars   

src\hooks\useSetCountdown.js
  Line 9:76:  'cancelDelayCountdown' is assigned a value but never used    


                                 no-unused-vars
  Line 18:8:  React Hook useEffect has a missing dependency: 'setsRemaining'. Either include it or remove the dependency array. You can also do a functional update 'setSetsRemaining(s => ...)' if you only need 'setsRemaining' in the 'setSetsRemaining' call  react-hooks/exhaustive-deps
  Line 24:8:  React Hook useEffect has missing dependencies: 'millisecondsPerTick', 'startTimeCountdown', and 'ticksPerSet'. Either include them or remove the dependency array
                                 react-hooks/exhaustive-deps
  Line 30:8:  React Hook useEffect has a missing dependency: 'startDelayCountdown'. Either include it or remove the dependency array

                                 react-hooks/exhaustive-deps

src\hooks\useTimeCountdown.js
                                                                 no-unused-vars
                                                                 eqeqeq    
  Line 29:8:   React Hook useEffect has missing dependencies: 'millisecondsPerTick' and 'timeoutFunction'. Either include them or remove the dependency array. You can also replace multiple useState variables with useReducer if 'setTimerId' needs the current value of 'millisecondsPerTick'  react-hooks/exhaustive-deps

Search for the keywords to learn more about each warning.
To ignore, add // eslint-disable-next-line to the line before.
