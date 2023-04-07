import React from 'react';
import { Form ,Link} from "react-router-dom";

function LastConfiguration (){
    const date = new Date();
    const currentDate = date.getFullYear().toString() +"-"+(date.getMonth() + 1).toString().padStart(2, '0')+"-"+date.getDate().toString().padStart(2, '0'); 

    return(
        <div className="last-config__box box">
            <Form className="last-config">
                <h2 className="last-config__h2">Już prawie koniec</h2>
                <h2 className="last-config__h4">Jakie jest twoje dzienne zapotrzebowanie kaloryczne?</h2>
                <input step="50" defaultValue={2200} type="number" className="last-config__input"></input>
                <Link to={`/calendar/${currentDate.toString()}`}><button className="last-config__btn">Zakończ</button></Link>
            </Form>
        </div>
    );
}

export default LastConfiguration;