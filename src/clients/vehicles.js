export default function vehicles(axiosInst) {
    async function get(id, success, error) {
        axiosInst.get("vehicles/" + id).then(success).catch(error);
    }

    async function getAll(success, error) {
        axiosInst.get("vehicles").then(success).catch(error);
    }

    async function post(vehicle, success, error) {
        vehicle.year = +vehicle.year;
        axiosInst.post("vehicles", vehicle).then(success).catch(error);
    }

    return {
        get,
        getAll,
        post,
    }
}