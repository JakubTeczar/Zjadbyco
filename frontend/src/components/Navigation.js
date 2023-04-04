import { NavLink, useLocation } from "react-router-dom";


function Menu(){
    const nvigator = useLocation();
    console.log();
    const isHello = nvigator.pathname.split("/").includes("hello"); //czy link ma w sobie hello
    const isCalendar= nvigator.pathname.split("/").includes("calendar"); //czy link ma w sobie calendar
    console.log(isHello ,nvigator.pathname );
    const date = new Date();
    const currentDate = date.getFullYear().toString() +"-"+(date.getMonth() + 1).toString().padStart(2, '0')+"-"+date.getDate().toString().padStart(2, '0'); 
    console.log(currentDate);
    return(
       
        <div className="menu-container">
            <div className="logo">ZJADBYCO</div>
            {isHello || 
            <ul className="menu">
                <li> <NavLink className={isCalendar ? "active" : undefined} to={`calendar/${currentDate.toString()}`} >Kalendarz</NavLink></li> 
                <li > <NavLink to="shopping">Zakupy</NavLink></li> 
                <li> <NavLink to="fridge" >Lodówka</NavLink></li> 
                <li> <NavLink to="settings" >Ustawienia</NavLink></li> 
            </ul>
            }
        </div>
    
    );
};

export default Menu;