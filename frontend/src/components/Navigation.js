import { NavLink } from "react-router-dom";


function Menu(){
    return(
        <div className="menu-container">
            <div className="logo">ZJADBYCO</div>
            <ul className="menu">
            <li> <NavLink to="calendar" >Kalendarz</NavLink></li> 
            <li > <NavLink to="shopping">Zakupy</NavLink></li> 
            <li> <NavLink to="fridge/all" >Lodówka</NavLink></li> 
            <li> <NavLink to="settings" >Ustawienia</NavLink></li> 
            </ul>
        </div>
    );
};

export default Menu;