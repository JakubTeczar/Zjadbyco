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
    
    let [own, setOwn] = useState(ctx.createOwn);
    const [name, setName] = useState("");

    let [calorie, setCalorie] = useState(0);
    let unit = useRef();
    let calories = useRef();
    const params = useParams();
    const productOrDish = params.type;
    useEffect(()=>{
        setCalorie(ctx.calories);
        console.log(ctx.calories);
    },[ctx]);
    let ownRef = useRef();
    // useEffect(()=>{
    // if(own){
    //     // ownRef.current.checked = ctx.createOwn;
    //     console.log(ctx.createOwn,ownRef.current.value );
    // }
       
    // },[ctx.createOwn])
    
    let ownNameRef = useRef();
    function sendData(event){
        if(own && productOrDish ==="dish" ){
            event.preventDefault();
            
            const formData = {
                ownName: name,
                calories: ctx.dishCalories,
                list: ctx.listProducts,
                quantity: ctx.amount,
                own : true
            };
            console.log("dupa");

            sendProducts(formData);
        }
    }
  
    
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
                    <NavLink className="addElement__switch--btn" to={`product/${params.addData}`}  onClick={()=>{ctx.setOwn(false); ctx.changeName("");}}  >Produkty</NavLink>   
                    <NavLink className="addElement__switch--btn" to={`dish/${params.addData}`} onClick={()=>{ctx.setOwn(false); ctx.changeName("");}} > Dania </NavLink>
                    <div className="addElement__switch--calories">2300/3400 kcal</div>
                </div>
                <Form className="addElement__form" method="POST" >
                    <h2>{productOrDish === "product"? "Nowy produkt" : "Nowe danie"}</h2>
                   
                    <div className='addElement__form--top-panel'>
                        {!own &&
                        <>
                            <Outlet>
                            </Outlet>
                            <input type="text"  style={{display:"none"}} value={ctx.id}  name="id"></input>                 
                        </>
                        }
                        {own && productOrDish ==="dish" &&
                            <>
                                <input type="text" className="addElement__form--name dish-own-name" name="ownName" ref={ownNameRef} onChange={()=>setName(ownNameRef.current.value)}></input>
                                <Link to={`/calendar/addProducts/${params.addData}`}><button className="addElement__form--add-products">Dodaj produkty</button></Link>
                            </>
                        }
                        {own &&  productOrDish ==="product" &&
                        <input type="text" className="addElement__form--name" name="ownName" ></input>
                        }
                        <div className='checkbox-wrapper'>
                            <input onChange={()=>{ let newOwn = !own; setOwn(newOwn) ;ctx.setOwn(newOwn)}} ref={ownRef} name="own" className='addElement__form--own checkbox' type="checkbox"   checked={ctx.createOwn ? true : false}></input>
                            <span>Dodaj {productOrDish === "product"? "własny produkt" : "własne danie"}</span>
                        </div>
                    </div>
                    {own && productOrDish ==="dish" &&
                        <>
                            <div className="addElement__form--products-list"></div>
                        </>
                    }
                    <div className="addElement__form--bottom-panel">
                        <li>
                            <h4>Ilosc</h4>
                            {!own &&<input className="addElement__form--amount" type="number" min={0} step={.1} name="amount" ref={amount} value={ctx.amount} onChange={()=>ctx.changeValues(undefined,undefined,amount.current.value)} defaultValue={0} ></input>}
                            {own && productOrDish === "dish" && <input className="addElement__form--amount" type="number"  ref={amount} min={0} step={.1} name="ownAmount" value={ctx.amount} onChange={()=>ctx.changeValues(undefined,undefined,amount.current.value)} defaultValue={0} ></input>}
                            {own && productOrDish === "product" &&<input className="addElement__form--amount" type="number" min={0} step={.1} name="ownAmount"  defaultValue={0} ></input>}
                            {!own &&<select className="addElement__form--unit" name="unit" ref={unit} value={ctx.unit}>
                                <option value="szt">szt</option>
                                <option value="szt">l</option>
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                            </select>
                            }
                            {own &&<select className="addElement__form--unit" name="ownUnit" ref={unit} >
                                <option value="szt">szt</option>
                                <option value="szt">l</option>
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                            </select>
                            }
                        </li>
                        <li>
                            <h4>Kalorycznosc</h4>
                            {!own &&<input className="addElement__form--calories" name="calories" type="number" ref={calories} disabled value={Math.round(ctx.calories*ctx.amount)}></input>}
                            {own && productOrDish === "product" && <input className="addElement__form--calories" name="ownCalories" type="number" defaultValue={0}  ></input>}
                            {own && productOrDish === "dish" && <input className="addElement__form--calories" name="ownCalories" type="number" defaultValue={0} value={Math.round(ctx.dishCalories*ctx.amount)} disabled ></input>}
                        </li>
                    </div>
                    <button className="addElement__form--btn" type="submit" onClick={sendData}>{isSubmitting ? "Wysyłanie.. ": "Dodaj"}</button>
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
            quantity: parseFloat(data.get('ownAmount')).toFixed(2),
            unit: data.get('ownUnit'),
            calories: data.get('ownCalories'),
            date : dateFromLink,
            own : true
        };
    }else{
        eventData= {
            name: data.get('name'),
            quantity: parseFloat(data.get('amount')).toFixed(2),
            unit: data.get('unit'),
            id: data.get('id'),
            date : dateFromLink,
            own: false
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
 async function sendProducts(sendData) {
    const whereAdd = window.location.href.split("/")[3]; // calendar or fridge
    const currentUrl = window.location.href.split("/")[5]; //dish ,product ,all
    const dateFromLink = window.location.href.split("/")[6]; // date 
    
    let url = `http://localhost:8080/${whereAdd}/addElement/${currentUrl}`; 

    
    const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      });
      console.log(sendData);
    if (whereAdd === "calendar"){
        return redirect(`/calendar/${dateFromLink}`);
    }else{
        return redirect(`/fridge/${currentUrl}/${dateFromLink}`);
    }

  };


  
  