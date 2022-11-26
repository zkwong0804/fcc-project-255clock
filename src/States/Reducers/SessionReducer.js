import *  as ActionType from '../Actions/ActionType';
import * as Utilities from './Utilities';

const defaultSessionState = () => {
    return {
        value: 25
    }
};

export const SessionReducer = (prevState = defaultSessionState(), action) => {
    const state = {...prevState};
    if (action.type !== ActionType.Session) return state;
    
    if (action.isIncrease) {
        state.value = Utilities.increaseValue(state.value);
    } else {
        state.value = Utilities.decreaseValue(state.value);
    }

    return state;
};