import { useNavigate  } from "react-router-dom";

function DatePanel ({date,onlyData=false,localization}){
    const navigate = useNavigate();
    console.log()
    const changeDay = (direction)=> {
        const splitedDate = date.split("-");
        const createDate = new Date(splitedDate[0], (splitedDate[1]-1), splitedDate[2]);
        const selectedDate =direction === "left" ? new Date(createDate.getTime() - (24 * 60 * 60 * 1000)) : new Date(createDate.getTime() + (24 * 60 * 60 * 1000)); 
        const changeToDate = selectedDate.getFullYear().toString() +"-"+(selectedDate.getMonth() + 1).toString().padStart(2, '0')+"-"+selectedDate.getDate().toString().padStart(2, '0'); 
        navigate(`/${localization}/${changeToDate}`);    
    }
    return (
        <div className="date">
            {!onlyData && <div className="date__arrow date__arrow--left" onClick={()=>changeDay("left")}></div>}
            <div className="date__text">{date}</div>
            {!onlyData && <div className="date__arrow date__arrow--right" onClick={()=>changeDay("right")}></div>}
        </div>
    );
};
export default DatePanel;