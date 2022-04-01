import React from "react";

//styles
import "../css/Buttons.css";
import "../css/colors.css";

//images
import dpfp from "../images/dpfp.svg";
import dicon from "../images/dicon.svg";
import check from "../images/check.svg";

MainButton.defaultProps = {
    icon: dicon,
    info: <div>DEFAULT INFO <br/> DEFAULT INFO </div>,
    pfp: dpfp,
    handleClick: ()=>{console.log("click")},
}

function MainButton({icon, info, pfp, status, handleClick}) {
    let color = "c1";

    if (icon !== false) {
        icon = <img src={icon} height="45px" alt="icon"/>;
    }

    if (pfp !== false) {
        pfp = <img src={pfp} height="45px" alt="profile"/>
    }

    if (status === "check") {
        color = "c8";
        icon = <img src={check} height="45px" alt="icon"/>;
    }

    return(
        <div className={`${color} main-button b1 s1`} onClick={handleClick}>
            <div className="grid">
                <div className="icon">{icon}</div>
                <div className="info">{info}</div>
                <div className="pfp">{pfp}</div>
            </div>
        </div>
    );
}

function DirectionalButton({className, display, direction, handleEvent}) {
    let internals = <h1>error</h1>;

    if (direction === "left") {
        internals = <div>
            <span className="arrow">&#8249;</span><span>{display}</span>
        </div>
    } else if (direction === "right") {
        internals = <div>
            <span>{display}</span><span className="arrow">&#8250;</span>
        </div>
    }

    return(
        <div className={`${className} directional-button b1`} onClick={handleEvent}>
            {internals}
        </div>
    );
}

function InfoButton({title, info, handleAction, className}) {
    return(
        <div className={`minor-button info-button ${className}`} onClick={handleAction} >
            <div className="title b3">{title}</div>
            <div className="info">{info}</div>
        </div>
    );
}

function Button({display, className, handleEvent}) {
    return(
        <div className={`${className} minor-button`} onClick={handleEvent}>
            {display}
        </div>
    );
}

export {
    MainButton,
    DirectionalButton,
    InfoButton,
    Button
}