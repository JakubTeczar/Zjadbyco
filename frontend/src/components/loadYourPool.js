import React from 'react';
import Elements from "./selectField";
import { useParams ,useLoaderData } from "react-router-dom";

function ElementInput (){
    const content  = useLoaderData()
    const params = useParams();
    const productOrDish = params.type ; // produkt or dish
    return (
         <Elements  content={content} product={productOrDish} ></Elements> 
    );
};

export default ElementInput;


export async function loader ({request,params}){
    // const selectedDate = new Date(2023, 4, 1);
    //product or dish
    console.log(params.type);
    
  const dish = ["jajecznica","pierogi","spagetti","gołąbki"].sort();
    
  const product = ["chleb","mleko","jajka","masło"].sort();

    if (params.type === "dish"){
        return dish
    }
    if(params.type === "product"){
        return product
    }
    return null
    // const urlDate =params.date;
    // console.log(params.urlDate);
    // const response = await fetch(`http://localhost:8080/calendar/elements/${urlDate}`);

    // if(!response.ok){
    //     console.log("nie działa :(");
    //     return null;
    // }else{
    //     return response;
        
    // }
};