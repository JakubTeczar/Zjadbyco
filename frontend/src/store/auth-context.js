import React from "react";

const AuthContext = React.createContext(
    {
        calories : 0 ,
        unit : ""
    }
);

export default AuthContext;