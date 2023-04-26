import React, { useEffect, useState } from 'react';
import Element from "./ListElement";
import ElementToFridge from "./ListElementToFridge";

function List ({elements , fridge=false}){
    const [litElements ,setListElements] = useState(elements);
    async function deleteElement(id){
        let url = `http://localhost:8080/calendar/remove`; 
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"id":id}),
        });
        //czy można zrobić tak że zostanie wysłane polecenie
        //które usunie z bazy danych dany element bez przeładowywania strony ? oooo
        const newList =[...litElements];
        newList.splice(newList.findIndex(el => el.id === id), 1);
        setListElements(newList);
    }
    async function checkElement(id,state){
        let url = `http://localhost:8080/calendar/change-checked`; 
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:id,checked:state}),
        });
        if(!response.ok){
            console.log("nie działa :(");
            return null;
        }else{
            console.log({id:id,checked:state});
            return null;
        }
  
    }
    useEffect(()=>{
        setListElements(elements);
    },[elements])
    return (
        <div className="list-container">
            <ul className="list">
            {!fridge && litElements.map((element) =>(           //tu jeszcze nic nie dziala
                <Element checkFunction={(state)=>checkElement(element.id,state)} delFunction={()=>{deleteElement(element.id)}} calories={(element.quantity*element.food.caloriesPerUnit).toFixed(0)} name={element.food.name} checkValue={element.checked}  amount={element.quantity} unit={element.food.unit} key={element.id} list={element.food.productsWithQuantities}></Element>
            ))}
            {fridge && litElements.map((element) =>(
                <ElementToFridge delFunction={()=>{deleteElement(element.id)}} name={element.food.name} date={element.date} amount={element.quantity} unit={element.unit} key={element.id}></ElementToFridge>
            ))}
            </ul>
        </div>
    );
};

export default List;
