import authContext from "../../auth/authContext";
import { useContext,useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const authPaths = {
    "/login": "/login",
    "/register": "/register",
}

export default function Redirect({children}) {
    const navigate = useNavigate();
    const {isAuthenticated, loading, client} = useContext(authContext);

    useEffect(()=>{
        if (client) {
            client.user.info(
                (res)=>{
                    let pathname = window.location.pathname
        
                    if (!isAuthenticated && !authPaths[pathname]) {
                        navigate("/login");
                    } else if (isAuthenticated && authPaths[pathname]) {
                        navigate("/" + res.data.userState);
                    }
                },
                (err)=>{console.error(err)},
            );
        }
    }, [client, isAuthenticated, loading, navigate])
    
    if (loading) {
        return <Loading />;
    } else {
        return children;
    }
}