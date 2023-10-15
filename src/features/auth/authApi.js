import { ActivationCodeDto, isId, LoginDto, NewUserDto } from "@ottery/ottery-dto";
import {setCookie, getCookie} from "../../functions/cookies";
import { clideInst } from "../../provider/clideInst";

export const load = clideInst
    .makeGet("auth/load", {
        in_pipeline: ()=>{
            clideInst.defaults.headers.common['Id'] = getCookie("Id");
            clideInst.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        },
        out_pipeline: (res)=>{
            clideInst.defaults.headers.common['Id'] = res.data._id;
            setCookie('Id', res.data._id, 86400000); //set to 1 day for no real reason
            return res;
        },
    });

export const login = clideInst
    .makePost("auth/login", {
        data_validator: LoginDto,
        in_pipeline: (loginDto) => {
            return {
                data: loginDto,
            }
        },
        out_pipeline: (res)=>{
            localStorage.setItem("token", res.data.token);
            clideInst.defaults.headers.common['Id'] = res.data._id;
            clideInst.defaults.headers.common['Authorization'] = res.data.token;
            return res;
        },
    });

export const logout = clideInst
    .makeDelete("auth/logout", {
        in_pipeline: ()=>{
            if (!clideInst.defaults.headers.common["Authorization"]) {
                throw new Error("Not logged in");
            }
        },
        out_pipeline: (res)=>{
            clideInst.defaults.headers.common['Id'] = undefined;
            clideInst.defaults.headers.common['Authorization'] = undefined;
            setCookie('Id', "-1", -1);
            load();
            return res;
        }
    });

export const register = clideInst
    .makePost("auth/register", {
        data_validator: NewUserDto,
        in_pipeline:(newUserDto)=>{
            return {
                data:newUserDto
            }
        },
        out_pipeline:(res)=>{
            localStorage.setItem('token', res.data.token);
            clideInst.defaults.headers.common['Authorization'] = res.data.token;
            return res;
        }
    });

export const activate = clideInst
    .makePut("auth/activate", {
        // this may need its options to not allow empty in the clide...
        // we would need to make a new clide config that gets input into code
        data_validator: ActivationCodeDto,
        in_pipeline: (activationCodeDto)=>{
            return {
                data: activationCodeDto,
            }
        }
    });

export const resendEmail = clideInst.makePut("auth/resend");

export const switchState = clideInst
    .makeGet("auth/state/switch", {
        param_validators: {
            event: isId,
        },
        in_pipeline: (eventId)=>{
            return {
                params: {
                    event: eventId,
                }
            }
        }
    });

const AuthApi = {
    load,
    login,
    logout,
    register,
    activate,
    switchState,
}

export default AuthApi;