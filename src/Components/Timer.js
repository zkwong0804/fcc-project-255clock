export function Timer(props) {
    return (
        <div className='timer-container'>
            <p id='timer-label'>Time left</p>
            <p id='time-left'>
                {props.min.toString().padStart(2, 0)}:{props.sec.toString().padStart(2,0)}
            </p>
        </div>
    );
}