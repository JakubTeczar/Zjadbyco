import React, { useState } from 'react';
function ElementToFridge ({name,date=false,amount,calories, unit,delFunction,list=false,sortType ,diffInDays,planned}){

    let stringList = "[ ";
    if(list){
        list.forEach(el => {
            stringList+=el.quantity +el.product.unit +" "+ el.product.name+", ";
        });
    }
    const newString = stringList.slice(0, -2);
    stringList = newString;
    stringList+= " ]";


    // const diffInHours= Math.floor(diffInMs / (1000 * 60 * 60)) -diffInDays*24 ; 
    // console.log("data" ,diffInDays);
    return(
        <li className={planned ? "planned-element" : ""}>
            <button className='list__del-btn' onClick={()=>delFunction()}>usuń</button>
            <div style={{paddingLeft : "2rem" }} className="list__content"> 
                <div className="list__content--text" >{name}</div>
                {list && <button className="list__content--info info-btn" >? <span>{stringList}</span></button>}
                {sortType === "time" && <div className="list__content--data">{date}</div>}
                {sortType === "calories" &&<div className="list__content--data">{calories}kcal</div>}
            </div>
            {sortType === "time" && <div className="list__amount">{diffInDays}dni</div>}
            {sortType === "calories" && <div className="list__amount">{amount}{unit}</div>}
        </li>
    );
};

export default ElementToFridge;