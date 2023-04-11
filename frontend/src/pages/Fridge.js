import React ,{ useContext, Suspense, useEffect } from 'react';
import { useLoaderData, Await, Link, Navigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import List from "../components/LoudList";
import AuthContext from "../store/auth-context";

function Fridge (){
    const elements  = useLoaderData();
    // const location = useLocation();
    let url = window.location.href.split('/').pop();
    url = url === "all" ? "product" : url;
    console.log(elements);
    const date = new Date();
    const currentDate = date.getFullYear().toString() +"-"+(date.getMonth() + 1).toString().padStart(2, '0')+"-"+date.getDate().toString().padStart(2, '0'); 
    // useEffect(()=>{
    //     if(url === "fridge"){
    //         Navigate("fridge");
    //     }
    // },[url]);
    const ctx = useContext(AuthContext);
    // const 
    useEffect(()=>{
        ctx.changeValues(0,"",0,"");
        ctx.changeName("");
        ctx.setList([]);
        ctx.setOwn(false);
        ctx.setDishCal(0);
        console.log("reset");
    },[])
    return(
        <>
        <div className="box">
            
              <div className="fridge__switch">
                <NavLink className="fridge__switch--btn" to="product">Produkty</NavLink>   
                <NavLink className="fridge__switch--btn" to="all"> Wszystko </NavLink>
                <NavLink className="fridge__switch--btn" to="dish"> Dania </NavLink>
            </div>
            <div className="fridge__filter">
                <h4 className="fridge__filter--h4">Wyświetl</h4>
                <fieldset>
                    <input className="fridge__filter--radio" type="radio" name="filter" /> Ilość i kalorie
                    <input className="fridge__filter--radio" type="radio" name="filter" /> Czas ważności
                </fieldset>

            </div>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={elements}>
                    {(loadedElements) => <List elements={loadedElements} fridge={true}/>}
                </Await>
            </Suspense>
        </div>
          <Link to={`/fridge/addElement/${url}/${currentDate}`} className="calendar__link"><button className="calendar__add-btn"> Dodaj nowy element</button></Link>
        </>
    );
};

export default Fridge;

export async function loader (){
    // const selectedDate = new Date(2023, 4, 1);

    const response = await fetch("http://localhost:8080/calendar/elements/2023-04-11");
    // const response = await fetch("http://localhost:8080/fridge/elements");

    if(!response.ok){
        console.log("nie działa :(");
        return null;
    }else{
        return response;
        
    }
};