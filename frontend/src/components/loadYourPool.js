import React from 'react';
import Elements from "./selectField";
import { useParams ,useLoaderData } from "react-router-dom";

function ElementInput (){
    const content  = useLoaderData()
    const params = useParams();

    const names = content.map(el => el.name);
    const idTab = content.map(el => el.id);
    const calTab = content.map(el => el.calories_per_unit);
    const unitTab = content.map(el => el.unit);
    console.log(content);
    const productOrDish = params.type ; // produkt or dish
    return (
         <Elements idTab={idTab} calTab={calTab} unitTab={unitTab} content={names} product={productOrDish} ></Elements> 
    );
};

export default ElementInput;


export async function loader ({request,params}){
    // const selectedDate = new Date(2023, 4, 1);
    //product or dish
    console.log(params.type);
    // const urlDate =params.date;
    console.log(params.type);

    let response;
    if (params.type === "dish"){
        response = await fetch(`http://localhost:8080/calendar/dish`);
        // return response;
    }
    if(params.type === "product"){
        response = await fetch(`http://localhost:8080/calendar/product`);
        // return response;
    }
    // return null

    if(!response.ok){
        console.log("nie działa :(");
        return null;
    }else{
        return response;
        
    }
};