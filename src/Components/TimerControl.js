export function TimerControl(props) {
    return (
        <div className='timer-control-container'>
            <button className='timer-control-start' id='start_stop' onClick={props.startPauseTimer}>
                <i className="fa fa-solid fa-arrow-right"></i>
                <i className="fa fa-solid fa-pause"></i>
            </button>
            {/* <button className='timer-control-pause' onClick={props.pauseTimer}>
                <i className="fa fa-solid fa-pause"></i>
            </button> */}
            <button className='timer-control-refresh' id='reset' onClick={props.resetTimer}>
                <i className="fa fa-solid fa-rotate-right"></i>
            </button>
        </div>
    );
}