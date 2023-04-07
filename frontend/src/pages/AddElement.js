import React from 'react';
import { Form, Link, NavLink, Outlet, redirect ,useLocation, useNavigation ,useParams } from "react-router-dom";
import DatePanel from "../components/DateNavigation";

import { useRef } from "react";


function AddElement () {
    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";
    let amount = useRef();
    // let name = useRef();
    let unit = useRef();
    let calories = useRef();
    const params = useParams();
    const productOrDish = params.type;
    // let form = useRef();
    // function submitForm(event){
    //     event.preventDefault();
    //     form.current.reset();
    //     // amount.current.value = 0;
    //     // name.current.value = "";
    //     // calories.current.value = 0;
    //     // unit.current.value = "szt";
    // }

    return(
        <>
            <div className="date-margin"></div>
            <DatePanel date={params.addData} onlyData={true}></DatePanel>

            {/* <div className="addElement__info">  jak trzeba to odkomentowac to + w css*}   */}
                {/* <div className="addElement__info--text"> */}
                    {/* Co juz jest zaplanowane */}
                    {/* <button className="addElement__info--text-btn">rozwiń</button> */}
                {/* </div> */}
                {/* <div className="addElement__info--calories">2300/3400 kcal</div> */}
            {/* </div> */}

            <div className="addElement__box box">
                <div className="addElement__switch">
                    <NavLink className="addElement__switch--btn" to={`product/${params.addData}`}>Produkty</NavLink>   
                    <NavLink className="addElement__switch--btn" to={`dish/${params.addData}`}> Dania </NavLink>
                    <div className="addElement__switch--calories">2300/3400 kcal</div>
                </div>
                <Form className="addElement__form" method="POST" >
                    <h2>{productOrDish === "product"? "Nowy produkt" : "Nowe danie"}</h2>

                    <Outlet>
                    </Outlet>
               
                    
                    
                    <div className="addElement__form--bottom-panel">
                        <li>
                            <h4>Ilosc</h4>
                            <input className="addElement__form--amount" type="number" min={0} step={.1} name="amount" ref={amount} defaultValue={0} ></input>
                            <select className="addElement__form--unit" name="unit" ref={unit}>
                                <option value="szt">szt</option>
                                <option value="szt">l</option>
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                            </select>
                        </li>
                        <li>
                            <h4>Kalorycznosc</h4>
                            <input className="addElement__form--calories" name="calories" type="number" defaultValue={0} ref={calories} disabled></input>
                        </li>
                    </div>
                    <button className="addElement__form--btn" type="submit"  >{isSubmitting ? "Wysyłanie.. ": "Dodaj"}</button>
                    <Link className="addElement__backLink backLink" to={`/calendar/${params.addData}`}>Wróć</Link>
                </Form>
            </div>
        </>
    );
};

export default AddElement;


export async function action({ request, params }) {
    const whereAdd = window.location.href.split("/")[3]; // calendar or fridge
    const currentUrl = window.location.href.split("/")[5]; //dish ,product ,all
    const dateFromLink = window.location.href.split("/")[6]; // date 
    const data = await request.formData();
  
    const eventData = {
        name: data.get('name'),
        amount: data.get('amount'),
        calories: data.get('calories'),
        unit: data.get('unit'),
        from : currentUrl,
        date : dateFromLink,
    };
  
    let url = `http://localhost:8080/${whereAdd}/addElement/${currentUrl}`; //dodać
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
  
    // if (response.status === 422) {
    //   return response;
    // }
    console.log(JSON.stringify(eventData));
    console.log(response.json());

    if (whereAdd === "calendar"){
        return redirect(`/calendar/${dateFromLink}`);
    }else{
        return redirect(`/fridge/${currentUrl}/${dateFromLink}`);
    }

    // if (!response.ok) {
    //   throw json({ message: 'Could not save event.' }, { status: 500 });
    // }
  
  }


  
  