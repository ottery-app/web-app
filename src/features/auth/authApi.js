import { axiosInst, ERR_USER } from "../../app/axiosInst";
import { ActivationCodeDto, classifyWithDto, LoginDto, NewUserDto } from "ottery-dto";
import {setCookie, getCookie} from "../../functions/cookies";
import { clideInst } from "../../app/clideInst";


// export const load = clideInst
//     .makeGet("auth/load", {
//         in_pipeline: ()=>{

//         },
//         out_pipeline: ()=>{},
//     })
export async function load() {
    axiosInst.defaults.headers.common['Id'] = getCookie("Id");
    axiosInst.defaults.headers.common['Authorization'] = localStorage.getItem('token');

    try {
        let res = await axiosInst.get("api/auth/load");
        axiosInst.defaults.headers.common['Id'] = res.data.seshId;
        setCookie('Id', res.data.seshId, 1); //TODO set this to a time provided by the backend
        console.warn("Benjamin: change this to be a time determined by the backend");
        return res;
    } catch (e) {
        throw e.response.data;
    }
}

export async function login(data) {
    try {
        classifyWithDto(
            LoginDto,
            data,
            {throw:true}
        );
    } catch (e) {
        throw {
            code: ERR_USER,
            message: "Username or password incorrect"
        };
    }

    try {
        let res = await axiosInst.post("api/auth/login", data);
        localStorage.setItem("token", res.data.token);
        axiosInst.defaults.headers.common['seshId'] = res.data.seshId;
        axiosInst.defaults.headers.common['Authorization'] = res.data.token;
        return res;
    } catch (e) {
        throw e.response.data;
    }
}

export async function logout() {
    if (axiosInst.defaults.headers.common['Authorization']) {
        let res = await axiosInst.delete("api/auth/logout");
        axiosInst.defaults.headers.common['Authorization'] = undefined;
        return res;
    } else {
        throw {
            code: ERR_USER,
            message: "not logged in"
        };
    }
}

export async function register(data) {
    try {
        classifyWithDto(
            NewUserDto,
            data,
            {throw:true}
        )
    } catch (e) {
        throw {
            code: ERR_USER,
            message: e.message,
        };
    }

    try {
        let res = await axiosInst.post("api/auth/register", data);
        localStorage.setItem('token', res.data.token);
        axiosInst.defaults.headers.common['Authorization'] = res.data.token;
        return res;
    } catch (e) {
        console.log(e);
        throw e.response.data;
    }
}

export async function activate(data) {
    try {
        classifyWithDto(
            ActivationCodeDto,
            data,
            {
                throw:true,
                allowEmpty: false,
            }
        )
    } catch (e) {
        throw {
            code: ERR_USER,
            message: e.message,
        };
    }

    try {
        return await axiosInst.put("api/auth/activate", data);
    } catch (e) {
        throw e.response.data;
    }
}

export async function resendEmail() {
    try {
        return await axiosInst.put("api/auth/resend");
    } catch (e) {
        throw e.response.data;
    }
}

export async function switchState(eventId) {
    try {
        return await axiosInst.get(`api/auth/state/switch`, {
            params: {
                event: eventId,
            }
        });
    } catch (e) {
        throw e.response.data;
    }
}

const AuthApi = {
    load,
    login,
    logout,
    register,
    activate,
    switchState,
}

export default AuthApi;