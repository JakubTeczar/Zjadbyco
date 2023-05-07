import { Form, Link, NavLink, Outlet, redirect , useNavigation ,useParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import React,{ useRef, useState ,useContext, useEffect } from "react";
import { useCookies } from 'react-cookie';

function AddNewElements () {
    const navigation = useNavigation();
    let ctx = useContext(AuthContext);
    const isSubmitting = navigation.state === "submitting";
    let amount = useRef();
    
    const [name, setName] = useState("");
    // const [totallCal, setTotalCal] = useState(ctx.currentCalories+Math.round(ctx.dishCalories*ctx.amount));
    const [cookies, setCookie] = useCookies(['totalCal','ownDishName',"openingLocation"]);
    const [ownAmount ,setOwnAmount] = useState(1);
    const [ownUnit ,setOwnUnit] = useState("szt");


    // let [calorie, setCalorie] = useState(0);
    let unit = useRef();
    let comment = useRef();
    let calories = useRef();
    const params = useParams();
    const productOrDish = params.type;

    useEffect(()=>{
        if(ctx.listProducts.length){
            addProductsRef.current.classList.remove("invalid-products"); 
        }
    },[ctx.listProducts]);

    const addProductsRef = useRef();

    console.log(ctx.createOwn );

    let ownNameRef = useRef();

    function sendData(event){

        console.log(productOrDish, productOrDish==="dish")
        if(productOrDish === "dish"){
            event.preventDefault();
            if(checkForm("dish")){
                const formData = {
                    name: ownNameRef.current.value,
                    type: "dish",
                    unit: unit.current.value,
                    caloriesPerUnit: ctx.dishCalories / amount.current.value,
                    productsWithQuantities: ctx.listProducts.map((el)=>{return{quantity:el[1],product:{id:el[4],type: "product"}}}),
             
                };
                console.log(formData);
                sendProducts(formData);
                ctx.setDishCal(0);
                ctx.setList([]);
                window.location.href = cookies["openingLocation"];
            }
        }else if(!checkForm("product")){ 
            event.preventDefault();
        }
        
    }
    const checkForm = (type) =>{
        let correct = true;
        if(type === "dish"){
            if (ownNameRef.current.value === ""){
                ownNameRef.current.classList.add("invalid");
                correct = false;
            }
            if(ctx.listProducts.length === 0){
                addProductsRef.current.classList.add("invalid-products");
                correct = false;
            }
            if(amount.current.value <= 0 ){
                amount.current.classList.add("invalid");
                correct = false;
            }

            return correct;
        }else{
            if (ownNameRef.current.value === ""){
                ownNameRef.current.classList.add("invalid");
                correct = false;
            }
            if(calories.current.value <= 0){
                calories.current.classList.add("invalid");
                console.log("działa poprawnie");
                correct = false;
            }
            return correct;
        }
    }
    const checkInputName = (input)=>{
        if (input.current.value === ""){
            input.current.classList.remove("correct");
        }else{
            input.current.classList.add("correct");
        }
    }
    const checkInputAmonut = (input)=>{
        if (input.current.value <= 0 ){
            input.current.classList.remove("correct");
        }else{
            input.current.classList.add("correct");
        }
  
    }


    return(
        <>
            <div className="date-margin"></div>

            <div className="addElement__box box">
                <div className="addElement__switch">
                    <NavLink className="addElement__switch--btn" to={`/settings/add/product`} >Produkty</NavLink>   
                    <NavLink className="addElement__switch--btn" to={`/settings/add/dish`}> Dania </NavLink>
                </div>
                <Form className="addElement__form" method="POST" >
                    <h2>{productOrDish === "product"? "Nowy produkt" : "Nowe danie"}</h2>
                   
                    <div className='addElement__form--top-panel acive-own-panel'>
                        {productOrDish ==="dish" &&
                            <>
                                <input type="text" className="addElement__form--name dish-own-name"  name="ownName" ref={ownNameRef} value={cookies.ownDishName} onChange={()=> {setCookie('ownDishName',ownNameRef.current.value) ;checkInputName(ownNameRef)}}></input>
                                <Link to={`/settings/add/addProducts`}><button className="addElement__form--add-products"  ref={addProductsRef}>Dodaj produkty</button></Link>
                            </>
                        }
                        {productOrDish ==="product" &&
                        <input type="text" className="addElement__form--name" name="ownName" ref={ownNameRef} onChange={()=>checkInputName(ownNameRef)}></input>
                        }
                    </div>
                    {productOrDish ==="dish" &&
                        <div className="addElement__form--products-list"></div>
                    }
                    <div className="addElement__form--bottom-panel setting-form__bottom-panel">
                        <li>
                            <h4>Kalorycznosc
                            {productOrDish === "product" && <p ref={comment} className="addElement__form--comment">na {ownUnit === "szt" ? "1" : "100"}{ownUnit}</p>}
                            {productOrDish === "dish" && <p ref={comment} className="addElement__form--comment">na {ownAmount}{ownUnit}</p>}
                            </h4>
                            {productOrDish === "product" && <input className="addElement__form--calories own-calories" name="ownCalories" type="number" defaultValue={0}  ref={calories} onChange={()=>checkInputAmonut(calories)} ></input>}
                            {productOrDish === "dish" && <input className="addElement__form--calories own-calories" name="ownCalories" type="number" defaultValue={0}  ref={calories} value={Math.round(ctx.dishCalories)} disabled ></input>}
                            {productOrDish === "dish" && <input className="addElement__form--amount own-amount" defaultValue={1} min={1} name="ownAmount" type="number" ref={amount} onChange={()=>{setOwnAmount(amount.current.value);checkInputAmonut(amount)}} ></input>}
                            {/* <h4>Ilosc</h4> */}
                            <select className="addElement__form--unit own-unit" name="ownUnit" ref={unit} onChange={()=>{setOwnUnit(unit.current.value)}} >
                                <option value="szt">szt</option>
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                            </select>
                            
                        </li>
                    </div>
                    <button className="addElement__form--btn" type="submit" onClick={(e)=>{sendData(e)}}>{isSubmitting ? "Wysyłanie.. ": "Dodaj"}</button>
                    <Link className="addElement__backLink backLink" onClick={()=>window.location.href = cookies["openingLocation"]}>Wróć</Link>
                </Form>
            </div>
        </>
    );
};

export default AddNewElements;

// localhost:8080/food/new-product
// localhost:8080/food/new-dish

export async function action({ request, params }) {

    const data = await request.formData();
    const url = "http://localhost:8080/food/new-product";
    const eventData= {
        name:  data.get('ownName'),
        type: "product",
        unit : data.get('ownUnit'),
        caloriesPerUnit : data.get('ownUnit') !=="szt" ? parseInt(data.get('ownCalories'))/100 : data.get('ownCalories') ,
    };
    
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

    if (!response.ok) {
      throw console.error(response.status);
    }else{
        let openingLocation;
        decodeURIComponent(document.cookie.split(";")).split(",").forEach(element => {
            if(element.trim().startsWith("openingLocation")){
                openingLocation= element.trim().split("=")[1];
            }
        });
        window.location.href = openingLocation;
        return null;
    }
  
  }
 async function sendProducts(sendData) {
    
    const url = `http://localhost:8080/food/new-dish`; 

    const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      });
      console.log(JSON.stringify(sendData));

      if (!response.ok) {
        throw console.error(response.status);
      }else{
          return null;
      }

  };


  
  