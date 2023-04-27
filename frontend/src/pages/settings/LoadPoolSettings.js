import { NavLink } from "react-router-dom";

function LoadPoolSettings ({children}) {
    return(
    <div className='settings-container'>
        <div className="settings__switch">
            <div className="settings__switch--wrapper">
                <NavLink className="settings__switch--link" to="/settings/product">Produkty</NavLink>   
                <NavLink className="settings__switch--link"  to="/settings/dish"> Dania </NavLink>
            </div>
        </div>
        <div className="settings__list">
        {children}
        </div>
      
        <NavLink className="settings__add-btn" to="/calendar">Dodaj nowe danie</NavLink>    
    </div>
)
}
export default LoadPoolSettings;