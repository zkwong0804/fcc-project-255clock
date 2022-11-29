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
    this.timerInterval = undefined;
    this.isSessionTimer = true;
  }

  breakIncreaseHandle() {
    if (!this.timerStart) {
      this.props.breakHandle(true);
    }
    // this.props.breakHandle(true);
  }

  breakDecreaseHandle() {
    if (!this.timerStart) {
      this.props.breakHandle(false);
    }
    // this.props.breakHandle(false);
  }

  sessionIncreaseHandle() {
    if (!this.timerStart) {
      this.props.sessionHandle(true);
    }
  }

  sessionDecreaseHandle() {
    if (!this.timerStart) {
      this.props.sessionHandle(false);
    }
  }

  timerFunction() {
    const timerState = this.props.timer;

    let updatedSec = Utilities.decreaseValue(timerState.sec);
    let updatedMin = Utilities.decreaseValue(timerState.min);
    
    if (updatedSec === 0 && timerState.sec !== 0 && timerState.min === 0) {
      //let this method handle 00:00
      this.props.timerLabelHandle(!this.isSessionTimer);
      const audioElement = document.querySelector("#beep");
      audioElement.currentTime = 0;
      audioElement.play();
      setTimeout(function () {
        audioElement.pause();
      }, 3000);
      this.props.timerHandle(timerState.min, updatedSec);
      console.log(audioElement.paused)
      return;
    }

    if (updatedSec === 0 && timerState.sec === 0) {
      if (timerState.min === 0) {
        //reset timer
        if (this.isSessionTimer) {
          this.props.timerHandle(this.props.break.value, 0);
          this.isSessionTimer = false;
        } else {
          this.props.timerHandle(this.props.session.value, 0);
          this.isSessionTimer = true;
        }
        return;
      }
      updatedSec = 2;
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
        this.timerInterval = clearInterval(this.timerInterval);
      }
    }
  }

  resetTimerHandle() {
    this.props.resetState();
    this.timerInterval = clearInterval(this.timerInterval);
    this.isSessionTimer = true;
    this.timerStart = false;
    const audio = document.querySelector("#beep");
    audio.pause();
    audio.currentTime = 0;
    this.forceUpdate();
  }

  render() {
    const body = document.querySelector('body');
    if (this.isSessionTimer) {
      body.className = 'bg-session';
    } else {
      body.className = 'bg-break';
    }
    return (
      <div className='clock'>
        <h1>Pomodoro timer</h1>


        <div className='panel'>
          <div className='timer-panel'>
            <Timer min={this.props.timer.min} sec={this.props.timer.sec} timerLabel={this.props.timerLabel.value} />
            <TimerControl
              startPauseTimer={this.startPauseTimerHandle}
              resetTimer={this.resetTimerHandle}
              timerStart={this.timerStart} />
          </div>
          <div className='controls-panel'>
            <ValueLength
              titleLabel='Break'
              value={this.props.break.value}
              labelId='break-label'
              valueId='break-length'
              increaseId='break-increment'
              decreaseId='break-decrement'

              increaseBehavior={this.breakIncreaseHandle}
              decreaseBehavior={this.breakDecreaseHandle} />
            <ValueLength
              titleLabel='Session'
              value={this.props.session.value}
              labelId='session-label'
              valueId='session-length'
              increaseId='session-increment'
              decreaseId='session-decrement'
              increaseBehavior={this.sessionIncreaseHandle}
              decreaseBehavior={this.sessionDecreaseHandle} />
          </div>
        </div>

        <audio src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
          id='beep'>
        </audio>

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
