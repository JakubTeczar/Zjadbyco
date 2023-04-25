import React,{ useContext, useRef} from 'react';
import { Form ,Link, redirect} from "react-router-dom";
import AuthContext from '../../store/auth-context';

function LastConfiguration (){
    const ctx = useContext(AuthContext);
    const calorieInput = useRef();
    const EndConfiguration =()=>{
        action([ctx.configurationSettings ,calorieInput.current.value],currentDate);

        // console.log(`/calendar/${currentDate.toString()}`);
    }

    const date = new Date();
    const currentDate = date.getFullYear().toString() +"-"+(date.getMonth() + 1).toString().padStart(2, '0')+"-"+date.getDate().toString().padStart(2, '0'); 

    return(
        <div className="last-config__box box">
            <Form className="last-config">
                <h2 className="last-config__h2">Już prawie koniec</h2>
                <h2 className="last-config__h4">Jakie jest twoje dzienne zapotrzebowanie kaloryczne?</h2>
                <input step="50" defaultValue={2200} ref={calorieInput} type="number" className="last-config__input"></input>
               <button className="last-config__btn" onClick={EndConfiguration}>Zakończ</button>
            </Form>
        </div>
    );
}

export default LastConfiguration;

async function action (data,date){
    console.log(data);
    // return null;
    window.location.href = `/calendar/${date.toString()}`;
    return null;
}