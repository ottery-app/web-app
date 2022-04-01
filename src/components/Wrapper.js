import Header from "./Header";
import Nav from "./Nav";
import "../css/Wrapper.css";

import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/auth/authContext.js";
import {useNavigate} from "react-router-dom";

function Wrapper({state}) {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!authContext.isAuthenticated) {
            navigate("/");
        }
    },[]);

    return(
        <>
            <Header state={state} />
            <Nav state={state} />
        </>
    );
}

export default Wrapper;