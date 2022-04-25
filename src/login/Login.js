import {useEffect, useContext} from "react";
import AuthContext from "../auth/authContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authContext.isAuthenticated) {
            navigate(`/${authContext.manager.state}`)
        }
    }, [authContext.isAuthenticated, navigate]);

   return "alfjlasjd";

}

export default Login;