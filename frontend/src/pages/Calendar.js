import { Link } from "react-router-dom";
import List from "../components/LoudList";
import Date from "../components/DateNavigation";

function Calendar (){
    return(
        <>
        <main className="box">
            <Date></Date>
            <List></List> 
            <div className="bottom-panel">
                <button className="bottom-panel__btn"> Generuj automatycznie </button> {/* tu jak nic nie w liście to przycisk dodaj  */}
                <div className="bottom-panel__info">3450kcal / 3200kcal</div>
            </div>
          
        </main>
        <Link to="edit" className="calendar__link"><button className="calendar__add-btn"> Dodaj nowy element</button></Link>
        </>
    );
};

export default Calendar;