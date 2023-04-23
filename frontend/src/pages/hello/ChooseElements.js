import { Link, useLoaderData, useParams, useSubmit } from "react-router-dom";
import React, { useContext, useState } from 'react';
import NewElement from "../../components/NewElement";
import AuthContext from "../../store/auth-context";
function ChooseElements () {
    const elements = useLoaderData();
    const params = useParams();
    const ctx = useContext(AuthContext);
    const tabTypeOfFood = ["grainProducts","vegetablesAndFruits","milkProducts","meat","sweets","dish","drinks","other"];
    const translateTab = ["Produkty zbożowe","Warzywa i owoce","Produkty mleczne","Mięso","Słodycze","Dania","Napoje","Inne"];
    const currentIndex = tabTypeOfFood.indexOf(params.type);
    const typeOfFood =translateTab[currentIndex];

    const [pickElements, setpickElements] = useState(new Set());

    const pickFunction =(index)=>{
        const updatedSet = new Set(pickElements);
        
        if(updatedSet.has(index) ){
            updatedSet.delete(index);
        }else{
            updatedSet.add(index);
        }
        setpickElements(updatedSet);

        // for (let element of updatedSet){
        //     console.log(elements[element]);
        // }
        console.log(updatedSet);
    };
    function SendIndexes(){
    //    const data ={
    //     elements: Array.from(pickElements),
    //     type : params.type
    //    } ;
        // action();
       ctx.setUserConfig(Array.from(pickElements));
    }
    return (
        <>
            <h2 className="choose-el__h2">Wybierz to co lubisz.</h2>
            <h4 className="choose-el__h4">{typeOfFood}</h4>

            <div className="choose-el__wrapper box"> 
                <div className="choose-el__box">
                    {elements.map((element) =>(
                        <NewElement pickClass={pickElements.has(element.id) ? 'pick' : ''}  key={element.id} index={element.id} pickFunction={pickFunction} text={element.name}></NewElement>
                    ))}
                </div>
            </div>
            <div className="choose-el__bottom-panel">
                {(currentIndex!==0) &&  <Link to={`/hello/chooseElements/${tabTypeOfFood[currentIndex-1]}`} className="choose-el__bottom-panel--back backLink">Wstecz</Link>}
                {(currentIndex!==7) &&  <Link to={`/hello/chooseElements/${tabTypeOfFood[currentIndex+1]}`} className="choose-el__bottom-panel--next">Dalej</Link>}
                {(currentIndex===7) &&  <Link onClick={SendIndexes}     to={`/hello/lastConfiguration`} className="choose-el__bottom-panel--next">Dalej</Link>}
            </div>
         
        </>
    );
};

export default ChooseElements;

export async function loader ({request , params}){
    
    const url = params.type; //type of food
    const tabTypeOfFood = ["grainProducts","vegetablesAndFruits","milkProducts","meat","dish","drinks","ownProducts","other","sweets"];
    const categoryId =  (tabTypeOfFood.indexOf(url)) +1;
    console.log(url);
    const elements = await fetch(`http://localhost:8080/food/by-category/${categoryId}`);
    // let elements = ["Ryż","Kasza gryczana","Otręby","Płatki owsiane","Makaron","Chleb pełnoziarnisty","Ziarna quinoa","Jagody amarantusa"];

    return elements;
}

// async function action (data){
//     console.log(data);
//     return null;
// }