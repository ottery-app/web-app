import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import authContext from "../auth/authContext";

export default function Missing() {
    const navigate = useNavigate();
    const {client} = useContext(authContext);

    return (
        <center>
            <h1>404</h1>
            <p>
                Sorry, the page you are looking for does not exist.
            </p>
            <button onClick={()=>navigate("/" + client.state)}>
                go home
            </button>
        </center>
    );
}