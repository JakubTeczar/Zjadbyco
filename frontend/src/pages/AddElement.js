
import { Form, Link, NavLink, redirect ,useLocation, useNavigation } from "react-router-dom";
import Date from "../components/DateNavigation";
import Elements from "../components/selectField";
import { useRef } from "react";


function AddElement () {
    const location = useLocation();
    const navigation = useNavigation();
    const productOrDish = location.pathname.split("/").pop() === "product" ? true : false ; //jesli produkt to true
    const isSubmitting = navigation.state === "submitting";
    let amount = useRef();
    let name = useRef();
    let unit = useRef();
    let calories = useRef();
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
            <Date></Date>

            {/* <div className="addElement__info">  jak trzeba to odkomentowac to + w css*/} 
                {/* <div className="addElement__info--text"> */}
                    {/* Co juz jest zaplanowane */}
                    {/* <button className="addElement__info--text-btn">rozwiń</button> */}
                {/* </div> */}
                {/* <div className="addElement__info--calories">2300/3400 kcal</div> */}
            {/* </div> */}

            <div className="addElement__box box">
                <div className="addElement__switch">
                    <NavLink className="addElement__switch--btn" to="product">Produkty</NavLink>   
                    <NavLink className="addElement__switch--btn" to="dish"> Dania </NavLink>
                    <div className="addElement__switch--calories">2300/3400 kcal</div>
                </div>
                <Form className="addElement__form" method="POST" >
                    <h2>{productOrDish ? "Nowy produkt" : "Nowe danie"}</h2>

                    <Elements product={productOrDish} nameRef={name}></Elements>
                    
                    
                    <div className="addElement__form--bottom-panel">
                        <li>
                            <h4>Ilosc</h4>
                            <input className="addElement__form--amount" type="number" name="amount" ref={amount} defaultValue={0} ></input>
                            <select className="addElement__form--unit" name="unit" ref={unit}>
                                <option value="szt">szt</option>
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                            </select>
                        </li>
                        <li>
                            <h4>Kalorycznosc</h4>
                            <input className="addElement__form--calories" name="calories" type="number" defaultValue={0} ref={calories}></input>
                        </li>
                    </div>
                    <button className="addElement__form--btn" type="submit"  >{isSubmitting ? "Wysyłanie.. ": "Dodaj"}</button>
                    <Link className="addElement__backLink backLink" to="/calendar">Wróć</Link>
                </Form>
            </div>
        </>
    );
};

export default AddElement;

export async function action({ request, params }) {
    const currentUrl = window.location.href.split("/").pop();
    const from = currentUrl === "product" ? "product" : "dish";
    const data = await request.formData();
  
    const eventData = {
        name: data.get('name'),
        amount: data.get('amount'),
        calories: data.get('calories'),
        unit: data.get('unit'),
        from : from,
    };
  
    let url = 'http://localhost:8080/calendar/addElement';
  
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


    return redirect('/calendar');
    // if (!response.ok) {
    //   throw json({ message: 'Could not save event.' }, { status: 500 });
    // }
  
  }
  
  