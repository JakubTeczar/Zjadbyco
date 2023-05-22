import React, { useEffect, useRef, useState } from 'react';
import {useLoaderData, Await, useActionData} from "react-router-dom";
import { Suspense } from 'react';
import List from "../components/LoudList";

function Shopping (){
    let elements = useLoaderData();
    const [manualEl , setManualEl] = useState(false);
    const dateInput = useRef();
    const options = useRef();
    const comment = useRef();
    async function generateList (){
        if(window.getComputedStyle(options.current).display === "none"){
            options.current.style.display = "block";
        }
        if(dateInput.current.value !== ""){
            const loaderDiv = document.querySelector(".loading-screen");
            loaderDiv.style.display = "block";
            const currentDate = new Date().getFullYear()+"-"+String(new Date().getMonth() + 1).padStart(2, '0')+"-"+String(new Date().getDate()).padStart(2, '0');
            const url = `http://localhost:8080/shopping/generate?start=${currentDate}&end=${dateInput.current.value}`; 
            const response =await listAction(url);
            elements = await response;
            setManualEl(elements);
            console.log(true, elements);
            loaderDiv.style.display = "none";
        }
   
    }

    return(
        <>
        <div className="shopping__box box">
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={elements}>
                    {!manualEl && ((loadedElements) => <List elements={loadedElements} isShopping={true}/>)}
                </Await>
            </Suspense>
            {manualEl && (<List elements={manualEl} isShopping={true}/>)}
            {/* <button className='shopping__print-list' onClick={()=>{window.print()}}>Drukuj listę zakupów</button> */}
        </div>
            <button className="shopping__add-btn" onClick={()=>generateList()}>Generuj</button>
            <div ref={options} style={{display:"none"}}>
                <h2 className='shopping__h2'>Stwórz listę zakupów do dnia</h2>
                <input className="shopping__input" type='date' ref={dateInput} onChange={()=>{if(dateInput.current.value !==""){ comment.current.textContent = ""}}}></input>
                <div className='shopping__comment' ref={comment} >Podaj datę</div>
            </div>
  
        </>
    );
};

export default Shopping;

export async function loader ({request,params}){

    const response = await fetch(`http://localhost:8080/shopping/get`);
    //
    if(!response.ok){
        console.log("nie działa :(");
        return null;
    }else{
        return response;
        
    }
};
export async function listAction (url){

    const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        }
    });
    return response.json();

};