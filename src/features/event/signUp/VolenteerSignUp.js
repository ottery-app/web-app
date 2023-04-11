import { useEffect } from "react";

export function VolenteerSignUp({onDone, mainFlow}) {
    useEffect(()=>{
        //console.warn("Need to implement the volenteer sign up");
        onDone(mainFlow, {
            volenteering: true,
        });
    },[]);

    return "";
}