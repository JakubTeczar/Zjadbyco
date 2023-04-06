import { Link, useLoaderData, useParams } from "react-router-dom";
import React, { useState } from 'react';
import NewElement from "../../components/NewElement";

function ChooseElements () {
    const elements = useLoaderData();
    const params = useParams();
    let typeOfFood;
    if(params.type === "grainProducts"){
        typeOfFood = "Produkty zbożowe";
    }else if(params.type === "vegetablesAndFruits"){
        typeOfFood = "Warzywa i owoce";
    }else if(params.type === "milkProducts"){
        typeOfFood = "Produkty mleczne";
    }else if(params.type === "meat"){
        typeOfFood = "Mięso";
    }else if(params.type === "sweets"){
        typeOfFood = "Słodycze";
    }else if(params.type === "dish"){
        typeOfFood = "Dania";
    }else if(params.type === "drinks"){
        typeOfFood = "Napoje";
    }
    const [pickElements, setpickElements] = useState(new Set());

    const pickFunction =(index)=>{
        const updatedSet = new Set(pickElements);
        console.log(updatedSet);

        if(updatedSet.has(index) ){
            updatedSet.delete(index);
        }else{
            updatedSet.add(index);
        }
        setpickElements(updatedSet);
    };
    
    return (
        <>
            <h2 className="choose-el__h2">Wybierz to co lubisz.</h2>
            <h4 className="choose-el__h4">{typeOfFood}</h4>

            <div className="choose-el__wrapper box"> 
                <div className="choose-el__box">
                    {elements.map((element,index) =>(
                        <NewElement pickClass={pickElements.has(index) ? 'pick' : ''}  key={index} index={index} pickFunction={pickFunction} text={element}></NewElement>
                    ))}
                </div>
            </div>
            <div className="choose-el__bottom-panel">
                <Link className="choose-el__bottom-panel--back backLink">Wstecz</Link>
                <Link className="choose-el__bottom-panel--next">Dalej</Link>
            </div>
        </>
    );
};

export default ChooseElements;

export async function loader ({request , params}){
    
    const url = params.type; //type of food
    console.log(url);
    let elements = ["Ryż","Kasza gryczana","Otręby","Płatki owsiane","Makaron","Chleb pełnoziarnisty","Ziarna quinoa","Jagody amarantusa"];
    return elements;
}