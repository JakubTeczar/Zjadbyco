import {Form} from "react-router-dom";
function Registration () {
    return (
        <div className="login-container">
        <Form className="login-box">
            <div className="login-box__header">ZJADBYCO</div>
            <input className="login-box__input"></input>
            <input className="login-box__input" type="password"></input>
            <button className="login-box__button">Zaloguj</button>
        </Form>
    </div>
    )
};

export default Registration;