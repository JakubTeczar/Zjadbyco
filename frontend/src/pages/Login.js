import { Form } from "react-router-dom";
import {useRef} from "react";
function Login () {
    //auth - authentication
    const loginRef = useRef();
    const passwordRef = useRef();
    const moveSpan  =(div) =>{
        const span = div.current.querySelector("span");
        const input = div.current.querySelector("input");
        if(input.value ===  ""){
            span.classList.toggle("active-span");
        }

    };
    
    return (
        <div className="auth-container">
            <Form className="auth-box">
                <div className="auth-box__header">ZJADBYCO</div>

                <div className="auth-box__input-wrapper" ref={loginRef} onClick={()=>{moveSpan(loginRef)}}>
                    <input className="auth-box__input"></input>
                    <span >Login</span>
                </div>
                <div className="auth-box__input-wrapper" ref={passwordRef} onClick={()=>{moveSpan(passwordRef)}}>
                    <input className="auth-box__input" type="password"></input>
                    <span>Hasło</span>
                </div>
                <button className="auth-box__button">Zaloguj</button>
            </Form>
        </div>
    )
}
export default Login;