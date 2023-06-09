import { Form, Link, NavLink, Outlet, redirect , useNavigation ,useParams } from "react-router-dom";
import DatePanel from "../components/DateNavigation";
import AuthContext from "../store/auth-context";
import React,{ useRef, useState ,useContext, useEffect } from "react";
import { useCookies } from 'react-cookie';

function AddElementToCal () {
    const navigation = useNavigation();
    let ctx = useContext(AuthContext);

    const isSubmitting = navigation.state === "submitting";
    let amount = useRef();
    
    const [name, setName] = useState("");
    // const [totallCal, setTotalCal] = useState(ctx.currentCalories+Math.round(ctx.dishCalories*ctx.amount));
    const [cookies, setCookie] = useCookies(['totalCal',"openingLocation"]);
    const [totalCal ,setTotalCal] = useState(parseInt(cookies.totalCal));

    // let [calorie, setCalorie] = useState(0);
    const unit = useRef();
    const calories = useRef();
    const topPanel = useRef();
    const selectField = useRef();
    const params = useParams();
    const productOrDish = params.type;

    useEffect(()=>{
        checkSelectField(selectField);
        if(ctx.id !== ""){
            checkInputAmonut(amount);
        }
     },[ctx.unit,ctx.id])

    const checkForm = (e)=>{
        let formIsCorrect = true;
        if(parseInt(calories.current.value) === 0){
            const wrapper = topPanel.current.querySelector(".addElement__form--wrapper");
            wrapper.classList.add("invalid");
            formIsCorrect = false;
        }
        if(amount.current.value <= 0){
            amount.current.classList.add("invalid");
            formIsCorrect = false;
        }
        if(!formIsCorrect){
            e.preventDefault();
        }
    }
    
    const checkSelectField = (input)=>{
        const wrapper = topPanel.current.querySelector(".addElement__form--wrapper");
        if(input.current.value !== ""){
            wrapper.classList.add("correct");
        }else{
            wrapper.classList.remove("invalid");
        }
    }
    const checkInputAmonut = (input)=>{
        if (input.current.value <= 0 ){
            input.current.classList.remove("correct");
            input.current.classList.add("invalid");
        }else{
            input.current.classList.add("correct");
        }
    }
    const backToDefault = () =>{
        ctx.changeName("");
        ctx.changeValues(0,"",0,"");

        amount.current.classList.remove("invalid");
        amount.current.classList.remove("correct");
        const wrapper = topPanel.current.querySelector(".addElement__form--wrapper");
        wrapper.classList.remove("invalid");
        wrapper.classList.remove("correct");
    }
    return(
        <>
            <div className="date-margin"></div>
            <DatePanel date={params.addData} onlyData={true}></DatePanel>

            <div className="addElement__box box">
                <div className="addElement__switch">
                    <NavLink className="addElement__switch--btn" to={`product/${params.addData}`} onClick={()=>{backToDefault()}} >Produkty</NavLink>   
                    <NavLink className="addElement__switch--btn" to={`dish/${params.addData}`}  onClick={()=>{backToDefault()}}> Dania </NavLink>
                    <div className="addElement__switch--calories">{parseInt( cookies.totalCal )+Math.round(ctx.calories*ctx.amount)}/3400 kcal</div>
                </div>
                <Form className="addElement__form" method="POST" >
                    <h2>{productOrDish === "product"? "Dodaj produkt" : "Dodaj danie"}</h2>
                   
                    <div className='addElement__form--top-panel' ref={topPanel}>
                  
                        <>
                            <Outlet>
                            </Outlet>
                            <input type="text" ref={selectField} style={{display:"none"}} value={ctx.id}  name="id" readOnly></input>                 
                        </>
                        <Link to={`/settings/add/${productOrDish}`} onClick={()=>setCookie("openingLocation", `/calendar/addElement/${productOrDish}/${params.addData}`,{ sameSite: 'none', secure: true })} className="addElement__form--add-new">Stworz nowy</Link>
                        {/* <div className='checkbox-wrapper'>
                            <input onClick={()=>{ let newOwn = !own; changeOwm(newOwn) ;ctx.setOwn(newOwn)}} ref={ownRef} name="own" className='addElement__form--own checkbox' type="checkbox"   checked={ctx.createOwn ? true : false} readOnly></input>
                            <span>Dodaj {productOrDish === "product"? "własny produkt" : "własne danie"}</span>
                        </div> */}
                    </div>
                    <div className="addElement__form--bottom-panel">
                        <li>
                            <h4>Ilosc</h4>
                           <input className="addElement__form--amount" type="number" min={0} step={.1} name="amount" ref={amount} value={ctx.amount} onChange={()=>{ctx.changeValues(undefined,undefined,amount.current.value);checkInputAmonut(amount)}} ></input>
                           <select className="addElement__form--unit" name="unit" ref={unit} value={ctx.unit}  readOnly disabled>
                                <option value="szt">szt</option>
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                            </select>
                        </li>
                        <li>
                            <h4>Kalorycznosc
                            </h4>
                           <input className="addElement__form--calories" name="calories" type="number" ref={calories} disabled value={Math.round(ctx.calories*ctx.amount)}  ></input>
                        </li>
                    </div>
                    <button className="addElement__form--btn"  onClick={(e)=>checkForm(e)} type="submit" >{isSubmitting ? "Wysyłanie.. ": "Dodaj"}</button>
                    <Link className="addElement__backLink backLink" to={`/calendar/${params.addData}`}>Wróć</Link>
                </Form>
            </div>
        </>
    );
};

export default AddElementToCal;


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
                caloriesPerUnit : data.get('ownUnit') !=="szt" ? parseInt(data.get('ownCalories'))/100 : data.get('ownCalories') ,
            },
            quantity: parseFloat(data.get('ownAmount')).toFixed(2),
            date : dateFromLink,
        };
        url = `http://localhost:8080/calendar/add/new`; 
    }else{
        eventData= {
            food:{
                id : data.get('id'),
                type: "food",
            },
            date : dateFromLink,
            quantity: parseFloat(data.get('amount')).toFixed(2),
        };
        url = `http://localhost:8080/calendar/add/existing`; 
    }
    console.log(eventData);
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
  
    // if (!response.ok) {
    //     throw console.error({ message: 'Could not save event.' }, { status: 500 });
    // }
    if (whereAdd === "calendar"){
        return redirect(`/calendar/${dateFromLink}`);
    }else{
        return redirect(`/fridge/${currentUrl}/${dateFromLink}`);
    }
 
  
  }
 async function sendProducts(sendData) {
    const whereAdd = window.location.href.split("/")[3]; // calendar or fridge
    const currentUrl = window.location.href.split("/")[5]; //dish ,product ,all
    const dateFromLink = window.location.href.split("/")[6]; // date 
    
    let url = `http://localhost:8080/calendar/add/new`; 

    
    const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      });
      console.log(whereAdd , currentUrl);
    if (whereAdd === "calendar"){
        // window.location.href = "https://www.example.com";
        window.location.href = `/calendar/${dateFromLink}`;
        return null;
    }else{
        window.location.href = `/fridge/${currentUrl}/${dateFromLink}`;
        return null;
    }

  };


  
  