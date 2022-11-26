export const increaseValue = (value) => {
    return ((value+1) > 60) ? value : value + 1;
}

export const decreaseValue = (value) => {
    return ((value-1) < 0) ? value : value-1;
}