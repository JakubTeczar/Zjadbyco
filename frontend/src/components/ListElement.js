import React, { useState } from 'react';
function Element ({name,date=false,amount,calories,checkFunction, unit,delFunction,list}){
    const [checked , setChecked] = useState(false);
    let stringList = "[ ";
    if(list){
        list.forEach(el => {
            stringList+=el.quantity +el.product.unit +" "+ el.product.name+", ";
        });
    }
    const newString = stringList.slice(0, -2);
    stringList = newString;
    stringList+= " ]";
    console.log(list);
    console.log(date);
    return(
        <li>
            <button className='list__del-btn' onClick={()=>delFunction()}>usuń</button>
            <div style={{textDecoration: checked ? 'line-through' : 'none' }} className="list__content"> 
                <input className='list__content--input' type='checkbox' onChange={()=>{let newValue = checked; setChecked(!newValue) ; newValue ? checkFunction(true): checkFunction(false)}} ></input>
                <div className="list__content--text" >{name}</div>
                {list && <button className="list__content--info info-btn" style={{display: checked ? 'none' : 'block' }} >? <span>{stringList}</span></button>}
                {date && <div className="list__content--data">{date}</div>}
                {!date && <div className="list__content--data">{calories}  kcal</div>}
            </div>
            <div className="list__amount">{amount}{unit}</div>
        </li>
    );
};

export default Element;