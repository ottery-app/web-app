export default function auth(axiosInst) {

    async function load(success, error) {
        axiosInst.defaults.headers.common["Authorization"] = localStorage.getItem("token");
        axiosInst.get("auth/load").then(success).catch(error);
    }

    async function login(email, password, success, error) {
        axiosInst.post("auth/login", { email, password }).then((res)=>{
            axiosInst.defaults.headers.common["Authorization"] = res.data.token;
            success(res);
        }).catch(error);
    };

    async function register(email, name, address, password, success, error) {
        axiosInst.post("auth/register", {
            email,
            ...name,
            ...address,
            password,
        }).then(success).catch(error);
    };

    async function activate(email, activationCode, success, error) {
        axiosInst.put("auth/activate", {email, activationCode}).then((res)=>{
            axiosInst.defaults.headers.common["Authorization"] = res.data.token;
            success(res);
        }).catch(error);
    }

    async function resendActivation(email, success, error) {
        axiosInst.post("auth/resendActivation", {email}).then(success).catch(error);
    }

    async function logout(success, error) {
        axiosInst.delete("auth/logout").then((res)=>{
            axiosInst.defaults.headers.common["Authorization"] = "";
            success(res);
        }).catch(error);
    };

    return {
        load,
        activate,
        login,
        logout,
        register,
        resendActivation,
    };
}