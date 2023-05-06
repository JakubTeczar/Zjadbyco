import { Form } from "react-router-dom";
import React, { useRef, useState} from "react";
function LoginForm ({loginRef,passwordRef,moveSpan}) {
    const loginInput = useRef();
    const passwordInput = useRef();
    return (
        <>
        <div className="auth-box__input-wrapper" ref={loginRef}  onClick={()=>loginInput.current.focus()}>
            <input className="auth-box__input" ref={loginInput} onFocus={()=>{moveSpan(loginRef,true)}} onBlur={()=>{moveSpan(loginRef,false)}}></input>
            <span >Login</span>
        </div>
        <div className="auth-box__input-wrapper" ref={passwordRef}  onClick={()=>passwordInput.current.focus()}>
            <input className="auth-box__input" ref={passwordInput} type="password" onFocus={()=>{moveSpan(passwordRef,true)}} onBlur={()=>{moveSpan(passwordRef,false)}}></input>
            <span>Hasło</span>
        </div>
    </>
    )
}
export default LoginForm;