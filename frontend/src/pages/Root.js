import React, { useState } from 'react';
import { Outlet ,useNavigation ,useLocation } from "react-router-dom";
import Menu from "../components/Navigation";
import Hamburdeg from "../components/Hamburger";
import AuthContext from '../store/auth-context';

function RootLayout(){
    const navigation = useNavigation();
    const [showMenu, setShowMenu] = useState(false);

    const [calories ,setCalories] = useState(0);
    const [id ,setId] = useState("");
    const [unit ,setUnit] = useState("");
    const [amount ,setAmount] = useState(0);
    const [name ,setName] = useState("");
    const [listProducts ,setListProducts] = useState([]);
    const [createOwn ,setCrateOwn] = useState(false);
    const [dishCalories ,setDishCalories] = useState(0);
    const [configurationSettings ,setConfiguration] = useState([]);
    const [currentCalories ,setTotalCalories] = useState([]);

    const nvigator = useLocation();
    const isHello = nvigator.pathname.split("/").includes("hello");
    
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
    const showMenuFun = ()=>{
        let newVal =!showMenu;
        setShowMenu(newVal);
    }
    const setUserConfig = (newVal)=>{
        setConfiguration(newVal);
    }
    const setTotalCal = (newVal)=>{
        setTotalCalories(newVal);
    }
    return(
        <>
            <div className="loading-screen">
                <div className='loading-screen__animation'><div></div></div>
            </div>
            <AuthContext.Provider value={{calories,unit,amount,id,changeValues,name,changeName,listProducts,setList,createOwn,setOwn,dishCalories,setDishCal,setUserConfig,configurationSettings,currentCalories}}>
            <div className="container">
                { navigation.state === 'loading' && <p className="loading-paragraph">Ładowanie...</p>}
                <Menu  display={showMenu}  displayFun={showMenuFun}></Menu>
                {!isHello && <Hamburdeg display={showMenu} displayFun={showMenuFun} ></Hamburdeg>}
                <Outlet></Outlet>
            </div>
            </AuthContext.Provider>
        </>
    );
};

export default RootLayout;



  

