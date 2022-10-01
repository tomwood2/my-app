import './App.css';
import CountTracker from './CountTracker';
import SetTracker from './SetTracker';
import {useStickyState} from './hooks/useStickyState';

function App() {
  const [trackerType, setTrackerType] = useStickyState(1, 'countTracker.trackerType');

  const showCountTracker = () => {
    setTrackerType(1);
  };

  const showSetTracker = () => {
    setTrackerType(2);
  };

  return (
    <div className="App">
      <button type="button" onClick={showCountTracker}>Count Tracker</button>
      <button type="button" onClick={showSetTracker}>Set Tracker</button>

      {trackerType === 1 ? <CountTracker /> : <SetTracker />}

    </div>
  );
}

export default App;
