import { axiosInst } from "./axiosInst";
import capitalize from "../functions/capitalize";

function guardian() {
    
    function newKid(firstName, middleName, lastName, birthday, success=()=>{}, error=()=>{}) {
        axiosInst.post("guardian/kids", {
            firstName: capitalize(firstName),
            middleName: capitalize(middleName),
            lastName: capitalize(lastName),
            birthday: "" + birthday,
        })
        .then(success)
        .catch(error);
    }

    function newVehicle(make, model, color, year, plate, success=()=>{}, error=()=>{}) {
        axiosInst.post("guardian/vehicles", {
            make: make,
            model: model,
            color: color,
            year: +year,
            plate: plate,
        }).then(success).catch(error);
    }

    function getKids(success=()=>{}, error=()=>{}) {
        axiosInst.get("guardian/kids").then(
            (res)=>{
                if (!res.data.kids) {
                    res.data.kids = [];
                }

                success(res);
            }
        ).catch(error);
    }

    function getVehicles(success=()=>{}, error=()=>{}) {
        axiosInst.get("guardian/vehicles").then(
            (res)=>{
                if (!res.data.vehicles) {
                    res.data.vehicles = [];
                }
                success(res);
            }
        ).catch(error);
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
        newVehicle,
        getKids,
        getFriends,
        getVehicles,
    }
}

export default guardian;