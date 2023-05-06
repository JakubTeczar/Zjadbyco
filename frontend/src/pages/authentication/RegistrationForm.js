import { Form } from "react-router-dom";
import React, { useRef, useState} from "react";
function RegistrationForm ({loginRef,passwordRef,passwordRef2,moveSpan}) {
    const loginInput = useRef();
    const passwordInput = useRef();
    const passwordInput2 = useRef();
    return (
        <>
        <div className="auth-box__input-wrapper" ref={loginRef} onClick={()=>loginInput.current.focus()}>
            <input className="auth-box__input" ref={loginInput} onFocus={()=>{moveSpan(loginRef,true)}} onBlur={()=>{moveSpan(loginRef,false)}}></input>
            <span >Login</span>
        </div>
        <div className="auth-box__input-wrapper" ref={passwordRef} onClick={()=>passwordInput.current.focus()}>
            <input className="auth-box__input" ref={passwordInput}  type="password" onFocus={()=>{moveSpan(passwordRef,true)}} onBlur={()=>{moveSpan(passwordRef,false)}}></input>
            <span>Hasło</span>
        </div>
        <div className="auth-box__input-wrapper" ref={passwordRef2}  onClick={()=>passwordInput2.current.focus()} >
            <input className="auth-box__input" ref={passwordInput2}  type="password" onFocus={()=>{moveSpan(passwordRef2,true)}} onBlur={()=>{moveSpan(passwordRef2,false)}}></input>
            <span>Powtórz hasło</span>
        </div>
    </>
    )
}
export default RegistrationForm;