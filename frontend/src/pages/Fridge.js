import React ,{ useContext, Suspense, useEffect, useState, useRef } from 'react';
import { useLoaderData, Await, Link, Navigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import List from "../components/LoudList";
import AuthContext from "../store/auth-context";
import arrowImg from "../img/arrow.svg";
function Fridge (){
    let dateFromServer  = useLoaderData();
    // const location = useLocation();
    let url = window.location.href.split('/').pop();
    url = url === "all" ? "product" : url;
    const [sortType , setSortType] = useState("time");
    dateFromServer = dateFromServer.map(e=>e={...e , diffInDays: Math.ceil( (Math.abs(new Date() - new Date(e.date)) )/ (1000 * 60 * 60*24))} )
    const [elements , setElements]= useState( dateFromServer);
    let imgRef = useRef();
    const [order , setOrder] = useState(false);
    // dodaje do każdego obiektu różnice dni między datą ważności a dnim dzisiejszym
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

    const sortElements = (sortType , order) =>{
        console.log(sortType , order);
        let elementsCopy = [...elements] ;
        if(sortType === "calories"){

            setSortType("calories")
            if (order){
                setElements(elementsCopy.sort((a,b)=>(a.food.caloriesPerUnit*a.quantity) - b.food.caloriesPerUnit*b.quantity));
            }else{
                setElements((elementsCopy.sort((a,b)=>(a.food.caloriesPerUnit*a.quantity) - b.food.caloriesPerUnit*b.quantity)).reverse());
            }
        }else{

            setSortType("time")
            if (order){
                setElements(elementsCopy.sort((a,b)=>a.diffInDays - b.diffInDays) );
            }else{
                setElements((elementsCopy.sort((a,b)=>a.diffInDays - b.diffInDays)).reverse() );
            }
        }


    }
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
                    <input className="fridge__filter--radio" type="radio" name="filter" value="calories" onClick={()=>{sortElements("calories" , order)} }/> Ilość i kalorie
                    <input className="fridge__filter--radio" type="radio" name="filter" value="time" defaultChecked onClick={()=>{sortElements("time" , order)}}/> Czas ważności
                    <img ref={imgRef} src={arrowImg} onClick={()=>{let degrees = order ? -90 : 90;let orderCopy = order ;sortElements(sortType , !orderCopy);  setOrder(!orderCopy) ;imgRef.current.style.transform = "rotate("+degrees+"deg)" }} alt="Opis obrazka"/>
                </fieldset>
       
            </div>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={elements}>
                    {(loadedElements) => <List elements={loadedElements} sortType={sortType}  fridge={true}/>}
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

    const response = await fetch("http://localhost:8080/calendar/elements/2023-04-28");
    // const response = await fetch("http://localhost:8080/fridge/elements");

    if(!response.ok){
        console.log("nie działa :(");
        return null;
    }else{
        return response;
        
    }
};