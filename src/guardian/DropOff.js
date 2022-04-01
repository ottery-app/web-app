import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/auth/authContext";

import {MainButton} from '../components/Buttons';
import SelectedInfo from "../components/SelectedInfo";

import "../css/DropOff.css";

function DropOff() {
    const authContext = useContext(AuthContext);

    const [children, setChildren] = useState([]);
    const [selected, setSelected] = useState([]);
    const [state, setState] = useState("select");
    const [info, setInfo] = useState("0 children selected");

    let display = undefined;

    useEffect(() => {
        authContext.manager.getChildren((children) => {
            setChildren(children);
        });
    },[]);

    useEffect(()=>{
        if (selected.length === 1) {
            setInfo("1 child selected");
        } else {
            setInfo(selected.length + " children selected");
        }
    }, [selected]);

    if (state === "select") { //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        display = (
            <div className="select">
                <SelectedInfo display={info} handleClick={()=>{
                    if (selected.length > 0) {
                        setState("validating");
                    } else {
                        setInfo("Please select a child");
                    }
                }} />

                {children.map( (child, index) => {
                    if (selected.includes(child)) {
                        return <MainButton key={index} icon={false} info={child.name} pfp={undefined} status="check" handleClick={()=>{
                                    setSelected((children)=>children.filter((selChild)=>selChild !== child));
                                }} />
                    } else {
                        return <MainButton key={index} icon={false} info={child.name} pfp={undefined} handleClick={()=>{
                                    setSelected([...selected, child]);
                                }} />
                    }
                })}
            </div>);



    } else if ( state === "validating") { /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        display = (
            <div className="validating">
                <div className="title">dropping off...</div>
                {selected.map( (child, index) => {
                    return <MainButton key={index} icon={false} info={child.name} pfp={undefined} />
                })}
            </div>);
        setTimeout(() => {setState("done")}, 5000);



    } else if ( state === "done" ) { //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        display = (
            <div className="done">
                <div className="title">Your children successfully got on the raft!</div>
                {selected.map( (child, index) => {
                    return <MainButton key={index} icon={false} info={child.name} status="check" pfp={undefined} />
                })}
            </div>);
    }
    

    return (
        <main id="dropoff">
            {display}
        </main>
    );
}

export default DropOff