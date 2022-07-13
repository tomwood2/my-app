
import React, {useState} from 'react';
import './CountTracker.css';

function CountTracker(props) {

    const [count, setCount] = useState(parseInt(props.count));

    function incrementCount() {
        setCount(count + 1);
    }
    
    function decrementCount() {
        setCount(count === 0 ? 0 : count - 1 );
    }
    
    function resetCount() {
        setCount(0);
    }

    return  (
        <div>
{/*        <div className='two-column-grid'>
            <div>
                <button onClick={incrementCount} className="plus-button">+</button>
            </div>
            <div></div>
                <h2>{count}</h2>
                <button onClick={resetCount} className="float-right">reset</button>
            <div>
                <button onClick={decrementCount}  className="minus-button">-</button>
            </div>
            <div></div>
        </div>
        <p>the new grid container follows</p>  */}

        <div className="outer-container">
            <div className='header-class'>Count Tracker</div>
            <div onClick={incrementCount} className="plus-button plus-class">+</div>
            <div className='count-class'>{count}</div>
            <div onClick={resetCount} className="reset-class">Reset</div>
            <div onClick={decrementCount} className="minus-button minus-class">-</div>
        </div>
        </div>
        );
}

// class CountTracker extends React.Component {
//     constructor(props) {
//         super(props);
//         let {count} = props;
//         this.state = { count: parseInt(count) };
//         this.incrementCount = this.incrementCount.bind(this);
//         this.decrementCount = this.decrementCount.bind(this);
//         this.resetCount = this.resetCount.bind(this);
//     }

//     incrementCount() {
//         this.setState((state) => ({ count: state.count + 1 }));
//     }

//     decrementCount() {
//         this.setState((state) => ({ count: state.count === 0 ? 0 : state.count - 1 }));
//     }

//     resetCount() {
//         this.setState(() => ({ count: 0 }));
//     }

//     render() {


//         return (
//         <div>
//             <button onClick={this.incrementCount}>+</button>
//             <div>
//                 <h2 className="display-inline-block">{this.state.count}</h2>
//                 <button onClick={this.resetCount} className="float-right">reset</button>
//             </div>
//             <button onClick={this.decrementCount}>-</button>
//         </div>
//         );

//     }
//}

export default CountTracker;