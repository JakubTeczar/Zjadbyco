import React, { useState } from 'react';
function Element ({name,date=false,amount,calories, unit,delFunction}){
    const [checked , setChecked] = useState(false);

    console.log(date);
    return(
        <li>
            <button className='list__del-btn' onClick={()=>delFunction()}>usuń</button>
            <div style={{textDecoration: checked ? 'line-through' : 'none' }} className="list__content"> 
                <input className='list__content--input' type='checkbox' onChange={()=>{let newValue = checked; setChecked(!newValue) }} ></input>
                <div className="list__content--text" >{name}</div>
                <button className="list__content--info info-btn" style={{display: checked ? 'none' : 'block' }} >? <span>[10szt jajek , pomidory , costam]</span></button>
                {date && <div className="list__content--data">{date}</div>}
                {!date && <div className="list__content--data">103kcal</div>}
            </div>
            <div className="list__amount">{amount}{unit}</div>
        </li>
    );
};

export default Element;