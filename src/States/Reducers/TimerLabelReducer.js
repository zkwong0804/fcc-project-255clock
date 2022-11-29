import *  as ActionType from '../Actions/ActionType';

const SESSION_LABEL = "Session:";
const BREAK_LABEL = "Break:"

const defaultTimerLabelState = () => {
    return {
        value: SESSION_LABEL
    }
};

export const TimerLabelReducer = (prevState = defaultTimerLabelState(), action) => {
    const state = {...prevState};
    if (action.type === ActionType.ResetState) return defaultTimerLabelState();
    if (action.type !== ActionType.TimerLabel) return state;
    
    if (action.isSession) {
        state.value = SESSION_LABEL;
    } else {
        state.value = BREAK_LABEL;
    }

    return state;
};