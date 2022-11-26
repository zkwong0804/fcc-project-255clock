export function ValueLength(props) {
    return (
        <div className='value-container'>
            <p>{props.titleLabel}</p>
            <div className='value-control-container'>
                <button 
                    className='value-control up' 
                    id={props.increaseId}
                    onClick={props.increaseBehavior}>
                        <i className="fa fa-solid fa-caret-up"></i>
                </button>
                <span id={props.valueId}>{props.value}</span>
                <button 
                    className='value-control down'
                    id={props.decreaseId}
                    onClick={props.decreaseBehavior}>
                        <i className="fa fa-solid fa-caret-down"></i>
                </button>
            </div>
        </div>
    );
}