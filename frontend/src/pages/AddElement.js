import { Form, Link, NavLink, Outlet, redirect , useNavigation ,useParams } from "react-router-dom";
import DatePanel from "../components/DateNavigation";
import AuthContext from "../store/auth-context";
import React,{ useRef, useState ,useContext, useEffect } from "react";


function AddElement () {
    const navigation = useNavigation();
    let ctx = useContext(AuthContext);
 
    console.log();

    const isSubmitting = navigation.state === "submitting";
    let amount = useRef();
    let [own, setOwn] = useState(true);
    let [calorie, setCalorie] = useState(0);
    let unit = useRef();
    let calories = useRef();
    const params = useParams();
    const productOrDish = params.type;
    useEffect(()=>{
        setCalorie(ctx.calories);
        console.log(ctx.calories);
    },[ctx]);
    // let form = useRef();
    // function submitForm(event){
    //     event.preventDefault();
    //     form.current.reset();
    //     // amount.current.value = 0;
    //     // name.current.value = "";
    //     // calories.current.value = 0;
    //     // unit.current.value = "szt";
    // }
    // const calculateCalories=()=>{
    //     console.log("kalorie");
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

                        
                   
                   
                    <div className='addElement__form--top-panel'>
                    
                    {own &&
                    <>
                        <Outlet>
                        </Outlet>
                        <input type="text"  style={{display:"none"}} value={ctx.id}  name="id"></input>                 
                    </>
                    }
                    {!own &&
                    <input type="text" className="addElement__form--name" name="ownName"></input>
                    }
                        <div className='checkbox-wrapper'>
                            <input onChange={()=>setOwn(!own)} name="own" className='addElement__form--own checkbox' type="checkbox"></input>
                            <span>Dodaj {productOrDish === "product"? "własny produkt" : "własne danie"}</span>
                        </div>
                    </div>
                 
                    <div className="addElement__form--bottom-panel">
                        <li>
                            <h4>Ilosc</h4>
                            {own &&<input className="addElement__form--amount" type="number" min={0} step={.1} name="amount" ref={amount} value={ctx.amount} onChange={()=>ctx.changeValues(undefined,undefined,amount.current.value)} defaultValue={0} ></input>}
                            {!own &&<input className="addElement__form--amount" type="number" min={0} step={.1} name="ownAmount"  defaultValue={0} ></input>}
                            {own &&<select className="addElement__form--unit" name="unit" ref={unit} value={ctx.unit}>
                                <option value="szt">szt</option>
                                <option value="szt">l</option>
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                            </select>
                            }
                            {!own &&<select className="addElement__form--unit" name="ownUnit" ref={unit} >
                                <option value="szt">szt</option>
                                <option value="szt">l</option>
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                            </select>
                            }
                        </li>
                        <li>
                            <h4>Kalorycznosc</h4>
                            {own &&<input className="addElement__form--calories" name="calories" type="number" ref={calories}  disabled value={(ctx.calories*ctx.amount)}></input>}
                            {!own &&<input className="addElement__form--calories" name="ownCalories" type="number" defaultValue={0}  ></input>}
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
    let eventData ;
   
    if(data.get('own')){
        eventData= {
            name: data.get('ownName'),
            amount: data.get('ownAmount'),
            unit: data.get('ownUnit'),
            calories: data.get('ownCalories'),
            date : dateFromLink,
        };
    }else{
        eventData= {
            name: data.get('name'),
            amount: data.get('amount'),
            unit: data.get('unit'),
            id: data.get('id'),
            date : dateFromLink,
        };
    }
    console.log(eventData);
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


  
  