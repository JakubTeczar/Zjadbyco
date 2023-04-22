import { useLoaderData ,Link, useParams ,useNavigate} from "react-router-dom";
import React, { useState , useRef, useContext} from "react";
import Elements from "../components/selectField";
import AuthContext from "../store/auth-context";

function AddProductsListToDish (){
    const params = useParams();
    const content  = useLoaderData()
    const ctx = useContext(AuthContext);
    console.log(content);
    const names = content.map(el => el.name);
    const idTab = content.map(el => el.id);
    const calTab = content.map(el => el.caloriesPerUnit);
    const unitTab = content.map(el => el.unit);
    const [calories ,setCalories] = useState(0);
    const [amount ,setAmount] = useState(1);
    const [unit ,setUnit] = useState("szt");
    const [name ,setName] = useState("");
    const [id ,setId] = useState(0);
    const [elementsList ,setElementsList] = useState(ctx.listProducts);
    const navigate = useNavigate();

    let amountInput = useRef();
    // let nameInput = useRef();

    function chosenElement(el){
        setCalories(el[2]);
        setUnit(el[3]);
        setName(el[0]);
        setId(el[1]);
        ctx.changeName(el[0]);
        console.log(el);
    }
    function addElement(){
        if(name !==""){
            let newList = [...elementsList];
            newList.push([name,amount,unit,calories*amount,id]);
            setElementsList(newList);
            setName("");
            setCalories(0);
            setAmount(1);
            ctx.changeName("");
            ctx.changeValues(0);
            amountInput.current.value=1;
        }
    }
    function deleteElement(index){
        let newList = [...elementsList];
        newList.splice(index,1)
        setElementsList(newList);
    }
    function saveElemenst(){
        ctx.setList(elementsList);
        ctx.setOwn(true); 
        navigate(`/calendar/addElement/dish/${params.addData}`);
        const calculateCalories =  elementsList.reduce((acc, curr) => curr[3] + acc, 0);

        ctx.setDishCal(Math.round(calculateCalories));
        console.log(elementsList,calculateCalories);
    }

    return (
        <>
        <h2 className="addProducts__h2">Wybierz odpowiednie produkty i dodaj je do listy</h2>
        <div className="addProducts__box box">
            <div className="addProducts__box--left">
                <h4>Produkt</h4> 
                <div className="addProducts__elements-box">
                    <Elements idTab={idTab} calTab={calTab} unitTab={unitTab} content={names} product={"product"} chosenFun={(el)=>chosenElement(el)} ></Elements>
                </div>   
                <div className="addProducts__top-panel">
                    <li>
                        <h4>Ilość</h4> 
                        <div className="addProducts__top-panel--wrapper">
                        <input className="addProducts__top-panel--amount" type="number" defaultValue={1} ref={amountInput} onChange={()=>setAmount(parseInt(amountInput.current.value))}></input>
                        <div className="addProducts__top-panel--unit">{unit}</div> 
                        </div>
                    </li>
                    <li>
                        <h4>Kaloryczność</h4>
                        <input className="addProducts__top-panel-calories" type="number" disabled value={(calories*amount).toFixed(2)}></input>
                    </li>
                </div>
                <button className="addProducts__btn" onClick={addElement}>Dodaj produkt</button>
            </div>
            <div className="addProducts__box--right">
                <div className="addProducts__list">
                    {
                        elementsList.map((el,index)=>(
                            <div className="addProducts__list--el" key={index}>
                            [{el[0]} , {el[1]}{el[2]} , {Math.round(el[3])}kcal]
                            <button onClick={()=>deleteElement(index)}>Usuń</button>
                        </div>
                        ))
                    }
                    {elementsList.length == 0 && 
                    <div className="addProducts__list--text">Lista jest pusta</div>
                    }
                   
                </div>
            </div>
        </div>
        <div className="addProducts__bottom-panel">
            <Link to={`/calendar/addElement/dish/${params.addData}`} className="backLink">Wróć</Link>
            <button onClick={saveElemenst}>Zapisz</button>
        </div>
        </>
   );
}

export default AddProductsListToDish;

export async function loader (){

    const  response = await fetch(`http://localhost:8080/food/products`);

    if(!response.ok){
        console.log("nie działa :(");
        return null;
    }else{
        return response;
        
    }
};


