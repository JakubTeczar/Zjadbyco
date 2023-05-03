import { Form, Link, NavLink, Outlet, redirect , useNavigation ,useParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import React,{ useRef, useState ,useContext, useEffect } from "react";
import { useCookies } from 'react-cookie';

function AddNewElements () {
    const navigation = useNavigation();
    let ctx = useContext(AuthContext);
    const isSubmitting = navigation.state === "submitting";
    let amount = useRef();
    
    let [own, changeOwm] = useState(ctx.createOwn);
    const [name, setName] = useState("");
    // const [totallCal, setTotalCal] = useState(ctx.currentCalories+Math.round(ctx.dishCalories*ctx.amount));
    const [cookies, setCookie] = useCookies(['totalCal','ownDishName']);
    const [ownAmount ,setOwnAmount] = useState(1);
    const [ownUnit ,setOwnUnit] = useState("szt");


    // let [calorie, setCalorie] = useState(0);
    let unit = useRef();
    let comment = useRef();
    let calories = useRef();
    const params = useParams();
    const productOrDish = params.type;
    useEffect(()=>{
        // setCalorie(ctx.calories);
        changeOwm(ctx.createOwn);
        // console.log(ctx.calories);
    },[ctx.createOwn]);

    let ownRef = useRef();

    console.log(ctx.createOwn );

    let ownNameRef = useRef();

    function sendData(event){
        if(productOrDish ==="dish" ){
            event.preventDefault();
            
            const formData = {
                food: {
                    name: ownNameRef.current.value,
                    type: "dish",
                    unit: unit.current.value,
                    caloriesPerUnit: ctx.dishCalories,
                    productsWithQuantities: ctx.listProducts.map((el)=>{return{quantity:el[1],product:{id:el[4],type: "product"}}}),
                },
                quantity: ctx.amount,
                date : params.addData
            };
            console.log(formData);

            sendProducts(formData);
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
                                <input type="text" className="addElement__form--name dish-own-name" name="ownName" ref={ownNameRef} value={cookies.ownDishName} onChange={()=> setCookie('ownDishName',ownNameRef.current.value )}></input>
                                <Link to={`/settings/add/addProducts`}><button className="addElement__form--add-products">Dodaj produkty</button></Link>
                            </>
                        }
                        {productOrDish ==="product" &&
                        <input type="text" className="addElement__form--name" name="ownName" ></input>
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
                            {productOrDish === "product" && <input className="addElement__form--calories own-calories" name="ownCalories" type="number" defaultValue={0}  ref={calories} ></input>}
                            {productOrDish === "dish" && <input className="addElement__form--calories own-calories" name="ownCalories" type="number" defaultValue={0}  ref={calories} value={Math.round(ctx.dishCalories*ctx.amount)} disabled ></input>}
                            {productOrDish === "dish" && <input className="addElement__form--amount own-amount" defaultValue={1} min={1} name="ownAmount" type="number" ref={amount} onChange={()=>setOwnAmount(amount.current.value)} ></input>}
                            {/* <h4>Ilosc</h4> */}
                            <select className="addElement__form--unit own-unit" name="ownUnit" ref={unit} onChange={()=>{setOwnUnit(unit.current.value)}} >
                                <option value="szt">szt</option>
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                            </select>
                            
                        </li>
                    </div>
                    <button className="addElement__form--btn" type="submit" onClick={sendData}>{isSubmitting ? "Wysyłanie.. ": "Dodaj"}</button>
                    <Link className="addElement__backLink backLink" onClick={()=>window.history.back()}>Wróć</Link>
                </Form>
            </div>
        </>
    );
};

export default AddNewElements;


// export async function action({ request, params }) {
//     const whereAdd = window.location.href.split("/")[3]; // calendar or fridge
//     const currentUrl = window.location.href.split("/")[5]; //dish ,product ,all
//     const dateFromLink = window.location.href.split("/")[6]; // date 
//     const data = await request.formData();
//     let eventData ;
//     let url;
//     if(data.get('own')){
//         eventData= {
//             food:{
//                 name:  data.get('ownName'),
//                 type: "product",
//                 unit :data.get('ownUnit'),
//                 caloriesPerUnit : data.get('ownUnit') !=="szt" ? parseInt(data.get('ownCalories'))/100 : data.get('ownCalories') ,
//             },
//             quantity: parseFloat(data.get('ownAmount')).toFixed(2),
//             date : dateFromLink,
//         };
//         url = `http://localhost:8080/calendar/add/new`; 
//     }else{
//         eventData= {
//             food:{
//                 id : data.get('id'),
//                 type: "food",
//             },
//             date : dateFromLink,
//             quantity: parseFloat(data.get('amount')).toFixed(2),
//         };
//         url = `http://localhost:8080/calendar/add/existing`; 
//     }
//     console.log(eventData);
    
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(eventData),
//     });
  
//     // if (response.status === 422) {
//     //   return response;
//     // }
//     console.log(JSON.stringify(eventData));
//     console.log(response.json());

//     if (whereAdd === "calendar"){
//         return redirect(`/calendar/${dateFromLink}`);
//     }else{
//         return redirect(`/fridge/${currentUrl}/${dateFromLink}`);
//     }

//     // if (!response.ok) {
//     //   throw json({ message: 'Could not save event.' }, { status: 500 });
//     // }
  
//   }
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


  
  