// import external modules
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';

//import local modules
import { ValueLength } from './Components/ValueLength';
import { TimerControl } from './Components/TimerControl';
import { Timer } from './Components/Timer';
import * as State from './States/State';
import * as Utilities from './States/Reducers/Utilities';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.breakIncreaseHandle = this.breakIncreaseHandle.bind(this);
    this.breakDecreaseHandle = this.breakDecreaseHandle.bind(this);
    this.sessionIncreaseHandle = this.sessionIncreaseHandle.bind(this);
    this.sessionDecreaseHandle = this.sessionDecreaseHandle.bind(this);
    this.startPauseTimerHandle = this.startPauseTimerHandle.bind(this);
    this.resetTimerHandle = this.resetTimerHandle.bind(this);
    this.timerFunction = this.timerFunction.bind(this);
    this.timerStart = false;
    this.timerInterval = null;
    this.timerReset = false;
  }

  breakIncreaseHandle() {
    this.props.breakHandle(true);
  }

  breakDecreaseHandle() {
    this.props.breakHandle(false);
  }

  sessionIncreaseHandle() {
    this.props.sessionHandle(true);
  }

  sessionDecreaseHandle() {
    this.props.sessionHandle(false);
  }

  timerFunction() {
    const timerState = this.props.timer;

    let updatedSec = Utilities.decreaseValue(timerState.sec);
    if (updatedSec === 0 && timerState.sec === 0) {
      let updatedMin = Utilities.decreaseValue(timerState.min);
      if (updatedMin === 0 && timerState.min === 0) {
        // start break timer
        console.log('we shall start break timer');
      }
      updatedSec = 59;
      this.props.timerHandle(updatedMin, updatedSec);
      return;
    }
    this.props.timerHandle(timerState.min, updatedSec);
  }

  startPauseTimerHandle() {
    this.timerStart = !this.timerStart;
    if (this.timerStart) {
      this.timerInterval = setInterval(this.timerFunction,
        1000);
    } else {
      if (this.timerInterval !== null) {
        clearInterval(this.timerInterval);
      }
    }
  }

  resetTimerHandle() {
    console.log('You refreshed timer!!');
    console.log(`resetTimerHandle -> this.props.session.value: ${this.props.session.value}`)
    this.props.timerHandle(this.props.session.value, 0);
  }

  render() {
    console.log('Render clock');
    console.log(`currentMin is update to ${this.props.timer.min}`);
    console.log(`currentSec is updated to ${this.props.timer.sec}`)
    return (
      <div className='clock'>
        <h1>Pomodoro timer</h1>
        <div>
          <ValueLength
            titleLabel='Break'
            value={this.props.break.value}
            valueId='break-label'
            increaseId='break-increment'
            decreaseId='break-decrement'
            increaseBehavior={this.breakIncreaseHandle}
            decreaseBehavior={this.breakDecreaseHandle} />
          <ValueLength
            titleLabel='Session'
            value={this.props.session.value}
            valueId='session-label'
            increaseId='session-increment'
            decreaseId='session-decrement'
            increaseBehavior={this.sessionIncreaseHandle}
            decreaseBehavior={this.sessionDecreaseHandle} />
        </div>
        <Timer min={this.props.timer.min} sec={this.props.timer.sec} />
        <TimerControl
          startPauseTimer={this.startPauseTimerHandle}
          resetTimer={this.resetTimerHandle} />
      </div>
    );
  }
}




const container = document.getElementById('root');
const root = createRoot(container);
const MappedClock = State.getMappedComponent(Clock);

root.render(
  <Provider store={State.store}>
    <MappedClock />
  </Provider>);
