import { Form, Link, NavLink, Outlet, redirect , useNavigation ,useParams } from "react-router-dom";
import DatePanel from "../components/DateNavigation";
import AuthContext from "../store/auth-context";
import React,{ useRef, useState ,useContext, useEffect } from "react";
import { useCookies } from 'react-cookie';

function AddElementToFridge () {
    const navigation = useNavigation();
    let ctx = useContext(AuthContext);

    const isSubmitting = navigation.state === "submitting";
    let amount = useRef();
    const [cookies, setCookie] = useCookies(['totalCal']);

    const [name, setName] = useState("");

    // let [calorie, setCalorie] = useState(0);
    let unit = useRef();
    let calories = useRef();
    let dateRef = useRef();
    let comment = useRef();
    const params = useParams();
    const productOrDish = params.type;

    const setComment = (unit) =>{
        if ( unit == "g"){
         comment.current.textContent = "na 100g";
        }else if (unit == "ml"){
         comment.current.textContent = "na 100ml"
        }else{
         comment.current.textContent = "na 1szt"
        }
     }

    function sendData(event){
  
    }
  
    return(
        <>
            <div className="date-margin"></div>
            <DatePanel date={params.addData} onlyData={true}></DatePanel>

            <div className="fridge addElement__box box">
                <div className="addElement__switch">
                    <NavLink className="addElement__switch--btn" to={`product/${params.addData}`}   >Produkty</NavLink>   
                    <NavLink className="addElement__switch--btn" to={`dish/${params.addData}`}> Dania </NavLink>
                </div>
                <Form className="addElement__form" method="POST" > 
                   <h2>{productOrDish === "product"? "Nowy produkt" : "Nowe danie"}</h2> 
                   
                    <div className='addElement__form--top-panel'>
                   
                        <>
                            <Outlet>
                            </Outlet>
                            <input type="text"  style={{display:"none"}} value={ctx.id}  name="id" readOnly></input>                 
                        </>
                        
                       
                        {/* <div className='checkbox-wrapper'>
                            <input readOnly onClick={()=>{ let newOwn = !own; changeOwm(newOwn) ;ctx.setOwn(newOwn)}} ref={ownRef} name="own" className='addElement__form--own checkbox' type="checkbox"   checked={ctx.createOwn ? true : false}></input>
                            <span>Dodaj {productOrDish === "product"? "własny produkt" : "własne danie"}</span>
                        </div> */}
                    </div>
               
                
                    <div className="addElement__form--bottom-panel">
                        <li>   
                            <h4>Data ważności</h4>
                            <input type="date" className="addElement__form--expirationDate" ref={dateRef}></input>
                        </li>
                        <li>
                            <h4>Ilosc</h4>
                            <input className="addElement__form--amount" type="number" min={0} step={.1} name="amount" ref={amount} value={ctx.amount} onChange={()=>ctx.changeValues(undefined,undefined,amount.current.value)} ></input>
                            <select className="addElement__form--unit" name="unit" ref={unit} value={ctx.unit} readOnly>
                                <option value="szt">szt</option>
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                            </select>
                        </li>
                    </div>
                    <li>
                        <h4>Kalorycznosc
                            {productOrDish === "product" && <p ref={comment} className="addElement__form--comment">na 1szt</p>}
                        </h4>
                        <input className="addElement__form--calories" name="calories" type="number" ref={calories} disabled value={Math.round(ctx.calories*ctx.amount)}></input>
                       
                    </li>
                    <button className="addElement__form--btn" type="submit" onClick={sendData}>{isSubmitting ? "Wysyłanie.. ": "Dodaj"}</button>
                    <Link className="addElement__backLink backLink" to={`/fridge/all`}>Wróć</Link>
                </Form>
            </div>
        </>
    );
};

export default AddElementToFridge;


export async function action({ request, params }) {
    const whereAdd = window.location.href.split("/")[3]; // calendar or fridge
    const currentUrl = window.location.href.split("/")[5]; //dish ,product ,all
    const dateFromLink = window.location.href.split("/")[6]; // date 
    const data = await request.formData();
    let eventData ;
    let url;
    if(data.get('own')){
        eventData= {
            food:{
                name:  data.get('ownName'),
                type: "product",
                unit :data.get('ownUnit'),
                caloriesPerUnit :  data.get('ownUnit') !=="szt" ? parseInt(data.get('ownCalories'))/100 : data.get('ownCalories'),
            },
            quantity: parseFloat(data.get('ownAmount')).toFixed(2),
            expirationDate : dateFromLink,
        };
        url = `http://localhost:8080/fridge/add/new`; 
    }else{
        eventData= {
            food:{
                id : data.get('id'),
                type: "food",
            },
            expirationDate : dateFromLink,
            quantity: parseFloat(data.get('amount')).toFixed(2),
        };
        url = `http://localhost:8080/fridge/add/existing`; 
    }
    console.log(eventData);
    
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
    // console.log(response.json());

    return redirect(`/fridge/${currentUrl}`);

    // if (!response.ok) {
    //   throw json({ message: 'Could not save event.' }, { status: 500 });
    // }
  
  }
 async function sendProducts(sendData) {
    const whereAdd = window.location.href.split("/")[3]; // calendar or fridge
    const currentUrl = window.location.href.split("/")[5]; //dish ,product ,all
    const dateFromLink = window.location.href.split("/")[6]; // date 
    
    let url = `http://localhost:8080/fridge/add/new`; 

    
    // const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(sendData),
    //   });
      console.log(sendData);
  
    window.location.href = `/fridge/${currentUrl}`;
    return null;
    

  };