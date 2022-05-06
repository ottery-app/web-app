import makeArr from "../functions/makeArr";

function guardian(token) {

    function addKids(k) {
        k = makeArr(k)
        
        console.log(k);
    }

    function getKids() {}

    function addVehicles(v) {
        v = makeArr(v);

        console.log(v);
    }

    function getVehicles() {}

    function getFriends() {}

    /**
     * these are the public functions that can be used
     */
    return {
        addKids,
        addVehicles,
    }
}

export default guardian;