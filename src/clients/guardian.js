import makeArr from "../functions/makeArr";

function guardian(token) {

    function addKids(k, success, error) {
        k = makeArr(k)
        
        console.log(k);
    }

    function addVehicles(v, success, error) {
        v = makeArr(v);

        console.log(v);
    }

    function getKids(success=()=>{}, error=()=>{}) {
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
        addKids,
        addVehicles,
        getKids,
        getFriends,
        getVehicles,
    }
}

export default guardian;