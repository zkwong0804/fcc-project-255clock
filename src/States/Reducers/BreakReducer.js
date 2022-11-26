import *  as ActionType from '../Actions/ActionType';
import * as Utilities from './Utilities';

const defaultBreakState = () => {
    return {
        value: 5
    };
};

export const BreakReducer = (prevState = defaultBreakState(), action) => {
    const state = {...prevState};
    if (action.type !== ActionType.Break) return state;
    if (action.isIncrease) {
        state.value = Utilities.increaseValue(state.value);
    } else {
        state.value = Utilities.decreaseValue(state.value);
    }

    return state;
};