export default function user(axiosInst) {
    async function update(user,  success, error) {
        axiosInst.put("user", user).then(success).catch(error);
    }

    async function friends(success, error) {
        console.error("not yet implemented");
        let res = {};
        res.data = {};
        res.data.friends = [];

        success(res);

        //axiosInst.get("user/friends").success(success).catch(error);
    }

    async function get(id, success, error) {
        console.error("not yet implemented");
        //get the user info loaded in
        axiosInst.get("user/" + id).then(success).catch(error);
    }

    async function info(success, error) {
        //get the user info loaded in
        axiosInst.get("user").then(success).catch(error);
    }

    return {
        info,
        get,
        friends,
        update,
    }
}