import React, { useEffect, useState } from 'react';
import Element from "./ListElement";
import ElementToFridge from "./ListElementToFridge";

function List ({elements , fridge=false , sortType , order , isShopping = false}){
    // elements = order ? elements.reverse() : elements;
    const plannedElements = elements.some(el => el.planned === true);

    const [litElements ,setListElements] = useState(elements);
    async function deleteElement(id, fridge=false){
        let url = fridge ? "http://localhost:8080/fridge/remove" : "http://localhost:8080/calendar/remove"; 
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
    async function checkElement(id,state,shopping=false){
        let url = shopping ? "http://localhost:8080/shopping/change-checked":"http://localhost:8080/calendar/change-checked"; 
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
    async function deleteElFromShopping (id){
        let url = `http://localhost:8080/shopping/delete/${id}`; 
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
            },
        });
        if(!response.ok){
            console.log("nie działa :(");
            return null;
        }else{
            return null;
        }

    }
    useEffect(()=>{
        setListElements(elements);
    },[elements])
    
    return (
        <div className="list-container">
            <ul className="list">
            {litElements.length === 0 && <div className='box__text'><hr></hr>Brak elementów</div>}
            {isShopping && litElements.map((element) =>(
                <Element checkFunction={(state)=>checkElement(element.id,state, true)} delFunction={()=>{deleteElFromShopping(element.id)}} calories={(element.quantity*element.product.caloriesPerUnit).toFixed(0)} name={element.product.name} checkValue={element.checked}  amount={element.quantity} unit={element.product.unit} key={element.id} ></Element>
            ))}
            {!fridge &&!isShopping && litElements.map((element) =>(           //tu jeszcze nic nie dziala
                <Element checkFunction={(state)=>checkElement(element.id,state)} delFunction={()=>{deleteElement(element.id)}} calories={(element.quantity*element.food.caloriesPerUnit).toFixed(0)} name={element.food.name} checkValue={element.checked}  amount={element.quantity} unit={element.food.unit} key={element.id} list={element.food.productsWithQuantities} ></Element>
            ))}
            {plannedElements && <div className='planned-el-header'><hr></hr>Zaplanowane do zużycia</div>}
            {fridge && litElements.map((element) =>(
                <ElementToFridge planned={false} sortType={sortType} delFunction={()=>{deleteElement(element.id,true)}} name={element.food.name} date={element.expirationDate} amount={element.quantity} unit={element.food.unit} key={element.id} calories={(element.quantity*element.food.caloriesPerUnit).toFixed(0)} list={element.food.productsWithQuantities} diffInDays={element.diffInDays}></ElementToFridge>
            ))}

            </ul>
        </div>
    );
};

export default List;
