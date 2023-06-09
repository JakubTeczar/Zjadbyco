import React from 'react';
import { Link} from "react-router-dom";

function Hello () {
    return (
        <div className="hello"> 
            <h1>Witaj</h1>
            <div className="hello__box">
            <h4 className="hello__box--text1"><b>Ta aplikacja pomoże ci</b> w planowaniu posiłków podczas dnia <span></span> oraz tworzenia listy zakupów</h4>
            <h4 className="hello__box--text2">Przed pierwszym uruchomieniem naszej aplikacji <span></span> <b>podaj nam co lubisz jeść.</b></h4>
            </div>
            <Link to="chooseElements/grainProducts"><button className="hello__btn">Zaczynajmy</button></Link>
        </div>
    );
};

export default Hello;