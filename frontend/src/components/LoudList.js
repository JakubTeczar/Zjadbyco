import React, { useEffect, useState } from 'react';
import Element from "./ListElement";
import ElementToFridge from "./ListElementToFridge";

function List ({elements , fridge=false}){
    const [litElements ,setListElements] = useState(elements);
    function deleteElement(id){
        console.log(id,elements);
        const newList =[...litElements];
        newList.splice(newList.findIndex(el => el.id === id), 1);
        setListElements(newList);
    }
    useEffect(()=>{
        setListElements(elements);
    },[elements])
    return (
        <div className="list-container">
            <ul className="list">
            {!fridge && litElements.map((element) =>(
                <Element delFunction={()=>{deleteElement(element.id)}} name={element.name} date={element.date} amount={element.quantity} unit={element.unit} key={element.id}></Element>
            ))}
            {fridge && litElements.map((element) =>(
                <ElementToFridge delFunction={()=>{deleteElement(element.id)}} name={element.name} date={"2023-04-13"} amount={element.quantity} unit={element.unit} key={element.id}></ElementToFridge>
            ))}
            </ul>
        </div>
    );
};

export default List;