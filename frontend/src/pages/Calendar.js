import { Link } from "react-router-dom";
import List from "../components/LoudList";
import Date from "../components/DateNavigation";
import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';

function Calendar (){
    const elements  = useLoaderData(); // tu ma byc elements a nie { elements }
    console.log(elements);
    return(
        <>
        <main className="box">
            <Date></Date>

            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={elements}>
                    {(loadedElements) => <List elements={loadedElements} />}
                </Await>
            </Suspense>
            
            <div className="bottom-panel">
                <button className="bottom-panel__btn"> Generuj automatycznie </button> {/* tu jak nic nie w liście to przycisk dodaj  */}
                <div className="bottom-panel__info">3450kcal / 3200kcal</div>
            </div>
          
        </main>
        <Link to="addElement/product" className="calendar__link"><button className="calendar__add-btn"> Dodaj nowy element</button></Link>
        </>
    );
};

export default Calendar;

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