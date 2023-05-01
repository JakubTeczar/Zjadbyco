import React from 'react';
import {useLoaderData, Await} from "react-router-dom";
import { Suspense } from 'react';
import List from "../components/LoudList";

function Shopping (){
    const elements  = useLoaderData()
 
    return(
        <>
        <div className="shopping__box box">
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={elements}>
                    {(loadedElements) => <List elements={loadedElements} isShopping={true}/>}
                </Await>
            </Suspense>
            {/* <button className='shopping__print-list' onClick={()=>{window.print()}}>Drukuj listę zakupów</button> */}
        </div>
            <button className="shopping__add-btn"> Generuj listę zakupów</button>
        </>
    );
};

export default Shopping;

export async function loader ({request,params}){
    // const selectedDate = new Date(2023, 4, 1);
    console.log(params.urlDate);
    const response = await fetch(`http://localhost:8080/calendar/elements/2023-05-01`);

    if(!response.ok){
        console.log("nie działa :(");
        return null;
    }else{
        return response;
        
    }
};