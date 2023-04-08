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
    
    const changeValues = (newCal=calories, newUnit=unit,newAmount=amount,newId=id) => {
        setCalories(newCal);
        setUnit(newUnit);
        setAmount(newAmount);
        setId(newId);
    };
    return(
        <AuthContext.Provider value={{calories,unit,amount,id,changeValues}}>
        <div className="container">
            { navigation.state === 'loading' && <p className="loading-paragraph">Ładowanie...</p>}
            <Menu></Menu>
            <Outlet></Outlet>
        </div>
        </AuthContext.Provider>
    );
};

export default RootLayout;



  

