import { axiosInst } from "./axiosInst";
import guardian from "./guardian";

/**
 * This is a function factory that returns an object of functions that the user has access to.
 */
function client({token, state}) {
    axiosInst.defaults.headers.common['Authorization'] = token;

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

    function getInfo(success, error) {
        //get the user info loaded in
        axiosInst.get("client/info").then(success).catch(error);
    }

    function updateUser(user,  success, error) {
        axiosInst.put("client/user", user).then((res)=>{
            success(res.data);
        }).catch((err)=>{
            error(err);
        });
    }

    function searchUser(search, success, error) {
        axiosInst.get("client/search/user?search=" + `${search}`).then(success).catch(error);
    }

    return {
        state,
        getInfo,
        searchUser,
        updateUser,
        ...stateFuncs,
    }
}

export default client;