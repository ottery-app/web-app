import { axiosInst } from "./axiosInst";
import capitalize from "../functions/capitalize";

function guardian() {
    
    function newKid(firstName, middleName, lastName, birthday, success=()=>{}, error=()=>{}) {
        axiosInst.post(process.env.REACT_APP_BACKEND + "guardian/new/kid", {
            firstName: capitalize(firstName),
            middleName: capitalize(middleName),
            lastName: capitalize(lastName),
            birthday: "" + birthday,
        })
        .then(success)
        .catch(error);
    }

    function getKids(success=()=>{}, error=()=>{}) {
        axiosInst.get("guardian/get/kids").then(
            (res)=>{
                if (!res.data.kids) {
                    res.data.kids = [];
                }

                success(res);
            }
        ).catch(error);
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
        newKid,
        getKids,
        getFriends,
        getVehicles,
    }
}

export default guardian;