import { Link } from "react-router-dom";
import React, { useState } from 'react';
import NewElement from "../../components/NewElement";

function ChooseElements () {
    let elements = ["Ryż","Kasza gryczana","Otręby","Płatki owsiane","Makaron","Chleb pełnoziarnisty","Ziarna quinoa","Jagody amarantusa"];

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
            <h4 className="choose-el__h4">Produkty zbożowe</h4>

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