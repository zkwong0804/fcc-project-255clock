import *  as ActionType from '../Actions/ActionType';
import * as Utilities from './Utilities';

const defaultSessionState = () => {
    return {
        value: 25
    }
};

export const SessionReducer = (prevState = defaultSessionState(), action) => {
    const state = {...prevState};
    if (action.type === ActionType.ResetState) return defaultSessionState();
    if (action.type !== ActionType.Session) return state;
    
    if (action.isIncrease) {
        state.value = Utilities.increaseValue(state.value);
    } else {
        state.value = Utilities.decreaseValueGreaterThanZero(state.value);
    }

    return state;
};