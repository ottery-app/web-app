import axios from "axios";

/**
 * This is a function factory that returns an object of functions that the user has access to.
 */
function Client({token, state}) {
    //this is here so we only need to call certain vals from backend once
    const user = {
        name: "name",
        address: "address",
    }

    //get the user info loaded in
    axios.post(process.env.REACT_APP_BACKEND + "client/info", {token: token})
    .then((res)=>{
        user.name = res.data.name;
        user.address = res.data.address;
    })
    .catch(()=>{
        console.error("failed to load the user's name");
    })

    function getName() {
        return user.name;
    }

    return {
        getName,
        state,
    }
}

export default Client;