
---
# To Do

- [X] Make 2 components - one for manual counting, one for repeating sets of timeCoundownCompleted
- [ ] Fix unit tests
- [X] Starting a single set plays set complete sound on start
- [X] Add sounds to CountTracker
- [ ] Refactor settings
- [X] put hamburger, component heading and component in a grid in App or a new controller component
- [X] remove un-used source files
- [ ] fix lint errors

---
# Changes:

---
## 10/13/22

### Single set Bug fix and UI enhancment.
  - SetTracker.js
    - added startSetDelay and milliseconds on call to startCountdown from startSingleSet button handler
    - modified jsx to not show start single set if it is running

### Refactored settings dialog.  Added delay seconds to settings dialog.
  - App.js
    - changes to support SettingsDialog component - passing props
  - SettingsDialog.js, .css
    - SettingsDialog is now a component
    - new files to contain code from App.js
    - improved styling
  - DialogModal.js, .css
    - removed styled-components library
    - new css file to replace styled-components
    - improved styling
  - useSetCountdown.js
    - startSetDelay is now a state variable provided to startCountdown
  - SetTracker.js
    - startSetDelay is now passed as a prop from App and passed to startCountdown

---
## 10/4/22

### Setup sound in CountTracker.  Auto size heading in SetTracker
  - CountTracker.js
    - modified button handlers to call playClick if not muted
  - SetTracker.js, .css
    - removed playStartButtonClicked - not used
    - added call to playClick when Stop button pressed
    - Set height of 'sets reamaining / seconds remaining' row to be auto - when width of container is small, text goes to 2 lines and is obscured


### Removed dead source files.  Fixed complete sound on starting single set.

---
## 10/2/22 - 382e036

### Removed dead source files.  Fixed complete sound on starting single set.

  - removed these files
    - mockStorage.test.js
    - mockStorage.js
    - MyPromise.js
    - MyPromise.test.js
    - secondsTicker.js
    - secondsTicker.test.js
    - timeout.js
    - timeout.test.js

  - useSetCountdown.js
    - add startingSetsCount ref to hold onto the setsCount argument passed to startSet and added it to the returned array
    
  - SetTracker.js
    - modified call to useSetCountdown to hold onto new startingSetsCount value
    - modified effect that calls playIntervalEnded to test startingSetsCount instead of setsCount as they are different when doing 1 set
---
## 10/1/22 - ebbb8d8

### Moved hamburger, component heading and settings dialog into App component.

  - App.js, .css
    - moved sticky state dialog variables to here
    - moved methods for changing the above states to here
    - moved the DialogModal and settingDialogContent to here
    - passed sticky state variables to SetTracker as properties

  - CountTracker.js, .css
    - removed dialog and it's states

  - SetTracker.js, .css
    - removed dialog and its states.
    - modified function args to accept properties for these values
---
## 9/30/22 - 6a20ad2

### Split CountTracker into 2 components.

  - One for manual count (CountTraker)
  - One for counting timed sets (SetCounter)

  - SetCounter.js, .css
    - Started with copy of CountTraker and removed manual controls and handers

    -CountTracker.js, .css
      -removed all time and set code

    -App.js
      -added sticky state that indicates which of the two above compents are currently displayed
      -added buttons to switch from one component to the other


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
  Line 2:26:  'useEffect' is defined but never used               no-unused-vars
  Line 3:9:   'useSound' is defined but never used                no-unused-vars
  Line 5:8:   '_44' is defined but never used                     no-unused-vars
  Line 6:8:   'decide' is defined but never used                  no-unused-vars
  Line 7:8:   'arcadeButtonClickSound' is defined but never used  no-unused-vars

src\SetTracker.js
  Line 32:8:   React Hook useEffect has a missing dependency: 'playTick'. Either include it or remove the dependency array           react-hooks/exhaustive-deps
  Line 39:8:   React Hook useEffect has a missing dependency: 'playTick'. Either include it or remove the dependency array           react-hooks/exhaustive-deps
  Line 46:8:   React Hook useEffect has a missing dependency: 'playIntervalEnded'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
  Line 48:12:  'playStartButtonClicked' is assigned a value but never used                                                           no-unused-vars
  Line 53:12:  'playStopButtonClicked' is assigned a value but never used                                                            no-unused-vars

src\hooks\useSetCountdown.js
  Line 43:8:  React Hook useEffect has a missing dependency: 'startTimeCountdown'. Either include it or remove the dependency array
                                                            react-hooks/exhaustive-deps
  Line 49:8:  React Hook useEffect has a missing dependency: 'setsRemaining'. Either include it or remove the dependency array. You can also do a functional update 'setSetsRemaining(s => ...)' if you only need 'setsRemaining' in the 'setSetsRemaining' call  react-hooks/exhaustive-deps
  Line 55:8:  React Hook useEffect has a missing dependency: 'startDelayCountdown'. Either include it or remove the dependency array
                                                            react-hooks/exhaustive-deps

src\hooks\useTimeCountdown.js
  Line 44:8:  React Hook useEffect has a missing dependency: 'timeoutFunction'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
Search for the keywords to learn more about each warning.
To ignore, add // eslint-disable-next-line to the line before.
