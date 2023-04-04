function DatePanel ({date,changeDay}){
    return (
        <div className="date">
            <div className="date__arrow date__arrow--left" onClick={()=>changeDay("left")}></div>
            <div className="date__text">{date}</div>
            <div className="date__arrow date__arrow--right" onClick={()=>changeDay("right")}></div>
        </div>
    );
};
export default DatePanel;