import axios from "axios";

/**
 * This is a function factory that returns an object of functions that the user has access to.
 */
function Client({token, state}) {
    /*
    props = {
        token: token,
        state: state,
    }props
    */

    console.log(token, state)

    return {
        state,
    }
}

export default Client;