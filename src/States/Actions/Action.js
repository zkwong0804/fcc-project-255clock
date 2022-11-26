import * as ActionType from './ActionType';


export const BreakAction = (isIncrease=true) => {
    return {
        type: ActionType.Break,
        isIncrease
    }
};
export const SessionAction = (isIncrease=true) => {
    return {
        type: ActionType.Session,
        isIncrease
    }
};
export const TimerAction = (min, sec) => {
    return {
        type: ActionType.Timer,
        min,
        sec
    }
};