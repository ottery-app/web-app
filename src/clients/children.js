export default function children(axiosInst) {
    async function get(id, success, error) {
        console.error("not yet implemted");
        axiosInst.get('children/' + id, success, error);
    }

    async function getAll(success, error) {
        axiosInst.get("children").then(success).catch(error);
    }

    async function post(child, success, error) {
        child.birthday = +child.birthday;
        axiosInst.post("children", child).then(success).catch(error);
    }

    return {
        post,
        getAll,
        get,
    }
}