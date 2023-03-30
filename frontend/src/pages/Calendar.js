import List from "../components/LoudList";

function Calendar (){
    return(
        <main className="box">
            <div className="date">
                <div className="date__arrow date__arrow--left"></div>
                <div className="date__text">21.03.2023</div>
                <div className="date__arrow date__arrow--right"></div>
            </div>
            <List></List>
        </main>
    );
};

export default Calendar;