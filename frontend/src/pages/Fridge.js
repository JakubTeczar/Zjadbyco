import { Suspense, useEffect } from 'react';
import { useLoaderData, Await, useLocation, Navigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import List from "../components/LoudList";
function Fridge (){
    const elements  = useLoaderData();
    // const location = useLocation();
    // const url = location.pathname.split('/').pop();
    // useEffect(()=>{
    //     if(url === "fridge"){
    //         Navigate("fridge");
    //     }
    // },[url]);
   
    return(
        <div className="box">
            
              <div className="fridge__switch">
                <NavLink className="fridge__switch--btn" to="product">Produkty</NavLink>   
                <NavLink className="fridge__switch--btn" to="all"> Wszystko </NavLink>
                <NavLink className="fridge__switch--btn" to="dish"> Dania </NavLink>
            </div>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={elements}>
                    {(loadedElements) => <List elements={loadedElements} />}
                </Await>
            </Suspense>
        </div>
    );
};

export default Fridge;

export async function loader (){
    // const selectedDate = new Date(2023, 4, 1);

    const response = await fetch("http://localhost:8080/calendar/elements");

    if(!response.ok){
        console.log("nie działa :(");
        return null;
    }else{
        return response;
        
    }
};