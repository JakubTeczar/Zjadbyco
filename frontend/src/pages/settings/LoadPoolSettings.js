import { NavLink, useParams ,Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

function LoadPoolSettings ({children}) {
    const params = useParams();
    const [cookies, setCookie] = useCookies(["openingLocation"]);
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
        <Link className="settings__add-btn" onClick={ setCookie("openingLocation", `/settings/${params.type}`,{ sameSite: 'none', secure: true })} to={`/settings/add/${params.type}`} >{params.type === "dish" ? "Dodaj nowe danie" : "Dodaj nowy produkt"}</Link>
    </div>
)
}
export default LoadPoolSettings;