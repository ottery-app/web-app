import { axiosInst } from "./axiosInst";
import children from "./children";
import user from "./user";
import search from "./search";
import vehicles from "./vehicles";
import auth from "./auth";

/**
 * This is a function factory that returns an object of functions that the user has access to.
 */
function client(token) {

    //gets all the apis that are avalable
    let api = {}
    let clients = {};

    if (token) {
        axiosInst.defaults.headers.common["Authorization"] = token;
        clients = {children, user, vehicles, search};
    } else {
        //clients = [auth];
    }
    
    Object.keys(clients).forEach((key)=>{
        api[key] = clients[key](axiosInst);
    });

    console.log(api);
    return api;
}

export default client;