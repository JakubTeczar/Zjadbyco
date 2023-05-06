import { Form, Link, useParams } from "react-router-dom";
import React, { useRef, useState} from "react";
import backgroundImg from "../../img/login-background.jpg";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import ErrorPage from "../ErrorPage";
function AuthPage () {
    const loginRef = useRef();
    const passwordRef = useRef();
    const passwordRef2 = useRef();
    const params = useParams();
    // const isSmallScreen = window.matchMedia('(max-width: 688px)').matches;
    // const background = isSmallScreen ? "" : backgroundImg;

    const moveSpan  =(div,mouseIn) =>{
        const span = div.current.querySelector("span");
        const input = div.current.querySelector("input");
      
        if(input.value ===  "" && mouseIn){
            span.classList.add("active-span");
        }
        if(input.value !==  "" && !mouseIn){
            span.classList.add("active-span");
        }
        if(input.value ===  "" && !mouseIn){
            span.classList.remove("active-span");
        }
        
    
    };
    return (
        <>
        {params.state !== "login" && params.state !== "registration" ?
        <ErrorPage></ErrorPage>
        :
        <div className="auth-container" style={{backgroundImage: `url(${backgroundImg})`}} >
            <Form className="auth-box">
                <div className="auth-box__header">ZJADBYCO</div>
                {params.state === "login" &&
                <>
                    <LoginForm loginRef={loginRef} passwordRef={passwordRef} moveSpan={(div,state)=>moveSpan(div,state)} ></LoginForm>
                    <Link to={"/authentication/registration"}>Stwórz konto</Link>
                </>
                }
                {params.state === "registration" &&
                <>
                    <RegistrationForm loginRef={loginRef} passwordRef={passwordRef} passwordRef2={passwordRef2} moveSpan={(div,state)=>moveSpan(div,state)} ></RegistrationForm>
                    <Link to={"/authentication/login"}>Zaloguj się</Link>
                </>
                }
               
                <button className="auth-box__button">{params.state === "login" ? "Zaloguj" : "Stwórz konto"}</button>
        
            </Form>
        </div>
        }
        </>
    )
}
export default AuthPage;