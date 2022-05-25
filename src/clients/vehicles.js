export default function vehicles(axiosInst) {
    async function get(id, success, error) {
        console.error("not implemented");
        axiosInst.get("vehicles/" + id, success, error);
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