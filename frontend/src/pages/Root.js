import React, { useState } from 'react';
import { Outlet ,useNavigation } from "react-router-dom";
import Menu from "../components/Navigation";
import AuthContext from '../store/auth-context';

function RootLayout(){
    const navigation = useNavigation();
    
    const [calories ,setCalories] = useState(0);
    const [id ,setId] = useState("");
    const [unit ,setUnit] = useState("");
    const [amount ,setAmount] = useState(0);
    const [name ,setName] = useState("");
    const [listProducts ,setListProducts] = useState([]);
    const [createOwn ,setCrateOwn] = useState(false);
    const [dishCalories ,setDishCalories] = useState(0);
    
    const changeValues = (newCal=calories, newUnit=unit,newAmount=amount,newId=id) => {
        setCalories(newCal);
        setUnit(newUnit);
        setAmount(newAmount);
        setId(newId);
    };
    const changeName =(newName)=>{
        setName(newName);
    }
    const setList =(newList)=>{
        setListProducts(newList);
    }
    const setOwn =(newValue)=>{
        setCrateOwn(newValue);
    }
    const setDishCal =(newValue)=>{
        setDishCalories(newValue);
    }
    return(
        <AuthContext.Provider value={{calories,unit,amount,id,changeValues,name,changeName,listProducts,setList,createOwn,setOwn,dishCalories,setDishCal}}>
        <div className="container">
            { navigation.state === 'loading' && <p className="loading-paragraph">Ładowanie...</p>}
            <Menu></Menu>
            <Outlet></Outlet>
        </div>
        </AuthContext.Provider>
    );
};

export default RootLayout;



  

