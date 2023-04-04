import { Link, useNavigate, useParams } from "react-router-dom";
import List from "../components/LoudList";
import DatePanel from "../components/DateNavigation";
import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';

function Calendar (){
    const elements  = useLoaderData(); // tu ma byc elements a nie { elements }
    const params = useParams();
    const navigate = useNavigate();

    const changeDay = (direction)=> {
        console.log(direction);
        const date = params.date.split("-");
        const createDate = new Date(date[0], (date[1]-1), date[2]);
        const selectedDate =direction === "left" ? new Date(createDate.getTime() - (24 * 60 * 60 * 1000)) : new Date(createDate.getTime() + (24 * 60 * 60 * 1000)); 
        const changeToDate = selectedDate.getFullYear().toString() +"-"+(selectedDate.getMonth() + 1).toString().padStart(2, '0')+"-"+selectedDate.getDate().toString().padStart(2, '0'); 
        navigate(`/calendar/${changeToDate}`);    
    }
    return(
        <>
        <main className="box">
            <DatePanel date={params.date} changeDay={changeDay}></DatePanel>

            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={elements}>
                    {(loadedElements) => <List elements={loadedElements} />}
                </Await>
            </Suspense>
            
            <div className="bottom-panel">
                 <button className="bottom-panel__btn"> Generuj automatycznie </button>{/* tu jak nic nie w liście to przycisk dodaj  */}
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
    const url =window.location.href.split("/")[4];
    const response = await fetch(`http://localhost:8080/calendar/elements/${url}`);

    if(!response.ok){
        console.log("nie działa :(");
        return null;
    }else{
        return response;
        
    }
};