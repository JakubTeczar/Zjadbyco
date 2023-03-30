import { Outlet } from "react-router-dom";
import Menu from "../components/Navigation";

function RootLayout(){
    return(
        <div className="container">
            <Menu></Menu>

            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;



  

