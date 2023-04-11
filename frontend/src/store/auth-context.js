import React from "react";

const AuthContext = React.createContext(
    {
        calories : 0 ,
        unit : "",
        amount: 0,
        id: "",
        changeValues:()=>{},
        name:"",
        changeName:()=>{},
        listProducts:[],
        setList: ()=>{},
        createOwn: false,
        setOwn: ()=>{},
        dishCalories:0,
        setDishCal: ()=>{},
    }
);

export default AuthContext;