export default function search(axiosInst) {
    async function user(search, success, error) {
        axiosInst.get("search/user?search=" + `${search}`).then(success).catch(error);
    }

    return {
        user,
    }
}