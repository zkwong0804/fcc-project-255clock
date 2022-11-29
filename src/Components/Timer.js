export function Timer(props) {
    // console.log(props.min)
    return (
        <div className='timer-container'>
            <span id='timer-label'>{props.timerLabel} </span>
            <span id='time-left'>
                {props.min.toString().padStart(2, 0)}:{props.sec.toString().padStart(2,0)}
            </span>
        </div>
    );
}