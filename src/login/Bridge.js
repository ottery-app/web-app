import AuthContext from "../context/auth/authContext.js";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Header from "../components/Header";
import {InfoButton} from "../components/Buttons";
import "../css/Bridge.css";

function Bridge() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(authContext)
        if(!authContext.isAuthenticated) {
            navigate("/");
        } else if (JSON.parse(authContext.user).state) {
            navigate(`/${JSON.parse(authContext.user).state}`);
        }
    },[]);


    return <>
        <Header />
        <main id="bridge">
            <center>
                <h2>Welcome to Ottery!</h2>
                <h3>Please pick why you are signing up:</h3>
            </center>
            <div className="buttons">
                <InfoButton 
                    title="I am a guardian"
                    info="This means that I am making this account because I have a child that I am interested in enroling in events or because I am the guardian of a child that I frequently pickup"
                    handleAction={()=>{
                        authContext.manager.addState("guardian");
                        navigate("/guardian/newchild")
                    }}
                    className="c1 button"
                />
                <InfoButton 
                    title="I work at an event"
                    info="This means that I am making this account because I take care of kids who are in the event that I am helping with"
                    handleAction={()=>{alert("ljlasdjlkdj")}}
                    className="c1 button"
                />
                <InfoButton 
                    title="I am organizing an event"
                    info="This meaans that I am either helping organize events or I am the organizer of an event"
                    handleAction={()=>{alert("BRO IDK WHY WOULD THEY DO A REGULAR REGESTER?????")}}
                    className="c1 button"
                />
            </div>
        </main>
    </>
}

export default Bridge;