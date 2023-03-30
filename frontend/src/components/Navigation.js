import { Link } from "react-router-dom";


function Menu(){
    return(
        <div className="menu-container">
            <div className="logo">ZJADBYCO</div>
            <ul className="menu">
            <li className="active"> <Link to="calendar" >Kalendarz</Link></li> 
            <li> <Link to="shopping" >Zakupy</Link></li> 
            <li> <Link to="fridge" >Lodówka</Link></li> 
            <li> <Link to="settings" >Ustawienia</Link></li> 
            </ul>
        </div>
    );
};

export default Menu;