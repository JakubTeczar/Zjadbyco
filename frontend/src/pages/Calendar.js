import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import List from "../components/LoudList";
import DatePanel from "../components/DateNavigation";
import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import AuthContext from "../store/auth-context";
import { useCookies } from 'react-cookie';

function Calendar (){
    const elements  = useLoaderData(); // tu ma byc elements a nie { elements }
    const [cookies, setCookie] = useCookies(['totalCal','ownDishName']);
    console.log(elements);
    const params = useParams();
    const ctx = useContext(AuthContext);
    const [calories,setCalories] = useState(0);

    useEffect(()=>{
        let caloriesBuffor = 0;
        if(elements !== undefined){
            elements.forEach(el => {
                caloriesBuffor += Math.round( el.quantity *el.food.caloriesPerUnit);
            });
        }else{
            setCalories(0);
            setCookie('totalCal', 0);
   
        }
        setCookie('ownDishName','');
        console.log(elements);
        setCookie('totalCal', caloriesBuffor);
        setCalories(caloriesBuffor);

    },[elements])

    
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
        <main className="box">
            <DatePanel date={params.date} localization={"calendar"}></DatePanel>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Ładowanie...</p>}>
                <Await resolve={elements}>
                    {(loadedElements) => <List elements={loadedElements} />}
                </Await>
            </Suspense>
            
            <div className="bottom-panel">
            {/* <Link to={`/calendar/generateElements`}><button className="bottom-panel__btn"> Generuj automatycznie </button></Link> */}
            {/* <Link to={`/calendar/generateElements`}><button className="bottom-panel__btn"> Zapisz </button></Link> */}
                 {/* <button className="bottom-panel__info-btn info-btn">? <span>Stworzy automatycznie co chcesz i nie tylko wiesz o co chodzi mordo</span></button>tu jak nic nie w liście to przycisk dodaj  */}
                <div className="bottom-panel__info">{calories}kcal / 3200kcal</div>
            </div>
          
        </main>
        <Link to={`/calendar/addElement/product/${params.date}`} className="calendar__link"><button className="calendar__add-btn"> Dodaj nowy element</button></Link>
        </>
    );
};

export default Calendar;

export async function loader ({request,params}){
    // const selectedDate = new Date(2023, 4, 1);

    const urlDate =params.date;
  
    const response = await fetch(`http://localhost:8080/calendar/elements/${urlDate}`);
    
    if(!response.ok){
        console.log("nie działa :(");
        return null;
    }else{
        return response;
        
    }
};