import logoPath from "../images/logo.PNG";
import { Navigate, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

import "../css/Header.css";

const logo = <img className="logo" src={logoPath} alt="logo" />;

function Header() {
    const navigate = useNavigate();
    let leftButtons = undefined;
    let info = logo;
    let rightButtons = <div>
        <AiOutlineArrowLeft onClick={()=>{navigate(-1)}} />
    </div>;

    return (
        <>
            <header id="header" className="c2">
                <span className="left">
                    {leftButtons}
                </span>
                <span className="mid">
                    {info}
                </span>
                <span className="right">
                    {rightButtons}
                </span>
            </header>
        </>
    );
}

export default Header;