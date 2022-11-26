import *  as ActionType from '../Actions/ActionType';

const defaultTimeLeftState = () => {
    return {
        min: 25,
        sec: 0
    }
};

export const TimerReducer = (prevState = defaultTimeLeftState(), action) => {
    const state = {...prevState};
    if (action.type !== ActionType.Timer) return state;
    console.log(`TimerReducer -> min: ${action.min}, sec: ${action.sec}`)
    
    state.min = action.min;
    state.sec = action.sec;

    return state;
};