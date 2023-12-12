import {
  ActivationCodeDto,
  EmailDto,
  isId,
  LoginDto,
  NewUserDto,
  ResetPasswordDto,
} from "@ottery/ottery-dto";
import { getCookie } from "../../functions/cookies";
import { clideInst } from "../../provider/clideInst";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const load = clideInst.makeGet("auth/load", {
  in_pipeline: async () => {
    console.log(await AsyncStorage.getItem("token"));
    console.log(await AsyncStorage.getItem("Id"));
    clideInst.defaults.headers.common["Id"] = await AsyncStorage.getItem("Id");
    clideInst.defaults.headers.common["Authorization"] = await AsyncStorage.getItem("token");
  },
  out_pipeline: (res) => {
    clideInst.defaults.headers.common["Id"] = res.data._id;
    AsyncStorage.setItem("Id", res.data._id); //set to 1 day for no real reason
    return res;
  },
});

export const login = clideInst.makePost("auth/login", {
  data_validator: LoginDto,
  in_pipeline: (loginDto) => {
    return {
      data: loginDto,
    };
  },
  out_pipeline: (res) => {
    AsyncStorage.setItem("token", res.data.token);
    clideInst.defaults.headers.common["Id"] = res.data._id;
    clideInst.defaults.headers.common["Authorization"] = res.data.token;
    return res;
  },
});

export const logout = clideInst.makeDelete("auth/logout", {
  in_pipeline: () => {
    if (!clideInst.defaults.headers.common["Authorization"]) {
      throw new Error("Not logged in");
    }
  },
  out_pipeline: (res) => {
    clideInst.defaults.headers.common["Id"] = undefined;
    clideInst.defaults.headers.common["Authorization"] = undefined;
    AsyncStorage.setItem("Id", "-1");
    load();
    return res;
  },
});

export const register = clideInst.makePost("auth/register", {
  data_validator: NewUserDto,
  in_pipeline: (newUserDto) => {
    return {
      data: newUserDto,
    };
  },
  out_pipeline: (res) => {
    AsyncStorage.setItem("token", res.data.token);
    clideInst.defaults.headers.common["Authorization"] = res.data.token;
    return res;
  },
});

export const activate = clideInst.makePut("auth/activate", {
  // this may need its options to not allow empty in the clide...
  // we would need to make a new clide config that gets input into code
  data_validator: ActivationCodeDto,
  in_pipeline: (activationCodeDto) => {
    return {
      data: activationCodeDto,
    };
  },
});

export const resendEmail = clideInst.makePut("auth/resend");

export const switchState = clideInst.makeGet("auth/state/switch", {
  param_validators: {
    event: isId,
  },
  in_pipeline: (eventId) => {
    return {
      params: {
        event: eventId,
      },
    };
  },
});

export const forgotPassword = clideInst.makePost("auth/forgot-password", {
  data_validator: EmailDto,
  in_pipeline: (emailDto) => {
    return {
      data: emailDto,
    };
  },
});

export const resetPassword = clideInst.makePost("auth/reset-password", {
  data_validator: ResetPasswordDto,
  in_pipeline: (resetPasswordDto) => {
    return {
      data: resetPasswordDto,
    };
  },
});

const AuthApi = {
  load,
  login,
  logout,
  register,
  activate,
  switchState,
  forgotPassword,
  resetPassword,
};

export default AuthApi;
