import {configureStore} from '@reduxjs/toolkit';

import {BreakReducer} from './Reducers/BreakReducer';
import {SessionReducer} from './Reducers/SessionReducer';
import {TimerReducer} from './Reducers/TimerReducer';
import * as Action from './Actions/Action';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        break: state.break,
        session: state.session,
        timer: state.timer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        breakHandle: (isIncrease) => {
            dispatch(Action.BreakAction(isIncrease));
        },
        sessionHandle: (isIncrease) => {
            dispatch(Action.SessionAction(isIncrease));
        },
        timerHandle: (min, sec) => {
            console.log(`mapDispatchToProps.timerHandle -> min: ${min}, sec: ${sec}`)
            dispatch(Action.TimerAction(min, sec));
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
        timer: TimerReducer
    }
});