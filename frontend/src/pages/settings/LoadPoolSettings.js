import { NavLink, useParams } from "react-router-dom";

function LoadPoolSettings ({children}) {
    const params = useParams();
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
    </div>
)
}
export default LoadPoolSettings;