import axios from "axios";
import guardian from "./guardian";

/**
 * This is a function factory that returns an object of functions that the user has access to.
 */
function client({token, state}) {
    //this is here so we only need to call certain vals from backend once
    const user = {}
    
    //get the user info loaded in
    axios.post(process.env.REACT_APP_BACKEND + "client/info", {token: token})
    .then((res)=>{
        user.firstName = res.data.firstName;
        user.lastName = res.data.lastName;
        user.address = res.data.address;
        user.state = res.data.address;
        user.city = res.data.city;
        user.zip = res.data.zip;
        user.email = res.data.email;
    })
    .catch(()=>{
        console.error("failed to load the user's name");
    })

    //gets the functions for that state
    let stateFuncs = {}
    switch(state) {
        case "guardian":
            stateFuncs = guardian(token);
            break;
        case "director":
            break;
        default:
            console.error("unable to validate user state");
    }

    function getInfo() {
        return user;
    }

    return {
        state,
        getInfo,
        ...stateFuncs,
    }
}

export default client;