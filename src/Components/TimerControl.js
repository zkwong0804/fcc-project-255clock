export function TimerControl(props) {
    let defaultButtonIcon = <i className="fa fa-solid fa-pause"></i>;
    if (!props.timerStart) {
        defaultButtonIcon = <i className="fa fa-solid fa-arrow-right"></i>;
    }
    return (
        <div className='timer-control-container'>
            <button className='timer-control-start' id='start_stop' onClick={props.startPauseTimer}>
                {defaultButtonIcon}
            </button>
            <button className='timer-control-refresh' id='reset' onClick={props.resetTimer}>
                <i className="fa fa-solid fa-rotate-right"></i>
            </button>
        </div>
    );
}