import authContext from "../../auth/authContext";
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

export default function Redirect({children}) {
    const navigate = useNavigate();
    const {isAuthenticated, loading} = useContext(authContext);

    useEffect(() => {
        if (!isAuthenticated && window.location.pathname !== "/login" && window.location.pathname !== "/register") {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);
    
    if (loading) {
        return <Loading />;
    } else {
        return children;
    }
}