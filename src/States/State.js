import {configureStore} from '@reduxjs/toolkit';

import {BreakReducer} from './Reducers/BreakReducer';
import {SessionReducer} from './Reducers/SessionReducer';
import {TimerReducer} from './Reducers/TimerReducer';
import {TimerLabelReducer} from './Reducers/TimerLabelReducer';
import * as Action from './Actions/Action';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        break: state.break,
        session: state.session,
        timer: state.timer,
        timerLabel: state.timerLabel
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        breakHandle: (isIncrease) => {
            dispatch(Action.BreakAction(isIncrease));
        },
        sessionHandle: (isIncrease) => {
            dispatch(Action.SessionAction(isIncrease));
            const state = store.getState();
            dispatch(Action.TimerAction(state.session.value, 0));
        },
        timerHandle: (min, sec) => {
            dispatch(Action.TimerAction(min, sec));
        },
        timerLabelHandle: (isSession) => {
            dispatch(Action.TimerLabelAction(isSession));
        },
        resetState: () => {
            dispatch(Action.ResetStateAction());
            dispatch(Action.TimerLabelAction(true));
        }
    }
};

export const getMappedComponent = (component) => {
    return connect(mapStateToProps, mapDispatchToProps)(component);
};

export const store = configureStore({
    reducer: {
        break: BreakReducer,
        session: SessionReducer,
        timer: TimerReducer,
        timerLabel: TimerLabelReducer
    }
});