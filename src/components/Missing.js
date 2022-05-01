import { useNavigate } from "react-router-dom";

export default function Missing() {
    const navigate = useNavigate();

    return (
        <center>
            <h1>404</h1>
            <p>
                Sorry, the page you are looking for does not exist.
            </p>
            <button onClick={()=>navigate("/")}>
                go home
            </button>
        </center>
    );
}