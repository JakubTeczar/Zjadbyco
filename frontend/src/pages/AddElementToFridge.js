import { Form, Link, NavLink, Outlet, redirect , useNavigation ,useParams } from "react-router-dom";
import DatePanel from "../components/DateNavigation";
import AuthContext from "../store/auth-context";
import React,{ useRef, useState ,useContext, useEffect } from "react";
import { useCookies } from 'react-cookie';

function AddElementToFridge () {
    const navigation = useNavigation();
    let ctx = useContext(AuthContext);

    const isSubmitting = navigation.state === "submitting";

    const [cookies, setCookie] = useCookies(['totalCal',"openingLocation"]);

    const [name, setName] = useState("");

    // let [calorie, setCalorie] = useState(0);
    let amount = useRef();
    let unit = useRef();
    let calories = useRef();
    let dateRef = useRef();
    let comment = useRef();
    let topPanel = useRef();
    let selectField = useRef();
    const params = useParams();
    const productOrDish = params.type;

    const setComment = (unit) =>{
        console.log(unit);
        if ( unit === "g"){
         comment.current.textContent = "na 100g";
        }else if (unit === "ml"){
         comment.current.textContent = "na 100ml"
        }else{
         comment.current.textContent = "na 1szt"
        }
     }
     useEffect(()=>{
        if(ctx.unit !=="" && productOrDish === "product"){
            setComment(ctx.unit);
        }
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
        const dateDiff = new Date(dateRef.current.value) - new Date();
        if(dateDiff < 0 || dateRef.current.value === ""){
            dateRef.current.classList.add("invalid");
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
    const checkInputDate= ()=>{
        const dateDiff = new Date(dateRef.current.value) - new Date();
        if(dateDiff > 0 ){
            dateRef.current.classList.remove("invalid");
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

            <div className="fridge addElement__box box">
                <div className="addElement__switch">
                    <NavLink className="addElement__switch--btn" to={`product/${params.addData}`} onClick={backToDefault} >Produkty</NavLink>   
                    <NavLink className="addElement__switch--btn" to={`dish/${params.addData}`} onClick={backToDefault}> Dania </NavLink>
                </div>
                <Form className="addElement__form" method="POST" > 
                   <h2>{productOrDish === "product"? "Dodaj produkt" : "Dodaj danie"}</h2> 
                    <div className='addElement__form--top-panel' ref={topPanel}> 
                   
                        <>
                            <Outlet>
                            </Outlet>
                            <input ref={selectField} type="text"  style={{display:"none"}} value={ctx.id}  name="id" readOnly></input>                 
                        </>
                        <Link to={`/settings/add/${productOrDish}`} onClick={()=>setCookie("openingLocation", `/fridge/addElement/${productOrDish}/${params.addData}`)} className="addElement__form--add-new">Stworz nowy</Link>
                       
                        {/* <div className='checkbox-wrapper'>
                            <input readOnly onClick={()=>{ let newOwn = !own; changeOwm(newOwn) ;ctx.setOwn(newOwn)}} ref={ownRef} name="own" className='addElement__form--own checkbox' type="checkbox"   checked={ctx.createOwn ? true : false}></input>
                            <span>Dodaj {productOrDish === "product"? "własny produkt" : "własne danie"}</span>
                        </div> */}
                    </div>
               
                
                    <div className="addElement__form--bottom-panel">
                        <li>   
                            <h4 >Data ważności</h4>
                            <input type="date" name="date" className="addElement__form--expirationDate" ref={dateRef} onChange={()=> checkInputDate()}></input>
                        </li>
                        <li>
                            <h4>Ilosc</h4>
                            <input className="addElement__form--amount" type="number" min={0} step={.1} name="amount" ref={amount} value={ctx.amount}   onChange={()=>{ctx.changeValues(undefined,undefined,amount.current.value);checkInputAmonut(amount)}} ></input>
                            <select className="addElement__form--unit" name="unit" ref={unit} value={ctx.unit} disabled >
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
                    <button className="addElement__form--btn" onClick={(e)=>checkForm(e)} type="submit" >{isSubmitting ? "Wysyłanie.. ": "Dodaj"}</button>
                    <Link className="addElement__backLink backLink" to={`/fridge/all`}>Wróć</Link>
                </Form>
            </div>
        </>
    );
};

export default AddElementToFridge;


export async function action({ request, params }) {
    const currentUrl = window.location.href.split("/")[5]; //dish ,product ,all
    const data = await request.formData();
    const url =`http://localhost:8080/fridge/add/existing`;

    const eventData= {
        food:{
            id : data.get('id'),
            type: "food",
        },
        expirationDate : data.get("date"),
        quantity: parseFloat(data.get('amount')).toFixed(2),
    };
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
  
    console.log(JSON.stringify(eventData));
    // console.log(response.json());

    return redirect(`/fridge/${currentUrl}`);

    // if (!response.ok) {
    //   throw json({ message: 'Could not save event.' }, { status: 500 });
    // }
  
  }