import { ActivationCodeDto, isId, LoginDto, NewUserDto } from "ottery-dto";
import {setCookie, getCookie} from "../../functions/cookies";
import { clideInst } from "../../app/clideInst";
import { API_ENV } from "../../env/api.env";

export const load = clideInst
    .makeGet(API_ENV.paths.auth.load, {
        in_pipeline: ()=>{
            clideInst.defaults.headers.common['Id'] = getCookie("Id");
            clideInst.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        },
        out_pipeline: (res)=>{
            clideInst.defaults.headers.common['Id'] = res.data.seshId;
            setCookie('Id', res.data.seshId, 1); //set to 1 day for no real reason
            return res;
        },
    });

export const login = clideInst
    .makePost(API_ENV.paths.auth.login, {
        data_validator: LoginDto,
        in_pipeline: (loginDto) => {
            return {
                data: loginDto,
            }
        },
        out_pipeline: (res)=>{
            localStorage.setItem("token", res.data.token);
            clideInst.defaults.headers.common['seshId'] = res.data.seshId;
            clideInst.defaults.headers.common['Authorization'] = res.data.token;
            return res;
        },
    });

export const logout = clideInst
    .makeDelete(API_ENV.paths.auth.logout, {
        in_pipeline: ()=>{
            if (!clideInst.defaults.headers.common["Authorization"]) {
                throw new Error("Not logged in");
            }
        },
        out_pipeline: (res)=>{
            clideInst.defaults.headers.common['Authorization'] = undefined;
            return res;
        }
    });

export const register = clideInst
    .makePost(API_ENV.paths.auth.register, {
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
    .makePut(API_ENV.paths.auth.activate, {
        // this may need its options to not allow empty in the clide...
        // we would need to make a new clide config that gets input into code
        //{allowEmpty: false}
        data_validator: ActivationCodeDto,
        in_pipeline: (activationCodeDto)=>{
            return {
                data: activationCodeDto,
            }
        }
    });

export const resendEmail = clideInst.makePut(API_ENV.paths.auth.resend);

export const switchState = clideInst
    .makeGet(API_ENV.paths.auth.state.switch, {
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