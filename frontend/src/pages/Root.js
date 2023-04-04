import { Outlet ,useNavigation } from "react-router-dom";
import Menu from "../components/Navigation";

function RootLayout(){
    const navigation = useNavigation();
    return(
        <div className="container">
            { navigation.state === 'loading' && <p className="loading-paragraph">Ładowanie...</p>}
            <Menu></Menu>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;



  

