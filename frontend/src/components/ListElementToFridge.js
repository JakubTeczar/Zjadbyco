import React, { useState } from 'react';
function ElementToFridge ({name,date,amount, unit,delFunction}){
    const [checked , setChecked] = useState(false);

    const diffInMs = Math.abs(new Date() - new Date(date));
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60*24)); 
    // const diffInHours= Math.floor(diffInMs / (1000 * 60 * 60)) -diffInDays*24 ; 
    console.log("data" ,diffInDays);
    return(
        <li>
            <button className='list__del-btn' onClick={()=>delFunction()}>usuń</button>
            <div style={{paddingLeft : "2rem" }} className="list__content"> 
                <div className="list__content--text" >{name}</div>
                <button className="list__content--info info-btn" >? <span>[10szt jajek , pomidory , costam]</span></button>
                <div className="list__content--data">103kcal</div>
            </div>
            <div className="list__amount">{amount}{unit}</div>
        </li>
    );
};

export default ElementToFridge;