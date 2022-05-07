import axios from "axios";

function guardian(token) {

    function addKid(k, success=()=>{}, error=()=>{}) {
        console.log(k)
        axios.post(process.env.REACT_APP_BACKEND + "guardian/new/kid", k)
        .then(success)
        .catch(error);
    }

    function getKids(success=()=>{}, error=()=>{}) {
        //axios.post(process.env.REACT_APP_BACKEND + "guardian/get/kids", {token});
        success([]);
        error("error");
    }

    function getVehicles(success=()=>{}, error=()=>{}) {
        success([]);
        error("error");
    }

    function getFriends(success=()=>{}, error=()=>{}) {
        success([]);
        error("error");
    }

    /**
     * these are the public functions that can be used
     */
    return {
        addKid,
        getKids,
        getFriends,
        getVehicles,
    }
}

export default guardian;